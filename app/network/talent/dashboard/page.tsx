"use client";

import { useState } from "react";
import { 
  Users, 
  Briefcase, 
  Target, 
  TrendingUp, 
  Clock, 
  Search, 
  Filter, 
  MoreHorizontal, 
  ChevronRight, 
  Layout, 
  Sparkles, 
  UserPlus, 
  ArrowUpRight,
  BarChart3,
  Mail,
  CheckCircle2,
  Zap
} from "lucide-react";
import Link from "next/link";

const RECENT_APPLICANTS = [
  { id: "a1", name: "Sarah Namayanja", role: "Sr. Backend Engineer", exp: "8y", match: 98, status: "Under Review", time: "2h ago", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80" },
  { id: "a2", name: "David Walusimbi", role: "Full Stack Developer", exp: "5y", match: 92, status: "Interviewed", time: "5h ago", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80" },
  { id: "a3", name: "Fatuma Ali", role: "Cybersecurity Lead", exp: "6y", match: 88, status: "New", time: "Yesterday", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80" }
];

const ACTIVE_JOBS = [
  { id: "j1", title: "Senior Cloud Architect", applicants: 124, status: "Active", time: "3d left", color: "bg-blue-500" },
  { id: "j2", title: "Lead UX Researcher", applicants: 86, status: "Reviewing", time: "5d left", color: "bg-orange-500" },
  { id: "j3", title: "DevOps Specialist", applicants: 42, status: "Active", time: "1w left", color: "bg-emerald-500" }
];

export default function RecruiterDashboard() {
  const [activeJobMenuId, setActiveJobMenuId] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="space-y-4">
           <div className="flex items-center gap-2 px-3 py-1 bg-[#1B5E20]/10 text-[#1B5E20] w-fit rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-[#1B5E20]/10">
              <Layout className="w-3 h-3" /> Talent Solutions Dashboard
           </div>
           <h1 className="text-5xl font-black text-slate-800 tracking-tighter leading-none">
              Recruitment <span className="text-[#1B5E20]">Intelligence</span>
           </h1>
           <p className="text-lg text-slate-500 font-medium max-w-xl italic">
              Manage your talent pipeline with real-time insights and AI-powered candidate ranking.
           </p>
        </div>
        <div className="flex items-center gap-4 h-fit">
           <button className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white border border-slate-100 text-slate-800 font-black text-xs hover:bg-slate-50 transition-all shadow-xl shadow-slate-100 tracking-widest uppercase">
              <Mail className="w-4 h-4" /> Message All
           </button>
           <button className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#1B5E20] text-white font-black text-xs hover:bg-green-800 transition-all shadow-xl shadow-green-900/10 tracking-widest uppercase">
              <Zap className="w-4 h-4" /> Post New Job
           </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {[
          { label: "Active Job Postings", value: "12", sub: "+2 this week", icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Total Applicants", value: "2,840", sub: "124 unreviewed", icon: Users, color: "text-[#1B5E20]", bg: "bg-green-50" },
          { label: "Pipeline Quality", value: "92%", sub: "High match rate", icon: Target, color: "text-orange-600", bg: "bg-orange-50" },
          { label: "Avg Time to Hire", value: "18d", sub: "-2d from last month", icon: Clock, color: "text-purple-600", bg: "bg-purple-50" }
        ].map((stat, idx) => (
          <div key={idx} className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 group">
             <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm`}>
                <stat.icon className="w-6 h-6" />
             </div>
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{stat.label}</p>
             <h3 className="text-4xl font-black text-slate-800 tracking-tight leading-tight">{stat.value}</h3>
             <p className="text-[11px] font-bold text-slate-500 mt-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-500" /> {stat.sub}
             </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Recent Applicants */}
        <section className="lg:col-span-8 space-y-8">
           <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-2">
                 <Sparkles className="w-4.5 h-4.5 text-orange-500" /> Recent Top Matches
              </h2>
              <Link href="/network/talent" className="text-[10px] font-black uppercase tracking-widest text-[#1B5E20] hover:underline flex items-center gap-1">
                 View All Solutions <ArrowUpRight className="w-3 h-3" />
              </Link>
           </div>

           <div className="grid grid-cols-1 gap-4">
              {RECENT_APPLICANTS.map((app) => (
                <div key={app.id} className="p-8 bg-white rounded-[2.5rem] border border-slate-100 hover:shadow-2xl transition-all duration-700 group flex items-center gap-6">
                   <div className="relative">
                      <img src={app.avatar} className="w-20 h-20 rounded-full border-4 border-white shadow-xl object-cover group-hover:scale-105 transition-all duration-500" alt="" />
                      <div className="absolute top-0 right-0 bg-[#1B5E20] p-1.5 rounded-full border-2 border-white shadow-lg">
                         <CheckCircle2 className="w-3 h-3 text-white" />
                      </div>
                   </div>
                   
                   <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                         <h3 className="text-xl font-black text-slate-800 tracking-tight leading-tight group-hover:text-[#1B5E20] transition-colors">{app.name}</h3>
                         <span className="text-[9px] font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md uppercase tracking-widest border border-orange-100">{app.match}% Match</span>
                      </div>
                      <p className="text-[12px] text-slate-500 font-bold uppercase tracking-widest opacity-80">{app.role} · {app.exp} exp.</p>
                      
                      <div className="flex items-center gap-4 mt-4">
                         <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <Clock className="w-3.5 h-3.5" /> Applied {app.time}
                         </div>
                         <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                            app.status === 'Interviewed' ? 'bg-purple-50 text-purple-600 border-purple-100' : 
                            app.status === 'Under Review' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                            'bg-slate-50 text-slate-400 border-slate-100'
                         }`}>
                            {app.status}
                         </div>
                      </div>
                   </div>

                   <div className="flex gap-3">
                      <button className="p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 text-slate-400 transition-all flex items-center justify-center">
                         <Mail className="w-5 h-5" />
                      </button>
                      <button className="px-8 py-3.5 rounded-2xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-100 hover:bg-slate-800 transition-all active:scale-95">
                         View Pipeline
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* Active Jobs & Market Insights */}
        <aside className="lg:col-span-4 space-y-12">
           <section className="space-y-6">
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em]">Active Pipeline</h2>
              <div className="space-y-4">
                 {ACTIVE_JOBS.map((job) => (
                   <div key={job.id} className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-xl hover:border-[#1B5E20]/20 transition-all group">
                      <div className="flex items-start justify-between mb-4">
                         <div className={`w-10 h-10 rounded-xl ${job.color} flex items-center justify-center text-white shadow-lg`}>
                            <Briefcase className="w-5 h-5" />
                         </div>
                        <button
                          onClick={() => setActiveJobMenuId(job.id)}
                          className="p-2 rounded-full hover:bg-slate-50 text-slate-300"
                        >
                            <MoreHorizontal className="w-4 h-4" />
                         </button>
                      </div>
                      <h4 className="text-base font-black text-slate-800 tracking-tight leading-tight mb-2 group-hover:text-[#1B5E20] transition-colors">{job.title}</h4>
                      <div className="flex items-center justify-between mt-6">
                         <div className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest">{job.applicants} Applicants</span>
                         </div>
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">{job.time}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-50 rounded-full mt-4 overflow-hidden">
                         <div className={`h-full ${job.color} opacity-60 w-[65%]`} />
                      </div>
                   </div>
                 ))}
              </div>
              <button className="w-full py-4 rounded-[2rem] border-2 border-dashed border-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:border-[#1B5E20]/20 hover:text-[#1B5E20] transition-all">
                 + Create New Job Pipeline
              </button>
           </section>

           <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group border border-slate-800">
              <div className="relative z-10">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-6 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" /> Talent Analytics
                 </h3>
                 <p className="text-base font-black tracking-tight leading-tight mb-6">Market demand for Cloud roles is up 24% this month.</p>
                 <button className="text-[11px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2 hover:underline">
                    Download Market Report <ChevronRight className="w-4 h-4" />
                 </button>
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 text-blue-400 group-hover:scale-110 transition-transform duration-500" />
           </div>
        </aside>
      </div>

      {activeJobMenuId && (
        <div className="fixed inset-0 z-[140]">
          <button
            type="button"
            aria-label="Close job options"
            onClick={() => setActiveJobMenuId(null)}
            className="absolute inset-0 bg-black/20"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[2rem] shadow-[0_-20px_60px_rgba(0,0,0,0.2)] border-t border-slate-100 py-2 animate-in slide-in-from-bottom-4 duration-200">
            <div className="w-12 h-1.5 rounded-full bg-slate-300 mx-auto my-3" />
            <button onClick={() => setActiveJobMenuId(null)} className="w-full text-left px-6 py-4 text-[18px] font-medium text-slate-700 hover:bg-slate-50 transition-colors">
              View pipeline
            </button>
            <button onClick={() => setActiveJobMenuId(null)} className="w-full text-left px-6 py-4 text-[18px] font-medium text-slate-700 hover:bg-slate-50 transition-colors">
              Pause job
            </button>
            <button onClick={() => setActiveJobMenuId(null)} className="w-full text-left px-6 py-4 text-[18px] font-medium text-red-500 hover:bg-red-50 transition-colors">
              Close posting
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
