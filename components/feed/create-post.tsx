"use client";

import { useState } from "react";
import { Calendar, Sparkles, Camera, Video, Newspaper } from "lucide-react";
import { PostModal } from "./post-modal";
import { useUser } from "../providers/user-provider";

export function CreatePost() {
  const { user: contextUser, loading } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) return null;

  const user = {
    avatar: contextUser?.avatarUrl || "https://api.dicebear.com/7.x/initials/svg?seed=U",
    name: contextUser ? `${contextUser.firstName} ${contextUser.lastName}` : "Professional User"
  };

  return (
    <>
      {/* 16px border-radius and soft shadow logic as per premium spec */}
      <div id="engagement-node" className="bg-white rounded-[16px] border border-[#E5E7EB] p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)] relative overflow-hidden transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="shrink-0">
             <div className="w-12 h-12 rounded-full overflow-hidden border border-[#E5E7EB] shadow-sm transform transition-hover hover:scale-105 active:scale-95 cursor-pointer">
                <img src={user.avatar} alt="Me" className="w-full h-full object-cover" />
             </div>
          </div>
          
          <div className="flex-1">
             <button 
               onClick={() => setIsModalOpen(true)}
               className="w-full h-12 rounded-full border border-[#E5E7EB] px-6 text-left bg-[#F3F6F8] hover:bg-[#E5E7EB] hover:border-[#D1D5DB] transition-all text-[#6B7280] text-[15px] font-bold"
             >
                Start a post...
             </button>
          </div>
        </div>

        {/* 8px spacing for actions dock */}
        <div className="flex md:items-center justify-between mt-5 relative z-10 pt-2">
           <div className="flex flex-wrap gap-2 md:gap-4 lg:gap-8">
              {[
                { label: "Photo", icon: Camera, color: "text-[#378FE9]" },
                { label: "Video", icon: Video, color: "text-[#5F9B41]" },
                { label: "Event", icon: Calendar, color: "text-[#C37D16]" },
                { label: "Write article", icon: Newspaper, color: "text-[#E16745]" }
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-[8px] hover:bg-[#F3F6F8] transition-all group/item active:scale-95"
                >
                   <item.icon className={`h-6 w-6 stroke-[1.5px] ${item.color} group-hover/item:scale-110 transition-transform`} />
                   <span className="text-[14px] font-bold text-[#6B7280] group-hover/item:text-[#1F2937] transition-colors">{item.label}</span>
                </button>
              ))}
           </div>
           
           <button 
             onClick={() => setIsModalOpen(true)}
             className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-[8px] bg-[#0A66C2]/10 text-[#0A66C2] font-black text-[13px] uppercase tracking-widest hover:bg-[#0A66C2]/20 transition-all shadow-sm active:scale-95"
           >
              Draft with AI <Sparkles className="w-4 h-4" />
           </button>
        </div>

        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#0A66C2]/5 rounded-full blur-[60px] -z-0 pointer-events-none" />
      </div>

      <PostModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        user={user}
      />
    </>
  );
}
