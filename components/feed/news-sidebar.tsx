"use client";

import { Info, ChevronDown, ChevronRight, TrendingUp, Sparkles, MapPin, ExternalLink, ShieldCheck, Zap, BarChart3, Clock, Users, Check, Grid3X3 } from "lucide-react";
import Link from "next/link";

const newsItems = [
  { id: "n1", title: "African Fintech Surge: $2.4B invested in 2025", time: "2H AGO", readers: "145.2K READERS", icon: Zap, color: "text-accent" },
  { id: "n2", title: "MTN Uganda announces multi-billion fiber rollout", time: "5H AGO", readers: "85.8K READERS", icon: TrendingUp, color: "text-primary" },
  { id: "n3", title: "The rise of AI in financial services", time: "10H AGO", readers: "42.3K READERS", icon: BarChart3, color: "text-blue-500" },
  { id: "n4", title: "SafeBoda expands to new regions", time: "23H AGO", readers: "12.4K READERS", icon: MapPin, color: "text-orange-500" },
  { id: "n5", title: "Chipper Cash hits new user milestone", time: "1D AGO", readers: "65.1K READERS", icon: Users, color: "text-purple-500" }
];

export function NewsSidebar() {
  return (
    <div className="space-y-6 sticky top-[84px] animate-pro-fade pb-12">
      {/* Trending News */}
      <div className="bg-white dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800/50 shadow-2xl dark:shadow-none overflow-hidden backdrop-blur-xl group/sidebar transition-all duration-500 hover:border-emerald-500/20">
        <div className="p-6 flex items-center justify-between border-b border-slate-50 dark:border-slate-800/50">
           <h2 className="text-[11px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-[0.3em] flex items-center gap-2">
             <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
             Connect Plus News
           </h2>
           <Info className="h-4 w-4 text-slate-400 hover:text-emerald-500 transition-colors cursor-help" />
        </div>
        
        <div className="flex flex-col py-2">
           {newsItems.map((item) => (
              <div key={item.id} className="px-6 py-5 hover:bg-slate-50 dark:hover:bg-emerald-500/5 transition-all cursor-pointer group/news relative overflow-hidden">
                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 opacity-0 group-hover/news:opacity-100 transition-opacity" />
                 <div className="flex gap-4">
                    <div className={`mt-1 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 group-hover/news:bg-emerald-500/10 transition-colors ${item.color}`}>
                       <item.icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 space-y-1.5">
                       <h3 className="text-[13px] font-black text-slate-800 dark:text-slate-100 leading-tight group-hover/news:text-emerald-600 dark:group-hover/news:text-emerald-400 transition-colors line-clamp-2">
                          {item.title}
                       </h3>
                       <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-wider">
                          <span className="flex items-center gap-1"><Clock className="w-2.5 h-2.5" /> {item.time}</span>
                          <span className="w-1 h-1 bg-slate-200 dark:bg-slate-800 rounded-full" />
                          <span className="flex items-center gap-1"><Users className="w-2.5 h-2.5" /> {item.readers}</span>
                       </div>
                    </div>
                 </div>
              </div>
           ))}
        </div>
        
        <button className="w-full py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all border-t border-slate-50 dark:border-slate-800/50 uppercase tracking-[0.2em] flex items-center justify-center gap-2 group/more">
           View Full Catalog <ChevronDown className="h-3.5 w-3.5 group-hover/more:translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Premium CTA - High Fidelity Redesign */}
      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group/premium border border-slate-800">
         <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 opacity-100" />
         <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl group-hover/premium:bg-emerald-500/20 transition-all duration-1000" />
         
         <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 backdrop-blur-md">
                 <Sparkles className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="px-3 py-1 bg-amber-400/10 border border-amber-400/20 rounded-full text-[8px] font-black text-amber-400 uppercase tracking-widest">
                Elite Growth
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-[20px] font-black tracking-tight leading-tight">Elevate your career <span className="text-emerald-400 italic underline decoration-emerald-500/30">Trajectory</span>.</h3>
              <p className="text-[11px] text-slate-400 font-bold leading-relaxed">See who's viewed your profile and scale your network faster than the market average.</p>
            </div>

            <Link href="/premium" className="w-full py-4 rounded-2xl bg-white dark:bg-emerald-500 text-slate-900 dark:text-white font-black text-[10px] uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-emerald-500/10 flex items-center justify-center group/btn">
              Try Premium Free <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
         </div>
      </div>

      {/* Footer - Professionalized */}
      <footer className="px-6 py-6 space-y-8">
         <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {['About', 'Accessibility', 'Help', 'Privacy', 'Ad Choices', 'Business'].map((link) => (
              <Link key={link} href="#" className="text-[10px] font-black text-slate-400 hover:text-emerald-500 uppercase tracking-widest transition-colors">
                {link}
              </Link>
            ))}
         </div>

         <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-3">
               <div className="h-8 w-8 rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center shadow-lg">
                  <Grid3X3 className="h-4.5 w-4.5 text-white dark:text-slate-900" />
               </div>
               <span className="text-[12px] font-black text-slate-900 dark:text-white uppercase tracking-[0.4em]">Connect Plus</span>
            </div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Connect Plus Corp &copy; 2026. All rights reserved.</p>
         </div>
      </footer>
    </div>
  );
}
