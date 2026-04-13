"use client";

import { NotificationSidebar } from "./notification-sidebar";
import { NotificationFeed } from "./notification-feed";
import { Award, Star, Sparkles, TrendingUp, BarChart3, ChevronRight, Eye, MousePointer2, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-[1152px] mx-auto pt-8 px-4 grid grid-cols-1 md:grid-cols-12 gap-8 relative">
        
        {/* Sidebar */}
        <aside className="hidden md:block md:col-span-4 lg:col-span-3 h-fit sticky top-[84px]">
          <NotificationSidebar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </aside>

        {/* Feed */}
        <main className="md:col-span-8 lg:col-span-6 space-y-4 animate-pro-fade">
           <div className="bg-white rounded-xl border border-border overflow-hidden shadow-soft">
              <div className="flex p-6 border-b border-border/50 items-center justify-between">
                 <h2 className="text-[13px] font-extrabold text-foreground uppercase tracking-widest">Recent Intelligence Updates</h2>
                 <button className="text-[11px] font-extrabold text-primary hover:underline uppercase tracking-widest">
                    Mark all read
                 </button>
              </div>
              <NotificationFeed activeFilter={activeFilter} />
           </div>
        </main>

        {/* Right Rail */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 animate-pro-fade">
          
          <div className="bg-white rounded-xl border border-border p-5 space-y-4 hover:shadow-soft transition-all group cursor-pointer overflow-hidden">
             <div className="relative h-28 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  alt="Learning" 
                />
             </div>
             <div className="space-y-1">
                <h3 className="text-[14px] font-bold text-foreground leading-tight">Elevate your connections</h3>
                <p className="text-[12px] text-secondary font-bold">"Master high-tier system architecture with Connect Plus Learning."</p>
             </div>
              <Link href="/learning" className="w-full py-2.5 rounded-lg border border-primary text-primary font-extrabold text-[11px] uppercase tracking-widest hover:bg-primary/5 transition-all flex items-center justify-center">
                View Intelligence Courses
              </Link>
           </div>

           <div className="bg-primary rounded-xl p-8 space-y-8 group overflow-hidden relative shadow-premium">
              <div className="relative z-10 space-y-6">
                 <div className="flex items-center justify-between">
                    <h3 className="text-[11px] font-extrabold text-white/50 uppercase tracking-widest">Connect Plus Insights</h3>
                    <span className="text-[10px] font-extrabold text-accent bg-white/10 px-3 py-1 rounded-full border border-white/10">WEEKLY</span>
                 </div>
                 
                 <div className="space-y-6">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <Eye className="w-4 h-4 text-accent/70" />
                          <span className="text-[13px] font-bold text-white/70">Node views</span>
                       </div>
                       <span className="text-xl font-black text-white tracking-tighter">42</span>
                    </div>
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <Sparkles className="w-4 h-4 text-accent/70" />
                          <span className="text-[13px] font-bold text-white/70">Impression Tier</span>
                       </div>
                       <span className="text-xl font-black text-white tracking-tighter">1.2K</span>
                    </div>
                 </div>

                 <div className="pt-6 border-t border-white/10 text-center">
                    <Link href="/premium" className="text-[11px] font-extrabold text-white/50 hover:text-white transition-all uppercase tracking-widest flex items-center justify-center gap-2 mx-auto">
                       Deep analytics <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                 </div>
              </div>
              <ShieldCheck className="absolute -bottom-10 -right-10 w-24 h-24 opacity-5 text-white" />
          </div>
        </aside>
      </div>
    </div>
  );
}
