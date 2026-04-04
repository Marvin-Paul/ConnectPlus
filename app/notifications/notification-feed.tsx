import { MoreVertical, Bell, Briefcase, ThumbsUp, UserPlus, Star, MessageSquare, Calendar, Users, ChevronRight, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { useUser } from "@/components/providers/user-provider";

interface Notification {
  id: string;
  type: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  sourceId?: string;
  sourceType?: string;
}

interface NotificationFeedProps {
  activeFilter: string;
}

export function NotificationFeed({ activeFilter }: NotificationFeedProps) {
  const { user } = useUser();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const username = user?.username || "demo-user";
      const res = await fetch(`/api/notifications?username=${username}`);
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [user]);

  const toggleReadStatus = async (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
    
    try {
      await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'REACTION': return { icon: ThumbsUp, bg: 'bg-[#F1F7FE]', color: 'text-blue-500' };
      case 'COMMENT': return { icon: MessageSquare, bg: 'bg-[#F0FDF4]', color: 'text-green-500' };
      case 'JOB_ALERT': return { icon: Briefcase, bg: 'bg-[#FFF1F2]', color: 'text-red-500' };
      case 'CONNECTION_REQUEST': return { icon: UserPlus, bg: 'bg-[#F5F3FF]', color: 'text-purple-500' };
      case 'REPOST': return { icon: Star, bg: 'bg-[#FFFBEB]', color: 'text-yellow-500' };
      default: return { icon: Bell, bg: 'bg-slate-50', color: 'text-slate-400' };
    }
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {loading ? (
         <div className="p-10 space-y-6">
            {[1, 2, 3].map(i => (
               <div key={i} className="flex gap-4 animate-pulse">
                  <div className="w-12 h-12 bg-slate-50 rounded-full" />
                  <div className="flex-1 space-y-2">
                     <div className="h-4 bg-slate-50 w-full rounded-full" />
                     <div className="h-3 bg-slate-50 w-1/4 rounded-full" />
                  </div>
               </div>
            ))}
         </div>
      ) : notifications.length === 0 ? (
         <div className="p-20 text-center space-y-4">
            <Bell className="w-12 h-12 text-slate-200 mx-auto" />
            <h3 className="text-[14px] font-black uppercase tracking-widest text-slate-400">Everything up to date</h3>
            <p className="text-[12px] font-bold italic text-slate-300">You're all caught up with your professional network.</p>
         </div>
      ) : (
        notifications.map((notif) => {
          const info = getIcon(notif.type);
          return (
            <div 
              key={notif.id} 
              onClick={() => toggleReadStatus(notif.id)}
              className={`px-4 md:px-6 py-4 flex items-start justify-between gap-3 transition-all duration-300 border-b border-slate-100 last:border-0 relative cursor-pointer active:bg-slate-100 ${!notif.isRead ? 'bg-[#F1F7FE]' : 'bg-white hover:bg-slate-50'}`}
            >
              {!notif.isRead && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#0A66C2] animate-in fade-in slide-in-from-left-1 duration-500" />
              )}

              <div className="flex items-start gap-4 flex-1 min-w-0">
                 <div className={`w-12 h-12 rounded-2xl ${info.bg} flex items-center justify-center shrink-0 border border-slate-100/50 shadow-sm`}>
                    <info.icon className={`h-5 w-5 ${info.color}`} />
                 </div>
                 
                 <div className="flex-1 min-w-0">
                    <p className={`text-[14px] leading-snug transition-colors duration-300 ${!notif.isRead ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>
                       {notif.content}
                    </p>
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-2 block italic">
                       {timeAgo(notif.createdAt)} • {notif.type.replace('_', ' ')}
                    </span>
                 </div>
              </div>
              
              <button className="p-2 rounded-full text-slate-300 hover:text-slate-500 transition-colors shrink-0">
                 <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          );
        })
      )}
      
      {!loading && notifications.length > 5 && (
        <button className="w-full py-10 text-[12px] font-black text-slate-400 hover:text-primary hover:bg-slate-50 transition-all border-t border-slate-50 uppercase tracking-[0.3em] bg-slate-50/20">
           Review Notification history
        </button>
      )}
    </div>
  );
}
