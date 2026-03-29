"use client";

import { User, ChevronLeft, ShieldCheck, Globe, Users, TrendingUp, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-24 px-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <Link href="/" className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-slate-800 transition-all mb-16">
        <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center group-hover:-translate-x-1 transition-transform">
           <ChevronLeft className="w-4 h-4" />
        </div>
        Back to Intel Feed
      </Link>
      
      <div className="space-y-16">
        <div className="space-y-6">
          <div className="w-16 h-16 rounded-[2rem] bg-slate-900 flex items-center justify-center shadow-2xl">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">Elite <span className="text-[#1B5E20]">Ambition.</span></h1>
          <p className="text-xl text-slate-400 font-medium italic">"Connecting Africa's brightest minds to accelerate global intelligence."</p>
        </div>

        <div className="h-[1px] w-full bg-slate-100" />

        <div className="space-y-12">
           {[
             { title: "Universal Connection", desc: "Connect+ is the central nervous system for African professionals, bridging the gap between local talent and global markets.", icon: Globe, color: "text-blue-500" },
             { title: "Verified Elite", desc: "We maintain a high-trust environment by verifying all elite nodes to ensure the highest quality engagement.", icon: Sparkles, color: "text-yellow-500" },
             { title: "Career Acceleration", desc: "Our platform is designed to provide professional leverage through analytics, learning nodes, and high-impact networks.", icon: TrendingUp, color: "text-green-500" }
           ].map((item, i) => (
             <div key={i} className="group relative pl-12">
               <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-slate-100 group-hover:bg-[#1B5E20] transition-colors" />
               <div className="space-y-4">
                  <div className="flex items-center gap-4">
                     <item.icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`} />
                     <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-none uppercase tracking-[0.05em]">{item.title}</h3>
                  </div>
                  <p className="text-lg text-slate-500 leading-relaxed font-medium italic">
                    "{item.desc}"
                  </p>
               </div>
             </div>
           ))}
        </div>

        <div className="p-16 rounded-[4rem] bg-slate-900 text-white mt-24 relative overflow-hidden group">
           <div className="relative z-10 flex flex-col items-center text-center space-y-8">
              <h2 className="text-4xl font-black tracking-tighter italic">Join the Core.</h2>
              <p className="text-white/40 text-sm max-w-sm italic">"Connect+ is more than a network. It's a professional evolution."</p>
              <button className="px-12 py-4 rounded-full bg-white text-slate-900 font-black text-[10px] uppercase tracking-[0.3em] hover:bg-slate-50 transition-all shadow-xl shadow-slate-900/40">
                 Explore Career Nodes
              </button>
           </div>
           <ShieldCheck className="absolute -bottom-10 -right-10 w-64 h-64 opacity-5 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-1000" />
        </div>
      </div>
    </div>
  );
}
