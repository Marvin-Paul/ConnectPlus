"use client";

import { MoreHorizontal, Bell, Briefcase, ThumbsUp, UserPlus, Star, MessageSquare, Calendar, Users } from "lucide-react";
import { useState } from "react";

const initialNotifications = [
  {
    id: "n1",
    type: "reaction",
    message: "David Walusimbi and 14 others reacted to your update: 'Excited to share that I've been promoted...'",
    time: "2h",
    icon: ThumbsUp,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    isUnread: true
  },
  {
    id: "n2",
    type: "job",
    message: "New job recommendations based on your profile: 'Lead Backend Engineer at SafeBoda' and 3 more similar roles.",
    time: "5h",
    icon: Briefcase,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    avatar: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=128&h=128",
    isUnread: true
  },
  {
    id: "n5",
    type: "mention",
    message: "Sarah Namayanja mentioned you in a comment: 'Great insights! @Marvin Muwereza, what do you think about...'",
    time: "6h",
    icon: MessageSquare,
    iconBg: "bg-pink-50",
    iconColor: "text-pink-600",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    isUnread: true
  },
  {
    id: "n3",
    type: "connection",
    message: "Isaac K. accepted your invitation to connect. Say hello and start a conversation!",
    time: "8h",
    icon: UserPlus,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    isUnread: false
  },
  {
    id: "n6",
    type: "view",
    message: "12 people viewed your profile today. unlock Premium to see who they are and how they found you.",
    time: "10h",
    icon: Star,
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-600",
    avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    isUnread: true
  },
  {
    id: "n4",
    type: "event",
    message: "Upcoming event: 'Uganda Tech Summit 2026' starts tomorrow. Don't forget to join the livestream!",
    time: "Yesterday",
    icon: Calendar,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    avatar: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=128&h=128",
    isUnread: false
  },
  {
    id: "n7",
    type: "endorsement",
    message: "Michael Okello endorsed you for 'Cloud Infrastructure' and 2 other skills.",
    time: "Yesterday",
    icon: ThumbsUp,
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-600",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    isUnread: false
  },
  {
    id: "n8",
    type: "newsletter",
    message: "The 'Weekly Tech Digest' newsletter from Connect+ Learning is now available.",
    time: "2 days ago",
    icon: Bell,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    avatar: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=128&h=128",
    isUnread: false
  },
  {
    id: "n9",
    type: "mention",
    message: "4 people in 'East Africa Tech Hub' mentioned you in the discussion: 'Who's attending the Kampala AWS meetup...'",
    time: "3 days ago",
    icon: Users,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    avatar: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=128&h=128",
    isUnread: false
  },
  {
    id: "n10",
    type: "job",
    message: "Your application for 'Senior AI Engineer' at Flutterwave was viewed by the hiring manager.",
    time: "4 days ago",
    icon: Briefcase,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    avatar: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&q=80&w=128&h=128",
    isUnread: false
  }
];

export function NotificationFeed() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isUnread: false })));
  };

  return (
    <div className="bg-white rounded-xl border border-[#e0e0e0] overflow-hidden shadow-sm">
      <div className="flex items-center justify-between p-4 border-b border-[#e0e0e0] bg-slate-50/20">
         <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Your Notifications</h2>
         <button 
           onClick={markAllRead}
           className="text-[11px] font-black text-[#0a66c2] hover:underline uppercase tracking-widest"
         >
           Mark all as read
         </button>
      </div>

      <div className="flex flex-col divide-y divide-[#f3f3f3]">
        {notifications.map((notif) => (
          <div 
            key={notif.id} 
            className={`p-6 flex gap-4 transition-all duration-300 cursor-pointer group relative ${notif.isUnread ? 'bg-blue-50/30' : 'hover:bg-[#f9fafb]'}`}
          >
            {notif.isUnread && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0a66c2]" />}
            
            <div className="shrink-0 relative">
               <img src={notif.avatar} className="w-14 h-14 rounded-full border-2 border-white shadow-md object-cover group-hover:scale-105 transition-transform" alt="" />
               <div className={`absolute -bottom-1 -right-1 w-7 h-7 ${notif.iconBg} rounded-full grid place-items-center shadow-lg border-2 border-white ${notif.iconColor}`}>
                  <notif.icon className="h-3.5 w-3.5" />
               </div>
            </div>
            
            <div className="flex-1 min-w-0">
               <p className={`text-[14px] leading-relaxed transition-colors ${notif.isUnread ? 'font-bold text-slate-900' : 'text-slate-600 font-medium'}`}>
                  {notif.message}
               </p>
               <div className="flex items-center gap-3 mt-2">
                  <span className="text-[11px] font-black text-[#666666] uppercase tracking-widest opacity-60">
                    {notif.time}
                  </span>
                  {notif.isUnread && (
                    <span className="w-1.5 h-1.5 bg-[#0a66c2] rounded-full" />
                  )}
               </div>
            </div>
            
            <button className="self-start p-2 rounded-full hover:bg-slate-200 transition-colors opacity-0 group-hover:opacity-100 flex items-center justify-center">
               <MoreHorizontal className="h-5 w-5 text-[#666666]" />
            </button>
          </div>
        ))}
      </div>

      <button className="w-full py-4 text-xs font-black text-[#666666] hover:bg-slate-50 transition-colors border-t border-[#e0e0e0] uppercase tracking-widest">
         View all history
      </button>
    </div>
  );
}
