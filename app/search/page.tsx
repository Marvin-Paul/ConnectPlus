"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Users, Briefcase, FileText, 
  MapPin, Building2, Sparkles, Clock, Globe, 
  CheckCircle2, DollarSign, Star, TrendingUp, SlidersHorizontal
} from "lucide-react";
import Link from "next/link";

// ─── Constants ────────────────────────────────────────────────────────────────

const PEOPLE_RESULTS = [
  { 
    id: "r1", 
    name: "David Walusimbi", 
    headline: "Data Scientist | Python | AI Research | GDE Expert", 
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80", 
    mutuals: 24, 
    location: "Kampala, Uganda",
    skills: ["AI Models", "Python", "Data Viz"],
    isPremium: true
  },
  { 
    id: "r2", 
    name: "Sarah Johnson", 
    headline: "Senior Product Manager @ Microsoft | Scaling Fintech", 
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80", 
    mutuals: 12, 
    location: "Seattle, WA · Remote",
    skills: ["Product Strategy", "Agile", "Market Dev"],
    isPremium: false
  }
];

const JOB_RESULTS = [
  { 
    id: "j1", 
    title: "Senior Full Stack Engineer", 
    company: "Chipper Cash", 
    location: "Kampala, Uganda", 
    logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=128&h=128", 
    type: "Full-time", 
    posted: "2d ago",
    salary: "$2,500 - $4,000",
    matching: 94
  },
  { 
    id: "j2", 
    title: "Staff Backend Architect", 
    company: "SafeBoda", 
    location: "Nairobi, Kenya", 
    logo: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=128&h=128", 
    type: "Contract", 
    posted: "5h ago",
    salary: "$3,000 - $5,500",
    matching: 88
  }
];

// ─── Main Component ───────────────────────────────────────────────────────────

function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const [activeTab, setActiveTab] = useState<"all" | "people" | "jobs" | "posts">("all");

  return (
    <div className="max-w-6xl mx-auto py-16 px-6">
      
      {/* Search Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="space-y-6">
           <div className="flex items-center gap-2 px-4 py-1.5 bg-[#1B5E20]/5 text-[#1B5E20] w-fit rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-[#1B5E20]/10 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" /> global discovery engine
           </div>
           <h1 className="text-6xl font-black text-slate-800 dark:text-white tracking-tighter leading-none">
              Results for <span className="text-[#1B5E20] dark:text-green-500">"{q}"</span>
           </h1>
           <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl italic leading-relaxed opacity-80">
              Uncovering professional intersections, experts, and market insights relevant to your search query.
           </p>
        </div>
        <div className="flex items-center gap-4 h-fit">
           <button className="flex items-center gap-2 px-10 py-4 rounded-3xl bg-slate-100 dark:bg-slate-800 text-[#1B5E20] dark:text-green-500 font-black text-xs uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shadow-xl shadow-slate-200/50 dark:shadow-none active:scale-95">
              <SlidersHorizontal className="w-4 h-4" /> Fine-tune Results
           </button>
        </div>
      </div>

      {/* Navigation & Controls */}
      <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 p-5 flex flex-col md:flex-row items-center gap-6 shadow-[0_40px_100px_rgba(0,0,0,0.06)] dark:shadow-none mb-20 relative z-30 sticky top-24">
         <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide px-2 w-full md:w-auto">
            {[
              { id: "all", label: "Synthesis", icon: Globe },
              { id: "people", label: "Experts", icon: Users },
              { id: "jobs", label: "Open Roles", icon: Briefcase },
              { id: "posts", label: "Activity", icon: FileText }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2.5 px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap active:scale-95 ${activeTab === tab.id ? 'bg-[#1B5E20] text-white shadow-2xl shadow-green-900/20' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-700'}`}
              >
                <tab.icon className="w-4 h-4" /> {tab.label}
              </button>
            ))}
         </div>
         <div className="md:ml-auto pr-6 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
            <span>Live Analysis</span>
            <div className="flex items-center gap-1.5 text-[#1B5E20] dark:text-green-500 opacity-100">
               <TrendingUp className="w-3.5 h-3.5" /> High Signal
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
         {/* Results Feed */}
         <div className="lg:col-span-8 space-y-16">
            
            {/* Experts / People */}
            {(activeTab === "all" || activeTab === "people") && (
              <section className="space-y-8 animate-in fade-in duration-700">
                 <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800 pb-6">
                    <h2 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-[0.3em] flex items-center gap-2">
                       <Users className="w-5 h-5 text-[#1B5E20] dark:text-green-500" /> Professional Experts
                    </h2>
                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">3,842 Specialists Found</span>
                 </div>
                 <div className="space-y-6">
                    {PEOPLE_RESULTS.map(person => (
                      <div key={person.id} className="relative p-12 bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 hover:shadow-2xl dark:hover:shadow-none hover:border-[#1B5E20]/10 transition-all duration-700 group flex flex-col md:flex-row items-center gap-10">
                         <div className="relative shrink-0">
                            <div className="absolute -inset-4 bg-[#1B5E20]/20 rounded-full blur-2xl group-hover:bg-[#1B5E20]/40 transition-all duration-1000 opacity-0 group-hover:opacity-100" />
                            <img src={person.avatar} className="w-28 h-28 rounded-[2rem] border-4 border-white dark:border-slate-900 shadow-2xl object-cover group-hover:scale-110 transition-transform duration-500 relative z-10" alt="" />
                            <div className="absolute -bottom-2 -right-2 bg-[#1B5E20] text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest z-20 shadow-xl border-2 border-white dark:border-slate-900 animate-pulse">
                               98% match
                            </div>
                            {person.isPremium && (
                              <div className="absolute -top-3 -right-3 bg-yellow-400 p-2.5 rounded-2xl shadow-xl shadow-yellow-900/20 border-4 border-white dark:border-slate-900 rotate-12 z-20">
                                 <Star className="w-4 h-4 text-white fill-current" />
                              </div>
                            )}
                         </div>
                         
                         <div className="flex-1 min-w-0 text-center md:text-left">
                            <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight leading-none mb-2 group-hover:text-[#1B5E20] dark:group-hover:text-green-500 transition-colors">{person.name}</h3>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed italic opacity-80 mb-6">{person.headline}</p>
                            
                            <div className="flex flex-wrap justify-center md:justify-start gap-3">
                               {person.skills.map(skill => (
                                 <span key={skill} className="px-4 py-1.5 bg-slate-50 dark:bg-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 rounded-full border border-slate-100 dark:border-slate-700 group-hover:text-[#1B5E20] dark:group-hover:text-green-500 group-hover:bg-green-50 dark:group-hover:bg-green-900/20 group-hover:border-green-100 dark:group-hover:border-green-900/30 transition-all">{skill}</span>
                               ))}
                            </div>

                            <div className="flex items-center justify-center md:justify-start gap-6 mt-8">
                               <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                  <MapPin className="w-3.5 h-3.5" /> {person.location}
                               </div>
                               <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                  <Users className="w-3.5 h-3.5 text-[#1B5E20] dark:text-green-500" /> {person.mutuals} mutuals
                               </div>
                            </div>
                         </div>

                         <div className="w-full md:w-auto h-full flex items-center">
                            <button className="w-full md:w-auto px-10 py-3.5 rounded-full bg-slate-900 dark:bg-[#1B5E20] text-white font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-slate-200 dark:shadow-none hover:scale-105 active:scale-95 transition-all">
                               Connect
                            </button>
                         </div>
                      </div>
                    ))}
                 </div>
              </section>
            )}

            {/* Opportunities / Jobs */}
            {(activeTab === "all" || activeTab === "jobs") && (
              <section className="space-y-8 animate-in fade-in duration-700">
                 <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800 pb-6">
                    <h2 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-[0.3em] flex items-center gap-2">
                       <Briefcase className="w-5 h-5 text-[#1B5E20] dark:text-green-500" /> Market Opportunities
                    </h2>
                 </div>
                 <div className="space-y-6">
                    {JOB_RESULTS.map(job => (
                      <div key={job.id} className="p-12 bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 hover:shadow-2xl dark:hover:shadow-none transition-all duration-700 group flex flex-col md:flex-row items-center gap-10">
                         <div className="w-20 h-20 rounded-[1.5rem] bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center p-4 group-hover:rotate-6 transition-transform shadow-lg shadow-slate-100 dark:shadow-none">
                            <img src={job.logo} className="w-full h-full object-contain" alt="" />
                         </div>
                         
                         <div className="flex-1 min-w-0 text-center md:text-left">
                            <h3 className="text-xl font-black text-[#1B5E20] dark:text-green-500 tracking-tight leading-none mb-2 group-hover:translate-x-1 transition-transform">{job.title}</h3>
                            <div className="flex flex-col md:flex-row md:items-center gap-4 mt-2">
                               <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">{job.company} <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /></div>
                               <div className="hidden md:block w-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-full" />
                               <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                                  <MapPin className="w-3.5 h-3.5" /> {job.location}
                               </div>
                            </div>
                            
                            <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-6">
                               <div className="flex items-center gap-2 text-[11px] font-black text-slate-900 dark:text-slate-100 uppercase tracking-widest">
                                  <DollarSign className="w-3.5 h-3.5 text-[#1B5E20] dark:text-green-500" /> {job.salary}
                               </div>
                               <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#1B5E20]/60 dark:text-green-500/60">
                                  <Clock className="w-3.5 h-3.5" /> {job.posted}
                               </div>
                            </div>
                         </div>

                         <div className="w-full md:w-auto flex flex-col gap-3 items-center">
                            <div className="px-5 py-2 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 flex flex-col items-center justify-center text-center">
                               <span className="text-[11px] font-black text-[#1B5E20] dark:text-green-500">{job.matching}%</span>
                               <span className="text-[8px] font-black uppercase tracking-widest opacity-40">Match grade</span>
                            </div>
                            <button className="w-full px-10 py-3.5 rounded-full border-2 border-[#1B5E20] dark:border-green-600 text-[#1B5E20] dark:text-green-500 font-black text-[11px] uppercase tracking-widest hover:bg-green-50 dark:hover:bg-green-900/10 transition-all">
                               Integrate
                            </button>
                         </div>
                      </div>
                    ))}
                 </div>
              </section>
            )}

         </div>

         {/* Meta Discovery Column */}
         <aside className="lg:col-span-4 space-y-12 h-fit sticky top-48">
            <div className="bg-slate-900 rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden group border border-slate-800">
               <div className="relative z-10">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-6 flex items-center gap-2">
                     <Sparkles className="w-4 h-4" /> Professional Intel
                  </h3>
                  <p className="text-2xl font-black tracking-tighter leading-tight mb-10">AI Augmented Search Filtering ✨</p>
                  <div className="space-y-3">
                     {[
                       { label: 'Market Salary Insights', icon: DollarSign },
                       { label: 'Industry Shift Reports', icon: TrendingUp },
                       { label: 'Global Talent Density', icon: Users }
                     ].map(feat => (
                       <button key={feat.label} className="w-full text-left p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-between group/btn">
                          <span className="text-[11px] font-black uppercase tracking-widest text-white/70 group-hover/btn:text-white">{feat.label}</span>
                          <feat.icon className="w-4 h-4 text-blue-400 group-hover/btn:scale-110 transition-transform" />
                       </button>
                     ))}
                  </div>
               </div>
               <Sparkles className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 text-blue-400 group-hover:scale-125 transition-transform duration-1000" />
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-12 border border-slate-100 dark:border-slate-800 shadow-xl dark:shadow-none flex flex-col items-center text-center group">
               <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center mb-8 shadow-inner group-hover:rotate-6 transition-transform">
                  <Building2 className="w-10 h-10 text-[#1B5E20] dark:text-green-500 opacity-40" />
               </div>
               <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight leading-none mb-4">Enterprise Pages</h3>
               <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic mb-10 opacity-80 px-4">
                 Project your corporate vision and mission to over 100k+ global innovators.
               </p>
               <Link href="/network/pages" className="w-full py-4 rounded-full bg-slate-900 dark:bg-[#1B5E20] text-white font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-slate-200 dark:shadow-none hover:scale-105 active:scale-95 transition-all mb-4">
                  Deploy Brand Page
               </Link>
               <p className="text-[9px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-500">No recurring costs for lite entry.</p>
            </div>
         </aside>
      </div>
   
      {/* Search Pagination / Load More */}
      <div className="mt-20 flex flex-col items-center gap-6">
         <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map(p => (
              <button key={p} className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-black uppercase tracking-widest transition-all ${p === 1 ? 'bg-[#1B5E20] text-white shadow-xl shadow-green-900/10 dark:shadow-none' : 'bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                 {p}
              </button>
            ))}
         </div>
         <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
            Professional Link Engine · Page 1 of 342
         </p>
      </div>

    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1B5E20]"></div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
