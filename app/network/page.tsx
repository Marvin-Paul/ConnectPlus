"use client";

import { NetworkSidebar } from "./network-sidebar";
import { InvitationsCard } from "./invitations-card";
import { SuggestionsGrid } from "./suggestions-grid";
import { Users, Sparkles, UserPlus, Target, ChevronRight, Zap, TrendingUp, Search } from "lucide-react";
import Link from "next/link";

export default function NetworkPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <div className="max-w-7xl mx-auto pt-10 px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN (Sidebar) */}
        <aside className="lg:col-span-3">
          <NetworkSidebar />
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="lg:col-span-9 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
           
           <div className="bg-white rounded-xl border border-slate-200 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
              <div className="space-y-1">
                 <div className="flex items-center gap-2 text-blue-600">
                    <Users className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-widest">Network Manager</span>
                 </div>
                 <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Expand your <span className="text-blue-600">professional community</span></h1>
                 <p className="text-[13px] text-slate-500 font-medium italic opacity-80">
                    Discover and collaborate with the most innovative leaders in your sector.
                 </p>
              </div>
           </div>

           <InvitationsCard />
           
           <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                 <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <h2 className="text-[14px] font-bold text-slate-900 uppercase tracking-tight">Recommended for you</h2>
                 </div>
                 <Link href="/network/all" className="text-[12px] font-semibold text-blue-600 hover:text-blue-700 transition-colors">See all suggestions</Link>
              </div>
              <SuggestionsGrid />
           </div>
           
           {/* ELITE SUGGESTION CARD */}
           <div className="bg-white rounded-xl border border-slate-200 p-10 text-center shadow-sm relative overflow-hidden group">
              <div className="max-w-lg mx-auto space-y-6 relative z-10">
                 <div className="w-16 h-16 bg-blue-50/50 rounded-2xl mx-auto flex items-center justify-center border border-blue-100 shadow-sm transition-transform duration-500 group-hover:scale-105">
                    <Search className="w-6 h-6 text-blue-600" />
                 </div>
                 <div className="space-y-2">
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">Find more relevant connections</h2>
                    <p className="text-[14px] text-slate-500 font-medium leading-relaxed opacity-90 max-w-sm mx-auto">
                      "Follow people with similar professional interests to unlock exclusive insights and high-value opportunities."
                    </p>
                 </div>
                 <Link href="/network/hashtags" className="h-11 px-8 rounded-full bg-slate-900 text-white font-bold text-[13px] hover:bg-slate-800 transition-all shadow-sm active:scale-95 flex items-center gap-2 mx-auto justify-center">
                    Explore Popular Topics <ChevronRight className="w-4 h-4" />
                 </Link>
              </div>
           </div>

           {/* PREMIUM CTA */}
           <div className="bg-slate-900 rounded-xl p-10 text-white relative overflow-hidden group/prem shadow-lg">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                 <div className="space-y-6 text-center md:text-left">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/5 backdrop-blur-xl group-hover/prem:scale-110 transition-transform mx-auto md:mx-0">
                       <Sparkles className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div className="space-y-2">
                       <h2 className="text-2xl font-bold leading-tight tracking-tight">Connect at the <span className="text-yellow-500">Highest Level.</span></h2>
                       <p className="text-white/60 text-sm font-medium leading-relaxed max-w-sm mx-auto md:mx-0">
                         "Upgrade and see who's viewing your profile to connect with elite industry leaders instantly."
                       </p>
                    </div>
                    <Link href="/premium/analytics" className="inline-block h-11 px-8 rounded-full bg-yellow-400 text-slate-900 font-bold text-[13px] hover:bg-yellow-500 transition-all active:scale-95 shadow-sm text-center content-center">
                       Unleash Professional Link
                    </Link>
                 </div>
                 <div className="hidden lg:block w-48 h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl group-hover/prem:rotate-12 transition-transform duration-[2000ms] border-4 border-white/5 shadow-2xl opacity-10" />
              </div>
           </div>
        </main>
      </div>
    </div>
  );
}
