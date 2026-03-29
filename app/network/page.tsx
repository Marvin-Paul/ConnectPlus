"use client";

import { NetworkSidebar } from "./network-sidebar";
import { InvitationsCard } from "./invitations-card";
import { SuggestionsGrid } from "./suggestions-grid";
import { Users, Sparkles, UserPlus, Target, ChevronRight, Zap, TrendingUp, Search } from "lucide-react";
import Link from "next/link";

export default function NetworkPage() {
  return (
    <div className="min-h-screen bg-[#F3F6F8] pb-24">
      <div className="max-w-7xl mx-auto pt-10 px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN (Sidebar) */}
        <aside className="lg:col-span-3">
          <NetworkSidebar />
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="lg:col-span-9 space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
           
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
              <div className="space-y-2">
                 <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 shadow-sm">
                       <Users className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Community Hub</span>
                 </div>
                 <h1 className="text-4xl font-black text-slate-800 tracking-tighter leading-none italic">Expand your <br /> <span className="text-blue-600">Professional Infinity.</span></h1>
              </div>
              <p className="text-[13px] font-black text-slate-400 max-w-[280px] leading-relaxed italic opacity-80 uppercase tracking-[0.2em] text-right hidden md:block">
                 "Building the most powerful tech network across East Africa."
              </p>
           </div>

           <InvitationsCard />
           
           <div className="space-y-8">
              <div className="flex items-center justify-between px-6">
                 <div className="flex items-center gap-3">
                    <TrendingUp className="h-4 w-4 text-orange-500" />
                    <h2 className="text-[13px] font-black text-slate-400 uppercase tracking-[0.3em]">Trending Suggestions</h2>
                 </div>
                 <Link href="/network/all" className="text-[11px] font-black text-blue-600 hover:underline uppercase tracking-widest">See all linkings</Link>
              </div>
              <SuggestionsGrid />
           </div>
           
           {/* ELITE SUGGESTION CARD */}
           <div className="bg-white rounded-[3.5rem] border border-slate-100 p-16 text-center shadow-2xl relative overflow-hidden group">
              <div className="max-w-lg mx-auto space-y-8 relative z-10">
                 <div className="w-24 h-24 bg-blue-50/50 rounded-[2.5rem] mx-auto flex items-center justify-center border border-blue-100 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700">
                    <Search className="w-10 h-10 text-blue-600" />
                 </div>
                 <div className="space-y-4">
                    <h2 className="text-3xl font-black text-slate-800 italic tracking-tighter leading-none">Find more relevant <br /> connections</h2>
                    <p className="text-sm text-slate-500 font-bold leading-relaxed italic opacity-80 max-w-sm mx-auto">
                      "Follow people with similar high-impact interests to see more elite industry posts and exclusive career opportunities."
                    </p>
                 </div>
                 <button className="h-14 px-10 rounded-full bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 active:scale-95 flex items-center gap-3 mx-auto">
                    Explore Popular Topics <ChevronRight className="w-4 h-4" />
                 </button>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2" />
              <Zap className="absolute top-10 right-10 w-32 h-32 opacity-5 text-blue-600 group-hover:rotate-45 transition-transform duration-1000" />
           </div>

           {/* PREMIUM CTA */}
           <div className="bg-slate-900 rounded-[3.5rem] p-16 text-white relative overflow-hidden group/prem animate-in slide-in-from-bottom-12 duration-1000 shadow-2xl shadow-slate-900/40">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                 <div className="space-y-8 text-center md:text-left">
                    <div className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center border border-white/5 backdrop-blur-xl group-hover/prem:scale-110 group-hover/prem:-rotate-6 transition-transform mx-auto md:mx-0">
                       <Sparkles className="w-8 h-8 text-yellow-500 shadow-xl shadow-yellow-500/20" />
                    </div>
                    <div className="space-y-4">
                       <h2 className="text-4xl font-black leading-tight tracking-tighter italic">Connect at the <span className="text-yellow-500">Highest Level.</span></h2>
                       <p className="text-white/40 text-sm font-bold leading-relaxed italic max-w-sm mx-auto md:mx-0">
                         "Upgrade to Premium to see who's viewing your profile and connect with the elite leaders in your sector instantly."
                       </p>
                    </div>
                    <button className="h-14 px-10 rounded-full bg-yellow-400 text-slate-900 font-black text-xs uppercase tracking-[0.2em] hover:bg-yellow-500 transition-all active:scale-95 shadow-2xl shadow-yellow-900/40">
                       Unleash Professional Link
                    </button>
                 </div>
                 <div className="hidden lg:block w-72 h-72 bg-gradient-to-br from-blue-500 to-purple-600 rounded-[4rem] group-hover/prem:rotate-45 transition-transform duration-[2000ms] border-8 border-white/5 shadow-2xl opacity-20" />
              </div>
              <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-yellow-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
           </div>
        </main>
      </div>
    </div>
  );
}
