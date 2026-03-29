"use client";

import { Eye, ChevronLeft, ShieldCheck, Zap, Globe, MessageSquare, Book, FileText, UserCheck } from "lucide-react";
import Link from "next/link";

export default function AccessibilityPage() {
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
            <UserCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">Elite <span className="text-[#1B5E20]">Inclusion.</span></h1>
          <p className="text-xl text-slate-400 font-medium italic">"Ensuring the Connect+ experience is accessible to all elite professionals globally."</p>
        </div>

        <div className="h-[1px] w-full bg-slate-100" />

        <div className="space-y-12">
           {[
             { title: "Visual Optimization", desc: "Our platform supports screen readers and high-contrast modes for an inclusive professional intelligence experience.", icon: Eye, color: "text-blue-500" },
             { title: "Navigation Accessibility", desc: "Connect+ is fully navigable via keyboard protocols, ensuring seamless engagement for all users.", icon: Zap, color: "text-orange-500" },
             { title: "Global Standards", desc: "We adhere to WCAG 2.1 AA standards as part of our commitment to professional excellence and ethical governance.", icon: Globe, color: "text-green-500" }
           ].map((item, i) => (
             <div key={i} className="group relative pl-12 border-l border-slate-100 hover:border-[#1B5E20] transition-colors">
               <div className="space-y-4">
                  <div className="flex items-center gap-4">
                     <item.icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`} />
                     <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-none uppercase">{item.title}</h3>
                  </div>
                  <p className="text-lg text-slate-600 leading-relaxed font-medium italic">
                    {item.desc}
                  </p>
               </div>
             </div>
           ))}
        </div>

        <div className="p-12 border border-slate-100 rounded-[4rem] bg-slate-50 mt-24">
           <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-2">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Accessibility Concierge</h4>
                 <p className="text-sm font-bold text-slate-800">Encountered an accessibility barrier? Contact the Inclusion Node.</p>
              </div>
              <button className="px-10 py-4 rounded-full bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.3em] hover:bg-slate-800 transition-all shadow-xl">
                 Inclusion Support
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
