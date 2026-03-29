"use client";

import { useState } from "react";
import { Search, MapPin, Briefcase, Users, Star, Filter, Target, MoreHorizontal, MessageSquare, Building2, Sparkles, CheckCircle2, SearchCode, Layout } from "lucide-react";
import Link from "next/link";

const CANDIDATES = [
  { 
    id: "c1", 
    name: "Dr. Catherine Namubiru", 
    headline: "Senior Cloud Architect | Fintech Pioneer", 
    location: "Kampala, Uganda", 
    skills: ["AWS", "Azure", "Fintech Architecture", "Team Leadership"], 
    experience: "12+ Years",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    verified: true,
    matching: 98
  },
  { 
    id: "c2", 
    name: "Robert Kizito", 
    headline: "Frontend Architect | Next.js Expert", 
    location: "Nairobi, Kenya", 
    skills: ["Next.js", "TypeScript", "UI/UX Architecture"], 
    experience: "8 Years",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    verified: true,
    matching: 92
  },
  { 
    id: "c3", 
    name: "Fatuma Ali", 
    headline: "Cybersecurity Lead @ National Bank", 
    location: "Kampala, Uganda", 
    skills: ["SOC", "Infosec", "Risk Assessment"], 
    experience: "6 Years",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    verified: false,
    matching: 85
  }
];

export default function TalentSolutionsPage() {
  const [activeFilters, setActiveFilters] = useState(["Kampala", "Senior"]);

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      {/* Search Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="space-y-4">
           <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 w-fit rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100">
              <Target className="w-3 h-3" /> enterprise recruitment suite
           </div>
           <h1 className="text-5xl font-black text-slate-800 tracking-tighter leading-none">
              Elite <span className="text-blue-600">Talent Discovery</span>
           </h1>
           <p className="text-lg text-slate-500 font-medium max-w-xl italic">
              Access the largest database of verified professionals in East Africa with advanced AI-powered filtering.
           </p>
        </div>
        <div className="flex items-center gap-4 h-fit">
           <Link href="/network/talent/dashboard" className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white border border-slate-100 text-slate-800 font-black text-xs hover:bg-slate-50 transition-all shadow-xl shadow-slate-100 tracking-widest uppercase">
              <Layout className="w-4 h-4" /> Go to Dashboard
           </Link>
           <button className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 text-white font-black text-xs hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 tracking-widest uppercase">
              <Filter className="w-4 h-4" /> Save Search
           </button>
           <button className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 text-white font-black text-xs hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 tracking-widest uppercase">
              <Users className="w-4 h-4" /> Export Leads
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         {/* Advanced Filters */}
         <aside className="lg:col-span-3 space-y-8">
            <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl space-y-8">
               <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-50 pb-4">Precision Filters</h3>
               
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Experience Level</label>
                  {['Entry (0-2y)', 'Mid (3-5y)', 'Senior (6-10y)', 'Director (10y+)'].map(lvl => (
                    <div key={lvl} className="flex items-center gap-3 py-1.5 cursor-pointer group">
                       <div className="w-4 h-4 rounded border border-slate-200 flex items-center justify-center group-hover:border-blue-500 transition-colors">
                          <CheckCircle2 className="w-3 h-3 text-blue-600 opacity-0 group-hover:opacity-40" />
                       </div>
                       <span className="text-sm font-bold text-slate-700">{lvl}</span>
                    </div>
                  ))}
               </div>

               <div className="space-y-4 pt-4 border-t border-slate-50">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Industry</label>
                  <select className="w-full h-11 px-4 rounded-xl border border-slate-100 bg-slate-50 text-[10px] font-black uppercase tracking-widest outline-none">
                     <option>Telecommunications</option>
                     <option>Fintech/Payments</option>
                     <option>Healthcare</option>
                     <option>Government</option>
                  </select>
               </div>

               <div className="space-y-4 pt-4 border-t border-slate-50">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Verified Badge</label>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-blue-50 border border-blue-100">
                     <span className="text-[10px] font-black text-blue-800">Elite Talent Only</span>
                     <div className="w-10 h-6 bg-blue-600 rounded-full relative p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full absolute right-1" />
                     </div>
                  </div>
               </div>
            </div>
         </aside>

         {/* Candidate Feed */}
         <main className="lg:col-span-9 space-y-6 pb-32">
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl p-4 flex items-center gap-4 mb-8">
               <div className="relative flex-1 group">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search by skill, company, or job title..."
                    className="w-full h-14 pl-14 pr-6 rounded-3xl border-none outline-none bg-slate-50 text-sm font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all"
                  />
               </div>
               <button className="h-14 px-8 rounded-3xl bg-blue-600 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-100">
                  Search Now
               </button>
            </div>

            <div className="space-y-4">
               {CANDIDATES.map(candidate => (
                 <div key={candidate.id} className="relative bg-white rounded-[3rem] p-10 border border-slate-100 hover:shadow-[0_20px_80px_rgba(0,0,0,0.08)] hover:border-blue-100 transition-all duration-700 group flex flex-col md:flex-row items-center gap-10">
                    <div className="relative">
                       <img src={candidate.avatar} className="w-32 h-32 rounded-full border-8 border-white shadow-2xl object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                       <div className="absolute top-2 right-2 bg-blue-600 p-2 rounded-full border-4 border-white shadow-xl">
                          <Sparkles className="w-4 h-4 text-white" />
                       </div>
                    </div>
                    
                    <div className="flex-1 min-w-0 text-center md:text-left">
                       <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                          <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-none">{candidate.name}</h3>
                          {candidate.verified && (
                            <span className="w-fit mx-auto md:mx-0 flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-green-100">
                               <CheckCircle2 className="w-3 h-3" /> Identity Verified
                            </span>
                          )}
                       </div>
                       <p className="text-sm font-medium text-slate-500 leading-relaxed mb-4 italic opacity-80">{candidate.headline}</p>
                       
                       <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
                          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                             <MapPin className="w-3.5 h-3.5" /> {candidate.location}
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                             <Briefcase className="w-3.5 h-3.5" /> {candidate.experience} exp.
                          </div>
                       </div>

                       <div className="flex flex-wrap justify-center md:justify-start gap-2">
                          {candidate.skills.map(skill => (
                            <span key={skill} className="px-4 py-1.5 bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-600 rounded-full border border-slate-100 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-all">
                               {skill}
                            </span>
                          ))}
                       </div>
                    </div>

                    <div className="w-full md:w-fit flex flex-col gap-3">
                       <div className="p-4 rounded-3xl bg-blue-600/5 border border-blue-100 flex flex-col items-center justify-center text-center">
                          <span className="text-[11px] font-black text-blue-600 block leading-none">{candidate.matching}%</span>
                          <span className="text-[8px] font-black uppercase tracking-widest text-blue-400 mt-1">Match Grade</span>
                       </div>
                       <button className="w-full px-10 py-3.5 rounded-full bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95">
                          View profile
                       </button>
                    </div>
                 </div>
               ))}
            </div>
         </main>
      </div>
    </div>
  );
}
