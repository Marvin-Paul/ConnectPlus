"use client";

import { useState } from "react";
import { JobsSidebar } from "../jobs-sidebar";
import { Settings, Eye, Bell, Shield, Trash2, Mail, CheckCircle2, MoreHorizontal, UserCheck, Briefcase, FileText } from "lucide-react";

export default function SettingsPage() {
  const [visibility, setVisibility] = useState("ACTIVELY_LOOKING");
  const [notifications, setNotifications] = useState("DAILY_DIGEST");
  const [oneClickApply, setOneClickApply] = useState(true);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
      <aside className="lg:col-span-3">
        <JobsSidebar />
      </aside>

      <main className="lg:col-span-9 space-y-6 pb-20">
        <div className="bg-white rounded-2xl border border-[#e0e0e0] shadow-sm overflow-hidden">
           {/* Header */}
           <div className="p-8 border-b border-[#e0e0e0] bg-slate-50/50">
              <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
                 <Settings className="w-8 h-8 text-[#0a66c2]" /> Application Settings
              </h1>
              <p className="text-sm text-[#666666] mt-2 font-medium">Manage your visibility, data, and application preferences.</p>
           </div>

           <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                 <div className="p-8 rounded-3xl border border-slate-100 bg-[#f9fafb] relative group overflow-hidden shadow-sm">
                    <div className="flex gap-4 items-baseline mb-6">
                       <h3 className="text-[11px] font-black uppercase tracking-widest text-[#0a66c2]">Job Seeker Visibility</h3>
                       <div className="flex-1 border-b border-dotted border-slate-300 h-1 mb-1" />
                    </div>
                    <div className="space-y-3">
                       {["ACTIVELY_LOOKING", "OPEN_TO_OFFERS", "NOT_LOOKING"].map((status) => (
                         <button 
                           key={status}
                           onClick={() => setVisibility(status)}
                           className={`w-full p-4 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-between transition-all ${visibility === status ? "bg-white border-[#0a66c2]/40 text-[#0a66c2] shadow-xl shadow-blue-100 border" : "text-slate-500 border-transparent hover:bg-white/50"}`}
                         >
                           {status.replace(/_/g, " ")}
                           {visibility === status && <CheckCircle2 className="w-4 h-4" />}
                         </button>
                       ))}
                    </div>
                    <Eye className="absolute -bottom-10 -right-10 w-48 h-48 opacity-5 text-[#0a66c2]" />
                 </div>

                 <div className="p-8 rounded-[40px] bg-slate-900 text-white shadow-2xl relative group overflow-hidden">
                    <div className="flex gap-4 items-baseline mb-6">
                       <h3 className="text-[11px] font-black uppercase tracking-widest text-blue-400">One-Click Apply</h3>
                       <div className="flex-1 border-b border-dotted border-white/20 h-1 mb-1" />
                    </div>
                    <div className="flex items-center justify-between mb-8">
                       <div>
                          <p className="text-xs font-bold leading-relaxed opacity-60 max-w-[150px]">Use your default resume and cover letter.</p>
                       </div>
                       <button 
                         onClick={() => setOneClickApply(!oneClickApply)}
                         className={`w-14 h-7 rounded-full flex items-center px-1 transition-all ${oneClickApply ? "bg-blue-500 justify-end shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "bg-slate-700 justify-start"}`}
                       >
                          <div className="w-5 h-5 bg-white rounded-full shadow-lg" />
                       </button>
                    </div>
                    <div className="space-y-4">
                       <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
                          <FileText className="w-5 h-5 text-blue-400" />
                          <div>
                             <p className="text-[10px] font-black uppercase tracking-widest leading-none">Default Resume</p>
                             <p className="text-[9px] font-bold opacity-60 mt-1">Muwereza_Resume_2026.pdf</p>
                          </div>
                       </div>
                    </div>
                    <Shield className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 text-white" />
                 </div>
              </div>

              {/* Notification Prefs */}
              <div className="mb-12">
                 <h2 className="text-[11px] font-black text-slate-800 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2">Notification Preferences</h2>
                 <div className="flex flex-wrap gap-3">
                    {["INSTANT", "DAILY_DIGEST", "WEEKLY"].map((pref) => (
                      <button 
                        key={pref}
                        onClick={() => setNotifications(pref)}
                        className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${notifications === pref ? "bg-[#0a66c2] text-white border-transparent shadow-xl shadow-blue-100" : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"}`}
                      >
                         {pref.replace(/_/g, " ")}
                      </button>
                    ))}
                 </div>
              </div>

              {/* Privacy List */}
              <div className="mb-12">
                 <h2 className="text-[11px] font-black text-slate-800 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2">Company Visibility (Blacklist)</h2>
                 <div className="p-6 rounded-[32px] border border-slate-100 bg-[#edf3f8]/30 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-2xl transition-all">
                    <div className="flex gap-4 items-center">
                       <div className="p-3 bg-white rounded-2xl shadow-sm">
                          <Shield className="w-6 h-6 text-[#0a66c2]" />
                       </div>
                       <div>
                          <h4 className="text-sm font-bold text-slate-800 leading-none">Privacy Guard</h4>
                          <p className="text-[11px] text-[#666666] font-medium leading-relaxed mt-1">Hide your profile from current or former employers.</p>
                       </div>
                    </div>
                    <button className="px-8 py-2.5 rounded-full bg-white border border-slate-300 text-slate-800 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-colors shadow-sm">
                       Manage Blacklist
                    </button>
                 </div>
              </div>

              {/* Data and Deletion */}
              <div className="border-t border-slate-100 pt-10">
                 <div className="p-8 rounded-[40px] bg-red-50 border border-red-100 flex flex-col md:flex-row md:items-center justify-between gap-8 group">
                    <div className="flex gap-6 items-center">
                       <div className="p-4 bg-white rounded-2xl shadow-xl shadow-red-100 group-hover:scale-110 transition-transform">
                          <Trash2 className="w-8 h-8 text-red-500" />
                       </div>
                       <div>
                          <h4 className="text-lg font-black text-red-500 tracking-tight leading-none mb-2">Delete Personal Data</h4>
                          <p className="text-xs text-red-700 font-medium max-w-sm italic">Permanently delete your profile, application history, and career data from the Connect+ platform (GDPR Compliant).</p>
                       </div>
                    </div>
                    <button className="px-10 py-3 rounded-full bg-red-500 text-white font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-colors shadow-xl shadow-red-200">
                       Delete My Data
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}
