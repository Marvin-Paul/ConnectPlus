"use client";

import { useState } from "react";
import { PlusCircle, Briefcase, MapPin, DollarSign, Globe, Sparkles, CheckCircle2, Layout, FileText, Settings, Rocket } from "lucide-react";
import Link from "next/link";

export default function PostJobPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      {/* Stepper */}
      <div className="flex items-center justify-center gap-4 mb-16">
         {[1, 2, 3].map((s) => (
           <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${step >= s ? 'bg-[#1B5E20] text-white shadow-xl shadow-green-900/20' : 'bg-slate-100 text-slate-400'}`}>
                 {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
              </div>
              {s < 3 && <div className={`w-12 h-px ${step > s ? 'bg-[#1B5E20]' : 'bg-slate-100'}`} />}
           </div>
         ))}
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
         {/* Header */}
         <div className="p-12 border-b border-slate-50 bg-slate-50/30 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
               <h1 className="text-4xl font-black text-slate-800 tracking-tighter leading-none mb-4">
                  Find your next <span className="text-[#1B5E20]">Masterpiece</span>
               </h1>
               <p className="text-sm text-slate-500 font-medium italic opacity-80">
                  Join over 5,000 African enterprises hiring elite talent on Connect+.
               </p>
            </div>
            <div className="px-6 py-2 bg-[#1B5E20]/5 rounded-full border border-[#1B5E20]/10 flex items-center gap-2 h-fit">
               <Sparkles className="w-3.5 h-3.5 text-[#1B5E20]" />
               <span className="text-[10px] font-black uppercase tracking-widest text-[#1B5E20]">AI-Enhanced Draft</span>
            </div>
         </div>

         <div className="p-12 space-y-10">
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Job Title</label>
                       <input type="text" placeholder="e.g. Senior Full Stack Engineer" className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-none outline-none text-sm font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-[#1B5E20]/5 transition-all" />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Company</label>
                       <input type="text" placeholder="Your brand name" className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-none outline-none text-sm font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-[#1B5E20]/5 transition-all" />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Workplace Type</label>
                       <select className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-none outline-none text-sm font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-[#1B5E20]/5 transition-all appearance-none">
                          <option>On-site</option>
                          <option>Hybrid</option>
                          <option>Remote</option>
                       </select>
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Location</label>
                       <div className="relative">
                          <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input type="text" placeholder="e.g. Kampala, Uganda" className="w-full h-14 pl-14 pr-6 rounded-2xl bg-slate-50 border-none outline-none text-sm font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-[#1B5E20]/5 transition-all" />
                       </div>
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Job Description</label>
                    <textarea 
                      placeholder="Describe the mission, the impact, and the ideal candidate..." 
                      className="w-full h-48 px-8 py-6 rounded-[2.5rem] bg-slate-50 border-none outline-none text-sm font-medium leading-relaxed text-slate-700 focus:bg-white focus:ring-4 focus:ring-[#1B5E20]/5 transition-all resize-none"
                    />
                 </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                 <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden group">
                    <div className="relative z-10">
                       <h3 className="text-xl font-black mb-4 tracking-tight">Recruiter Intel ✨</h3>
                       <p className="text-xs text-white/60 leading-relaxed font-medium mb-8 italic">"LinkedIn data shows that clear salary bands increase qualified applicant volume by 45%."</p>
                    </div>
                    <Sparkles className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 group-hover:scale-110 transition-transform duration-500" />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Salary Range (Minimum)</label>
                       <input type="number" placeholder="UGX" className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-none outline-none text-sm font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-[#1B5E20]/5 transition-all" />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Salary Range (Maximum)</label>
                       <input type="number" placeholder="UGX" className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-none outline-none text-sm font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-[#1B5E20]/5 transition-all" />
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Skills Required (Up to 10)</label>
                    <div className="flex flex-wrap gap-2">
                       {['React', 'Next.js', 'PostgreSQL', 'Python'].map(s => (
                         <span key={s} className="px-4 py-1.5 bg-[#1B5E20] text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                            {s} ×
                         </span>
                       ))}
                       <button className="px-4 py-1.5 bg-slate-100 text-[#1B5E20] border border-[#1B5E20]/20 rounded-full text-[10px] font-black uppercase tracking-widest">
                          + Add Skill
                       </button>
                    </div>
                 </div>
              </div>
            )}

            <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
               <button 
                 onClick={() => setStep(prev => Math.max(1, prev - 1))}
                 className={`px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:text-slate-800'}`}
               >
                  Back
               </button>
               {step < 3 ? (
                 <button 
                   onClick={() => setStep(prev => prev + 1)}
                   className="px-12 py-3.5 rounded-full bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-slate-200 hover:scale-105 transition-all active:scale-95"
                 >
                    Next Step
                 </button>
               ) : (
                 <button 
                   className="px-12 py-3.5 rounded-full bg-[#1B5E20] text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-green-900/20 hover:scale-105 transition-all active:scale-95 flex items-center gap-2"
                 >
                    <Rocket className="w-4 h-4" /> Finalize & Publish
                 </button>
               )}
            </div>
         </div>
      </div>

      <div className="mt-12 text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
         Connect+ Enterprise · Professional Integrity Guaranteed
      </div>
    </div>
  );
}
