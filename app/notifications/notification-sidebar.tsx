"use client";

import { Bell, Settings, Briefcase, PlusCircle, CheckCircle2, ChevronRight, MessageSquare, AtSign, Rss } from "lucide-react";
import { useState } from "react";

export function NotificationSidebar() {
  const [active, setActive] = useState("All");

  return (
    <div className="space-y-6">
      {/* MANAGE CARD */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden animate-in slide-in-from-left-4 duration-500">
        <div className="p-8 pb-4 border-b border-slate-50">
           <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Manage</h3>
        </div>
        
        <div className="flex flex-col">
           {[
             { label: "All", count: 17, icon: Bell },
             { label: "My Posts", count: 2, icon: Rss },
             { label: "Mentions", count: 1, icon: AtSign }
           ].map((item) => (
             <button 
               key={item.label}
               onClick={() => setActive(item.label)}
               className={`w-full p-8 flex items-center justify-between group transition-all relative ${active === item.label ? 'bg-slate-50/50' : 'hover:bg-slate-50'}`}
             >
                {active === item.label && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600" />}
                <div className="flex items-center gap-4">
                   <item.icon className={`w-5 h-5 ${active === item.label ? 'text-blue-600' : 'text-slate-400'}`} />
                   <span className={`text-base font-black ${active === item.label ? 'text-slate-800' : 'text-slate-500'}`}>{item.label}</span>
                </div>
                <span className={`text-xs font-black ${active === item.label ? 'text-blue-600' : 'text-slate-300'}`}>{item.count}</span>
             </button>
           ))}
        </div>
        
        <div className="p-8 border-t border-slate-50 group cursor-pointer hover:bg-slate-50 transition-all">
           <div className="flex items-start gap-4">
              <Settings className="w-6 h-6 text-slate-400 group-hover:rotate-90 transition-transform duration-500" />
              <div>
                 <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Notification Settings</h4>
                 <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest italic opacity-70">Control your preferences</p>
              </div>
           </div>
        </div>
      </div>

      {/* CONNECT+ PROFESSIONAL Card */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl p-10 text-center space-y-6 animate-in slide-in-from-left-6 duration-700">
         <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">Connect+ Professional</h4>
         <p className="text-[13px] font-black text-slate-700 leading-relaxed italic px-2">
            "Get notified about new jobs before others."
         </p>
         <button className="w-full py-4 rounded-full border-2 border-blue-100 text-blue-600 font-black text-[11px] uppercase tracking-[0.2em] hover:bg-blue-50 transition-all active:scale-95 shadow-lg shadow-blue-50">
            Set Alert
         </button>
      </div>
    </div>
  );
}
