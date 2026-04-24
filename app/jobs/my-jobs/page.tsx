"use client";

import { useState } from "react";
import { JobsSidebar } from "../jobs-sidebar";
import { Bookmark, ClipboardCheck, Clock, ChevronRight, Search } from "lucide-react";

const savedJobs = [
  {
    id: "s1",
    title: "Project Manager",
    company: "Standard Chartered Bank",
    location: "Kampala, Uganda",
    salary: "$2,000 - $3,500",
    savedDate: "2 days ago",
    applicants: 15,
    logo: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=128&h=128"
  },
  {
    id: "s2",
    title: "Marketing Lead",
    company: "Airtel Uganda",
    location: "Kampala, Uganda (Hybrid)",
    salary: "Negotiable",
    savedDate: "5 days ago",
    applicants: 42,
    logo: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=128&h=128"
  }
];

const appliedJobs = [
  {
    id: "a1",
    title: "Frontend Developer",
    company: "Zuri Health",
    location: "Kampala (Remote)",
    status: "REVIEWING",
    appliedDate: "1 week ago",
    logo: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=128&h=128"
  }
];

export default function MyJobsPage() {
  const [activeTab, setActiveTab] = useState<"saved" | "applied">("saved");

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 transition-colors duration-500 pb-20">
      <div className="max-w-7xl mx-auto py-12 px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <aside className="lg:col-span-3">
          <JobsSidebar />
        </aside>

        <main className="lg:col-span-9 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-soft transition-all">
            <div className="p-10 border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl">
               <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Career Hub <span className="text-[#0a66c2] dark:text-blue-400">Inventory</span></h1>
               <div className="flex gap-8 mt-10">
                 <button 
                   onClick={() => setActiveTab("saved")}
                   className={`pb-4 text-[13px] font-black uppercase tracking-widest border-b-4 transition-all duration-300 ${activeTab === "saved" ? "border-[#0a66c2] dark:border-blue-400 text-[#0a66c2] dark:text-blue-400" : "border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white"}`}
                 >
                   Saved Roles ({savedJobs.length})
                 </button>
                 <button 
                   onClick={() => setActiveTab("applied")}
                   className={`pb-4 text-[13px] font-black uppercase tracking-widest border-b-4 transition-all duration-300 ${activeTab === "applied" ? "border-[#0a66c2] dark:border-blue-400 text-[#0a66c2] dark:text-blue-400" : "border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white"}`}
                 >
                   Applications ({appliedJobs.length})
                 </button>
               </div>
            </div>

            <div className="p-6">
               {activeTab === "saved" ? (
                 <div className="space-y-4">
                   {savedJobs.map((job) => (
                     <div key={job.id} className="p-8 rounded-3xl hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent hover:border-slate-100 dark:hover:border-slate-700 transition-all duration-500 group cursor-pointer">
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                           <div className="w-20 h-20 rounded-2xl border border-slate-100 dark:border-slate-700 p-2 bg-white dark:bg-slate-800 shadow-sm group-hover:scale-105 transition-transform duration-500">
                              <img src={job.logo} className="w-full h-full object-contain rounded-xl" alt="" />
                           </div>
                           <div className="flex-1 text-center md:text-left">
                              <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-[#0a66c2] dark:group-hover:text-blue-400 transition-colors tracking-tight">{job.title}</h3>
                              <p className="text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-1 italic">{job.company}</p>
                              <p className="text-[11px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-3 flex items-center justify-center md:justify-start gap-2 italic">
                                 <Bookmark className="w-3.5 h-3.5" /> {job.location}
                              </p>
                              <div className="flex items-center justify-center md:justify-start gap-6 mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#057642] dark:text-emerald-400">
                                 <span className="bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-lg border border-emerald-100 dark:border-emerald-800">{job.salary}</span>
                                 <span className="text-slate-400 dark:text-slate-500 flex items-center gap-2">
                                   <Clock className="w-3.5 h-3.5" /> Saved {job.savedDate}
                                 </span>
                              </div>
                           </div>
                           <button className="w-full md:w-auto h-12 px-10 rounded-full bg-[#0a66c2] dark:bg-blue-600 text-white font-black text-[11px] uppercase tracking-widest hover:bg-[#004182] dark:hover:bg-blue-500 transition-all active:scale-95 shadow-xl shadow-blue-900/10 dark:shadow-blue-500/10">
                              Finalize Application
                           </button>
                        </div>
                     </div>
                   ))}
                 </div>
               ) : (
                 <div className="space-y-4">
                   {appliedJobs.map((job) => (
                     <div key={job.id} className="p-8 flex flex-col md:flex-row items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-3xl transition-all duration-500 border border-transparent hover:border-slate-100 dark:hover:border-slate-700 group">
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                           <div className="w-16 h-16 rounded-2xl border border-slate-100 dark:border-slate-700 p-2 bg-white dark:bg-slate-800 shadow-sm group-hover:rotate-3 transition-transform">
                              <img src={job.logo} className="w-full h-full object-contain rounded-xl" alt="" />
                           </div>
                           <div className="text-center md:text-left">
                              <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">{job.title}</h3>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-1 italic">{job.company}</p>
                              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-3 flex items-center justify-center md:justify-start gap-2">
                                 <ClipboardCheck className="w-3.5 h-3.5" /> Applied {job.appliedDate}
                              </p>
                           </div>
                        </div>
                        <div className="flex items-center gap-6 mt-6 md:mt-0">
                           <div className="px-6 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100 dark:border-blue-800 shadow-sm">
                             {job.status}
                           </div>
                           <div className="w-10 h-10 rounded-full border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all">
                              <ChevronRight className="w-5 h-5" />
                           </div>
                        </div>
                     </div>
                   ))}
                 </div>
               )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
