"use client";

import { useState } from "react";
import { Calendar, MapPin, Users as UsersIcon, Globe, Ticket, Clock, Share2, MoreHorizontal, Bookmark, CheckCircle2 } from "lucide-react";

interface EventCardProps {
  item: {
    id: string;
    organizer: string;
    organizerLogo: string;
    title: string;
    image: string;
    date: string;
    eventTime: string;
    location: string;
    isOnline?: boolean;
    attendees: number;
    category: string;
    price: string;
    isFree?: boolean;
    description: string;
    tags?: string[];
  };
}

export function EventCard({ item }: EventCardProps) {
  const [isGoing, setIsGoing] = useState(false);

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden mb-8 group/event hover:border-primary/30 transition-all duration-700 animate-in fade-in slide-in-from-bottom-6">
      
      {/* Visual Header */}
      <div className="relative h-48 md:h-60 overflow-hidden group/banner">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover/banner:scale-105 transition-transform duration-2000" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
        
        <div className="absolute top-6 left-6 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md p-1 border border-white/20 shadow-2xl group-hover/event:rotate-6 transition-transform">
            <img src={item.organizerLogo} alt={item.organizer} className="w-full h-full object-cover rounded-xl" />
          </div>
          <div className="px-5 py-2 rounded-full bg-slate-900/40 backdrop-blur-md border border-white/10 text-white text-[11px] font-black uppercase tracking-widest leading-none">
             Hosted by {item.organizer}
          </div>
        </div>

        <div className="absolute bottom-6 right-6">
           <span className="px-5 py-2.5 rounded-full bg-accent text-slate-900 text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-accent/20">
              {item.isFree ? "Complimentary Access" : item.price}
           </span>
        </div>
      </div>

      <div className="p-8 pb-10">
         <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter leading-none group-hover/event:text-primary transition-colors italic">
               {item.title}
            </h2>
            <div className="flex gap-2">
               <button className="p-3 rounded-2xl hover:bg-slate-50 text-slate-400 hover:text-primary transition-all active:scale-90">
                  <Bookmark className="w-5 h-5" />
               </button>
               <button className="p-3 rounded-2xl hover:bg-slate-50 text-slate-400 hover:text-primary transition-all active:scale-90">
                  <Share2 className="w-5 h-5" />
               </button>
            </div>
         </div>

         {/* Event Details Plate */}
         <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-10 bg-slate-50/50 rounded-2xl p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 group/detail">
               <div className="p-2.5 rounded-xl bg-orange-100 text-orange-600 group-hover/detail:scale-110 transition-transform">
                  <Calendar className="w-4 h-4" />
               </div>
               <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">Date</p>
                  <p className="text-[13px] font-black text-slate-800 leading-none">{item.date}</p>
               </div>
            </div>

            <div className="flex items-center gap-4 group/detail">
               <div className="p-2.5 rounded-xl bg-blue-100 text-blue-600 group-hover/detail:scale-110 transition-transform">
                  <Clock className="w-4 h-4" />
               </div>
               <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">Time</p>
                  <p className="text-[13px] font-black text-slate-800 leading-none">{item.eventTime}</p>
               </div>
            </div>

            <div className="flex items-center gap-4 group/detail">
               <div className="p-2.5 rounded-xl bg-green-100 text-green-600 group-hover/detail:scale-110 transition-transform">
                  {item.isOnline ? <Globe className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
               </div>
               <div className="min-w-0">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">Location</p>
                  <p className="text-[13px] font-black text-slate-800 truncate leading-none">{item.location}</p>
               </div>
            </div>

            <div className="flex items-center gap-4 group/detail">
               <div className="p-2.5 rounded-xl bg-purple-100 text-purple-600 group-hover/detail:scale-110 transition-transform">
                  <UsersIcon className="w-4 h-4" />
               </div>
               <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">Network</p>
                  <p className="text-[11px] font-black text-slate-800 leading-none">{item.attendees.toLocaleString()}+ Linked</p>
               </div>
            </div>
         </div>

         <div className="mb-10 text-[15px] text-slate-500 leading-relaxed max-w-[90%] font-medium italic opacity-80 line-clamp-2 hover:line-clamp-none transition-all cursor-help border-l-4 border-slate-100 pl-6">
            "{item.description}"
         </div>

         <div className="flex gap-4">
            <button 
              onClick={() => setIsGoing(!isGoing)}
              className={`flex-1 py-4 rounded-full font-black text-[12px] uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 ${isGoing ? 'bg-green-500 text-white shadow-green-900/20' : 'bg-slate-900 text-white shadow-slate-900/20 hover:bg-black'}`}
            >
               {isGoing ? <><CheckCircle2 className="w-5 h-5" /> Confirmed Slot</> : <><Ticket className="w-5 h-5 text-accent" /> Join Elite Summit</>}
            </button>
         </div>
      </div>
    </div>
  );
}
