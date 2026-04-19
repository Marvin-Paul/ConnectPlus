"use client";

import { Bookmark, X, Users, Briefcase, MapPin, CheckCircle2, Star, Sparkles, Clock, ShieldCheck, Zap, DollarSign, TrendingUp, ChevronRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { EasyApplyModal } from "@/components/jobs/easy-apply-modal";

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
    website: "https://chippercash.com",
    salary: "UGX 160M - 280M",
    match: "98% Match"
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
    website: "https://safeboda.com",
    salary: "UGX 120M - 180M",
    match: "92% Match"
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
    website: "https://mtn.co.ug",
    salary: "UGX 140M - 220M",
    match: "85% Match"
  }
];

export function JobCard() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [selectedJob, setSelectedJob] = useState<typeof featuredJobs[0] | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setSavedIds(prev => prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]);
  };

  return (
    <div className="relative">
      <div className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.04)] animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white/50 backdrop-blur-xl">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                <Sparkles className="w-5 h-5 text-[#1B5E20]" />
             </div>
             <div>
                <h2 className="text-[12px] font-bold text-slate-900 uppercase tracking-wider">Recommended Positions</h2>
                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider mt-0.5">AI-powered market matching</p>
             </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
             <span className="text-[10px] font-bold text-[#1B5E20] bg-green-50/50 px-3 py-1 rounded-full uppercase tracking-wider border border-green-100/50">Verified Opportunities</span>
          </div>
        </div>
        
        <div className="divide-y divide-slate-50">
          {featuredJobs.map((job) => (
            <div 
              key={job.id} 
              onClick={() => setSelectedJob(job)}
              className="p-8 hover:bg-slate-50/50 transition-all duration-500 cursor-pointer group relative"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-100 shrink-0 bg-white p-2 shadow-sm group-hover:shadow-md transition-all duration-500">
                  <img src={job.logo} alt={job.company} className="w-full h-full object-contain rounded-xl" />
                </div>
                
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-start justify-between gap-4">
                     <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                           <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider border border-blue-100">{job.match}</span>
                           {job.isEasyApply && (
                             <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-wider border border-emerald-100 flex items-center gap-1">
                                <Zap className="w-3 h-3 fill-current" /> Fast Apply
                             </span>
                           )}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight tracking-tight truncate">
                           {job.title}
                        </h3>
                        <div className="flex items-center gap-3">
                           <a 
                             href={job.website} 
                             target="_blank" 
                             rel="noopener noreferrer" 
                             className="text-sm font-semibold text-slate-700 hover:text-[#1B5E20] hover:underline transition-all" 
                             onClick={(e) => e.stopPropagation()}
                           >
                             {job.company}
                           </a>
                           <ShieldCheck className="w-4 h-4 text-blue-500/80" />
                           <span className="w-1 h-1 bg-slate-300 rounded-full" />
                           <p className="text-sm text-slate-500 font-medium flex items-center gap-1.5">
                             <MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}
                           </p>
                        </div>
                     </div>
                     
                     <div className="flex items-center gap-3 shrink-0">
                        <button 
                           onClick={(e) => toggleSave(job.id, e)}
                           aria-label={savedIds.includes(job.id) ? "Remove from saved jobs" : "Save job"}
                           className={`w-12 h-12 rounded-xl transition-all border flex items-center justify-center active:scale-95 ${savedIds.includes(job.id) ? 'bg-[#1B5E20] text-white border-transparent' : 'bg-white text-slate-300 border-slate-200 hover:text-[#1B5E20] hover:border-[#1B5E20]/30'}`}
                        >
                          <Bookmark className={`h-5 w-5 ${savedIds.includes(job.id) ? 'fill-current' : ''}`} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setSelectedJob(job); }}
                          className="hidden sm:flex h-12 px-8 rounded-xl bg-slate-900 text-white font-bold text-[11px] uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 items-center gap-2"
                        >
                           View Details <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                     </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-6 pt-6 border-t border-slate-50">
                     <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 text-slate-400">
                           <Briefcase className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[12px] font-bold text-slate-900 tracking-tight">{job.salary}</span>
                           <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Est. Package</span>
                        </div>
                     </div>

                     <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 text-slate-400">
                           <Users className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[12px] font-bold text-slate-900 tracking-tight">{job.applicants} Applicants</span>
                           <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">In Review</span>
                        </div>
                     </div>

                     <div className="flex items-center gap-3 ml-auto">
                        <div className="flex flex-col text-right">
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{job.posted}</span>
                           <div className="flex items-center gap-1.5 justify-end mt-0.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                              <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Active Hiring</span>
                           </div>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full py-6 text-[11px] font-bold text-slate-400 hover:text-[#1B5E20] hover:bg-slate-50 transition-all border-t border-slate-50 uppercase tracking-widest bg-white">
          Explore comprehensive job market <TrendingUp className="w-3.5 h-3.5 inline ml-2" />
        </button>
      </div>

      {/* Premium Job Detail Lateral Panel */}
      {selectedJob && (
        <>
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] animate-in fade-in duration-300" 
            onClick={() => setSelectedJob(null)} 
          />
          <div className="fixed top-0 right-0 h-full w-full max-w-2xl bg-white z-[101] shadow-2xl border-l border-slate-100 flex flex-col p-0 transition-transform duration-500 animate-in slide-in-from-right-full">
            <button 
              onClick={() => setSelectedJob(null)}
              aria-label="Close job details"
              className="absolute top-8 left-[-60px] w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-xl border border-slate-100 hover:scale-110 active:scale-95 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex-1 overflow-y-auto">
               {/* Hero Header */}
                <div className="bg-slate-950 p-12 text-white relative overflow-hidden">
                   <div className="relative z-10 flex flex-col gap-8">
                      <div className="w-20 h-20 rounded-2xl border border-white/10 shadow-2xl bg-white/5 backdrop-blur-xl p-3">
                         <img src={selectedJob.logo} className="w-full h-full object-contain" alt="" />
                      </div>
                      <div className="space-y-4">
                         <div className="flex items-center gap-3">
                            <span className="text-[10px] font-bold text-blue-400 bg-blue-400/10 px-3 py-1 rounded-lg border border-blue-400/20 uppercase tracking-widest">{selectedJob.match}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><Clock className="w-3 h-3" /> {selectedJob.posted}</span>
                         </div>
                         <h2 className="text-4xl font-bold tracking-tight leading-tight">{selectedJob.title}</h2>
                         <div className="flex items-center gap-4 text-slate-400 text-lg font-semibold">
                            <span className="text-white hover:text-blue-400 transition-colors cursor-pointer">{selectedJob.company}</span>
                            <span className="w-1.5 h-1.5 bg-slate-800 rounded-full" />
                            <span>{selectedJob.location}</span>
                         </div>
                      </div>
                   </div>
                   <div className="absolute top-0 right-0 p-12 opacity-5">
                      <Briefcase className="w-48 h-48" />
                   </div>
                </div>

                <div className="p-12 space-y-12 pb-32">
                   <div className="grid grid-cols-2 gap-6">
                      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100/50">
                         <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2">Package Range</span>
                         <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-slate-900 tracking-tight">{selectedJob.salary}</span>
                            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">/ annum</span>
                         </div>
                      </div>
                      <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100/50">
                         <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 block mb-2">Profile Match</span>
                         <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold text-emerald-900 tracking-tight uppercase">High Compatibility</span>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-6">
                      <h3 className="text-[12px] font-bold uppercase tracking-widest text-slate-900 border-b border-slate-100 pb-4">Professional Benefits</h3>
                      <div className="flex flex-wrap gap-2.5">
                         {selectedJob.benefits.map(benefit => (
                           <span key={benefit} className="px-5 py-2.5 bg-white border border-slate-100 rounded-xl text-[13px] font-semibold text-slate-700 shadow-sm flex items-center gap-3">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {benefit}
                           </span>
                         ))}
                         <span className="px-5 py-2.5 bg-blue-50/50 border border-blue-100/50 rounded-xl text-[13px] font-semibold text-blue-800 flex items-center gap-3">
                            <ShieldCheck className="w-4 h-4" /> Full Relocation Support
                         </span>
                      </div>
                   </div>

                   <div className="space-y-6">
                      <h3 className="text-[12px] font-bold uppercase tracking-widest text-slate-900 border-b border-slate-100 pb-4">Technical Stack</h3>
                       <div className="flex flex-wrap gap-2">
                          {['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'].map(tech => (
                            <span key={tech} className="px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                               {tech}
                            </span>
                          ))}
                       </div>
                   </div>

                    <div className="space-y-6">
                       <h3 className="text-[12px] font-bold uppercase tracking-widest text-slate-900 border-b border-slate-100 pb-4">Corporate Mission</h3>
                       <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
                          Join the {selectedJob.company} engineering team to solve complex architectural challenges within the African fintech ecosystem. We prioritize operational excellence, engineering rigors, and high-impact innovation.
                       </p>
                    </div>
                 </div>
              </div>

             <div className="p-10 border-t border-slate-100 bg-white/90 backdrop-blur-xl flex flex-col gap-4">
                <div className="flex items-center gap-3">
                   <button 
                     onClick={() => {
                        if (selectedJob.isEasyApply) {
                          setIsApplyModalOpen(true);
                        } else {
                          window.open('https://linkedin.com', '_blank');
                        }
                     }}
                     className="flex-1 h-14 bg-slate-950 text-white font-bold text-[11px] uppercase tracking-widest rounded-xl shadow-2xl shadow-slate-950/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                   >
                      {selectedJob.isEasyApply ? (
                        <span className="flex items-center gap-2 italic"><Zap className="w-3.5 h-3.5 fill-current" /> Fast Apply Now</span>
                      ) : (
                        <span>Apply on Company Site</span>
                      )}
                      <ChevronRight className="w-3.5 h-3.5" />
                   </button>
                   <button 
                     aria-label={savedIds.includes(selectedJob?.id || '') ? "Remove from saved jobs" : "Save job"}
                     className="w-14 h-14 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-emerald-700 hover:border-emerald-700/30 hover:shadow-lg transition-all active:scale-[0.95] group"
                   >
                      <Bookmark className="w-5 h-5 group-hover:fill-emerald-700" />
                   </button>
                </div>
                <button className="w-full h-12 border border-slate-200 rounded-xl flex items-center justify-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-[0.98]">
                   <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                   Contact Hiring Lead
                </button>
             </div>
          </div>
        </>
      )}

      {/* Fast Apply Modal */}
      {selectedJob && (
        <EasyApplyModal 
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
          job={{
            id: selectedJob.id,
            title: selectedJob.title,
            company: selectedJob.company,
            logo: selectedJob.logo
          }}
        />
      )}
    </div>
  );
}
