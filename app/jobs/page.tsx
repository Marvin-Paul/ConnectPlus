"use client";

import { JobsSidebar } from "./jobs-sidebar";
import { JobsSearch } from "./jobs-search";
import { JobCard } from "./job-card";
import { Sparkles, Star, Target, ChevronRight, Zap } from "lucide-react";
import Link from 'next/link';

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <div className="max-w-7xl mx-auto pt-10 px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* SIDEBAR */}
        <aside className="lg:col-span-3">
          <JobsSidebar />
        </aside>

        {/* MAIN CONTENT Area */}
        <main className="lg:col-span-9 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
           
           <div className="bg-white rounded-xl border border-slate-200 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
              <div className="space-y-1">
                 <div className="flex items-center gap-2 text-[#0A66C2]">
                    <Target className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-widest">Career Hub</span>
                 </div>
                 <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Discover your <span className="text-[#0A66C2]">next career milestone</span></h1>
                 <p className="text-[14px] text-slate-500 font-medium opacity-90">
                    Explore high-impact roles tailored to your professional expertise and career goals.
                 </p>
              </div>
           </div>

           <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-8 relative overflow-hidden group/search">
              <JobsSearch />
           </div>
           
           <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                 <h2 className="text-[14px] font-bold text-slate-900 uppercase tracking-tight">Recommended for you</h2>
                 <Link href="/jobs/all" className="text-[12px] font-semibold text-[#0A66C2] hover:text-blue-700 transition-colors">Explore All Roles</Link>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {[1, 2, 3].map((i) => <JobCard key={i} />)}
              </div>
           </div>
           
           {/* PREMIUM CTA */}
           <div className="bg-slate-900 rounded-xl p-10 text-white relative overflow-hidden group/prem shadow-lg">
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                 <div className="space-y-6">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/5 backdrop-blur-xl group-hover/prem:scale-110 transition-transform">
                       <Sparkles className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div className="space-y-2">
                       <h2 className="text-2xl font-bold leading-tight tracking-tight">Land the job you want with <span className="text-yellow-500">Premium.</span></h2>
                       <p className="text-white/60 text-sm font-medium leading-relaxed max-w-sm">
                         "See how you compare to other applicants and unlock elite insights about your profile performance instantly."
                       </p>
                    </div>
                    <button className="h-11 px-8 rounded-full bg-yellow-400 text-slate-900 font-bold text-[13px] hover:bg-yellow-500 transition-all active:scale-95 flex items-center gap-2 shadow-sm">
                       Get 1 Month Free <Zap className="w-3.5 h-3.5 fill-slate-900" />
                    </button>
                 </div>

                 <div className="relative hidden md:block">
                    <div className="bg-white/5 backdrop-blur-3xl rounded-xl border border-white/10 p-6 space-y-4 group-hover/prem:translate-y-[-4px] transition-transform duration-500">
                       <div className="space-y-4 text-center">
                           <div className="flex justify-between items-center px-2">
                             <span className="text-[11px] font-bold text-white/40 uppercase">Applicant Rank</span>
                             <span className="text-sm font-bold text-green-400">Top 5%</span>
                           </div>
                           <div className="flex justify-between items-center px-2">
                             <span className="text-[11px] font-bold text-white/40 uppercase">Visibility</span>
                             <span className="text-sm font-bold text-yellow-500">Featured</span>
                           </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </main>
      </div>
    </div>
  );
}
