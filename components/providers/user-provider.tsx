"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface UserProfile {
  firstName: string;
  lastName: string;
  username: string;
  headline: string;
  location: string;
  avatarUrl: string;
  bannerUrl: string;
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

  const fetchUser = useCallback(async () => {
    try {
      // In a real app, this would be an endpoint to get the "current" user session.
      // For this demo, we fetch the 'demo-user' data from our profile API.
      const username = "demo-user"; 
      const res = await fetch(`/api/profile/${username}`);
      if (res.ok) {
        const data = await res.json();
        setUser({
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
          headline: data.headline || "",
          location: data.location || "",
          avatarUrl: data.avatarUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
          bannerUrl: data.bannerUrl || "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=400&h=200"
        });
      } else {
        // Fallback to hardcoded demo data if API fails or user not found
        setUser({
          firstName: "Marvin",
          lastName: "Muwereza",
          username: "demo-user",
          headline: "Senior Full-Stack Engineer | AI Systems Architect | Uganda Tech Alliance",
          avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
          bannerUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=400&h=200",
          location: "Kampala, Uganda"
        });
      }
    } catch (err) {
      console.error("Failed to fetch user context:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
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
