"use client";

import { useState } from "react";
import { Sparkles, Eye, Users, TrendingUp, BarChart3, Star, DollarSign, Mail, MapPin, Briefcase, PlusCircle, CheckCircle2, MoreHorizontal, ChevronRight, Layout } from "lucide-react";

const VISITORS = [
  { id: "v1", name: "Recruiter @ Chipper Cash", industry: "Fintech", location: "Kampala", avatar: "CC", time: "2h ago" },
  { id: "v2", name: "Hiring Manager @ SafeBoda", industry: "Transportation", location: "Nairobi", avatar: "SB", time: "5h ago" },
  { id: "v3", name: "Talent Lead @ Microsoft", industry: "Tech", location: "Seattle, WA", avatar: "MS", time: "1d ago" }
];

export default function PremiumAnalyticsPage() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="space-y-4">
           <div className="flex items-center gap-2 px-3 py-1 bg-yellow-50 text-[#A57C00] w-fit rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-yellow-100">
              <Sparkles className="w-3 h-3 fill-[#A57C00]" /> premium intelligence
           </div>
           <h1 className="text-5xl font-black text-slate-800 tracking-tighter leading-none">
              Your Professional <span className="text-[#A57C00]">Superpowers</span>
           </h1>
           <p className="text-lg text-slate-500 font-medium max-w-xl italic">
              Experience the platform without boundaries. Access deep competitive data and recruiter analytics.
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         {/* Feature Grid */}
         <div className="lg:col-span-8 space-y-12">
            
            {/* Who Viewed Your Profile */}
            <section className="space-y-8">
               <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h2 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-2">
                     <Eye className="w-4.5 h-4.5 text-blue-500" /> Who Viewed Your Profile
                  </h2>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#0a66c2] bg-blue-50 px-3 py-1 rounded-full">90-Day History</span>
               </div>
               
                <div className="grid grid-cols-1 gap-4">
                  {VISITORS.map(vis => (
                    <div key={vis.id} className="p-8 bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white hover:shadow-2xl transition-all duration-500 group flex items-center justify-between">
                       <div className="flex gap-6 items-center">
                          <div className="w-16 h-16 rounded-[2rem] bg-white border border-slate-100 flex items-center justify-center font-black text-slate-800 shadow-sm group-hover:rotate-6 transition-transform">
                             {vis.avatar}
                          </div>
                          <div>
                             <h3 className="text-lg font-black text-slate-800 tracking-tight leading-tight group-hover:text-[#0a66c2] transition-colors">{vis.name}</h3>
                             <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-1 opacity-80">{vis.industry} · {vis.location}</p>
                             <p className="text-[9px] text-[#0a66c2] font-black uppercase tracking-widest mt-2">{vis.time}</p>
                          </div>
                       </div>
                       <button 
                        onClick={(e) => {
                          const btn = e.currentTarget;
                          btn.disabled = true;
                          btn.innerHTML = `Sending...`;
                          setTimeout(() => {
                             btn.innerHTML = `Sent ✨`;
                             btn.classList.add('bg-blue-100');
                             setTimeout(() => {
                               btn.innerHTML = `InMail History`;
                               btn.disabled = false;
                             }, 3000);
                          }, 1500);
                        }}
                        className="px-10 py-3 rounded-full border border-[#0a66c2] text-[#0a66c2] font-black text-[10px] uppercase tracking-widest hover:bg-blue-50 transition-all disabled:opacity-75"
                       >
                          Send InMail
                       </button>
                    </div>
                  ))}
               </div>
            </section>

            {/* Applicant Insights */}
            <section className="space-y-8">
               <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h2 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-2">
                     <BarChart3 className="w-4.5 h-4.5 text-orange-500" /> Applicant Insights
                  </h2>
               </div>
               
               <div className="p-10 bg-slate-900 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group border border-slate-800">
                  <div className="relative z-10">
                     <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-blue-500 rounded-2xl shadow-xl shadow-blue-500/20">
                           <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div>
                           <h3 className="text-xl font-black tracking-tight leading-none">Competitive Intelligence</h3>
                           <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest mt-1 opacity-60">Real-time ranking data</p>
                        </div>
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 text-center">
                           <span className="text-4xl font-black text-blue-400">Top 10%</span>
                           <p className="text-[11px] text-white/40 font-black uppercase tracking-widest mt-2 px-2">Of 240 applicants for Senior Engineer roles</p>
                        </div>
                        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 text-center">
                           <span className="text-4xl font-black text-green-400">8/10</span>
                           <p className="text-[11px] text-white/40 font-black uppercase tracking-widest mt-2 px-2">Skill match alignment for Lead UI/UX roles</p>
                        </div>
                     </div>

                     <button 
                      onClick={(e) => {
                        const btn = e.currentTarget;
                        btn.disabled = true;
                        btn.innerHTML = `🌀 Calculating Delta...`;
                        setTimeout(() => {
                           btn.innerHTML = `Detailed Report Exported ✅`;
                           setTimeout(() => {
                              btn.innerHTML = `View Detailed Rankings`;
                              btn.disabled = false;
                           }, 3000);
                        }, 2000);
                      }}
                      className="w-full py-4 rounded-full bg-white text-slate-900 font-black text-xs uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-xl shadow-white/10 disabled:opacity-80"
                     >
                        View Detailed Rankings
                     </button>
                  </div>
                  <Sparkles className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 text-blue-400 group-hover:scale-110 transition-transform duration-500" />
               </div>
            </section>

         </div>

         {/* Sidebar Tools */}
         <aside className="lg:col-span-4 space-y-8">
            <div className="bg-[#1B5E20] rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-green-400 mb-6 flex items-center gap-2">
                  <Star className="w-4 h-4" /> Featured Applicant
               </h3>
               <p className="text-lg font-black tracking-tight leading-tight mb-8">Stand out instantly to every hiring manager. ✨</p>
               <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-8">
                  <div className="flex items-center gap-4">
                     <CheckCircle2 className="w-6 h-6 text-green-400" />
                     <p className="text-[11px] font-medium opacity-80 leading-relaxed italic">"Premium members are 3x more likely to be interviewed."</p>
                  </div>
               </div>
               <button 
                onClick={(e) => {
                  const btn = e.currentTarget;
                  btn.disabled = true;
                  btn.innerHTML = `🔄 Securing Priority...`;
                  setTimeout(() => {
                    btn.innerHTML = `✨ Priority Ranking ACTIVE`;
                    btn.classList.add('bg-green-100', 'text-green-900');
                  }, 2000);
                }}
                className="w-full py-3.5 rounded-full bg-white text-[#1B5E20] font-black text-[10px] uppercase tracking-widest hover:bg-green-50 transition-all shadow-xl shadow-green-900/40 active:scale-95 disabled:opacity-80"
               >
                  Activate Priority Ranking
               </button>
               <Sparkles className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 text-green-400 group-hover:scale-110 transition-transform duration-500" />
            </div>

            <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl space-y-8">
               <div className="flex items-center gap-3">
                  <DollarSign className="w-6 h-6 text-[#A57C00] opacity-40 shadow-sm" />
                  <h3 className="text-base font-black text-slate-800 tracking-tight leading-tight">Salary Insights</h3>
               </div>
               <p className="text-xs text-slate-500 font-medium leading-relaxed italic opacity-80">
                 Negotiate from a position of power with precise salary bands for the top companies in your region.
               </p>
               <button 
                onClick={(e) => {
                  const btn = e.currentTarget;
                  btn.disabled = true;
                  btn.innerHTML = `🔍 Decrypting Bands...`;
                  setTimeout(() => {
                     btn.innerHTML = `Bands Decoded ✅`;
                     setTimeout(() => {
                        btn.innerHTML = `Open Band Exploration`;
                        btn.disabled = false;
                     }, 3000);
                  }, 2000);
                }}
                className="w-full py-3 rounded-full border border-slate-100 text-[#A57C00] font-black text-[10px] uppercase tracking-widest hover:bg-yellow-50 transition-all disabled:opacity-75"
               >
                  Open Band Exploration
               </button>
            </div>
         </aside>
      </div>
    </div>
  );
}
