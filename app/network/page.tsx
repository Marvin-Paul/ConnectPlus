"use client";

import { NetworkSidebar } from "./network-sidebar";
import { InvitationsCard } from "./invitations-card";
import { SuggestionsGrid } from "./suggestions-grid";
import { Users, Sparkles, UserPlus, Target, ChevronRight, Zap, TrendingUp, Search } from "lucide-react";
import Link from "next/link";

export default function NetworkPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-[1152px] mx-auto pt-8 px-4 flex flex-col md:grid md:grid-cols-12 gap-8 relative">
        
        {/* Sidebar */}
        <aside className="w-full md:col-span-4 lg:col-span-3 h-fit md:sticky md:top-[84px] order-1 md:order-none">
          <NetworkSidebar />
        </aside>

        {/* Main Content */}
        <main className="w-full md:col-span-8 lg:col-span-9 space-y-6 animate-pro-fade order-2 md:order-none">
           
           <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border dark:border-slate-800 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-soft hover:shadow-premium transition-all duration-300">
              <div className="space-y-2">
                 <div className="flex items-center gap-2 text-primary dark:text-primary-light">
                    <Users className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-widest">Network Management</span>
                 </div>
                 <h1 className="text-2xl md:text-3xl font-bold text-foreground dark:text-white tracking-tight">Expand your <span className="text-primary dark:text-primary-light text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">professional network</span></h1>
                 <p className="text-[14px] text-secondary/70 dark:text-slate-400 font-medium max-w-[500px] leading-relaxed">
                    Connect with innovative leaders, industry experts, and peers across your professional ecosystem.
                 </p>
              </div>
           </div>

           <InvitationsCard />
           
           <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                 <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <h2 className="text-[12px] font-bold text-foreground dark:text-slate-200 uppercase tracking-widest">Recommended for you</h2>
                 </div>
                 <Link href="/network/connections" className="text-[11px] font-bold text-primary hover:underline uppercase tracking-widest">See all suggestions</Link>
              </div>
              <SuggestionsGrid />
           </div>
           
           {/* Discover Hub */}
           <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border dark:border-slate-800 p-10 md:p-14 text-center shadow-soft relative overflow-hidden group">
              <div className="max-w-lg mx-auto space-y-8 relative z-10">
                 <div className="w-16 h-16 bg-primary/5 dark:bg-primary/10 rounded-2xl mx-auto flex items-center justify-center border border-primary/10 shadow-sm transition-transform duration-500 group-hover:scale-110">
                    <Search className="w-6 h-6 text-primary" />
                 </div>
                 <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-foreground dark:text-white tracking-tight">Discover relevant professionals</h2>
                    <p className="text-[15px] text-secondary/70 dark:text-slate-400 font-medium leading-relaxed max-w-sm mx-auto">
                       Following professionals with similar industry interests helps you stay informed and discover high-value opportunities.
                    </p>
                 </div>
                 <Link href="/search" className="inline-flex h-12 px-10 rounded-xl bg-slate-900 dark:bg-primary text-white font-bold text-[12px] uppercase tracking-widest hover:bg-slate-800 dark:hover:bg-primary/90 transition-all active:scale-95 items-center gap-3 mx-auto justify-center shadow-lg">
                    Explore Network Hub <ChevronRight className="w-4 h-4 opacity-50" />
                 </Link>
              </div>
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
           </div>

           {/* Premium Access */}
           <div className="bg-slate-900 dark:bg-slate-950 rounded-2xl p-10 md:p-14 text-white relative overflow-hidden group/prem shadow-xl">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                 <div className="space-y-8 text-center md:text-left">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/5 backdrop-blur-md group-hover/prem:scale-110 transition-transform mx-auto md:mx-0">
                       <Sparkles className="w-6 h-6 text-amber-400" />
                    </div>
                    <div className="space-y-3">
                       <h2 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight">Build deeper professional connections</h2>
                       <p className="text-white/50 text-[15px] font-medium leading-relaxed max-w-md mx-auto md:mx-0">
                         Upgrade to Premium to see detailed visibility metrics and establish connections with verified industry leaders.
                       </p>
                    </div>
                    <Link href="/premium" className="inline-flex h-12 px-10 rounded-xl bg-white text-slate-900 font-bold text-[12px] uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95 items-center justify-center shadow-lg">
                       Elevate Access
                    </Link>
                 </div>
              </div>
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none" />
           </div>
        </main>
      </div>
    </div>
  );
}
