"use client";

import { Info, ChevronDown, TrendingUp, Sparkles, MapPin, ExternalLink, ShieldCheck, Zap, BarChart3, Clock, Users, Check, Grid3X3 } from "lucide-react";
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
    <div className="space-y-6 sticky top-[84px] animate-pro-fade pb-10">
      {/* Trending News */}
      <div className="bg-white dark:bg-slate-950 rounded-xl border border-border dark:border-slate-800 shadow-soft overflow-hidden">
        <div className="p-5 flex items-center justify-between border-b border-border/50 dark:border-slate-800/50">
           <h2 className="text-[13px] font-extrabold text-foreground uppercase tracking-wider">Connect Plus News</h2>
           <Info className="h-4 w-4 text-secondary hover:text-primary transition-colors cursor-help" />
        </div>
        
        <div className="flex flex-col">
           {newsItems.map((item) => (
              <div key={item.id} className="p-4 hover:bg-muted dark:hover:bg-slate-900 transition-all cursor-pointer group/news border-b border-border/30 dark:border-slate-800/30 last:border-0 border-l-4 border-l-transparent hover:border-l-primary">
                 <h3 className="text-[14px] font-bold text-foreground leading-snug group-hover/news:text-primary transition-colors line-clamp-2">
                    {item.title}
                 </h3>
                 <div className="flex items-center gap-2 mt-1.5 text-[10px] font-bold text-secondary/70 uppercase tracking-tight">
                    <span>{item.time}</span>
                    <span className="w-1 h-1 bg-border rounded-full" />
                    <span>{item.readers}</span>
                 </div>
              </div>
           ))}
        </div>
        
        <button className="w-full py-4 text-[11px] font-extrabold text-secondary dark:text-slate-500 hover:text-primary hover:bg-muted dark:hover:bg-slate-900 transition-all border-t border-border/50 dark:border-slate-800/50 uppercase tracking-widest">
           Show more <ChevronDown className="h-4 w-4 inline ml-1" />
        </button>
      </div>

      {/* Premium CTA */}
      <div className="bg-primary rounded-xl p-8 text-white shadow-premium relative overflow-hidden group/ad">
         <div className="relative z-10">
            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-6 backdrop-blur-md">
               <Sparkles className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-[18px] font-bold leading-tight mb-3">Elevate your career trajectory.</h3>
            <p className="text-[12px] text-white/70 font-medium mb-6">See who's viewed your profile and scale your network faster.</p>
            <Link href="/premium" className="w-full py-3 rounded-lg bg-accent text-white font-extrabold text-[12px] uppercase tracking-wider hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 flex items-center justify-center">
              Try Premium Free
            </Link>
         </div>
         <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
      </div>

      {/* Footer */}
      <footer className="px-2 py-6">
         <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-6">
            {['About', 'Accessibility', 'Help', 'Privacy', 'Ad Choices', 'Business'].map((link) => (
              <Link key={link} href="#" className="text-[12px] font-bold text-secondary hover:text-primary transition-colors">
                {link}
              </Link>
            ))}
         </div>

         <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
               <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
                  <Grid3X3 className="h-4 w-4 text-white" />
               </div>
               <span className="text-[13px] font-extrabold text-foreground uppercase tracking-widest">Connect Plus</span>
            </div>
            <p className="text-[11px] font-bold text-secondary/60">Connect Plus Corp &copy; 2026. All rights reserved.</p>
         </div>
      </footer>
    </div>
  );
}
