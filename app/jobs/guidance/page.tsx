"use client";

import { JobsSidebar } from "../jobs-sidebar";
import { BookOpen, TrendingUp, Compass, Clock, Send, CheckCircle2, MoreHorizontal, UserCheck, Briefcase } from "lucide-react";

export default function GuidancePage() {
  const pipeline = [
    { step: "Applied", date: "Mar 20", status: "COMPLETED", icon: Send },
    { step: "Under Review", date: "Mar 22", status: "COMPLETED", icon: UserCheck },
    { step: "Interview", date: "Mar 26", status: "NEXT", icon: Briefcase },
    { step: "Decision", date: "Upcoming", status: "PENDING", icon: CheckCircle2 }
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
      <aside className="lg:col-span-3">
        <JobsSidebar />
      </aside>

      <main className="lg:col-span-9 space-y-6">
        <div className="bg-white rounded-2xl border border-[#e0e0e0] shadow-sm overflow-hidden">
           {/* Header */}
           <div className="p-8 border-b border-[#e0e0e0] bg-slate-50/50">
              <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
                 <Compass className="w-8 h-8 text-[#0a66c2]" /> Jobseeker Guidance
              </h1>
              <p className="text-sm text-[#666666] mt-2 font-medium">Data-driven insights to navigate your professional career.</p>
           </div>

           <div className="p-8">
              <h2 className="text-[11px] font-black text-slate-800 uppercase tracking-widest mb-8 border-b border-slate-100 pb-2">Active application pipeline</h2>
              <div className="relative mb-16 px-4">
                 <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2" />
                 <div className="relative z-10 grid grid-cols-4 gap-4">
                    {pipeline.map((item, idx) => (
                      <div key={item.step} className="flex flex-col items-center">
                         <div className={`w-12 h-12 rounded-full border-4 border-white shadow-xl flex items-center justify-center transition-all ${item.status === "COMPLETED" ? "bg-green-500 text-white scale-110" : item.status === "NEXT" ? "bg-[#0a66c2] text-white scale-110 animate-pulse" : "bg-white text-slate-300 border-slate-100"}`}>
                            <item.icon className="w-5 h-5 shadow-sm" />
                         </div>
                         <h4 className={`text-[11px] font-black uppercase tracking-widest mt-4 text-center ${item.status === "PENDING" ? "text-slate-400" : "text-slate-800"}`}>{item.step}</h4>
                         <p className="text-[9px] font-bold text-[#666666] mt-0.5 uppercase tracking-widest">{item.date}</p>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="p-8 rounded-3xl border border-slate-100 bg-white hover:shadow-2xl transition-all cursor-pointer group">
                    <div className="flex gap-4 items-center mb-6">
                       <div className="p-3 bg-blue-50 rounded-xl group-hover:scale-110 transition-transform">
                          <TrendingUp className="w-6 h-6 text-[#0a66c2]" />
                       </div>
                       <div>
                          <h3 className="text-base font-black text-slate-800">Market Insights</h3>
                          <p className="text-[10px] text-[#666666] font-black uppercase tracking-widest mt-1">Salary trends and demand prediction</p>
                       </div>
                    </div>
                    <div className="space-y-4">
                       <div className="p-4 bg-[#f9fafb] rounded-2xl border border-slate-100 flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-700">Full Stack Engineer</p>
                          <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase tracking-wider">+12.4% Demand</span>
                       </div>
                    </div>
                 </div>

                 <div className="p-8 rounded-3xl border border-slate-100 bg-white hover:shadow-2xl transition-all cursor-pointer group">
                    <div className="flex gap-4 items-center mb-6">
                       <div className="p-3 bg-purple-50 rounded-xl group-hover:scale-110 transition-transform">
                          <Compass className="w-6 h-6 text-purple-600" />
                       </div>
                       <div>
                          <h3 className="text-base font-black text-slate-800">Career Pathing</h3>
                          <p className="text-[10px] text-[#666666] font-black uppercase tracking-widest mt-1">Skills needed for seniority</p>
                       </div>
                    </div>
                    <div className="space-y-3">
                       <p className="text-xs text-[#666666] font-medium leading-relaxed italic">"Next: Senior Engineering Manager. Focus on System Architecture and Team Leadership skills."</p>
                    </div>
                 </div>
              </div>

              <div className="mt-12 p-10 rounded-[40px] bg-gradient-to-br from-[#0a66c2] to-[#004182] text-white shadow-2xl relative overflow-hidden group">
                  <div className="relative z-10 max-w-xl">
                     <h3 className="text-2xl font-black mb-4 tracking-tight">Need expert help? 🧠</h3>
                     <p className="text-sm font-medium opacity-80 leading-relaxed mb-8">
                        Connect with industry mentors to review your resume, practice behaviorials, and plan your career transition with 1-on-1 guidance.
                     </p>
                     <button className="px-10 py-3 rounded-full bg-white text-[#0a66c2] font-black text-sm hover:scale-105 transition-all shadow-xl shadow-blue-900/40 tracking-wider">
                        Browse Mentors
                     </button>
                  </div>
                  <BookOpen className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 group-hover:scale-110 transition-transform" />
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}
