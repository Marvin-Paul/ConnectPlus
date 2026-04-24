"use client";

import { NotificationSidebar } from "./notification-sidebar";
import { NotificationFeed } from "./notification-feed";
import { Award, Star, Sparkles, TrendingUp, BarChart3, ChevronRight, Eye, MousePointer2, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 transition-colors duration-500 pb-20">
      <div className="max-w-7xl mx-auto pt-10 px-6 grid grid-cols-1 md:grid-cols-12 gap-10 relative">
        
        {/* Sidebar */}
        <aside className="hidden md:block md:col-span-4 lg:col-span-3 h-fit sticky top-[84px] animate-in fade-in slide-in-from-left-4 duration-700">
          <NotificationSidebar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </aside>

        {/* Feed */}
        <main className="md:col-span-8 lg:col-span-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
           <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-soft dark:shadow-none transition-all duration-500">
              <div className="flex p-8 border-b border-slate-100 dark:border-slate-800 items-center justify-between bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl">
                 <h2 className="text-[12px] font-black text-slate-900 dark:text-white uppercase tracking-[0.3em]">Operational Intelligence</h2>
                 <button className="text-[10px] font-black text-[#0A66C2] dark:text-blue-400 hover:underline uppercase tracking-widest transition-all">
                    Acknowledge All
                 </button>
              </div>
              <NotificationFeed activeFilter={activeFilter} />
           </div>
        </main>

        {/* Right Rail */}
        <aside className="hidden lg:block lg:col-span-3 space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
          
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 space-y-6 hover:shadow-2xl transition-all duration-500 group cursor-pointer overflow-hidden shadow-soft">
             <div className="relative h-40 rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  alt="Learning" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
             </div>
             <div className="space-y-2">
                <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight tracking-tight">Elevate your connections</h3>
                <p className="text-[12px] text-slate-500 dark:text-slate-400 font-bold italic opacity-80 leading-relaxed">"Master high-tier system architecture with Connect Plus Learning."</p>
             </div>
              <Link href="/learning" className="w-full py-4 rounded-xl border border-[#0A66C2] dark:border-blue-600 text-[#0A66C2] dark:text-blue-400 font-black text-[11px] uppercase tracking-widest hover:bg-[#0A66C2]/5 dark:hover:bg-blue-400/5 transition-all flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/10">
                Access Intel Courses
              </Link>
           </div>

           <div className="bg-[#0A66C2] dark:bg-slate-800 rounded-[2.5rem] p-10 space-y-10 group overflow-hidden relative shadow-premium border border-white/5 transition-all duration-500">
              <div className="relative z-10 space-y-8">
                 <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-black text-white/40 dark:text-slate-500 uppercase tracking-[0.4em]">Resonance Metrics</h3>
                    <span className="text-[9px] font-black text-white bg-white/10 px-3 py-1 rounded-full border border-white/10 tracking-[0.2em]">WEEKLY</span>
                 </div>
                 
                 <div className="space-y-8">
                    <div className="flex items-center justify-between group/metric">
                       <div className="flex items-center gap-4">
                          <div className="p-2 bg-white/10 dark:bg-white/5 rounded-lg">
                            <Eye className="w-5 h-5 text-white/70 dark:text-blue-400" />
                          </div>
                          <span className="text-sm font-black text-white/80 dark:text-slate-300">Node Reach</span>
                       </div>
                       <span className="text-3xl font-black text-white tracking-tighter group-hover:scale-110 transition-transform">42</span>
                    </div>
                    <div className="flex items-center justify-between group/metric">
                       <div className="flex items-center gap-4">
                          <div className="p-2 bg-white/10 dark:bg-white/5 rounded-lg">
                            <Sparkles className="w-5 h-5 text-white/70 dark:text-emerald-400" />
                          </div>
                          <span className="text-sm font-black text-white/80 dark:text-slate-300">Impression Tier</span>
                       </div>
                       <span className="text-3xl font-black text-white tracking-tighter group-hover:scale-110 transition-transform">1.2K</span>
                    </div>
                 </div>

                 <div className="pt-8 border-t border-white/10 text-center">
                    <Link href="/premium" className="text-[10px] font-black text-white/50 dark:text-slate-500 hover:text-white dark:hover:text-white transition-all uppercase tracking-[0.3em] flex items-center justify-center gap-3 mx-auto">
                       Deep Core analytics <ChevronRight className="w-4 h-4" />
                    </Link>
                 </div>
              </div>
              <ShieldCheck className="absolute -bottom-16 -right-16 w-48 h-48 opacity-[0.05] text-white group-hover:rotate-12 transition-transform duration-1000" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full" />
           </div>
        </aside>
      </div>
    </div>
  );
}
