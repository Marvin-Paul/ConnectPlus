"use client";

import { MoreHorizontal, Bell, Briefcase, ThumbsUp, UserPlus, Star, MessageSquare, Calendar, Users, ChevronRight } from "lucide-react";
import { useState } from "react";

const initialNotifications = [
  {
    id: "n1",
    type: "reaction",
    message: "David Walusimbi and 14 others reacted to your update.",
    time: "2H",
    icon: ThumbsUp,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    isUnread: true
  },
  {
    id: "n2",
    type: "job",
    message: "Lead Backend Engineer role at SafeBoda matches your profile.",
    time: "5H",
    icon: Briefcase,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    isUnread: true
  },
  {
    id: "n5",
    type: "mention",
    message: "Sarah Namayanja mentioned you in a comment.",
    time: "6H",
    icon: MessageSquare,
    iconBg: "bg-pink-50",
    iconColor: "text-pink-500",
    isUnread: true
  },
  {
    id: "n6",
    type: "view",
    message: "12 people viewed your profile today. unlock Premium.",
    time: "10H",
    icon: Star,
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-500",
    isUnread: true
  },
  {
    id: "n3",
    type: "connection",
    message: "Isaac K. accepted your invitation to connect.",
    time: "1D",
    icon: UserPlus,
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
    isUnread: false
  },
  {
    id: "n4",
    type: "event",
    message: "Upcoming event: 'Uganda Tech Summit 2026' starts tomorrow.",
    time: "1D",
    icon: Calendar,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
    isUnread: false
  }
];

export function NotificationFeed() {
  const [notifications, setNotifications] = useState(initialNotifications);

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {notifications.map((notif) => (
        <div 
          key={notif.id} 
          className={`p-10 flex items-center justify-between gap-8 transition-all duration-500 cursor-pointer group relative border-b border-slate-50 last:border-0 ${notif.isUnread ? 'bg-white' : 'bg-slate-50/20'}`}
        >
          <div className="flex items-center gap-8 flex-1 min-w-0">
             <div className={`w-20 h-20 rounded-full ${notif.iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-sm border-2 border-white`}>
                <notif.icon className={`h-10 w-10 ${notif.iconColor}`} />
             </div>
             
             <div className="flex-1 min-w-0">
                <p className={`text-[19px] leading-[1.3] transition-colors tracking-tight ${notif.isUnread ? 'font-black text-slate-800' : 'text-slate-500 font-bold'}`}>
                   {notif.message}
                </p>
                <p className="text-[13px] font-black text-slate-400 mt-2 italic">
                  {notif.time}
                </p>
             </div>
          </div>
          
          <div className="flex items-center gap-10 shrink-0">
             {notif.isUnread && (
               <div className="w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] border-2 border-white" />
             )}
             <button className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-all border border-slate-100 active:scale-90">
                <MoreHorizontal className="h-7 w-7 text-slate-400" />
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
