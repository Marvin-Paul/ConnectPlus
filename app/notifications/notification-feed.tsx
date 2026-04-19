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
    <div className="flex flex-col bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-soft mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {loading ? (
         <div className="p-8 space-y-8">
            {[1, 2, 4].map(i => (
               <div key={i} className="flex gap-5 animate-pulse">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl" />
                  <div className="flex-1 space-y-3 py-1">
                     <div className="h-4 bg-slate-50 w-full rounded-full" />
                     <div className="h-3 bg-slate-50 w-1/3 rounded-full" />
                  </div>
               </div>
            ))}
         </div>
      ) : notifications.length === 0 ? (
         <div className="p-24 text-center space-y-6">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-2 border border-slate-100">
               <Bell className="w-8 h-8 text-slate-200" />
            </div>
            <div className="space-y-1">
               <h3 className="text-[16px] font-bold text-slate-800">You're all caught up</h3>
               <p className="text-[13px] font-medium text-slate-400 max-w-[240px] mx-auto leading-relaxed">Check back later for new updates from your professional network.</p>
            </div>
         </div>
      ) : (
        <div className="divide-y divide-slate-50">
          {notifications.map((notif) => {
            const info = getIcon(notif.type);
            const isRecent = (Date.now() - new Date(notif.createdAt).getTime()) < 3600000;
            
            return (
              <div 
                key={notif.id} 
                onClick={() => toggleReadStatus(notif.id)}
                className={`group px-6 py-5 flex items-start gap-4 transition-all duration-300 relative cursor-pointer ${!notif.isRead ? 'bg-blue-50/20 active:bg-blue-50/40' : 'bg-white hover:bg-slate-50 active:bg-slate-100'}`}
              >
                {!notif.isRead && (
                  <div className="absolute left-0 top-6 bottom-6 w-1 bg-primary rounded-r-full shadow-[0_0_8px_rgba(10,102,194,0.4)] animate-pulse" />
                )}

                <div className="relative shrink-0">
                  <div className={`w-14 h-14 rounded-2xl ${info.bg} flex items-center justify-center border border-slate-100 shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                     <info.icon className={`h-6 w-6 ${info.color}`} />
                  </div>
                  {!notif.isRead && isRecent && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary border-2 border-white rounded-full animate-bounce shadow-sm" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0 py-0.5">
                   <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                         <p className={`text-[15px] leading-relaxed tracking-tight transition-colors duration-300 ${!notif.isRead ? 'text-slate-900 font-bold' : 'text-slate-600 font-medium'}`}>
                            {notif.content.split('"').map((part, i) => (
                              i % 2 === 1 ? <span key={i} className="text-primary font-black italic">"{part}"</span> : part
                            ))}
                         </p>
                         <div className="flex items-center gap-2">
                           <span className="text-[11px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-1.5 leading-none">
                              {timeAgo(notif.createdAt)}
                              <span className="w-1 h-1 bg-slate-300 rounded-full" />
                              {notif.type.replace('_', ' ')}
                           </span>
                           {isRecent && !notif.isRead && (
                             <span className="h-4 px-1.5 flex items-center rounded bg-primary/10 text-primary text-[9px] font-bold uppercase tracking-tighter">New</span>
                           )}
                         </div>
                      </div>
                      
                      <button 
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-xl text-slate-300 hover:text-slate-500 hover:bg-slate-100 transition-all opacity-0 group-hover:opacity-100 active:scale-90"
                        aria-label="More options"
                        title="Options"
                      >
                         <MoreVertical className="h-5 w-5" />
                      </button>
                   </div>

                   {notif.type === 'CONNECTION_REQUEST' && !notif.isRead && (
                     <div className="flex items-center gap-3 mt-4 animate-in slide-in-from-top-2 duration-500">
                        <button className="h-9 px-6 rounded-xl bg-primary text-white font-bold text-[12px] hover:bg-primary/90 transition-all active:scale-95 shadow-premium">Accept Request</button>
                        <button className="h-9 px-6 rounded-xl border border-slate-200 text-slate-600 font-bold text-[12px] hover:bg-slate-50 transition-all active:scale-95">Ignore</button>
                     </div>
                   )}

                   {notif.type === 'JOB_ALERT' && (
                     <div className="mt-4 flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50 group-hover:border-primary/20 group-hover:bg-primary/5 transition-all duration-300">
                        <div className="w-10 h-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center shadow-sm">
                           <Briefcase className="w-5 h-5 text-red-500/80" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <span className="text-[11px] font-black text-slate-800 uppercase tracking-widest block leading-none">Job Opportunity</span>
                           <span className="text-[13px] font-bold text-slate-500 truncate block mt-1">Review matches and apply instantly</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
                     </div>
                   )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {!loading && notifications.length > 5 && (
        <button className="w-full py-12 text-[12px] font-black text-slate-400 hover:text-primary hover:bg-slate-50 transition-all border-t border-slate-50 uppercase tracking-[0.4em] bg-slate-50/10">
           Review Notification history
        </button>
      )}
    </div>
  );
}
