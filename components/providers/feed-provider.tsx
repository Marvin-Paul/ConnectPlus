"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useUser } from "./user-provider";

export interface PostAuthor {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
  avatarUrl: string | null;
  headline: string | null;
  verified?: boolean;
  isPremium?: boolean;
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
      
      // Professional check for empty or non-JSON response
      const contentType = res.headers.get("content-type");
      let data: any = [];
      if (res.ok && contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else if (!res.ok) {
        const errorText = await res.text().catch(() => "Unknown error");
        console.error("Feed API Error:", { status: res.status, errorText });
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
                const contentType = res.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                  const fullPost = await res.json();
                  setPosts(prev => {
                    if (prev.some(p => p.id === fullPost.id)) return prev;
                    return [fullPost, ...prev];
                  });
                }
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

    // Optimistic Update
    const tempId = `temp-${Date.now()}`;
    const optimisticPost: Post = {
      id: tempId,
      authorId: user.id,
      content,
      imageUrl: imageUrl || null,
      mediaUrls: options?.mediaUrls || (imageUrl ? [imageUrl] : []),
      type: options?.type || "POST",
      visibility: options?.visibility || "ANYONE",
      title: options?.title || null,
      tags: options?.tags || [],
      createdAt: new Date().toISOString(),
      author: {
        id: user.id,
        firstName: user.firstName || "Professional",
        lastName: user.lastName || "User",
        username: user.username || "user",
        avatarUrl: user.avatarUrl || null,
        headline: user.headline || "Connect+ Member",
        verified: user.verified,
        isPremium: user.isPremium,
      },
      _count: { likes: 0, comments: 0, reposts: 0 },
      reactions: [],
      isSaved: false,
    };

    setPosts(prev => [optimisticPost, ...prev]);

    try {
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
        throw new Error(data?.details || data?.error || "Failed to create post");
      }

      // Replace optimistic post with actual data from server
      setPosts(prev => prev.map(p => p.id === tempId ? {
        ...data,
        author: optimisticPost.author, // Keep the hydrated author info
        _count: data._count || { likes: 0, comments: 0, reposts: 0 }
      } : p));

    } catch (error) {
      console.error("[FeedProvider] Post creation failed:", error);
      // Rollback optimistic update
      setPosts(prev => prev.filter(p => p.id !== tempId));
      throw error;
    }
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
    if (!user) return;
    
    // Optimistic Update
    const originalPosts = [...posts];
    setPosts(prev => prev.filter(p => p.id !== postId));

    try {
      const res = await fetch(`/api/posts/${postId}?userId=${user.id}`, {
        method: "DELETE",
      });
      
      if (!res.ok) {
        const contentType = res.headers.get("content-type");
        const data = (contentType && contentType.includes("application/json")) 
          ? await res.json() 
          : { error: await res.text() };
        throw new Error(data.error || "Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      setPosts(originalPosts); // Rollback
      throw error;
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
