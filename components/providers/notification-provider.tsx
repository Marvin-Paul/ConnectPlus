"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useUser } from "./user-provider";

interface NotificationContextType {
  unreadCount: number;
  refreshCount: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchCount = useCallback(async () => {
    if (!user) {
      setUnreadCount(0);
      return;
    }
    try {
      const res = await fetch(`/api/notifications?username=${user.username}`);
      if (res.ok) {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const notifications = await res.json();
          const unread = notifications.filter((n: any) => !n.isRead).length;
          setUnreadCount(unread);
        }
      }
    } catch (err) {
      console.error("Failed to fetch notification count:", err);
    }
  }, [user]);

  const markAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/notifications`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  const markAllAsRead = async () => {
    if (!user) return;
    try {
      const res = await fetch(`/api/notifications`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ readAll: true, username: user.username }),
      });
      if (res.ok) {
        setUnreadCount(0);
      }
    } catch (err) {
      console.error("Failed to mark all notifications as read:", err);
    }
  };

  const realtimeRef = React.useRef<any>(null);
  const isInitializingRealtime = React.useRef(false);

  useEffect(() => {
    fetchCount();
  }, [fetchCount]);

  useEffect(() => {
    if (!user?.id) return;
    
    // Establish real-time connection via Server-Sent Events (SSE)
    // This is more reliable than direct Supabase Realtime for this custom architecture
    const eventSource = new EventSource(`/api/notifications/stream?userId=${user.id}`);

    eventSource.onmessage = (event) => {
      try {
        const newNotification = JSON.parse(event.data);
        setUnreadCount(prev => prev + 1);
        
        // Optional: Dispatch a global event for components that don't use this provider
        window.dispatchEvent(new CustomEvent("new-notification", { detail: newNotification }));
      } catch (e) {
        console.error("Failed to parse real-time notification:", e);
      }
    };

    eventSource.onerror = (err) => {
      console.error("SSE Connection Error:", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [user?.id]);

  return (
    <NotificationContext.Provider value={{ unreadCount, refreshCount: fetchCount, markAsRead, markAllAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}
