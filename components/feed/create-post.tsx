"use client";

import { useState } from "react";
import { Image, Calendar, Layout, Plus, Sparkles, Smile, PlaySquare, FileText, Briefcase, Camera, Video, Newspaper, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { PostModal } from "./post-modal";
import { useUser } from "../providers/user-provider";

export function CreatePost() {
  const { user: contextUser, loading } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) return null;

  const user = {
    avatar: contextUser?.avatarUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    name: contextUser ? `${contextUser.firstName} ${contextUser.lastName}` : "Marvin Muwereza"
  };

  return (
    <>
      <div id="engagement-node" className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 shadow-sm relative overflow-hidden group/main animate-in fade-in slide-in-from-top-2 duration-500">
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="shrink-0">
             <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-100 shadow-sm">
                <img src={user.avatar} alt="Me" className="w-full h-full object-cover" />
             </div>
          </div>
          
          <div className="flex-1">
             <button 
               onClick={() => setIsModalOpen(true)}
               className="w-full h-12 rounded-full border border-slate-200 px-6 text-left bg-slate-50 hover:bg-slate-100 hover:border-slate-300 transition-all text-slate-500 text-[14px] font-medium"
             >
                Start a post...
             </button>
          </div>
        </div>

        <div className="flex md:items-center justify-between mt-4 relative z-10 border-t border-slate-100 pt-4">
           <div className="flex flex-wrap gap-2 md:gap-6">
              {[
                { label: "Photo", icon: Camera, color: "text-[#378FE9]" },
                { label: "Video", icon: Video, color: "text-[#5F9B41]" },
                { label: "Event", icon: Calendar, color: "text-[#C37D16]" },
                { label: "Write article", icon: Newspaper, color: "text-[#E16745]" }
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors group/item"
                >
                   <item.icon className={`h-5 w-5 ${item.color}`} />
                   <span className="text-[14px] font-semibold text-slate-600">{item.label}</span>
                </button>
              ))}
           </div>
           
           <button 
             onClick={() => setIsModalOpen(true)}
             className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-[#0A66C2] font-bold text-[13px] hover:bg-blue-100 transition-all"
           >
              Draft with AI <Sparkles className="w-3.5 h-3.5" />
           </button>
        </div>


      </div>

      <PostModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        user={user}
      />
    </>
  );
}
