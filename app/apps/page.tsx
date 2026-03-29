"use client";

import { Smartphone, ChevronLeft, ShieldCheck, Download, Zap, Globe, Cpu } from "lucide-react";
import Link from "next/link";

export default function AppsPage() {
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
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">Elite <span className="text-[#1B5E20]">Mobility.</span></h1>
          <p className="text-xl text-slate-400 font-medium italic">"Deploy the Connect+ experience to your mobile ecosystem for 24/7 intelligence stream."</p>
        </div>

        <div className="h-[1px] w-full bg-slate-100" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {[
             { title: "Connect+ iOS Pilot", desc: "For the elite Apple ecosystem users. Optimized for M-series engines.", icon: Download, color: "bg-blue-50 text-blue-600" },
             { title: "Connect+ Android Node", desc: "Universal professional engagement. Seamless G-Suite integration.", icon: Zap, color: "bg-orange-50 text-orange-600" }
           ].map((app, i) => (
             <div key={i} className="p-12 rounded-[3rem] bg-white border border-slate-100 hover:border-[#1B5E20]/20 hover:shadow-2xl transition-all group">
                <div className={`w-14 h-14 rounded-2xl ${app.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                   <app.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-4">{app.title}</h3>
                <p className="text-sm text-slate-500 font-medium italic mb-8 leading-relaxed">{app.desc}</p>
                <button className="w-full py-4 rounded-full bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.3em] hover:bg-slate-800 transition-all shadow-xl">
                   Download Binary
                </button>
             </div>
           ))}
        </div>

        <div className="p-12 rounded-[3.5rem] bg-slate-50 border border-slate-100 mt-24 flex items-center gap-8 group">
           <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center border border-slate-100 group-hover:rotate-12 transition-transform">
              <Cpu className="w-7 h-7 text-[#1B5E20]" />
           </div>
           <div className="space-y-1">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Desktop Engine</h4>
              <p className="text-sm font-bold text-slate-800">Connect+ Desktop Node is currently in Private Alpha for Elite Users.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
