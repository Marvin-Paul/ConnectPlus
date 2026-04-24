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

    if (!user?.id) return;

    // Listen for real-time notifications dispatched by the NotificationProvider
    const handleNewNotification = (event: any) => {
      const newNotification = event.detail;
      setNotifications(prev => [newNotification, ...prev]);
    };

    window.addEventListener("new-notification", handleNewNotification);
    return () => {
      window.removeEventListener("new-notification", handleNewNotification);
    };
  }, [user?.id]);

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
      case 'REACTION': return { icon: ThumbsUp, bg: 'bg-[#F1F7FE] dark:bg-blue-900/20', color: 'text-blue-500 dark:text-blue-400' };
      case 'COMMENT': return { icon: MessageSquare, bg: 'bg-[#F0FDF4] dark:bg-emerald-900/20', color: 'text-green-500 dark:text-emerald-400' };
      case 'JOB_ALERT': return { icon: Briefcase, bg: 'bg-[#FFF1F2] dark:bg-rose-900/20', color: 'text-red-500 dark:text-rose-400' };
      case 'CONNECTION_REQUEST': return { icon: UserPlus, bg: 'bg-[#F5F3FF] dark:bg-purple-900/20', color: 'text-purple-500 dark:text-purple-400' };
      case 'REPOST': return { icon: Star, bg: 'bg-[#FFFBEB] dark:bg-amber-900/20', color: 'text-yellow-500 dark:text-amber-400' };
      default: return { icon: Bell, bg: 'bg-slate-50 dark:bg-slate-800', color: 'text-slate-400 dark:text-slate-500' };
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
    <div className="flex flex-col bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-soft mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 transition-all">
      {loading ? (
         <div className="p-10 space-y-10">
            {[1, 2, 4].map(i => (
               <div key={i} className="flex gap-8 animate-pulse">
                  <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl" />
                  <div className="flex-1 space-y-4 py-2">
                     <div className="h-4 bg-slate-50 dark:bg-slate-800 w-full rounded-full" />
                     <div className="h-3 bg-slate-50 dark:bg-slate-800 w-1/3 rounded-full" />
                  </div>
               </div>
            ))}
         </div>
      ) : notifications.length === 0 ? (
         <div className="p-32 text-center space-y-8">
            <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100 dark:border-slate-700 shadow-xl">
               <Bell className="w-10 h-10 text-slate-200 dark:text-slate-600" />
            </div>
            <div className="space-y-2">
               <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">System Status: Clear</h3>
               <p className="text-[14px] font-bold text-slate-400 dark:text-slate-500 max-w-[280px] mx-auto leading-relaxed italic opacity-80">Check back later for new intelligence updates from your professional cluster.</p>
            </div>
         </div>
      ) : (
        <div className="divide-y divide-slate-50 dark:divide-slate-800">
          {notifications.map((notif) => {
            const info = getIcon(notif.type);
            const isRecent = (Date.now() - new Date(notif.createdAt).getTime()) < 3600000;
            
            return (
              <div 
                key={notif.id} 
                onClick={() => toggleReadStatus(notif.id)}
                className={`group px-8 py-7 flex items-start gap-6 transition-all duration-500 relative cursor-pointer ${!notif.isRead ? 'bg-blue-50/20 dark:bg-blue-900/10 active:bg-blue-50/40 dark:active:bg-blue-900/20' : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 active:bg-slate-100 dark:active:bg-slate-800'}`}
              >
                {!notif.isRead && (
                  <div className="absolute left-0 top-8 bottom-8 w-1.5 bg-[#0A66C2] dark:bg-blue-500 rounded-r-full shadow-[0_0_15px_rgba(10,102,194,0.4)] animate-pulse" />
                )}

                <div className="relative shrink-0">
                  <div className={`w-16 h-16 rounded-[1.25rem] ${info.bg} flex items-center justify-center border border-slate-100 dark:border-slate-800 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                     <info.icon className={`h-7 w-7 ${info.color}`} />
                  </div>
                  {!notif.isRead && isRecent && (
                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#0A66C2] dark:bg-blue-500 border-4 border-white dark:border-slate-900 rounded-full shadow-2xl animate-bounce" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0 py-1">
                   <div className="flex items-start justify-between gap-6">
                      <div className="space-y-2">
                         <p className={`text-[16px] leading-relaxed tracking-tight transition-colors duration-500 ${!notif.isRead ? 'text-slate-900 dark:text-white font-black' : 'text-slate-500 dark:text-slate-400 font-bold'}`}>
                            {notif.content.split('"').map((part, i) => (
                              i % 2 === 1 ? <span key={i} className="text-[#0A66C2] dark:text-blue-400 font-black italic">"{part}"</span> : part
                            ))}
                         </p>
                         <div className="flex items-center gap-3">
                           <span className="text-[11px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.2em] flex items-center gap-2 leading-none italic opacity-80">
                              {timeAgo(notif.createdAt)}
                              <span className="w-1.5 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full" />
                              {notif.type.replace('_', ' ')}
                           </span>
                           {isRecent && !notif.isRead && (
                             <span className="h-5 px-2 flex items-center rounded-lg bg-[#0A66C2]/10 dark:bg-blue-400/10 text-[#0A66C2] dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100 dark:border-blue-900">Priority</span>
                           )}
                         </div>
                      </div>
                      
                      <button 
                        onClick={(e) => e.stopPropagation()}
                        className="p-3 rounded-2xl text-slate-300 dark:text-slate-700 hover:text-slate-500 dark:hover:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all opacity-0 group-hover:opacity-100 active:scale-90"
                        aria-label="More options"
                        title="Options"
                      >
                         <MoreVertical className="h-6 w-6" />
                      </button>
                   </div>

                   {notif.type === 'CONNECTION_REQUEST' && !notif.isRead && (
                     <div className="flex items-center gap-4 mt-6 animate-in slide-in-from-top-2 duration-700">
                        <button className="h-11 px-8 rounded-xl bg-[#0A66C2] dark:bg-blue-600 text-white font-black text-[12px] uppercase tracking-widest hover:bg-[#004182] dark:hover:bg-blue-500 transition-all active:scale-95 shadow-xl shadow-blue-900/20">Accept Request</button>
                        <button className="h-11 px-8 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-black text-[12px] uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95">Ignore Protocol</button>
                     </div>
                   )}

                   {notif.type === 'JOB_ALERT' && (
                     <div className="mt-6 flex items-center gap-4 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 group-hover:border-[#0A66C2]/30 dark:group-hover:border-blue-400/30 group-hover:bg-blue-50/30 dark:group-hover:bg-blue-900/10 transition-all duration-500 shadow-sm">
                        <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                           <Briefcase className="w-6 h-6 text-rose-500 dark:text-rose-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <span className="text-[11px] font-black text-slate-800 dark:text-white uppercase tracking-[0.2em] block leading-none">Job Opportunity</span>
                           <span className="text-[13px] font-bold text-slate-500 dark:text-slate-400 truncate block mt-2 italic opacity-80">Review matches and apply instantly</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-[#0A66C2] dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                     </div>
                   )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {!loading && notifications.length > 5 && (
        <button className="w-full py-16 text-[11px] font-black text-slate-400 dark:text-slate-500 hover:text-[#0A66C2] dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all border-t border-slate-50 dark:border-slate-800 uppercase tracking-[0.5em] bg-slate-50/10 dark:bg-slate-900/50 backdrop-blur-md">
           Retrieve Operational History
        </button>
      )}
    </div>
  );
}
