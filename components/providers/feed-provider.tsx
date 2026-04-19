"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useUser } from "./user-provider";

export interface PostAuthor {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  avatarUrl: string | null;
  headline: string | null;
  connectionDegree?: string; // e.g. "1st", "2nd"
}

export interface PostStats {
  likes: number;
  comments: number;
  reposts: number;
}

export interface Post {
  id: string;
  authorId: string;
  content: string;
  imageUrl: string | null;
  mediaUrls: string[];
  type: string;
  visibility: string;
  title: string | null;
  tags: string[];
  createdAt: string;
  author: PostAuthor;
  _count: PostStats;
  reactions: { type: string }[];
  isSaved?: boolean;
}

interface FeedContextType {
  posts: Post[];
  loading: boolean;
  hasMore: boolean;
  fetchPosts: (page?: number) => Promise<void>;
  createPost: (content: string, imageUrl?: string, options?: { 
    type?: string; 
    title?: string; 
    tags?: string[];
    isEvent?: boolean;
    eventDate?: string;
    eventLocation?: string;
    mediaUrls?: string[];
    visibility?: string;
  }) => Promise<void>;
  reactToPost: (postId: string, type: string) => Promise<void>;
  commentOnPost: (postId: string, content: string) => Promise<void>;
  sharePost: (postId: string, content?: string) => Promise<void>;
  savePost: (postId: string) => Promise<void>;
  hidePost: (postId: string) => void;
  unfollowUser: (authorId: string) => void;
  reportPost: (postId: string) => void;
  deletePost: (postId: string) => Promise<void>;
  incrementCommentCount: (postId: string) => void;
  sort: string;
  setSort: (sort: string) => void;
}

const FeedContext = createContext<FeedContextType | undefined>(undefined);

export function FeedProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sort, setSort] = useState("recent");

  const fetchPosts = useCallback(async (pageNum = 1, currentSort = sort) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/posts?page=${pageNum}&limit=10&userId=${user?.id || 'demo-user'}&sort=${currentSort}`);
      const data = await res.json();

      if (!res.ok) {
        console.error("Feed API Error:", {
          status: res.status,
          payload: data
        });
        setLoading(false);
        return;
      }

      if (!Array.isArray(data)) {
        console.error("Critical: Feed API returned non-array payload:", data);
        setLoading(false);
        return;
      }
      
      const nextPosts = data;
      
      if (pageNum === 1) {
        setPosts(nextPosts);
        setHasMore(nextPosts.length === 10);
      } else {
        setPosts(prev => [...prev, ...nextPosts]);
        if (nextPosts.length < 10) setHasMore(false);
      }
      
      setPage(pageNum);
    } catch (error) {
      console.error("Fatal exception in FeedProvider.fetchPosts:", error);
    } finally {
      setLoading(false);
    }
  }, [user, sort]);

  const realtimeRef = useRef<any>(null);
  const isInitializingRealtime = useRef(false);

  useEffect(() => {
    fetchPosts(1, sort);
  }, [fetchPosts, sort]);

  useEffect(() => {
    if (isInitializingRealtime.current) return;
    
    const initRealtime = async () => {
      try {
        isInitializingRealtime.current = true;
        const { supabase } = await import("@/lib/supabase");
        if (!supabase) return;

        // Force cleanup of any lingering channels from previous renders
        const channels = supabase.getChannels();
        for (const c of channels) {
          if (c.topic.includes('feed_')) {
            await supabase.removeChannel(c);
          }
        }
        
        const channelId = `feed_${Math.random().toString(36).substring(7)}`;
        const channel = supabase.channel(channelId);
        
        channel.on(
          'postgres_changes' as any, 
          { event: 'INSERT', schema: 'public', table: 'Post' }, 
          async (payload: any) => {
            try {
              const res = await fetch(`/api/posts/${payload.new.id}`);
              if (res.ok) {
                const fullPost = await res.json();
                setPosts(prev => {
                  if (prev.some(p => p.id === fullPost.id)) return prev;
                  return [fullPost, ...prev];
                });
              }
            } catch (err) {
              console.error("[Realtime] Handler error:", err);
            }
          }
        );
          
        channel.subscribe((status: string) => {
          if (status === 'SUBSCRIBED') {
            realtimeRef.current = channel;
            console.log(`[Realtime] Active: ${channelId}`);
          }
        });
      } catch (err) {
        console.error("[Realtime] Init error:", err);
      } finally {
        isInitializingRealtime.current = false;
      }
    };

    initRealtime();

    return () => {
      if (realtimeRef.current) {
        const channelToClose = realtimeRef.current;
        realtimeRef.current = null;
        import("@/lib/supabase").then(({ supabase }) => {
          supabase.removeChannel(channelToClose).catch(() => {});
        });
      }
    };
  }, []); // Only run once on mount for stability

  const handleSetSort = (newSort: string) => {
    setSort(newSort);
    setPage(1);
    setHasMore(true);
  };

  const createPost = async (content: string, imageUrl?: string, options?: { 
    type?: string; 
    title?: string; 
    tags?: string[];
    isEvent?: boolean;
    eventDate?: string;
    eventLocation?: string;
    mediaUrls?: string[];
    visibility?: string;
  }) => {
    if (!user) throw new Error("User not authenticated");
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        imageUrl,
        authorId: user.id,
        ...options
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("[FeedProvider] POST /api/posts failed:", data);
      throw new Error(data?.details || data?.error || JSON.stringify(data) || "Failed to create post");
    }
    // Normalize the response as a safety net
    const newPost: Post = {
      id: data.id,
      authorId: data.authorId,
      content: data.content,
      imageUrl: data.imageUrl || null,
      mediaUrls: data.mediaUrls || (data.imageUrl ? [data.imageUrl] : []),
      type: data.type || "POST",
      visibility: data.visibility || "ANYONE",
      title: data.title || null,
      tags: data.tags || [],
      createdAt: data.createdAt,
      author: data.author || {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        avatarUrl: user.avatarUrl,
        headline: user.headline,
      },
      _count: {
        likes: data._count?.likes ?? data._count?.reactions ?? 0,
        comments: data._count?.comments ?? 0,
        reposts: data._count?.reposts ?? 0,
      },
      reactions: data.reactions || [],
      isSaved: false,
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const reactToPost = async (postId: string, type: string) => {
    if (!user) return;
    
    // Optimistic Update
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const isReversing = post.reactions?.[0]?.type === type;
        const isSwitching = post.reactions.length > 0 && !isReversing;
        
        let newLikeCount = post._count.likes;
        let newReactions = post.reactions;

        if (isReversing) {
          newLikeCount -= 1;
          newReactions = [];
        } else if (isSwitching) {
          newReactions = [{ type }];
        } else {
          newLikeCount += 1;
          newReactions = [{ type }];
        }

        return {
          ...post,
          _count: { ...post._count, likes: newLikeCount },
          reactions: newReactions
        };
      }
      return post;
    }));

    try {
      const effectId = user?.id || "demo-user";
      await fetch(`/api/posts/${postId}/react`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: effectId, type }),
      });
    } catch (error) {
       console.error("Error reacting:", error);
    }
  };

  const commentOnPost = async (postId: string, content: string) => {
    if (!user) return;
    try {
      const res = await fetch(`/api/posts/${postId}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, content }),
      });
      const newComment = await res.json();
      
      setPosts(prev => prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            _count: { ...post._count, comments: post._count.comments + 1 }
          };
        }
        return post;
      }));
    } catch (error) {
      console.error("Error commenting:", error);
    }
  };

  const sharePost = async (postId: string, content?: string) => {
    if (!user) return;
    try {
      const effectId = user?.id || "demo-user";
      await fetch(`/api/posts/${postId}/share`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: effectId, content }),
      });
      
      setPosts(prev => prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            _count: { ...post._count, reposts: post._count.reposts + 1 }
          };
        }
        return post;
      }));
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const savePost = async (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, isSaved: !post.isSaved } : post
    ));
    console.log(`Toggled save for post ${postId}`);
  };

  const hidePost = (postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  const unfollowUser = (authorId: string) => {
    setPosts(prev => prev.filter(p => p.authorId !== authorId));
  };

  const reportPost = (postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
    console.log(`Reported post ${postId}`);
  };

  const deletePost = async (postId: string) => {
    // Optimistic Update
    const originalPosts = [...posts];
    setPosts(prev => prev.filter(p => p.id !== postId));

    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });
      
      if (!res.ok) {
        throw new Error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      setPosts(originalPosts); // Rollback
    }
  };

  const incrementCommentCount = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          _count: { ...post._count, comments: post._count.comments + 1 }
        };
      }
      return post;
    }));
  };

  return (
    <FeedContext.Provider value={{ 
      posts, loading, hasMore, fetchPosts, createPost, reactToPost, commentOnPost, sharePost, savePost, hidePost, unfollowUser, reportPost, deletePost, incrementCommentCount, sort, setSort: handleSetSort
    }}>
      {children}
    </FeedContext.Provider>
  );
}

export const useFeed = () => {
  const context = useContext(FeedContext);
  if (context === undefined) {
    throw new Error("useFeed must be used within a FeedProvider");
  }
  return context;
};
