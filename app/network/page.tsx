"use client";

import { NetworkSidebar } from "./network-sidebar";
import { InvitationsCard } from "./invitations-card";
import { SuggestionsGrid } from "./suggestions-grid";
import { Users, Sparkles, UserPlus, Target, ChevronRight, Zap, TrendingUp, Search } from "lucide-react";
import Link from "next/link";

export default function NetworkPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-[1152px] mx-auto pt-8 px-4 grid grid-cols-1 md:grid-cols-12 gap-8 relative">
        
        {/* Sidebar */}
        <aside className="hidden md:block md:col-span-4 lg:col-span-3 h-fit sticky top-[84px]">
          <NetworkSidebar />
        </aside>

        {/* Main Content */}
        <main className="md:col-span-8 lg:col-span-9 space-y-6 animate-pro-fade">
           
           <div className="bg-white rounded-2xl border border-slate-100 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-1.5">
                 <div className="flex items-center gap-2 text-[#1B5E20]">
                    <Users className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Network Management</span>
                 </div>
                 <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Expand your <span className="text-[#1B5E20] text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E20] to-[#2E7D32]">professional network</span></h1>
                 <p className="text-[13px] text-slate-500 font-medium max-w-[500px]">
                    Connect with innovative leaders, industry experts, and peers across your professional ecosystem.
                 </p>
              </div>
           </div>

           <InvitationsCard />
           
           <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                 <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-[#1B5E20]" />
                    <h2 className="text-[14px] font-bold text-slate-900 uppercase tracking-wider">Recommended for you</h2>
                 </div>
                 <Link href="/network/all" className="text-[11px] font-bold text-[#1B5E20] hover:underline uppercase tracking-wider">See all suggestions</Link>
              </div>
              <SuggestionsGrid />
           </div>
           
           {/* Discover Hub */}
           <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center shadow-sm relative overflow-hidden group">
              <div className="max-w-lg mx-auto space-y-6 relative z-10">
                 <div className="w-14 h-14 bg-slate-50 rounded-2xl mx-auto flex items-center justify-center border border-slate-100 shadow-sm transition-transform duration-500 group-hover:scale-105">
                    <Search className="w-5 h-5 text-[#1B5E20]" />
                 </div>
                 <div className="space-y-2">
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">Discover relevant professionals</h2>
                    <p className="text-[14px] text-slate-500 font-medium leading-relaxed max-w-sm mx-auto">
                      "Following professionals with similar industry interests helps you stay informed and discover high-value opportunities."
                    </p>
                 </div>
                 <Link href="/search" className="inline-flex h-11 px-8 rounded-xl bg-slate-900 text-white font-bold text-[11px] uppercase tracking-wider hover:bg-slate-800 transition-all active:scale-95 items-center gap-2 mx-auto justify-center">
                    Explore Network Hub <ChevronRight className="w-4 h-4 opacity-50" />
                 </Link>
              </div>
              <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-slate-50 rounded-full blur-2xl" />
           </div>

           {/* Premium Access */}
           <div className="bg-slate-900 rounded-2xl p-10 text-white relative overflow-hidden group/prem shadow-lg">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                 <div className="space-y-6 text-center md:text-left">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/5 backdrop-blur-md group-hover/prem:scale-105 transition-transform mx-auto md:mx-0">
                       <Sparkles className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="space-y-2">
                       <h2 className="text-2xl font-bold leading-tight tracking-tight">Build deeper professional connections</h2>
                       <p className="text-white/50 text-[14px] font-medium leading-relaxed max-w-sm mx-auto md:mx-0">
                         Upgrade to Premium to see detailed visibility metrics and establish connections with verified industry leaders.
                       </p>
                    </div>
                    <Link href="/premium" className="inline-flex h-11 px-8 rounded-xl bg-white text-slate-900 font-bold text-[11px] uppercase tracking-wider hover:bg-slate-100 transition-all active:scale-95 items-center justify-center">
                       Elevate Access
                    </Link>
                 </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -mr-32 -mt-32" />
           </div>
        </main>
      </div>
    </div>
  );
}
