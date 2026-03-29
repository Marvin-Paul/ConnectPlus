"use client";

import { Lock, ShieldCheck, ChevronLeft, Eye, EyeOff, Key, FileText, Globe } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
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
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">Elite <span className="text-[#1B5E20]">Discretion.</span></h1>
          <p className="text-xl text-slate-400 font-medium italic">"Connecting you with professional silence where it matters most. Your data is your leverage."</p>
        </div>

        <div className="h-[1px] w-full bg-slate-100" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {[
             { title: "Encryption Node", desc: "Military-grade data locking for all elite profile details and private interactions.", icon: Key, color: "text-blue-500", bg: "bg-blue-50" },
             { title: "Engagement Privacy", desc: "You decide which elite nodes can view your professional trajectory and insights.", icon: EyeOff, color: "text-purple-500", bg: "bg-purple-50" },
             { title: "Data Integrity", desc: "Connect+ never sells professional intelligence to unauthorized third-party entities.", icon: ShieldCheck, color: "text-green-500", bg: "bg-green-50" },
             { title: "Global Compliance", desc: "Full adherence to GDPR and regional African data sovereignty protocols.", icon: Globe, color: "text-orange-500", bg: "bg-orange-50" }
           ].map((item, i) => (
             <div key={i} className="p-10 rounded-[3rem] bg-white border border-slate-100 group hover:border-[#1B5E20]/20 hover:shadow-xl transition-all">
                <div className={`p-4 rounded-2xl ${item.bg} ${item.color} w-fit mb-6 group-hover:scale-110 transition-transform`}>
                   <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight leading-none uppercase mb-4">{item.title}</h3>
                <p className="text-sm text-slate-500 font-medium italic leading-relaxed">
                  "{item.desc}"
                </p>
             </div>
           ))}
        </div>

        <div className="p-16 rounded-[4rem] bg-slate-900 text-white mt-12 flex flex-col md:flex-row items-center justify-between gap-12 group overflow-hidden relative">
           <div className="relative z-10 space-y-4 max-w-sm">
              <h2 className="text-3xl font-black tracking-tighter italic">Total Transparency Control.</h2>
              <p className="text-white/40 text-sm italic leading-relaxed">"Review and manage your privacy nodes in your dashboard for complete command over your professional presence."</p>
           </div>
           <button className="relative z-10 px-12 py-4 rounded-full bg-white text-slate-900 font-black text-[10px] uppercase tracking-[0.3em] hover:bg-slate-50 transition-all shadow-xl shadow-slate-900/40">
              Manage Security Nodes
           </button>
           <Lock className="absolute -bottom-10 -right-10 w-64 h-64 opacity-5 group-hover:scale-110 transition-transform duration-1000" />
        </div>
      </div>
    </div>
  );
}
