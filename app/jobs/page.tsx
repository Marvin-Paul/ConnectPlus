"use client";

import { JobsSidebar } from "./jobs-sidebar";
import { JobsSearch } from "./jobs-search";
import { JobCard } from "./job-card";
import { Sparkles, Star, Target, ChevronRight, Zap } from "lucide-react";
import Link from 'next/link';

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-[#F3F6F8] pb-24">
      <div className="max-w-7xl mx-auto pt-10 px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* SIDEBAR */}
        <aside className="lg:col-span-3">
          <JobsSidebar />
        </aside>

        {/* MAIN CONTENT */}
        <main className="lg:col-span-9 space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
           
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
              <div className="space-y-2">
                 <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-[#1B5E20]/10 text-[#1B5E20]">
                       <Target className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Career Hub</span>
                 </div>
                 <h1 className="text-4xl font-black text-slate-800 tracking-tighter leading-none italic">Find your next <br /> <span className="text-[#1B5E20]">Elite Opportunity.</span></h1>
              </div>
              <p className="text-[13px] font-bold text-slate-400 max-w-[280px] leading-relaxed italic opacity-80 uppercase tracking-widest text-right hidden md:block">
                 "Connecting Africa's brightest tech talent with leading innovators."
              </p>
           </div>

           <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl p-10 space-y-8 group/search relative overflow-hidden">
              <JobsSearch />
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#1B5E20]/5 rounded-full blur-3xl opacity-0 group-hover/search:opacity-100 transition-opacity duration-1000" />
           </div>
           
           <div className="space-y-6">
              <div className="flex items-center justify-between px-6">
                 <h2 className="text-[13px] font-black text-slate-400 uppercase tracking-[0.3em]">Recommended for you</h2>
                 <Link href="/jobs/all" className="text-[11px] font-black text-[#1B5E20] hover:underline uppercase tracking-widest">Explore all</Link>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {[1, 2, 3].map((i) => <JobCard key={i} />)}
              </div>
           </div>
           
           {/* PREMIUM CTA */}
           <div className="bg-slate-900 rounded-[3.5rem] p-16 text-white relative overflow-hidden group/prem animate-in slide-in-from-bottom-12 duration-1000 shadow-2xl shadow-slate-900/40">
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                 <div className="space-y-8">
                    <div className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center border border-white/5 backdrop-blur-xl group-hover/prem:scale-110 group-hover/prem:-rotate-6 transition-transform">
                       <Sparkles className="w-8 h-8 text-yellow-500 shadow-xl shadow-yellow-500/20" />
                    </div>
                    <div className="space-y-4">
                       <h2 className="text-4xl font-black leading-tight tracking-tighter italic">Land the job you want with <span className="text-yellow-500">Premium.</span></h2>
                       <p className="text-white/40 text-sm font-bold leading-relaxed italic max-w-sm">
                         "See how you compare to other applicants and unlock elite insights about your profile performance in real-time."
                       </p>
                    </div>
                    <button className="h-14 px-10 rounded-full bg-yellow-400 text-slate-900 font-black text-xs uppercase tracking-[0.2em] hover:bg-yellow-500 transition-all shadow-2xl shadow-yellow-900/40 active:scale-95 flex items-center gap-3">
                       Get 1 Month Free <Zap className="w-4 h-4 fill-slate-900" />
                    </button>
                 </div>

                 <div className="relative hidden md:block">
                    <div className="bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 p-10 space-y-8 translate-x-12 translate-y-6 group-hover/prem:translate-x-8 group-hover/prem:translate-y-4 transition-transform duration-700">
                       <div className="space-y-6">
                          {[
                             { label: 'Applicant Ranking', val: 'Top 5%', color: 'text-green-400' },
                             { label: 'Profile Visibility', val: 'Featured', color: 'text-yellow-400' },
                             { label: 'Salary Intel', val: 'Unlocked', color: 'text-blue-400' }
                          ].map((stat, i) => (
                             <div key={i} className="flex items-center justify-between group/stat cursor-pointer">
                                <span className="text-[11px] font-black uppercase tracking-widest text-white/40 group-hover/stat:text-white/60 transition-colors uppercase">{stat.label}</span>
                                <span className={`text-sm font-black italic tracking-tight ${stat.color} group-hover/stat:scale-110 transition-transform`}>{stat.val}</span>
                             </div>
                          ))}
                       </div>
                       <div className="pt-6 border-t border-white/5 text-center">
                          <button className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-yellow-500 transition-all flex items-center justify-center gap-2 mx-auto">
                             View elite insights <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                       </div>
                    </div>
                    {/* Decorative star */}
                    <Star className="absolute -top-10 -right-10 w-32 h-32 text-white/5 group-hover/prem:rotate-45 transition-transform duration-2000" />
                 </div>
              </div>

              {/* Background design accents */}
              <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-yellow-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
           </div>
        </main>
      </div>
    </div>
  );
}
