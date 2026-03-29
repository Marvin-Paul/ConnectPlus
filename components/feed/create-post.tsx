"use client";

import { useState } from "react";
import { Image, Calendar, Layout, Plus, Sparkles, Smile, PlaySquare, FileText, Briefcase } from "lucide-react";
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
      <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
        <div className="flex gap-6 items-center">
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-slate-50 shadow-md group-hover:scale-110 transition-transform duration-500">
            <img src={user.avatar} alt="Me" className="w-full h-full object-cover" />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex-1 h-14 rounded-full border border-slate-100 px-8 text-left text-sm font-black text-slate-400 hover:bg-slate-50 hover:border-slate-200 transition-all duration-300 shadow-sm"
          >
            What's on your professional mind? Start a post...
          </button>
        </div>

        <div className="flex items-center justify-between mt-8 px-2 border-t border-slate-50 pt-6">
          <div className="flex items-center gap-2">
             <button 
               onClick={() => setIsModalOpen(true)}
               className="flex items-center gap-2 px-6 py-2 rounded-full hover:bg-blue-50 transition-all group/btn"
             >
               <Image className="h-4 w-4 text-blue-500 group-hover/btn:scale-110 transition-transform" />
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover/btn:text-blue-600">Media</span>
             </button>

             <Link
               href="/events"
               className="flex items-center gap-2 px-6 py-2 rounded-full hover:bg-yellow-50 transition-all group/btn"
             >
               <Calendar className="h-4 w-4 text-yellow-500 group-hover/btn:scale-110 transition-transform" />
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover/btn:text-yellow-600">Event</span>
             </Link>

             <Link
               href="/articles/new"
               className="flex items-center gap-2 px-6 py-2 rounded-full hover:bg-red-50 transition-all group/btn"
             >
               <Layout className="h-4 w-4 text-red-500 group-hover/btn:scale-110 transition-transform" />
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover/btn:text-red-600">Article</span>
             </Link>
          </div>

          <button className="flex items-center gap-2 px-6 py-2 rounded-full bg-slate-100 text-[#1B5E20] font-black text-[10px] uppercase tracking-widest hover:bg-[#1B5E20]/5 transition-all">
             <Sparkles className="w-3.5 h-3.5" /> AI Assist
          </button>
        </div>

        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#1B5E20]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>

      <PostModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        user={user}
      />
    </>
  );
}
