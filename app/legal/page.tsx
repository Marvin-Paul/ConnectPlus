"use client";

import { FileText, ChevronLeft, ShieldCheck, Lock, Globe, Users, TrendingUp, Sparkles, Scale } from "lucide-react";
import Link from "next/link";

export default function LegalPage() {
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
            <Scale className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">Elite <span className="text-[#1B5E20]">Governance.</span></h1>
          <p className="text-xl text-slate-400 font-medium italic">"Ensuring the integrity and security of the professional professional network."</p>
        </div>

        <div className="h-[1px] w-full bg-slate-100" />

        <div className="space-y-12">
           {[
             { title: "Privacy Protocol", desc: "Your data is protected with state-of-the-art encryption across all elite nodes. We only share insights that matter to your professional trajectory.", icon: Lock, color: "text-blue-500" },
             { title: "Service Agreement", desc: "By using Connect+, you agree to maintain professional integrity and respect the high-trust environment established here.", icon: FileText, color: "text-purple-500" },
             { title: "Cookie Policy", desc: "We use cookies to optimize your platform intelligence and personalize your engagement with the professional ecosystem.", icon: Globe, color: "text-green-500" }
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

        <div className="p-12 rounded-[4rem] bg-slate-50 border border-slate-100 mt-24">
           <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Elite Inquiry</h4>
              <p className="text-sm font-bold text-slate-800 italic">"For legal inquiries regarding the Connect+ Global Ecosystem, please contact the Governance Node at legal@connectplus.com."</p>
           </div>
        </div>
      </div>
    </div>
  );
}
