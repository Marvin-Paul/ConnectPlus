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
    <div className="min-h-screen bg-[#fafafa] dark:bg-slate-950 pb-20 selection:bg-primary/10">
      <div className="max-w-7xl mx-auto py-16 px-6 lg:px-12">
        {/* Header Section */}
        <div className="relative mb-20 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="space-y-6 max-w-3xl">
            <div className="flex items-center gap-3 px-4 py-2 bg-yellow-400/10 text-[#A57C00] dark:text-yellow-500 w-fit rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-yellow-200/50 dark:border-yellow-500/20 shadow-sm backdrop-blur-sm">
              <Sparkles className="w-4 h-4 fill-current" /> premium intelligence
            </div>
            <h1 className="text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9] drop-shadow-sm">
              Your Professional <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A57C00] via-yellow-500 to-[#A57C00]">Superpowers</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-xl italic leading-relaxed opacity-80">
              Unlock the deep data layer of your career. Experience a platform without boundaries.
            </p>
          </div>
          
          {/* Decorative background element */}
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-20">
            
            {/* Who Viewed Your Profile Section */}
            <section className="space-y-10">
              <div className="flex items-center justify-between border-b-2 border-slate-100 dark:border-slate-800 pb-6">
                <h2 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-[0.4em] flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Eye className="w-5 h-5 text-blue-500" />
                  </div>
                  Profile Visitors
                </h2>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#0a66c2] bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 px-4 py-1.5 rounded-full shadow-sm">
                    90-Day Analytics
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                {VISITORS.map((vis, i) => (
                  <div 
                    key={vis.id} 
                    className={`p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] shadow-soft hover:shadow-2xl hover:scale-[1.01] hover:-translate-y-1 transition-all duration-500 group flex flex-col md:flex-row md:items-center justify-between gap-8 stagger-${i % 6}`}
                  >
                    <div className="flex gap-8 items-center">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-2 border-white dark:border-slate-700 flex items-center justify-center font-black text-2xl text-slate-800 dark:text-white shadow-xl group-hover:rotate-6 transition-transform">
                          {vis.avatar}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-slate-900" title="Online" />
                      </div>
                      <div className="space-y-1.5">
                        <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none group-hover:text-primary transition-colors">{vis.name}</h3>
                        <div className="flex items-center gap-2">
                           <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest opacity-80">{vis.industry}</span>
                           <span className="w-1 h-1 bg-slate-300 rounded-full" />
                           <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest opacity-80">{vis.location}</span>
                        </div>
                        <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-3 flex items-center gap-1.5">
                          <Layout className="w-3 h-3" /> Viewed {vis.time}
                        </p>
                      </div>
                    </div>
                    <button 
                      className="px-12 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-[11px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/10 dark:shadow-white/10 group/btn relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-2 justify-center">
                        Send InMail <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Applicant Insights Section */}
            <section className="space-y-10">
              <div className="flex items-center justify-between border-b-2 border-slate-100 dark:border-slate-800 pb-6">
                <h2 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-[0.4em] flex items-center gap-3">
                  <div className="p-2 bg-orange-500/10 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-orange-500" />
                  </div>
                  Competitive Intel
                </h2>
              </div>
              
              <div className="p-12 bg-slate-950 rounded-[4rem] text-white shadow-3xl relative overflow-hidden group border-2 border-white/5">
                {/* Visual Glows */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -mr-48 -mt-48" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] -ml-48 -mb-48" />

                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl shadow-2xl shadow-blue-500/40 flex items-center justify-center animate-pulse">
                        <TrendingUp className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-black tracking-tighter leading-none mb-1">Rank Intelligence</h3>
                        <p className="text-[12px] text-blue-400 font-black uppercase tracking-widest opacity-80">AI-Powered Market Positioning</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
                    <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md text-center hover:bg-white/10 transition-all cursor-default">
                      <div className="text-sm font-black text-white/40 uppercase tracking-[0.3em] mb-4 italic">Percentile</div>
                      <span className="text-6xl font-black text-blue-400 drop-shadow-[0_0_20px_rgba(96,165,250,0.3)]">Top 10%</span>
                      <p className="text-[11px] text-white/50 font-medium leading-relaxed mt-6 max-w-[200px] mx-auto italic">Outperforming 240+ applicants for recent Lead roles.</p>
                    </div>
                    <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md text-center hover:bg-white/10 transition-all cursor-default">
                      <div className="text-sm font-black text-white/40 uppercase tracking-[0.3em] mb-4 italic">Skill Alignment</div>
                      <span className="text-6xl font-black text-green-400 drop-shadow-[0_0_20px_rgba(74,222,128,0.3)]">8.4<span className="text-2xl text-white/20">/10</span></span>
                      <p className="text-[11px] text-white/50 font-medium leading-relaxed mt-6 max-w-[200px] mx-auto italic">Strong match for Design Systems & React Architecture.</p>
                    </div>
                  </div>

                  <button 
                    className="w-full py-6 rounded-[2rem] bg-gradient-to-r from-white via-blue-50 to-white text-slate-950 font-black text-sm uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-blue-500/20"
                  >
                    View Real-time Benchmarks
                  </button>
                </div>
                
                {/* Large Background Icon */}
                <Sparkles className="absolute -bottom-16 -right-16 w-64 h-64 opacity-5 text-white pointer-events-none group-hover:rotate-12 group-hover:scale-110 transition-transform duration-1000" />
              </div>
            </section>

          </div>

          {/* Sidebar Area */}
          <aside className="lg:col-span-4 space-y-12">
            
            {/* Featured Applicant Card */}
            <div className="bg-[#12372A] dark:bg-[#0d1f1a] rounded-[3rem] p-12 text-white shadow-3xl relative overflow-hidden group border border-white/5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-400/10 rounded-full blur-[80px] -mr-32 -mt-32" />
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center border border-green-500/20">
                      <Star className="w-5 h-5 text-green-400 fill-green-400/20" />
                    </div>
                    <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-green-400">Visibility Boost</h3>
                  </div>
                  
                  <p className="text-3xl font-black tracking-tighter leading-[1.1] mb-10">
                    Stand out <br />
                    to every <br />
                    <span className="text-green-400">Hiring Leader</span>
                  </p>
                  
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-12 backdrop-blur-sm">
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                      <p className="text-xs font-medium text-white/80 leading-relaxed italic">
                        Premium members are algorithmically prioritized in search & applications.
                      </p>
                    </div>
                  </div>
                </div>

                <button className="w-full py-5 rounded-2xl bg-green-500 text-slate-950 font-black text-[11px] uppercase tracking-widest hover:bg-green-400 transition-all shadow-xl shadow-green-950/50 active:scale-95">
                  Secure Priority Ranking
                </button>
              </div>
            </div>

            {/* Salary Insights Tool */}
            <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-12 border border-slate-100 dark:border-slate-800 shadow-2xl space-y-10 group hover:border-yellow-500/20 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-yellow-400/10 rounded-2xl flex items-center justify-center border border-yellow-200/50 dark:border-yellow-500/10">
                  <DollarSign className="w-7 h-7 text-[#A57C00] dark:text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Salary Bands</h3>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Market Intelligence</p>
                </div>
              </div>
              
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic opacity-80">
                Negotiate from a position of absolute power with verified precise salary bands for the top firms in your region.
              </p>
              
              <button className="w-full py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 text-[#A57C00] dark:text-yellow-500 font-black text-[11px] uppercase tracking-widest hover:bg-yellow-50 dark:hover:bg-yellow-500/5 transition-all active:scale-95">
                Explore Pay Ranges
              </button>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}
