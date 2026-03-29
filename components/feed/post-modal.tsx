"use client";

import { useState } from "react";
import { X, Image, FileText, Calendar, Smile, Globe, Users, Briefcase, PlaySquare, Settings, Sparkles } from "lucide-react";

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
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-[600px] rounded-[2.5rem] shadow-[0_30px_90px_-15px_rgba(0,0,0,0.3)] overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-8 pt-8 pb-4 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <img src={user.avatar} className="w-12 h-12 rounded-full border-2 border-slate-50 shadow-sm" alt="" />
              <div>
                 <h3 className="text-base font-black text-slate-800 tracking-tight leading-none">{user.name}</h3>
                 <button 
                   onClick={() => setVisibility(visibility === "anyone" ? "connections" : "anyone")}
                   className="mt-1.5 flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-colors"
                 >
                    {visibility === "anyone" ? <Globe className="w-3 h-3" /> : <Users className="w-3 h-3" />}
                    {visibility === "anyone" ? "Anyone" : "Connections only"}
                 </button>
              </div>
           </div>
           <button 
             onClick={onClose}
             className="p-3 rounded-full hover:bg-slate-50 text-slate-400 hover:text-red-500 transition-all"
           >
              <X className="w-5 h-5" />
           </button>
        </div>

         {/* Content Area */}
        <div className="flex-1 px-8 py-4 overflow-y-auto min-h-[200px]">
           <textarea 
             className="w-full h-full min-h-[180px] text-lg font-medium text-slate-800 placeholder:text-slate-300 border-none outline-none resize-none bg-transparent"
             placeholder="Speak your professional mind... What's on your link today?"
             value={content}
             onChange={(e) => setContent(e.target.value)}
             autoFocus
           />
           
           <div className="flex gap-2 mb-8">
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
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-[#0a66c2] text-[10px] font-black uppercase tracking-widest hover:bg-blue-100 transition-all active:scale-95"
              >
                 <Sparkles className="w-3.5 h-3.5" /> AI Draft Optimization
              </button>
           </div>
        </div>

        {/* Action Toolbar */}
        <div className="p-8 border-t border-slate-50 bg-slate-50/50">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                 {[
                   { icon: Image, color: "text-[#4CAF50]", label: "Photo" },
                   { icon: PlaySquare, color: "text-blue-500", label: "Video" },
                   { icon: FileText, color: "text-orange-500", label: "Document" },
                   { icon: Briefcase, color: "text-purple-500", label: "Job" },
                   { icon: Calendar, color: "text-yellow-500", label: "Event" }
                 ].map((item, idx) => (
                   <button 
                     key={idx}
                     className={`p-3 rounded-full hover:bg-white hover:shadow-sm transition-all group relative`}
                     title={item.label}
                   >
                      <item.icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`} />
                   </button>
                 ))}
                 <button className="p-3 rounded-full hover:bg-white text-slate-400">
                    <Smile className="w-5 h-5" />
                 </button>
              </div>

              <button 
                disabled={!content.trim()}
                className={`px-12 py-3 rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all ${content.trim() ? "bg-[#1B5E20] text-white shadow-xl shadow-green-900/20 hover:scale-105 active:scale-95" : "bg-slate-200 text-slate-400 cursor-not-allowed"}`}
              >
                 Post Link
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
