"use client";

import { useState } from "react";
import { 
  TrendingUp, 
  Target, 
  BarChart3, 
  Users, 
  Sparkles, 
  PlusCircle, 
  Zap, 
  Eye, 
  MousePointer2, 
  ArrowUpRight,
  ShieldCheck,
  Globe
} from "lucide-react";
import Link from "next/link";

const CAMPAIGNS = [
  { id: "c1", name: "Senior Dev Spotlight - Kampala", status: "Active", budget: "UGX 500k/mo", spent: "UGX 120k", impressions: "12.4k", clicks: 450, ctr: "3.6%", color: "bg-purple-500" },
  { id: "c2", name: "SafeBoda Brand Awareness", status: "Paused", budget: "UGX 1.2M/mo", spent: "UGX 800k", impressions: "85k", clicks: "2.1k", ctr: "2.4%", color: "bg-blue-500" }
];

export default function AdvertisePage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      {/* Hero Section */}
      <div className="relative rounded-[3.5rem] bg-slate-900 overflow-hidden mb-16 shadow-2xl border border-slate-800">
         <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-transparent to-transparent opacity-50" />
         <div className="relative z-10 p-16 md:p-24 flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
               <div className="flex items-center gap-2 px-4 py-1.5 bg-white/10 text-purple-400 w-fit rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-white/5 backdrop-blur-md">
                  <Sparkles className="w-4 h-4" /> Advertising Suite
               </div>
               <h1 className="text-6xl font-black text-white tracking-tighter leading-none">
                  Spotlight your <span className="text-purple-500">Vision.</span>
               </h1>
               <p className="text-xl text-slate-400 font-medium max-w-xl leading-relaxed italic">
                  "Put your team and your brand in front of Africa's most elite professional network."
               </p>
               <div className="flex flex-wrap gap-4 pt-4">
                  <button className="px-10 py-4 rounded-full bg-purple-500 text-white font-black text-sm uppercase tracking-widest hover:bg-purple-600 transition-all shadow-xl shadow-purple-900/40 active:scale-95">
                     Launch Campaign
                  </button>
                  <button className="px-10 py-4 rounded-full border border-white/10 text-white font-black text-sm uppercase tracking-widest hover:bg-white/5 transition-all">
                     View Analytics
                  </button>
               </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
               {[
                 { label: "Reach", val: "2.4M+", icon: Globe, color: "text-blue-400" },
                 { label: "Targeting", val: "Elite", icon: Target, color: "text-purple-400" },
                 { label: "Growth", val: "185%", icon: TrendingUp, color: "text-green-400" },
                 { label: "Trust", val: "Secure", icon: ShieldCheck, color: "text-yellow-400" }
               ].map((stat, i) => (
                 <div key={i} className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 backdrop-blur-sm group hover:bg-white/10 transition-all">
                    <stat.icon className={`w-6 h-6 ${stat.color} mb-4 group-hover:scale-110 transition-transform`} />
                    <p className="text-2xl font-black text-white tracking-widest">{stat.val}</p>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">{stat.label}</p>
                 </div>
               ))}
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         {/* Main Dashboard */}
         <main className="lg:col-span-8 space-y-12">
            
            {/* Active Campaigns */}
            <section className="space-y-8">
               <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h2 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-2">
                     <TrendingUp className="w-4.5 h-4.5 text-purple-500" /> Active Campaigns
                  </h2>
                  <button className="text-[10px] font-black uppercase tracking-widest text-purple-600 hover:underline">Manage All</button>
               </div>
               
               <div className="space-y-4">
                  {CAMPAIGNS.map(camp => (
                    <div key={camp.id} className="p-8 rounded-[2.5rem] border border-slate-100 bg-white hover:shadow-2xl transition-all group cursor-pointer overflow-hidden relative">
                       <div className={`absolute top-0 left-0 bottom-0 w-1.5 ${camp.color} opacity-80`} />
                       <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                          <div className="flex-1">
                             <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-black text-slate-800 tracking-tight">{camp.name}</h3>
                                <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${camp.status === 'Active' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}>
                                   {camp.status}
                                </span>
                             </div>
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Budget: {camp.budget} · Spent: {camp.spent}</p>
                          </div>
                          
                          <div className="flex items-center gap-12">
                             <div className="text-center">
                                <p className="text-lg font-black text-slate-800 tracking-tighter">{camp.impressions}</p>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Impressions</p>
                             </div>
                             <div className="text-center">
                                <p className="text-lg font-black text-purple-600 tracking-tighter">{camp.clicks}</p>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Clicks</p>
                             </div>
                             <div className="text-center">
                                <p className="text-lg font-black text-slate-800 tracking-tighter">{camp.ctr}</p>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">CTR</p>
                             </div>
                          </div>
                          
                          <div className="p-2 rounded-full border border-slate-50 text-slate-300 group-hover:text-purple-500 group-hover:border-purple-100 transition-all">
                             <ArrowUpRight className="w-5 h-5" />
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </section>

            {/* Ad Products */}
            <section className="space-y-8 pb-12">
               <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h2 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-2">
                     <PlusCircle className="w-4.5 h-4.5 text-slate-400" /> Ad Solutions
                  </h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: "Sponsored Jobs", desc: "Appear at the top of candidate searches.", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-50" },
                    { title: "Brand Spotlight", desc: "Vibrant banners in elite feed scrolls.", icon: Eye, color: "text-blue-500", bg: "bg-blue-50" },
                    { title: "Featured Article", desc: "Promote leadership insights & news.", icon: MousePointer2, color: "text-purple-500", bg: "bg-purple-50" },
                    { title: "Direct InMail", desc: "Reach talent straight in their inbox.", icon: Users, color: "text-orange-500", bg: "bg-orange-50" }
                  ].map((ad, i) => (
                    <div key={i} className="p-10 rounded-[2.5rem] bg-white border border-slate-100 group hover:border-purple-200 hover:shadow-xl transition-all">
                       <div className={`p-4 rounded-2xl ${ad.bg} ${ad.color} w-fit mb-6 group-hover:scale-110 transition-transform`}>
                          <ad.icon className="w-6 h-6" />
                       </div>
                       <h3 className="text-xl font-black text-slate-800 tracking-tight mb-2 group-hover:text-purple-600 transition-colors">{ad.title}</h3>
                       <p className="text-sm text-slate-500 font-medium italic mb-6 leading-relaxed">{ad.desc}</p>
                       <button className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-600 flex items-center gap-2 hover:gap-3 transition-all">
                          Select Product <ArrowUpRight className="w-3.5 h-3.5" />
                       </button>
                    </div>
                  ))}
               </div>
            </section>
         </main>

         {/* Sidebar */}
         <aside className="lg:col-span-4 space-y-12">
            
            {/* Quick Stats */}
            <div className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-2xl space-y-8">
               <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-50 pb-4">Ad Portfolio</h3>
               
               <div className="space-y-8">
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Spend</span>
                     <span className="text-2xl font-black text-slate-800 tracking-tighter">UGX 920k</span>
                  </div>
                  
                  <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden shadow-inner">
                     <div className="h-full bg-purple-500 w-[45%]" />
                  </div>
                  
                  <div className="space-y-4">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <div className="w-2 h-2 rounded-full bg-purple-500" />
                           <span className="text-xs font-bold text-slate-600">Uganda Reach</span>
                        </div>
                        <span className="text-xs font-black text-slate-800">82%</span>
                     </div>
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <div className="w-2 h-2 rounded-full bg-blue-500" />
                           <span className="text-xs font-bold text-slate-600">East Africa Reach</span>
                        </div>
                        <span className="text-xs font-black text-slate-800">14%</span>
                     </div>
                  </div>
               </div>

               <button className="w-full py-4 rounded-full bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                  Detailed Analytics
               </button>
            </div>

            {/* Expert Support */}
            <div className="p-10 bg-purple-600 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
               <div className="relative z-10">
                  <h3 className="text-[11px] font-black tracking-[0.3em] uppercase opacity-70 mb-4">Ad Strategy</h3>
                  <p className="text-xl font-black tracking-tight leading-tight mb-8">Want a custom brand takeover? Speak to an expert. 🎙️</p>
                  <button className="w-full py-4 rounded-full bg-white text-purple-600 font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-100 transition-all shadow-xl shadow-purple-900/20">
                     Book Consult
                  </button>
               </div>
               <Target className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 group-hover:scale-110 transition-transform duration-500" />
            </div>

         </aside>
      </div>
   </div>
  );
}
