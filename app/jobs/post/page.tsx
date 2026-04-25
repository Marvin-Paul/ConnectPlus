"use client";

import { useState } from "react";
import { PlusCircle, Briefcase, MapPin, DollarSign, Globe, Sparkles, CheckCircle2, Layout, FileText, Settings, Rocket, Loader2, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PostJobPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    type: "On-site",
    location: "",
    description: "",
    salaryMin: "",
    salaryMax: "",
  });

  const [skills, setSkills] = useState(['React', 'Next.js']);
  const [skillInput, setSkillInput] = useState("");

  const handlePublish = () => {
    setIsPublishing(true);
    // Simulate API call
    setTimeout(() => {
      setIsPublishing(false);
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/jobs");
      }, 2000);
    }, 1500);
  };

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  if (isSuccess) {
    return (
      <div className="max-w-4xl mx-auto py-24 px-6 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
         <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 border border-green-100 shadow-xl shadow-green-900/10">
            <CheckCircle2 className="w-12 h-12 text-[#1B5E20]" />
         </div>
         <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">Position Published!</h1>
         <p className="text-slate-500 font-medium">Your job listing for <span className="font-bold text-slate-800">{formData.title || "the position"}</span> is now live on Connect+.</p>
         <p className="text-xs font-bold text-slate-400 mt-8 uppercase tracking-widest animate-pulse">Redirecting to jobs feed...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 md:py-12 px-4 md:px-6">
      {/* Stepper */}
      <div className="flex items-center justify-center gap-2 md:gap-4 mb-8 md:mb-12">
         {[1, 2, 3].map((s) => (
           <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${step >= s ? 'bg-[#1B5E20] text-white shadow-xl shadow-green-900/20' : 'bg-slate-100 text-slate-400'}`}>
                 {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
              </div>
              {s < 3 && <div className={`w-8 md:w-12 h-px ${step > s ? 'bg-[#1B5E20]' : 'bg-slate-100'}`} />}
           </div>
         ))}
      </div>

      <div className="bg-white rounded-[2rem] md:rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
         {/* Header */}
         <div className="p-8 md:p-12 border-b border-slate-50 bg-slate-50/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
               <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tighter leading-none mb-3">
                  Find your next <span className="text-[#1B5E20]">Masterpiece</span>
               </h1>
               <p className="text-xs md:text-sm text-slate-500 font-medium italic opacity-80">
                  Join over 5,000 African enterprises hiring elite talent on Connect+.
               </p>
            </div>
            <div className="px-5 py-2 bg-[#1B5E20]/5 rounded-full border border-[#1B5E20]/10 flex items-center gap-2 h-fit w-fit">
               <Sparkles className="w-3.5 h-3.5 text-[#1B5E20]" />
               <span className="text-[10px] font-black uppercase tracking-widest text-[#1B5E20]">AI-Enhanced Draft</span>
            </div>
         </div>

         <div className="p-6 md:p-12 space-y-8 md:space-y-10">
            {step === 1 && (
              <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Job Title</label>
                       <input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} type="text" placeholder="e.g. Senior Full Stack Engineer" className="w-full h-12 md:h-14 px-4 md:px-6 rounded-xl md:rounded-2xl bg-slate-50 border-none outline-none text-[13px] md:text-sm font-bold text-slate-700 focus:bg-white focus:ring-2 md:focus:ring-4 focus:ring-[#1B5E20]/5 transition-all" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Company</label>
                       <input value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} type="text" placeholder="Your brand name" className="w-full h-12 md:h-14 px-4 md:px-6 rounded-xl md:rounded-2xl bg-slate-50 border-none outline-none text-[13px] md:text-sm font-bold text-slate-700 focus:bg-white focus:ring-2 md:focus:ring-4 focus:ring-[#1B5E20]/5 transition-all" />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Workplace Type</label>
                       <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full h-12 md:h-14 px-4 md:px-6 rounded-xl md:rounded-2xl bg-slate-50 border-none outline-none text-[13px] md:text-sm font-bold text-slate-700 focus:bg-white focus:ring-2 md:focus:ring-4 focus:ring-[#1B5E20]/5 transition-all appearance-none">
                          <option>On-site</option>
                          <option>Hybrid</option>
                          <option>Remote</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Location</label>
                       <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} type="text" placeholder="e.g. Kampala, Uganda" className="w-full h-12 md:h-14 pl-10 pr-4 rounded-xl md:rounded-2xl bg-slate-50 border-none outline-none text-[13px] md:text-sm font-bold text-slate-700 focus:bg-white focus:ring-2 md:focus:ring-4 focus:ring-[#1B5E20]/5 transition-all" />
                       </div>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Job Description</label>
                    <textarea 
                      value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Describe the mission, the impact, and the ideal candidate..." 
                      className="w-full h-40 md:h-48 px-6 py-4 md:py-6 rounded-[2rem] md:rounded-[2.5rem] bg-slate-50 border-none outline-none text-[13px] md:text-sm font-medium leading-relaxed text-slate-700 focus:bg-white focus:ring-2 md:focus:ring-4 focus:ring-[#1B5E20]/5 transition-all resize-none"
                    />
                 </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                 <div className="p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden group">
                    <div className="relative z-10">
                       <h3 className="text-lg md:text-xl font-black mb-2 tracking-tight">Recruiter Intel ✨</h3>
                       <p className="text-[11px] md:text-xs text-white/60 leading-relaxed font-medium italic max-w-lg">"LinkedIn data shows that clear salary bands increase qualified applicant volume by 45%."</p>
                    </div>
                    <Sparkles className="absolute -bottom-10 -right-10 w-32 h-32 md:w-48 md:h-48 opacity-10 group-hover:scale-110 transition-transform duration-500" />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Salary Range (Minimum)</label>
                       <input value={formData.salaryMin} onChange={(e) => setFormData({...formData, salaryMin: e.target.value})} type="number" placeholder="UGX" className="w-full h-12 md:h-14 px-4 md:px-6 rounded-xl md:rounded-2xl bg-slate-50 border-none outline-none text-[13px] md:text-sm font-bold text-slate-700 focus:bg-white focus:ring-2 md:focus:ring-4 focus:ring-[#1B5E20]/5 transition-all" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Salary Range (Maximum)</label>
                       <input value={formData.salaryMax} onChange={(e) => setFormData({...formData, salaryMax: e.target.value})} type="number" placeholder="UGX" className="w-full h-12 md:h-14 px-4 md:px-6 rounded-xl md:rounded-2xl bg-slate-50 border-none outline-none text-[13px] md:text-sm font-bold text-slate-700 focus:bg-white focus:ring-2 md:focus:ring-4 focus:ring-[#1B5E20]/5 transition-all" />
                    </div>
                 </div>

                 <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Skills Required (Up to 10)</label>
                    <div className="flex flex-wrap gap-2">
                       {skills.map(s => (
                         <span key={s} className="px-3 md:px-4 py-1.5 md:py-2 bg-[#1B5E20] text-white rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 group">
                            {s} <button onClick={() => removeSkill(s)} className="opacity-60 hover:opacity-100"><X className="w-3 h-3" /></button>
                         </span>
                       ))}
                    </div>
                    <div className="flex gap-2">
                       <input 
                         type="text" 
                         value={skillInput}
                         onChange={(e) => setSkillInput(e.target.value)}
                         onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                         placeholder="Add a skill" 
                         className="flex-1 h-12 px-4 rounded-xl bg-slate-50 border-none outline-none text-xs font-bold text-slate-700 focus:bg-white focus:ring-2 focus:ring-[#1B5E20]/5"
                       />
                       <button onClick={addSkill} className="px-6 h-12 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors">
                          Add
                       </button>
                    </div>
                 </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                 <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                       <Globe className="w-8 h-8 text-[#0a66c2]" />
                    </div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Review & Publish</h2>
                    <p className="text-xs text-slate-500 font-medium mt-1">Make sure everything looks perfect before going live.</p>
                 </div>

                 <div className="p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-slate-100 bg-slate-50/50 space-y-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-100 pb-6">
                       <div>
                          <h3 className="text-lg font-black text-slate-900">{formData.title || "Untitled Position"}</h3>
                          <p className="text-sm font-bold text-slate-500 mt-1">{formData.company || "Company Name"} · {formData.location || "Location"}</p>
                          <div className="flex items-center gap-2 mt-3">
                             <span className="px-3 py-1 bg-slate-200 text-slate-600 rounded-md text-[10px] font-bold uppercase">{formData.type}</span>
                             {(formData.salaryMin || formData.salaryMax) && (
                               <span className="px-3 py-1 bg-green-100 text-[#1B5E20] rounded-md text-[10px] font-bold uppercase flex items-center gap-1">
                                  <DollarSign className="w-3 h-3" /> {formData.salaryMin} - {formData.salaryMax} UGX
                               </span>
                             )}
                          </div>
                       </div>
                    </div>
                    <div>
                       <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Description Preview</h4>
                       <p className="text-xs text-slate-600 font-medium leading-relaxed line-clamp-4">
                         {formData.description || "No description provided."}
                       </p>
                    </div>
                    {skills.length > 0 && (
                      <div>
                         <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Required Skills</h4>
                         <div className="flex flex-wrap gap-1.5">
                            {skills.map(s => (
                              <span key={s} className="px-2.5 py-1 bg-white border border-slate-200 text-slate-600 rounded-md text-[10px] font-bold">
                                 {s}
                              </span>
                            ))}
                         </div>
                      </div>
                    )}
                 </div>
              </div>
            )}

            <div className="pt-6 md:pt-8 border-t border-slate-50 flex items-center justify-between">
               <button 
                 onClick={() => setStep(prev => Math.max(1, prev - 1))}
                 className={`px-4 md:px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:text-slate-800 bg-slate-50 hover:bg-slate-100'}`}
               >
                  Back
               </button>
               {step < 3 ? (
                 <button 
                   onClick={() => setStep(prev => prev + 1)}
                   className="px-8 md:px-12 py-3 md:py-3.5 rounded-full bg-slate-900 text-white font-black text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl shadow-slate-200 hover:scale-105 transition-all active:scale-95"
                 >
                    Next Step
                 </button>
               ) : (
                 <button 
                   onClick={handlePublish}
                   disabled={isPublishing}
                   className="px-8 md:px-12 py-3 md:py-3.5 rounded-full bg-[#1B5E20] text-white font-black text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl shadow-green-900/20 hover:scale-105 transition-all active:scale-95 flex items-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
                 >
                    {isPublishing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Rocket className="w-4 h-4" />}
                    {isPublishing ? 'Publishing...' : 'Finalize & Publish'}
                 </button>
               )}
            </div>
         </div>
      </div>

      <div className="mt-8 md:mt-12 text-center text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
         Connect+ Enterprise · Professional Integrity Guaranteed
      </div>
    </div>
  );
}
