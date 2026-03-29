"use client";

import { Info, ChevronDown, TrendingUp, Sparkles, MapPin, ExternalLink, ShieldCheck } from "lucide-react";
import Link from "next/link";

const newsItems = [
  { id: "n1", title: "Tech layoffs in 2024: What's next?", time: "2d ago", readers: "45,210 readers" },
  { id: "n2", title: "Why remote work is here to stay in Uganda", time: "1d ago", readers: "12,104 readers" },
  { id: "n3", title: "The rise of AI in financial services", time: "5h ago", readers: "8,432 readers" },
  { id: "n4", title: "MTN Uganda announces multi-billion fiber rollout", time: "10h ago", readers: "15,842 readers" },
  { id: "n5", title: "SafeBoda expands to new regions", time: "23h ago", readers: "6,410 readers" }
];

export function NewsSidebar() {
  return (
    <div className="space-y-6 sticky top-20 group">
      <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-2xl shadow-slate-200/50 transition-all duration-500 hover:shadow-green-900/5">
        <div className="p-8 pb-4 flex items-center justify-between">
           <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#1B5E20]" />
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest tracking-tighter">Trending Link News</h2>
           </div>
           <Info className="h-4 w-4 text-slate-300 stroke-[1.5px] hover:text-[#1B5E20] transition-colors cursor-help" />
        </div>
        
        <div className="pb-4">
           {newsItems.map((item) => (
             <div key={item.id} className="px-8 py-3.5 hover:bg-slate-50 transition-colors cursor-pointer group/news">
                <div className="flex items-start gap-4">
                   <div className="w-1.5 h-1.5 bg-slate-200 rounded-full mt-2 group-hover/news:bg-[#1B5E20] group-hover/news:scale-125 transition-all" />
                   <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-slate-700 leading-tight group-hover/news:text-[#1B5E20] transition-colors">
                         {item.title}
                      </h3>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1 opacity-70 group-hover/news:opacity-100">{item.time} • {item.readers}</p>
                   </div>
                </div>
             </div>
           ))}
        </div>
        
        <button className="w-full flex items-center justify-left gap-2 px-8 py-4 text-xs font-black text-slate-400 hover:text-slate-800 hover:bg-slate-50 transition-all border-t border-slate-50 uppercase tracking-widest">
           See all updates <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group/ad shadow-slate-200/50">
         <div className="relative z-10 flex flex-col h-full">
            <div className="p-3 bg-white/10 rounded-2xl w-fit mb-6">
               <Sparkles className="w-5 h-5 text-yellow-400" />
            </div>
            <h3 className="text-lg font-black tracking-tight leading-tight mb-4">Elevate your career trajectory.</h3>
            <p className="text-xs text-white/60 font-medium leading-relaxed mb-10 max-w-[200px]">Unlock insights from industry leaders and master high-demand tech skills.</p>
            <button className="w-full py-3.5 rounded-full bg-yellow-400 text-slate-900 font-black text-[10px] uppercase tracking-widest hover:bg-yellow-500 transition-all shadow-xl shadow-yellow-900/20 active:scale-95">
              Unleash Premium
            </button>
         </div>
         <Sparkles className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 text-yellow-400 group-hover/ad:scale-125 transition-transform duration-700" />
      </div>

      {/* Footer Links */}
      <footer className="px-6 py-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
         {['About', 'Accessibility', 'Help', 'Privacy', 'Legal', 'Advertising', 'Hiring', 'Apps'].map((link) => (
           <button key={link} className="text-[10px] text-slate-400 hover:text-[#1B5E20] hover:underline transition-colors font-black uppercase tracking-widest opacity-60">
              {link}
           </button>
         ))}
      </footer>
      <div className="flex flex-col items-center gap-3 text-[10px] text-slate-400 font-black uppercase tracking-widest opacity-40 mt-4 pb-12">
         <div className="flex items-center gap-2">
            <span className="text-[#1B5E20] opacity-100">Connect+ Link Platform</span>
            <div className="w-1 h-1 bg-slate-300 rounded-full" />
            <ShieldCheck className="w-3 h-3" />
         </div>
         <span>Connect+ Corp © 2026 · Kampala, Uganda</span>
      </div>
    </div>
  );
}
