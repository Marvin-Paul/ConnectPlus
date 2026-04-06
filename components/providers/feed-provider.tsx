"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useUser } from "./user-provider";

export interface PostAuthor {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  avatarUrl: string | null;
  headline: string | null;
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
  type: string;
  title: string | null;
  tags: string[];
  createdAt: string;
  author: PostAuthor;
  _count: PostStats;
  reactions: { type: string }[];
}

interface FeedContextType {
  posts: Post[];
  loading: boolean;
  hasMore: boolean;
  fetchPosts: (page?: number) => Promise<void>;
  createPost: (content: string, imageUrl?: string) => Promise<void>;
  reactToPost: (postId: string, type: string) => Promise<void>;
  commentOnPost: (postId: string, content: string) => Promise<void>;
  sharePost: (postId: string, content?: string) => Promise<void>;
  savePost: (postId: string) => Promise<void>;
  hidePost: (postId: string) => void;
  unfollowUser: (authorId: string) => void;
  reportPost: (postId: string) => void;
}

const FeedContext = createContext<FeedContextType | undefined>(undefined);

export function FeedProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = useCallback(async (pageNum = 1) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/posts?page=${pageNum}&limit=10&userId=${user?.id || 'demo-user'}`);
      const data = await res.json();
      
      if (pageNum === 1) {
        setPosts(data);
      } else {
        setPosts(prev => [...prev, ...data]);
      }
      
      if (data.length < 10) setHasMore(false);
      setPage(pageNum);
    } catch (error) {
      console.error("Error fetching feed:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchPosts(1);
  }, [fetchPosts]);

  const createPost = async (content: string, imageUrl?: string) => {
    if (!user) return;
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          imageUrl,
          authorId: user.id,
        }),
      });
      const newPost = await res.json();
      setPosts(prev => [newPost, ...prev]);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const reactToPost = async (postId: string, type: string) => {
    if (!user) return;
    
    // Optimistic Update
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const hasExisting = post.reactions.length > 0;
        const sameType = hasExisting && post.reactions[0].type === type;
        
        let newLikeCount = post._count.likes;
        let newReactions = post.reactions;

        if (sameType) {
          newLikeCount -= 1;
          newReactions = [];
        } else if (hasExisting) {
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
      await fetch(`/api/posts/${postId}/react`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, type }),
      });
    } catch (error) {
       // Rollback could be implemented here
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
      await fetch(`/api/posts/${postId}/share`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, content }),
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
    // Optionally connect to backend API, mock success
    console.log(`Saved post ${postId}`);
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

  return (
    <FeedContext.Provider value={{ 
      posts, loading, hasMore, fetchPosts, createPost, reactToPost, commentOnPost, sharePost, savePost, hidePost, unfollowUser, reportPost 
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
