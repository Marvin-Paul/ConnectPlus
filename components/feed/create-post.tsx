"use client";

import { useState } from "react";
import { Image, Calendar, Layout, Plus, Sparkles, Smile, PlaySquare, FileText, Briefcase, Camera, Video, Newspaper, ChevronRight } from "lucide-react";
import Link from "next/link";
import { PostModal } from "./post-modal";

export function CreatePost() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = {
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    name: "Marvin Muwereza"
  };

  return (
    <>
      <div className="bg-white rounded-[4rem] border border-slate-100 p-12 shadow-[0_50px_100px_rgba(0,0,0,0.06)] relative overflow-hidden group/main animate-in fade-in zoom-in-95 duration-1000">
        
        {/* UPPER CONSOLE: AVATAR & INPUT */}
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="relative shrink-0">
             <div className="w-24 h-24 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl group-hover/main:rotate-6 transition-transform duration-700">
                <img src={user.avatar} alt="Me" className="w-full h-full object-cover" />
             </div>
             <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
             </div>
          </div>
          
          <div className="flex-1 w-full flex flex-col gap-4">
            <div className="relative group/input">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full h-24 rounded-[2.5rem] border border-slate-100 px-12 text-left bg-slate-50/30 hover:bg-white hover:border-[#1B5E20]/20 transition-all duration-500 shadow-inner group-hover/main:shadow-2xl flex flex-col justify-center gap-1 group-hover/input:pl-16"
              >
                <span className="text-[11px] font-black text-[#1B5E20] uppercase tracking-[0.4em] italic opacity-60 group-hover/input:opacity-100 transition-all">Elite Engagement Node</span>
              </button>
              
              <Plus className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-200 opacity-0 group-hover/input:opacity-100 transition-all duration-500" />
            </div>
            
            <div className="flex justify-end px-2">
               {/* AI ASSIST PILOT - RELOCATED BELOW INPUT */}
               <button className="h-12 px-8 rounded-2xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-yellow-400" /> AI PILOT
               </button>
            </div>
          </div>
        </div>

        {/* UTILITY RACK */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-12 relative z-10 border-t border-slate-50 pt-12">
           {[
             { label: "Visual Media", icon: Camera, color: "text-blue-600", bg: "bg-blue-50/30", sub: "Photo & Video" },
             { label: "Elite Event", icon: Calendar, color: "text-orange-600", bg: "bg-orange-50/30", sub: "Regional Networking" },
             { label: "Article Node", icon: Newspaper, color: "text-red-600", bg: "bg-red-50/30", sub: "Deep Industry Tech" },
             { label: "Talent Brief", icon: Briefcase, color: "text-purple-600", bg: "bg-purple-50/30", sub: "Hire & Deploy" }
           ].map((item, i) => (
             <div
               key={i}
               className="group/item cursor-pointer p-8 rounded-[3rem] bg-white border border-slate-50 hover:border-slate-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
               onClick={() => { if(item.label === "Visual Media") setIsModalOpen(true); }}
             >
                <div className={`w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center mb-6 group-hover/item:rotate-12 transition-transform`}>
                   <item.icon className={`h-8 w-8 ${item.color}`} />
                </div>
                <div className="space-y-1">
                   <h4 className="text-[12px] font-black text-slate-800 uppercase tracking-widest italic">{item.label}</h4>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-60 leading-none">{item.sub}</p>
                </div>
             </div>
           ))}
        </div>

        {/* Global Aura backdrops */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-600/5 rounded-full blur-[120px] -z-10" />
      </div>

      <PostModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        user={user}
      />
    </>
  );
}
