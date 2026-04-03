"use client";

import { useState } from "react";
import { X, Image, FileText, Calendar, Smile, Globe, Users, Briefcase, PlaySquare, Settings, Sparkles, PlusSquare } from "lucide-react";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    avatar: string;
    name: string;
  };
}

export function PostModal({ isOpen, onClose, user }: PostModalProps) {
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState<"anyone" | "connections">("anyone");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full h-full md:h-auto md:max-w-[600px] md:rounded-[2rem] shadow-2xl flex flex-col md:max-h-[90vh] overflow-hidden">
        
        {/* Modern Header */}
        <div className="px-5 pt-4 pb-2 flex items-center justify-between border-b border-slate-50">
           <div className="flex items-center gap-4">
              <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-slate-50 text-slate-600 transition-all">
                <X className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-3">
                 <img src={user.avatar} className="w-10 h-10 rounded-full border-2 border-slate-50" alt="" />
                 <button 
                   onClick={() => setVisibility(visibility === "anyone" ? "connections" : "anyone")}
                   className="flex items-center gap-1.5 text-[14px] font-semibold text-slate-700 hover:bg-slate-50 px-2 py-0.5 rounded-lg transition-all"
                 >
                    {visibility === "anyone" ? "Anyone" : "Connections"}
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                 </button>
              </div>
           </div>
           
           <div className="flex items-center gap-3">
              <button className="p-2 rounded-full hover:bg-slate-50 text-slate-500">
                 <Calendar className="w-6 h-6" />
              </button>
              <button 
                disabled={!content.trim()}
                className={`px-6 py-1.5 rounded-full font-bold text-[14px] transition-all ${content.trim() ? "bg-[#0A66C2] text-white shadow-md active:scale-95" : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}
              >
                 Post
              </button>
           </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 px-5 py-6 overflow-y-auto">
           <textarea 
             className="w-full h-full min-h-[300px] text-[18px] font-medium text-slate-800 placeholder:text-slate-400 border-none outline-none resize-none bg-transparent"
             placeholder="Share your thoughts..."
             value={content}
             onChange={(e) => setContent(e.target.value)}
             autoFocus
           />
        </div>

        {/* Action Toolbar (Bottom Sticky) */}
        <div className="px-5 py-4 border-t border-slate-100 bg-white safe-area-bottom">
           <div className="flex items-center justify-between">
              <button 
                onClick={async () => {
                  if (!content.trim()) return;
                  const res = await fetch("/api/generate/tone", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text: content, targetTone: "professional" }),
                  });
                  if (res.ok) {
                    const data = await res.json();
                    setContent(data.optimizedText);
                  }
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-200 text-slate-700 text-[14px] font-semibold hover:bg-slate-50 transition-all active:scale-95 shadow-sm group"
              >
                 <Sparkles className="w-4 h-4 text-orange-500 group-hover:rotate-12 transition-transform" />
                 Rewrite with AI
              </button>

              <div className="flex items-center gap-4">
                 <button className="p-2.5 rounded-xl hover:bg-slate-50 text-slate-500 transition-all">
                    <Image className="w-6 h-6" />
                 </button>
                 <button className="p-2.5 rounded-xl hover:bg-slate-50 text-slate-500 transition-all">
                    <PlusSquare className="w-6 h-6" />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
