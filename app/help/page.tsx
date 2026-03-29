"use client";

import { HelpCircle, ChevronLeft, ShieldCheck, Zap, Globe, MessageSquare, Book, FileText } from "lucide-react";
import Link from "next/link";

export default function HelpPage() {
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
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">Elite <span className="text-[#1B5E20]">Support.</span></h1>
          <p className="text-xl text-slate-400 font-medium italic">"Get support from the Connect+ concierge team or explore our elite knowledge base."</p>
        </div>

        <div className="h-[1px] w-full bg-slate-100" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {[
             { title: "Node Setup", desc: "Learn how to configure your elite profile for maximum reach across the network.", icon: Zap, color: "text-orange-500", bg: "bg-orange-50" },
             { title: "Security Protocols", desc: "Manage your professional data and account integrity through our security node.", icon: ShieldCheck, color: "text-blue-500", bg: "bg-blue-50" },
             { title: "Knowledge Base", desc: "Access premium insights and walk-throughs to master all platform features.", icon: Book, color: "text-purple-500", bg: "bg-purple-50" },
             { title: "Concierge Direct", desc: "Speak directly with our support concierge for immediate high-level assistance.", icon: MessageSquare, color: "text-green-500", bg: "bg-green-50" }
           ].map((item, i) => (
             <div key={i} className="p-12 rounded-[3.5rem] bg-white border border-slate-100 group hover:border-[#1B5E20]/20 hover:shadow-2xl transition-all">
                <div className={`p-4 rounded-2xl ${item.bg} ${item.color} w-fit mb-8 group-hover:scale-110 transition-transform`}>
                   <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-4 group-hover:text-[#1B5E20] transition-colors">{item.title}</h3>
                <p className="text-sm text-slate-500 font-medium italic mb-8 leading-relaxed">"{item.desc}"</p>
                <button className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1B5E20] flex items-center gap-2 hover:gap-3 transition-all">
                   View Resource <ChevronLeft className="w-4 h-4 rotate-180" />
                </button>
             </div>
           ))}
        </div>

        <div className="p-16 rounded-[4rem] bg-slate-900 text-white mt-12 relative overflow-hidden flex flex-col items-center text-center space-y-6">
           <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Real-time Node Status</h4>
           <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" />
              <span className="text-xl font-black tracking-tighter italic">All Support Systems Operational</span>
           </div>
        </div>
      </div>
    </div>
  );
}
