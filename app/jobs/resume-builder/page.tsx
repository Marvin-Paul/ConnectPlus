"use client";

import { useState } from "react";
import { JobsSidebar } from "../jobs-sidebar";
import { 
  FileText, 
  Wand2, 
  Plus, 
  GripVertical, 
  EyeOff, 
  LayoutTemplate, 
  Import, 
  Download, 
  History, 
  Sparkles,
  CheckCircle2,
  Trash2,
  Settings,
  ChevronRight,
  Zap,
  Target
} from "lucide-react";

export default function ResumeBuilderPage() {
  const [sections, setSections] = useState([
    { id: "s1", name: "Professional Summary", content: "Innovative Full Stack Developer with 5+ years of expertise in architecting scalable React & Node.js applications. Passionate about AI integration and high-performance UX." },
    { id: "s2", name: "Work Experience", content: "Senior Engineering Lead at Chipper Cash • 2021 - Present\n- Orchestrated the migration of legacy payment gateways to a microservices architecture, reducing latency by 40%." },
    { id: "s3", name: "Education", content: "BSc in Computer Science • Makerere Engineering School • First Class Honors" }
  ]);

  const [isPrivacyOn, setIsPrivacyOn] = useState(true);
  const [activeTab, setActiveTab] = useState("edit"); // edit | preview

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 transition-colors duration-500 pb-24">
      <div className="max-w-7xl mx-auto pt-10 px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* SIDEBAR */}
        <aside className="lg:col-span-3">
          <JobsSidebar />
        </aside>

        {/* MAIN CONTENT Area */}
        <main className="lg:col-span-9 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
           
           {/* High-Fidelity Header */}
           <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-10 shadow-soft relative overflow-hidden transition-all duration-500">
              <div className="relative z-10 space-y-3">
                 <div className="flex items-center gap-3 text-[#0A66C2] dark:text-blue-400 mb-2">
                    <Target className="w-5 h-5" />
                    <span className="text-[12px] font-black uppercase tracking-[0.3em]">ATS Optimizer Pro</span>
                 </div>
                 <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight">
                    Elevate your <br/><span className="text-[#0A66C2] dark:text-blue-400">Professional Identity</span>
                 </h1>
                 <p className="text-slate-500 dark:text-slate-400 font-bold max-w-lg leading-relaxed italic opacity-80">
                    Build an elite, standardized resume optimized for modern Applicant Tracking Systems (ATS) and human recruiters alike.
                 </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
                 <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-black text-[11px] uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-95 shadow-sm">
                    <LayoutTemplate className="w-4 h-4" /> Switch Template
                 </button>
                 <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-[#0A66C2] dark:bg-blue-600 text-white font-black text-[11px] uppercase tracking-widest hover:bg-[#004182] dark:hover:bg-blue-500 transition-all active:scale-95 shadow-xl shadow-blue-500/20">
                    <Download className="w-4 h-4" /> Export PDF
                 </button>
              </div>

              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#0A66C2]/5 dark:bg-blue-400/5 blur-[100px] -z-0 translate-x-1/2 -translate-y-1/2" />
           </div>

           {/* Quick Actions Bar */}
           <div className="bg-slate-900 dark:bg-slate-800 rounded-[2rem] p-2 flex items-center shadow-2xl border border-white/5">
              <button 
                onClick={() => setActiveTab("edit")}
                className={`flex-1 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-3 ${activeTab === 'edit' ? 'bg-white text-slate-900 shadow-xl scale-[1.02]' : 'text-white/40 hover:text-white/80'}`}
              >
                 <Settings className="w-4 h-4" /> Professional Editor
              </button>
              <button 
                onClick={() => setActiveTab("preview")}
                className={`flex-1 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-3 ${activeTab === 'preview' ? 'bg-white text-slate-900 shadow-xl scale-[1.02]' : 'text-white/40 hover:text-white/80'}`}
              >
                 <EyeOff className="w-4 h-4" /> Live ATS Preview
              </button>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Builder Left Column */}
              <div className="lg:col-span-7 space-y-8">
                 {/* Auto Import CTA */}
                 <button className="w-full p-8 rounded-[2.5rem] border-2 border-dashed border-blue-200 dark:border-slate-800 bg-blue-50/50 dark:bg-slate-800/30 flex items-center justify-between group hover:bg-blue-50 dark:hover:bg-slate-800/50 hover:border-[#0A66C2] dark:hover:border-blue-400 transition-all duration-500">
                    <div className="flex gap-6 items-center text-left">
                       <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-blue-100 dark:border-slate-700 group-hover:rotate-12 transition-transform duration-500">
                          <Import className="w-7 h-7 text-[#0A66C2] dark:text-blue-400" />
                       </div>
                       <div>
                          <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight leading-none">Import Profile Credentials</h3>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest mt-2 italic opacity-80">Sync with your Connect+ verified experience</p>
                       </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-[#0A66C2] dark:text-blue-400 group-hover:translate-x-2 transition-transform duration-500" />
                 </button>

                 <div className="space-y-6">
                    {sections.map((section) => (
                      <div key={section.id} className="p-10 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 group relative hover:border-[#0A66C2] dark:hover:border-blue-400 transition-all duration-500 shadow-soft">
                         <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 opacity-0 group-hover:opacity-100 transition-all duration-500">
                            <div className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl cursor-grab active:cursor-grabbing hover:scale-110 transition-transform">
                               <GripVertical className="w-6 h-6 text-slate-300 dark:text-slate-600" />
                            </div>
                         </div>
                         
                         <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                               <span className="w-2 h-8 bg-[#0A66C2] dark:bg-blue-400 rounded-full" />
                               <h4 className="text-[15px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">{section.name}</h4>
                            </div>
                            <div className="flex items-center gap-3">
                               <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-50 dark:bg-blue-900/30 text-[#0A66C2] dark:text-blue-400 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all duration-300 border border-blue-100/50 dark:border-blue-800/50">
                                  <Wand2 className="w-4 h-4" /> AI Refine
                               </button>
                               <button 
                                 aria-label={`Delete ${section.name} section`}
                                 className="p-2.5 text-slate-300 dark:text-slate-600 hover:text-rose-500 transition-colors rounded-full hover:bg-rose-50 dark:hover:bg-rose-900/20"
                               >
                                  <Trash2 className="w-4 h-4" />
                               </button>
                            </div>
                         </div>
                         
                         <textarea 
                           rows={4}
                           aria-label={`${section.name} content`}
                           placeholder={`Articulate your ${section.name.toLowerCase()} with impact...`}
                           className="w-full p-8 bg-slate-50/50 dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-700 text-[15px] font-bold text-slate-600 dark:text-slate-300 focus:ring-4 focus:ring-[#0A66C2]/10 dark:focus:ring-blue-400/10 focus:bg-white dark:focus:bg-slate-800 focus:border-[#0A66C2] dark:focus:border-blue-400 outline-none transition-all resize-none leading-relaxed placeholder:text-slate-300 dark:placeholder:text-slate-600"
                           defaultValue={section.content}
                         />
                      </div>
                    ))}
                 </div>

                 <button className="w-full py-8 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 font-black text-[11px] uppercase tracking-[0.3em] hover:border-[#0A66C2] dark:hover:border-blue-400 hover:bg-white dark:hover:bg-slate-900 hover:text-[#0A66C2] dark:hover:text-blue-400 transition-all duration-500 flex items-center justify-center gap-4 group">
                    <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg group-hover:rotate-90 transition-transform duration-500">
                      <Plus className="w-5 h-5" />
                    </div>
                    Architect New Section
                 </button>
              </div>

              {/* Right Column - AI Insights & Score */}
              <div className="lg:col-span-5 space-y-10">
                 {/* Resume Score Dial */}
                 <div className="p-12 rounded-[3.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-premium relative overflow-hidden group transition-all duration-500">
                    <div className="relative z-10 flex flex-col items-center text-center">
                       <div className="relative w-48 h-48 mb-10 flex items-center justify-center">
                          {/* Circular Progress Mockup */}
                          <svg className="w-full h-full -rotate-90">
                             <circle cx="96" cy="96" r="84" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="16" fill="transparent" />
                             <circle cx="96" cy="96" r="84" className="stroke-[#0A66C2] dark:stroke-blue-500" strokeWidth="16" fill="transparent" strokeDasharray="527" strokeDashoffset="52" strokeLinecap="round" />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                             <span className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">90</span>
                             <span className="text-[11px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-[0.3em] mt-2">Strength</span>
                          </div>
                       </div>
                       <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-3">Architect Grade 🔥</h3>
                       <p className="text-[13px] text-slate-500 dark:text-slate-400 font-bold leading-relaxed px-6 italic opacity-80">
                          Your profile resonance is in the <span className="text-[#0A66C2] dark:text-blue-400">Top 10%</span> of African tech leadership.
                       </p>
                    </div>
                    {/* Decorative pulse */}
                    <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-[#0A66C2]/10 dark:bg-blue-400/10 blur-[80px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
                 </div>

                 {/* Privacy & Sharing */}
                 <div className="p-10 rounded-[3rem] bg-slate-900 dark:bg-slate-800 text-white shadow-2xl relative overflow-hidden group border border-white/5">
                    <div className="flex items-center justify-between mb-10">
                       <div className="space-y-2">
                          <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40">Privacy Matrix</h3>
                          <p className="text-xl font-black tracking-tight">Stealth Apply Protocol</p>
                       </div>
                       <button 
                         onClick={() => setIsPrivacyOn(!isPrivacyOn)}
                         aria-label="Toggle Stealth Apply Mode"
                         className={`w-16 h-8 rounded-full flex items-center px-1.5 transition-all duration-500 ${isPrivacyOn ? "bg-emerald-500 justify-end shadow-lg shadow-emerald-500/20" : "bg-slate-700 justify-start"}`}
                       >
                          <div className="w-6 h-6 bg-white rounded-full shadow-2xl" />
                       </button>
                    </div>
                    <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 space-y-4 backdrop-blur-md">
                       <div className="flex items-center gap-4">
                          <CheckCircle2 className={`w-5 h-5 transition-colors duration-500 ${isPrivacyOn ? 'text-emerald-400' : 'text-white/10'}`} />
                          <span className="text-xs font-black uppercase tracking-widest text-white/70">Anonymize current employer</span>
                       </div>
                       <div className="flex items-center gap-4">
                          <CheckCircle2 className={`w-5 h-5 transition-colors duration-500 ${isPrivacyOn ? 'text-emerald-400' : 'text-white/10'}`} />
                          <span className="text-xs font-black uppercase tracking-widest text-white/70">Obfuscate contact vectors</span>
                       </div>
                    </div>
                    <Target className="absolute -bottom-10 -left-10 w-48 h-48 opacity-[0.03] group-hover:rotate-45 transition-transform duration-1000" />
                 </div>

                 {/* AI Insights Card */}
                 <div className="p-10 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-8 shadow-soft transition-all duration-500">
                    <div className="flex items-center justify-between">
                       <h3 className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white">AI Intelligence</h3>
                       <div className="p-2 bg-amber-500/10 rounded-lg">
                        <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
                       </div>
                    </div>
                    <div className="space-y-6">
                       <div className="p-6 bg-amber-50 dark:bg-amber-900/10 rounded-[2rem] border border-amber-100 dark:border-amber-800/50 flex gap-6 group cursor-help transition-all duration-300 hover:bg-amber-100/50 dark:hover:bg-amber-900/20">
                          <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shrink-0 shadow-xl border border-amber-100 dark:border-amber-800 group-hover:rotate-6 transition-transform">
                             <Sparkles className="w-6 h-6 text-amber-500" />
                          </div>
                          <div className="space-y-2">
                             <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-amber-900 dark:text-amber-400">Semantic Resonance</h4>
                             <p className="text-[13px] text-amber-800/80 dark:text-amber-300/80 font-bold leading-relaxed italic opacity-90">"Integrating tokens like 'Microservices' and 'Elastic Scaling' enhanced your FinTech match rate by 22%."</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </main>
      </div>
    </div>
  );
}
