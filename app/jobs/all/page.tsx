"use client";

import { JobsSidebar } from "../jobs-sidebar";
import { JobsSearch } from "../jobs-search";
import { JobCard } from "../job-card";
import { Target, Zap, ChevronLeft } from "lucide-react";
import Link from 'next/link';

export default function AllJobsPage() {
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
              <div className="space-y-4">
                 <Link href="/jobs" className="flex items-center gap-2 text-slate-400 hover:text-slate-800 transition-colors w-fit group">
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Back to Career Hub</span>
                 </Link>
                 <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-[#1B5E20]/10 text-[#1B5E20]">
                       <Target className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Directory</span>
                 </div>
                 <h1 className="text-4xl font-black text-slate-800 tracking-tighter leading-none italic">Explore all <br /> <span className="text-[#1B5E20]">Opportunities.</span></h1>
              </div>
           </div>

           <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl p-10 space-y-8 group/search relative overflow-hidden">
              <JobsSearch />
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#1B5E20]/5 rounded-full blur-3xl opacity-0 group-hover/search:opacity-100 transition-opacity duration-1000" />
           </div>
           
           <div className="space-y-6">
              <div className="flex items-center justify-between px-6">
                 <h2 className="text-[13px] font-black text-slate-400 uppercase tracking-[0.3em]">All Jobs Feed</h2>
                 <span className="text-[11px] font-black text-[#1B5E20] bg-green-50 px-3 py-1 rounded-full uppercase tracking-widest border border-green-100 flex items-center gap-1"><Zap className="w-3 h-3 fill-current" /> Live Updates</span>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {[1, 2, 3, 4, 5].map((i) => <JobCard key={i} />)}
              </div>
           </div>
           
        </main>
      </div>
    </div>
  );
}
