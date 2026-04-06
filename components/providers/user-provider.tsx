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
            verified: !!data.verified
          });
          setLoading(false);
          return;
        }
      }

      // 2. Fallback to existing demo profile logic if /api/me fails or is not authenticated
      let res = await fetch(`/api/profile/marvin-muwereza`);
      if (!res.ok) {
        res = await fetch(`/api/profile/demo-user`);
      }
      
      if (!isMounted.current) return;

      if (res.ok) {
        const data = await res.json();
        if (data.id) {
          setUser({
            ...data,
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            headline: data.headline || "",
            location: data.location || "",
            avatarUrl: data.avatarUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
            bannerUrl: data.bannerUrl || "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=400&h=200",
            isPremium: !!data.isPremium,
            verified: !!data.verified
          });
        }
      } else {
        // Ultimate fallback (demo/logged-out state)
        setUser(null);
      }
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
