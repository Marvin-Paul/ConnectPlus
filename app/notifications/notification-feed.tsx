"use client";

import { MoreVertical, Bell, Briefcase, ThumbsUp, UserPlus, Star, MessageSquare, Calendar, Users, ChevronRight } from "lucide-react";
import { useState } from "react";

const initialNotifications = [
  {
    id: "n1",
    type: "job",
    actor: "JobsToApply.com",
    action: "posted a new opportunity: Global Shield is looking for a Communications Manager.",
    time: "24m",
    icon: Briefcase,
    iconBg: "bg-[#F8FAFC]",
    iconColor: "text-[#475569]",
    isUnread: true
  },
  {
    id: "n2",
    type: "suggestion",
    actor: "Career Insights",
    action: "has a recommendation based on your profile: Why a tech degree isn't the only path to software engineering success.",
    time: "1h",
    reactionsInfo: "43 professionals reacted • 8 comments",
    icon: Star,
    iconBg: "bg-[#F0F9FF]",
    iconColor: "text-[#0369A1]",
    isUnread: true
  },
  {
    id: "n3",
    type: "connection",
    actor: "Oyago Isaac",
    action: "is a Marketing and Sales Officer you might know. Expand your professional network.",
    time: "11h",
    icon: UserPlus,
    iconBg: "bg-[#F5F3FF]",
    iconColor: "text-[#6D28D9]",
    isUnread: true
  },
  {
    id: "n4",
    type: "recommendation",
    actor: "Professional Update",
    action: "New roles at Meevolsoft Limited and 9 other companies matched your preferences.",
    time: "14h",
    icon: Briefcase,
    iconBg: "bg-[#F0FDF4]",
    iconColor: "text-[#15803D]",
    isUnread: false
  },
  {
    id: "n5",
    type: "alert",
    actor: "Search Alert",
    action: "4 new 'Analyst' opportunities were found in Uganda matching your search history.",
    time: "15h",
    icon: Bell,
    iconBg: "bg-[#FFF1F2]",
    iconColor: "text-[#BE123C]",
    isUnread: false
  }
];

interface NotificationFeedProps {
  activeFilter: string;
}

export function NotificationFeed({ activeFilter }: NotificationFeedProps) {
  const [notifications, setNotifications] = useState(initialNotifications);

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Jobs") return n.type === "job" || n.type === "recommendation" || n.type === "alert";
    if (activeFilter === "My posts") return n.type === "suggestion"; // In real app, links to specific post mentions
    if (activeFilter === "Mentions") return n.type === "connection"; // In real app, filter by mention type
    return true;
  });

  const toggleReadStatus = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, isUnread: false } : n
    ));
  };

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {filteredNotifications.map((notif) => (
        <div 
          key={notif.id} 
          onClick={() => toggleReadStatus(notif.id)}
          className={`px-4 md:px-6 py-4 flex items-start justify-between gap-3 transition-all duration-300 border-b border-slate-100 last:border-0 relative cursor-pointer active:bg-slate-100 ${notif.isUnread ? 'bg-[#F1F7FE]' : 'bg-white hover:bg-slate-50'}`}
        >
          {/* Subtle Unread Indicator Bar */}
          {notif.isUnread && (
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#0A66C2] animate-in fade-in slide-in-from-left-1 duration-500" />
          )}

          <div className="flex items-start gap-3 flex-1 min-w-0">
             {/* Profile/Icon Frame */}
             <div className={`w-12 h-12 rounded-full ${notif.iconBg} flex items-center justify-center shrink-0 border border-slate-100/50 transition-transform duration-300 group-hover:scale-105`}>
                <notif.icon className={`h-5 w-5 ${notif.iconColor}`} />
             </div>
             
             <div className="flex-1 min-w-0">
                <div className="flex flex-col">
                   <p className={`text-[14px] leading-snug transition-colors duration-300 ${notif.isUnread ? 'text-[#1E293B]' : 'text-[#475569]'}`}>
                      <span className="font-semibold text-[#0F172A]">{notif.actor}</span> {notif.action}
                   </p>
                   
                   {notif.reactionsInfo && (
                     <p className="text-[12px] text-slate-500 mt-1 font-medium italic opacity-80">{notif.reactionsInfo}</p>
                   )}
                </div>

                {/* Refined Action Button - Prevent event bubbling to parent click */}
                {notif.type === 'job' && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); console.log('Job viewed'); }}
                    className="mt-2.5 px-4 py-1.5 rounded-full border border-[#0A66C2] text-[#0A66C2] font-semibold text-[13px] hover:bg-[#EBF4FF] transition-colors shadow-sm active:scale-95"
                  >
                    View Jobs
                  </button>
                )}
             </div>
          </div>
          
          <div className="flex flex-col items-end shrink-0 gap-1 mt-0.5" onClick={(e) => e.stopPropagation()}>
             <span className="text-[11px] text-slate-400 font-medium">
               {notif.time}
             </span>
             <button className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors md:opacity-0 md:group-hover:opacity-100">
                <MoreVertical className="h-4 w-4" />
             </button>
          </div>
        </div>
      ))}
      
      <button className="w-full py-10 text-[12px] font-black text-slate-400 hover:text-[#1B5E20] hover:bg-slate-50 transition-all border-t border-slate-50 uppercase tracking-[0.3em] bg-[#F3F6F8]/30">
         See all notification history
      </button>
    </div>
  );
}
