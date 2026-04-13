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
      <div className="bg-white rounded-xl border border-border p-6 shadow-soft relative overflow-hidden transition-all duration-300 hover:shadow-premium animate-pro-fade">
        <div className="flex items-center gap-4 relative z-10">
          <div className="shrink-0">
             <div className="w-12 h-12 rounded-lg overflow-hidden border border-border shadow-sm transform transition-hover hover:scale-105 active:scale-95 cursor-pointer bg-muted">
                <img src={user.avatar} alt="Me" className="w-full h-full object-cover" />
             </div>
          </div>
          
          <div className="flex-1">
             <button 
               onClick={() => setIsModalOpen(true)}
               className="w-full h-12 rounded-lg border border-border px-6 text-left bg-muted hover:bg-slate-200/50 hover:border-slate-300 transition-all text-secondary font-bold text-[14px]"
             >
                Share an editorial insight...
             </button>
          </div>
        </div>

        <div className="flex md:items-center justify-between mt-6 relative z-10 pt-4 border-t border-border/50">
           <div className="flex flex-wrap gap-2 md:gap-6">
              {[
                { label: "Photo", icon: Camera, color: "text-blue-500" },
                { label: "Video", icon: Video, color: "text-green-600" },
                { label: "Event", icon: Calendar, color: "text-accent" },
                { label: "Article", icon: Newspaper, color: "text-orange-600" }
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-muted transition-all group/item active:scale-95"
                >
                   <item.icon className={`h-5 w-5 stroke-[2px] ${item.color} group-hover/item:scale-110 transition-transform`} />
                   <span className="text-[14px] font-extrabold text-secondary group-hover:text-foreground transition-colors">{item.label}</span>
                </button>
              ))}
           </div>
           
           <button 
             onClick={() => setIsModalOpen(true)}
             className="hidden lg:flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-white font-bold text-[13px] uppercase tracking-wider hover:bg-primary/90 transition-all shadow-premium active:scale-95"
           >
              Post <Sparkles className="w-4 h-4" />
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
