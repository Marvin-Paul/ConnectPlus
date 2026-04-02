"use client";

import { Bookmark, X, Users, Briefcase, MapPin, CheckCircle2, Star, Sparkles, Clock, ShieldCheck, Zap, DollarSign, TrendingUp, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const featuredJobs = [
  {
    id: "j1",
    title: "Senior AI Solutions Engineer",
    company: "Chipper Cash",
    location: "Kampala, Uganda • Remote",
    logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=128&h=128",
    posted: "2H AGO",
    applicants: 42,
    benefits: ["Equity", "Health Insurance"],
    isEasyApply: true,
    salary: "$3,500 - $6,000",
    match: "98% Profile Match"
  },
  {
    id: "j2",
    title: "Lead Frontend Architect",
    company: "SafeBoda",
    location: "Kampala, Uganda • Hybrid",
    logo: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=128&h=128",
    posted: "5H AGO",
    applicants: 124,
    benefits: ["Learning Stipend"],
    isEasyApply: true,
    salary: "$2,800 - $4,500",
    match: "92% Profile Match"
  },
  {
    id: "j3",
    title: "Cloud Infrastructure Specialist",
    company: "MTN Uganda",
    location: "Kampala, Uganda • On-site",
    logo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=128&h=128",
    posted: "1D AGO",
    applicants: 89,
    benefits: ["Bonus", "Relocation"],
    isEasyApply: false,
    salary: "$3,000 - $5,200",
    match: "85% Profile Match"
  }
];

export function JobCard() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [selectedJob, setSelectedJob] = useState<typeof featuredJobs[0] | null>(null);

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setSavedIds(prev => prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]);
  };

  return (
    <div className="relative">
      <div className="bg-white rounded-[3.5rem] border border-slate-100 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.05)] animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-white/50 backdrop-blur-xl">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100">
                <Sparkles className="w-6 h-6 text-[#1B5E20]" />
             </div>
             <div>
                <h2 className="text-[13px] font-black text-slate-800 uppercase tracking-[0.3em]">Elite Recommendations</h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 opacity-60">Leveraging AI to match your high-end performance</p>
             </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
             <span className="text-[10px] font-black text-[#1B5E20] bg-green-50 px-3 py-1 rounded-full uppercase tracking-widest border border-green-100">Verified Jobs only</span>
          </div>
        </div>
        
        <div className="divide-y divide-slate-50">
          {featuredJobs.map((job) => (
            <div 
              key={job.id} 
              onClick={() => setSelectedJob(job)}
              className="p-10 hover:bg-slate-50/50 transition-all duration-500 cursor-pointer group relative"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-20 h-20 rounded-[2rem] overflow-hidden border-2 border-slate-100 shrink-0 bg-white p-2 shadow-sm group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-500">
                  <img src={job.logo} alt={job.company} className="w-full h-full object-contain rounded-2xl" />
                </div>
                
                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex items-start justify-between gap-4">
                     <div className="space-y-2 flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                           <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-widest border border-blue-100">{job.match}</span>
                           {job.isEasyApply && (
                             <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded uppercase tracking-widest border border-green-100 flex items-center gap-1">
                                <Zap className="w-3 h-3 fill-current" /> Fast Apply
                             </span>
                           )}
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 group-hover:text-[#1B5E20] transition-colors leading-tight tracking-tighter truncate italic">
                           {job.title}
                        </h3>
                        <div className="flex items-center gap-3">
                           <Link href={`/company/${job.company.toLowerCase().replace(' ', '-')}`} className="text-base font-bold text-slate-600 hover:text-[#1B5E20] hover:underline transition-all" onClick={(e) => e.stopPropagation()}>{job.company}</Link>
                           <ShieldCheck className="w-4 h-4 text-blue-500" />
                           <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                           <p className="text-sm text-slate-400 font-bold flex items-center gap-1.5 italic">
                             <MapPin className="w-4 h-4 text-slate-300" /> {job.location}
                           </p>
                        </div>
                     </div>
                     
                     <div className="flex items-center gap-3 shrink-0">
                        <button 
                           onClick={(e) => toggleSave(job.id, e)}
                           className={`w-14 h-14 rounded-full transition-all border flex items-center justify-center shadow-lg active:scale-90 ${savedIds.includes(job.id) ? 'bg-[#1B5E20] text-white border-transparent shadow-green-100' : 'bg-white text-slate-300 border-slate-100 hover:text-[#1B5E20] hover:border-[#1B5E20]/20 hover:shadow-xl hover:shadow-green-900/5'}`}
                        >
                          <Bookmark className={`h-6 w-6 ${savedIds.includes(job.id) ? 'fill-current' : ''}`} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setSelectedJob(job); }}
                          className="hidden sm:flex h-14 px-10 rounded-full bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 active:scale-95 items-center gap-3"
                        >
                           Details <ChevronRight className="w-4 h-4" />
                        </button>
                     </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-8 pt-8 border-t border-slate-50/50">
                     <div className="flex items-center gap-3 group/info">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 text-[#1B5E20] group-hover/info:scale-110 transition-transform">
                           <DollarSign className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[12px] font-black text-slate-800 uppercase tracking-tight">{job.salary}</span>
                           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic leading-none">Est. Package</span>
                        </div>
                     </div>

                     <div className="flex items-center gap-3 group/info">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 text-blue-500 group-hover/info:scale-110 transition-transform">
                           <Users className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[12px] font-black text-slate-800 uppercase tracking-tight">{job.applicants} Applicants</span>
                           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic leading-none">Competitive</span>
                        </div>
                     </div>

                     <div className="flex items-center gap-3 group/info ml-auto">
                        <div className="flex flex-col text-right">
                           <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest italic">{job.posted}</span>
                           <div className="flex items-center gap-1.5 justify-end mt-1">
                              <Clock className="w-3.5 h-3.5 text-slate-300" />
                              <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">Application Closing soon</span>
                           </div>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full py-8 text-[12px] font-black text-slate-400 hover:text-[#1B5E20] hover:bg-slate-50 transition-all border-t border-slate-50 uppercase tracking-[0.4em] bg-white group/footer">
          Explore more opportunities <TrendingUp className="w-4 h-4 inline ml-2 group-hover/footer:translate-y-[-4px] group-hover/footer:translate-x-[4px] transition-transform" />
        </button>
      </div>

      {/* Premium Job Detail Lateral Panel */}
      {selectedJob && (
        <>
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] animate-in fade-in duration-300 shadow-2xl" 
            onClick={() => setSelectedJob(null)} 
          />
          <div className="fixed top-0 right-0 h-full w-full max-w-2xl bg-white z-[101] shadow-[-20px_0_100px_rgba(0,0,0,0.1)] border-l border-slate-100 flex flex-col p-0 transition-transform duration-500 animate-in slide-in-from-right-full">
            <button 
              onClick={() => setSelectedJob(null)}
              className="absolute top-8 left-[-70px] w-14 h-14 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-2xl border border-slate-100 hover:scale-110 active:scale-95 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="flex-1 overflow-y-auto scrollbar-hide">
               {/* Hero Header */}
               <div className="bg-slate-900 p-12 text-white relative overflow-hidden">
                  <div className="relative z-10 flex flex-col gap-6">
                     <img src={selectedJob.logo} className="w-24 h-24 rounded-3xl border-4 border-slate-800 shadow-2xl bg-white p-2" alt="" />
                     <div>
                        <div className="flex items-center gap-3 mb-3">
                           <span className="text-[10px] font-black text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/20 uppercase tracking-widest">{selectedJob.match}</span>
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Clock className="w-3 h-3" /> {selectedJob.posted}</span>
                        </div>
                        <h2 className="text-4xl font-black tracking-tighter leading-none italic mb-2">{selectedJob.title}</h2>
                        <div className="flex items-center gap-4 text-slate-400 text-lg font-bold">
                           <span className="text-white">{selectedJob.company}</span>
                           <span className="w-1.5 h-1.5 bg-slate-700 rounded-full" />
                           <span>{selectedJob.location}</span>
                        </div>
                     </div>
                  </div>
                  <Sparkles className="absolute -bottom-10 -right-10 w-64 h-64 text-blue-400/10" />
               </div>

               <div className="p-12 space-y-12 pb-32">
                  <div className="grid grid-cols-2 gap-6">
                     <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Estimated Salary</span>
                        <div className="flex items-baseline gap-2">
                           <span className="text-2xl font-black text-slate-900 tracking-tight">{selectedJob.salary}</span>
                           <span className="text-[10px] font-bold text-slate-400 uppercase">/ year</span>
                        </div>
                     </div>
                     <div className="p-6 rounded-3xl bg-[#1B5E20]/5 border border-[#1B5E20]/10">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#1B5E20] block mb-2">Match Grade</span>
                        <div className="flex items-baseline gap-2">
                           <span className="text-2xl font-black text-[#1B5E20] tracking-tight">PLATINUM</span>
                           <span className="text-[10px] font-bold text-[#1B5E20] uppercase tracking-widest flex items-center gap-1 opacity-60"><Star className="w-3 h-3 fill-current" /> High Signal</span>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <h3 className="text-[13px] font-black uppercase tracking-[0.3em] text-slate-800 border-b border-slate-100 pb-4">Key Attributes & Benefits</h3>
                     <div className="flex flex-wrap gap-3">
                        {selectedJob.benefits.map(benefit => (
                          <span key={benefit} className="px-6 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-black text-slate-600 shadow-sm flex items-center gap-3">
                             <CheckCircle2 className="w-4 h-4 text-green-500" /> {benefit}
                          </span>
                        ))}
                        <span className="px-6 py-3 bg-blue-50 border border-blue-100 rounded-2xl text-xs font-black text-blue-600 shadow-sm flex items-center gap-3">
                           <ShieldCheck className="w-4 h-4" /> Full Relocation Support
                        </span>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <h3 className="text-[13px] font-black uppercase tracking-[0.3em] text-slate-800 border-b border-slate-100 pb-4">Executive Briefing</h3>
                     <p className="text-lg text-slate-500 font-medium leading-relaxed italic opacity-80">
                        As a {selectedJob.title} at {selectedJob.company}, you will lead critical architectural decisions and drive innovation across our core platforms. This is an elite position requiring advanced technical mastery and visionary leadership to scale products serving millions across the region.
                     </p>
                  </div>
               </div>
            </div>

            <div className="p-10 border-t border-slate-100 bg-white/80 backdrop-blur-xl flex items-center gap-4">
               <button className="flex-1 h-16 bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-4 active:scale-[0.98]">
                  Initiate Application <ChevronRight className="w-4 h-4" />
               </button>
               <button className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 hover:text-[#1B5E20] hover:border-[#1B5E20]/20 hover:shadow-xl transition-all active:scale-[0.98]">
                  <Bookmark className="w-6 h-6" />
               </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
