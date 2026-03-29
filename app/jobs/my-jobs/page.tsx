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
    <div className="max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
      <aside className="lg:col-span-3">
        <JobsSidebar />
      </aside>

      <main className="lg:col-span-9 space-y-6">
        <div className="bg-white rounded-xl border border-[#e0e0e0] overflow-hidden shadow-sm">
          <div className="p-6 border-b border-[#e0e0e0]">
             <h1 className="text-2xl font-bold text-slate-800">My jobs</h1>
             <div className="flex gap-4 mt-6">
               <button 
                 onClick={() => setActiveTab("saved")}
                 className={`pb-3 text-sm font-bold border-b-2 transition-all ${activeTab === "saved" ? "border-[#0a66c2] text-[#0a66c2]" : "border-transparent text-[#666666] hover:text-black"}`}
               >
                 Saved ({savedJobs.length})
               </button>
               <button 
                 onClick={() => setActiveTab("applied")}
                 className={`pb-3 text-sm font-bold border-b-2 transition-all ${activeTab === "applied" ? "border-[#0a66c2] text-[#0a66c2]" : "border-transparent text-[#666666] hover:text-black"}`}
               >
                 Applied ({appliedJobs.length})
               </button>
             </div>
          </div>

          <div className="p-4">
             {activeTab === "saved" ? (
               <div className="space-y-4">
                 {savedJobs.map((job) => (
                   <div key={job.id} className="p-4 rounded-lg hover:bg-slate-50 border border-transparent hover:border-[#e0e0e0] transition-all group cursor-pointer">
                      <div className="flex gap-4">
                         <img src={job.logo} className="w-14 h-14 rounded border" alt="" />
                         <div className="flex-1">
                            <h3 className="font-bold text-[#0a66c2] group-hover:underline text-base">{job.title}</h3>
                            <p className="text-sm text-slate-700 font-medium">{job.company}</p>
                            <p className="text-xs text-[#666666] mt-1">{job.location}</p>
                            <div className="flex items-center gap-4 mt-3 text-xs font-bold text-[#057642]">
                               <span>{job.salary}</span>
                               <span className="text-[#666666] font-normal flex items-center gap-1">
                                 <Clock className="w-3 h-3" /> Saved {job.savedDate}
                               </span>
                            </div>
                         </div>
                         <button className="h-10 px-4 rounded-full border border-[#0a66c2] text-[#0a66c2] font-bold text-xs hover:bg-[#0a66c2]/5 transition-colors">
                            Apply now
                         </button>
                      </div>
                   </div>
                 ))}
               </div>
             ) : (
               <div className="space-y-4">
                 {appliedJobs.map((job) => (
                   <div key={job.id} className="p-4 flex items-center justify-between hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-[#e0e0e0]">
                      <div className="flex gap-4 items-center">
                         <img src={job.logo} className="w-12 h-12 rounded border" alt="" />
                         <div>
                            <h3 className="font-bold text-slate-800 text-sm">{job.title}</h3>
                            <p className="text-xs text-[#666666]">{job.company}</p>
                            <p className="text-[10px] text-[#666666] mt-1">Applied {job.appliedDate}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-3">
                         <div className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
                           {job.status}
                         </div>
                         <ChevronRight className="w-5 h-5 text-[#666666]" />
                      </div>
                   </div>
                 ))}
               </div>
             )}
          </div>
        </div>
      </main>
    </div>
  );
}
