"use client";

import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer2, 
  ArrowUpRight, 
  Sparkles, 
  Globe, 
  Target,
  Clock,
  ChevronRight,
  ShieldCheck,
  ChevronLeft
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function PageAnalytics() {
  const params = useParams();
  const pageName = "SafeBoda Uganda"; // Mocking for now

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
         <div className="space-y-4">
            <Link href="/network/pages" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#1B5E20] flex items-center gap-2 transition-colors">
               <ChevronLeft className="w-3.5 h-3.5" /> Back to Pages
            </Link>
            <h1 className="text-5xl font-black text-slate-800 tracking-tighter leading-none italic">
               Analytics <span className="text-orange-500">Pulse</span>.
            </h1>
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white font-black text-xs">SB</div>
               <p className="text-lg text-slate-500 font-medium italic opacity-80">{pageName} Enterprise Performance</p>
            </div>
         </div>
         <div className="flex gap-4">
            <select className="h-12 px-6 rounded-full border border-slate-100 bg-white text-xs font-black uppercase tracking-widest outline-none focus:ring-4 focus:ring-orange-50 transition-all">
               <option>Last 30 Days</option>
               <option>Last 90 Days</option>
               <option>This Year</option>
            </select>
            <button className="h-12 px-8 rounded-full bg-slate-900 text-white font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95">
               Export Report
            </button>
         </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
         {[
           { label: "Page Views", val: "42.8k", trend: "+12%", icon: Eye, color: "text-blue-500", bg: "bg-blue-50" },
           { label: "Unique Visitors", val: "18.2k", trend: "+8.5%", icon: Users, color: "text-purple-500", bg: "bg-purple-50" },
           { label: "Follower Growth", val: "+2.4k", trend: "+24%", icon: TrendingUp, color: "text-green-500", bg: "bg-green-50" },
           { label: "Post Engagement", val: "5.6%", trend: "-1.2%", icon: MousePointer2, color: "text-orange-500", bg: "bg-orange-50" }
         ].map((stat, i) => (
           <div key={i} className="p-8 rounded-[3rem] bg-white border border-slate-100 shadow-xl hover:shadow-2xl transition-all group overflow-hidden relative">
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} w-fit mb-6 group-hover:scale-110 transition-transform`}>
                 <stat.icon className="w-6 h-6" />
              </div>
              <p className="text-3xl font-black text-slate-800 tracking-tighter">{stat.val}</p>
              <div className="flex items-center justify-between mt-1">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                 <span className={`text-[10px] font-black ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>{stat.trend}</span>
              </div>
              <Sparkles className="absolute -bottom-8 -right-8 w-32 h-32 opacity-5 text-slate-300 group-hover:rotate-12 transition-transform duration-1000" />
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         {/* Charts Mockup */}
         <main className="lg:col-span-8 space-y-12">
            <div className="p-12 bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl relative overflow-hidden group">
               <div className="flex items-center justify-between mb-12">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                     <BarChart3 className="w-5 h-5 text-orange-500" /> Visitor Demographics
                  </h3>
                  <div className="flex gap-2">
                     <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
                        <div className="w-2 h-2 rounded-full bg-orange-500" />
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Technologists</span>
                     </div>
                     <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Management</span>
                     </div>
                  </div>
               </div>
               
               {/* Visual Mock of a Chart */}
               <div className="h-64 flex items-end gap-4 px-4 pb-4 border-b border-l border-slate-50 mt-8 relative">
                  {[40, 70, 45, 90, 65, 30, 85, 55, 75, 50, 95, 60].map((h, i) => (
                    <div key={i} className="flex-1 space-y-2 group/bar">
                       <div 
                         className="w-full bg-slate-100 rounded-t-xl group-hover/bar:bg-orange-500 transition-all duration-500 relative" 
                         style={{ height: `${h}%` }}
                       >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap">
                             {h * 120} views
                          </div>
                       </div>
                       <div className="text-[8px] font-black text-slate-300 text-center uppercase">W{i+1}</div>
                    </div>
                  ))}
               </div>
               
               <p className="mt-8 text-[11px] text-slate-400 font-medium italic text-center">"Visualizing regional engagement peaks across East Africa."</p>
            </div>

            {/* Performance by Region */}
            <div className="p-12 bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl">
               <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-12 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-500" /> Geographical Reach
               </h3>
               <div className="space-y-8">
                  {[
                    { country: "Uganda", city: "Kampala", weight: "62%", color: "bg-orange-500" },
                    { country: "Kenya", city: "Nairobi", weight: "18%", color: "bg-blue-500" },
                    { country: "Nigeria", city: "Lagos", weight: "12%", color: "bg-green-500" },
                    { country: "Global", city: "Remote", weight: "8%", color: "bg-slate-300" }
                  ].map((loc, i) => (
                    <div key={i} className="space-y-3">
                       <div className="flex items-center justify-between">
                          <p className="text-xs font-black text-slate-800 uppercase tracking-widest">{loc.country} <span className="text-slate-400 font-medium">({loc.city})</span></p>
                          <span className="text-xs font-black text-slate-800">{loc.weight}</span>
                       </div>
                       <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden shadow-inner">
                          <div className={`h-full ${loc.color} transition-all duration-1000`} style={{ width: loc.weight }} />
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </main>

         {/* Sidebar Suggestions */}
         <aside className="lg:col-span-4 space-y-12">
            <div className="p-10 bg-orange-600 rounded-[3rem] text-white shadow-2xl space-y-8 relative overflow-hidden group">
               <div className="relative z-10 text-center">
                  <ShieldCheck className="w-12 h-12 mx-auto mb-6 opacity-50" />
                  <h3 className="text-2xl font-black tracking-tight leading-none mb-4 italic">Enterprise Edge</h3>
                  <p className="text-sm text-orange-100 font-medium leading-relaxed italic mb-8">Upgrade branding toolkit to unlock heatmaps and direct visitor outreach.</p>
                  <button className="w-full py-4 rounded-full bg-white text-orange-600 font-black text-xs uppercase tracking-[0.2em] hover:bg-orange-50 transition-all shadow-xl shadow-orange-900/20 active:scale-95">
                     ACTIVATE ENTERPRISE
                  </button>
               </div>
               <Target className="absolute -bottom-10 -left-10 w-48 h-48 opacity-10 rotate-12 group-hover:scale-125 transition-transform duration-700" />
            </div>

            <div className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-xl space-y-8">
               <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-orange-600 border-b border-slate-50 pb-6 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" /> AI Insight
               </h3>
               <p className="text-xs font-bold text-slate-600 leading-relaxed italic">"Your page visits spike between 9 AM and 11 AM EAT. Sponsoring jobs during this window increases applicant precision by 2x."</p>
               <button className="w-full py-3.5 rounded-full border border-orange-500 text-orange-600 font-black text-[10px] uppercase tracking-widest hover:bg-orange-50 transition-all">
                  Schedule Auto-Boost
               </button>
            </div>
         </aside>
      </div>
    </div>
  );
}
