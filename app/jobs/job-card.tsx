"use client";

import { Bookmark, X, Users, Briefcase, MapPin, CheckCircle2, Star, Sparkles, Clock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const featuredJobs = [
  {
    id: "j1",
    title: "Senior Full Stack Engineer",
    company: "Chipper Cash",
    location: "Kampala, Uganda (Remote)",
    logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=128&h=128",
    posted: "2 hours ago",
    applicants: 42,
    benefits: ["Equity", "Health Insurance"],
    isEasyApply: true,
    salary: "$2,500 - $4,000"
  },
  {
    id: "j2",
    title: "Product Designer (UI/UX)",
    company: "SafeBoda",
    location: "Kampala, Uganda (Hybrid)",
    logo: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=128&h=128",
    posted: "1 day ago",
    applicants: 124,
    benefits: ["Learning Stipend"],
    isEasyApply: true,
    salary: "Negotiable"
  },
  {
    id: "j3",
    title: "DevOps Engineer",
    company: "MTN Uganda",
    location: "Kampala, Uganda (On-site)",
    logo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=128&h=128",
    posted: "3 days ago",
    applicants: 89,
    benefits: ["Bonus", "Relocation"],
    isEasyApply: false,
    salary: "$1,800 - $3,200"
  }
];

export function JobCard() {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedIds(prev => prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]);
  };

  return (
    <div className="bg-white rounded-3xl border border-[#e0e0e0] overflow-hidden shadow-sm">
      <div className="p-6 border-b border-[#f3f3f3] flex items-center justify-between bg-slate-50/30">
        <div>
           <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Recommended for you</h2>
           <p className="text-[10px] text-[#666666] font-bold uppercase tracking-widest mt-1 opacity-60">Based on your activity</p>
        </div>
        <Sparkles className="w-5 h-5 text-[#0a66c2] opacity-20" />
      </div>
      
      <div className="divide-y divide-[#f3f3f3]">
        {featuredJobs.map((job) => (
          <div key={job.id} className="p-8 hover:bg-[#f9fafb] transition-all duration-300 cursor-pointer group relative">
            <div className="flex gap-6">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border border-[#e0e0e0] shrink-0 bg-white p-1 shadow-sm group-hover:scale-105 transition-transform">
                <img src={job.logo} alt={job.company} className="w-full h-full object-contain rounded-xl" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                   <div className="space-y-1">
                      <h3 className="text-[17px] font-black text-[#0a66c2] group-hover:underline leading-tight truncate tracking-tight">
                         {job.title}
                      </h3>
                      <div className="flex items-center gap-2">
                         <p className="text-[13px] text-slate-800 font-bold">{job.company}</p>
                         <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                      </div>
                      <p className="text-[12px] text-[#666666] font-medium flex items-center gap-1.5 opacity-80 mt-1">
                        <MapPin className="w-3.5 h-3.5" /> {job.location}
                      </p>
                   </div>
                   <div className="flex items-center gap-1">
                      <button 
                         onClick={(e) => toggleSave(job.id, e)}
                         className={`p-2.5 rounded-full transition-all border ${savedIds.includes(job.id) ? 'bg-[#0a66c2] text-white border-transparent shadow-lg shadow-blue-100' : 'bg-white text-slate-400 border-slate-100 hover:text-[#0a66c2] hover:bg-white hover:shadow-md'}`}
                      >
                        <Bookmark className={`h-5 w-5 ${savedIds.includes(job.id) ? 'fill-current' : ''}`} />
                      </button>
                   </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-6">
                   {job.isEasyApply && (
                     <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-lg text-[10px] font-black uppercase tracking-widest border border-green-100 shadow-sm animate-pulse">
                        <CheckCircle2 className="w-3 h-3" /> Easy Apply
                     </div>
                   )}
                   <div className="flex items-center gap-1.5 text-[11px] font-black text-[#0a66c2] uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 bg-[#0a66c2] rounded-full" /> {job.salary}
                   </div>
                   <div className="flex items-center gap-1.5 text-[10px] text-[#666666] font-bold uppercase tracking-widest opacity-60">
                      <Clock className="w-3 h-3" /> {job.posted}
                   </div>
                   <div className="flex items-center gap-1.5 text-[10px] text-[#057642] font-black uppercase tracking-widest bg-green-50/50 px-2 rounded-md">
                      <Users className="w-3 h-3" /> {job.applicants} applicants
                   </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full py-5 text-[11px] font-black text-[#666666] hover:bg-slate-50 transition-colors border-t border-[#f3f3f3] uppercase tracking-[0.2em] opacity-60 hover:opacity-100">
        Discover more opportunities
      </button>
    </div>
  );
}
