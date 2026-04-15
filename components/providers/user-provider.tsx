"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface UserProfile {
  id: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  username: string;
  headline: string;
  location: string;
  avatarUrl: string;
  bannerUrl: string;
  isPremium: boolean;
  verified: boolean;
  role: "USER" | "ADMIN";
  totalConnections?: number;
  _count?: {
    posts: number;
    followers: number;
    following: number;
  };
}

interface UserContextType {
  user: UserProfile | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const isMounted = React.useRef(true);

  const fetchUser = useCallback(async () => {
    try {
      // 1. Try to fetch the authenticated user first
      let authRes = await fetch(`/api/me`);
      
      if (authRes.ok) {
        const data = await authRes.json();
        if (data.id) {
          setUser({
            ...data,
            id: data.id,
            name: data.name,
            firstName: data.firstName || data.name?.split(' ')[0] || "User",
            lastName: data.lastName || data.name?.split(' ').slice(1).join(' ') || "",
            username: data.username || data.name?.toLowerCase().replace(/\s+/g, '-'),
            headline: data.headline || "Connect+ Member",
            location: data.location || "Earth",
            avatarUrl: data.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${data.name || data.email}`,
            bannerUrl: data.bannerUrl || "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=400&h=200",
            isPremium: !!data.isPremium,
            verified: !!data.verified,
            role: data.role || "USER",
            totalConnections: data.totalConnections || 0,
            _count: data._count
          });
          setLoading(false);
          return;
        }
      }

      // If not authenticated, set user to null
      setUser(null);
    } catch (err) {
      console.error("Failed to fetch user context:", err);
      setUser(null);
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    fetchUser();

    // Suppress noise from specific conflicting browser extensions (e.g. Compose AI)
    const handleError = (event: PromiseRejectionEvent) => {
      if (event.reason?.stack?.includes('abcbjgholdjcjblkibolbppb') || 
          event.reason?.message?.includes('permission error')) {
        event.preventDefault(); // Ignore this error
      }
    };
    window.addEventListener('unhandledrejection', handleError);

    return () => {
      isMounted.current = false;
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, [fetchUser]);

  return (
    <UserContext.Provider value={{ user, loading, refreshUser: fetchUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
