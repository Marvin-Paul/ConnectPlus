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
        const notifications = await res.json();
        const unread = notifications.filter((n: any) => !n.isRead).length;
        setUnreadCount(unread);
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

  useEffect(() => {
    fetchCount();

    // Supabase Realtime for new notifications
    let channel: any = null;
    const initRealtime = async () => {
      if (!user) return;
      try {
        const { supabase } = await import("@/lib/supabase");
        if (!supabase) return;

        channel = supabase.channel(`notifications_${user.id}`)
          .on(
            'postgres_changes' as any,
            { event: 'INSERT', schema: 'public', table: 'Notification', filter: `userId=eq.${user.id}` },
            () => {
              setUnreadCount(prev => prev + 1);
            }
          )
          .on(
            'postgres_changes' as any,
            { event: 'UPDATE', schema: 'public', table: 'Notification', filter: `userId=eq.${user.id}` },
            (payload: any) => {
               // If a notification was marked as read, decrease count
               if (payload.new.isRead && !payload.old.isRead) {
                  setUnreadCount(prev => Math.max(0, prev - 1));
               }
            }
          )
          .subscribe();
      } catch (err) {
        console.error("Realtime notifications error:", err);
      }
    };

    initRealtime();

    return () => {
      if (channel) {
        import("@/lib/supabase").then(({ supabase }) => {
          supabase.removeChannel(channel);
        });
      }
    };
  }, [user, fetchCount]);

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
