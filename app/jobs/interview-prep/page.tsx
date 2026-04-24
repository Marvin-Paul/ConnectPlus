"use client";

import { JobsSidebar } from "../jobs-sidebar";
import { 
  MessageSquareReply, 
  Play, 
  BookOpen, 
  Star, 
  ChevronRight, 
  Mic, 
  Video, 
  Sparkles,
  Award,
  Zap,
  ArrowRight
} from "lucide-react";
import { useState } from "react";

export default function InterviewPrepPage() {
  const [activeCategory, setActiveCategory] = useState("Common Questions");

  const categories = [
    { title: "Common Questions", count: "26 questions", icon: MessageSquareReply, color: "blue" },
    { title: "System Design", count: "12 topics", icon: Play, color: "emerald" },
    { title: "Behavioral Prep", count: "15 techniques", icon: Star, color: "amber" }
  ];

  const questions = [
    { q: "Tell me about yourself", category: "Common", answers: 124, difficulty: "Easy" },
    { q: "What is your greatest strength?", category: "Common", answers: 98, difficulty: "Easy" },
    { q: "Describe a difficult situation you've faced", category: "Behavioral", answers: 42, difficulty: "Hard" },
    { q: "Why do you want to work for our company?", category: "Common", answers: 76, difficulty: "Medium" }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 transition-colors duration-500 pb-24">
      <div className="max-w-7xl mx-auto pt-10 px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* SIDEBAR */}
        <aside className="lg:col-span-3">
          <JobsSidebar />
        </aside>

        {/* MAIN CONTENT */}
        <main className="lg:col-span-9 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* Hero Section - High Fidelity */}
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-soft transition-all duration-500 relative">
             <div className="p-12 border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-4 text-[#0A66C2] dark:text-blue-400 mb-4">
                     <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-2xl border border-blue-100 dark:border-blue-800">
                        <Sparkles className="w-6 h-6 fill-[#0A66C2] dark:fill-blue-400" />
                     </div>
                     <span className="text-[12px] font-black uppercase tracking-[0.3em]">Smart Preparation Hub</span>
                  </div>
                  <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight mb-6">
                     Master your <br/><span className="text-[#0A66C2] dark:text-blue-400">Next Big Interview</span>
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400 text-lg font-bold max-w-2xl leading-relaxed italic opacity-80">
                     Practice with real-world scenarios and receive AI-driven feedback on your performance, body language, and speaking pace.
                  </p>
                </div>
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#0A66C2]/10 dark:bg-blue-400/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/2" />
             </div>

             {/* Category Grid */}
             <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                {categories.map((cat) => (
                  <button 
                    key={cat.title} 
                    onClick={() => setActiveCategory(cat.title)}
                    className={`p-8 rounded-[2rem] border text-left transition-all duration-500 group relative overflow-hidden ${
                      activeCategory === cat.title 
                        ? 'border-[#0A66C2] dark:border-blue-400 bg-[#0A66C2]/5 dark:bg-blue-400/5 shadow-2xl scale-[1.02]' 
                        : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/30 hover:border-[#0A66C2]/30 dark:hover:border-blue-400/30 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                     <div className={`p-4 w-fit rounded-2xl border transition-all duration-500 ${
                       activeCategory === cat.title 
                         ? 'bg-[#0A66C2] dark:bg-blue-600 border-transparent scale-110 shadow-xl shadow-blue-500/20' 
                         : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 group-hover:scale-110'
                     }`}>
                        <cat.icon className={`w-7 h-7 ${activeCategory === cat.title ? 'text-white' : 'text-[#0A66C2] dark:text-blue-400'}`} />
                     </div>
                     <h3 className="text-lg font-black text-slate-900 dark:text-white mt-8 tracking-tight group-hover:text-[#0A66C2] dark:group-hover:text-blue-400 transition-colors">{cat.title}</h3>
                     <p className={`text-[11px] font-black uppercase tracking-widest mt-2 transition-colors italic ${
                       activeCategory === cat.title ? 'text-[#0A66C2] dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'
                     }`}>
                       {cat.count}
                     </p>
                     
                     {/* Active Indicator */}
                     {activeCategory === cat.title && (
                       <div className="absolute top-5 right-5 w-3 h-3 bg-[#0A66C2] dark:bg-blue-400 rounded-full animate-ping" />
                     )}
                  </button>
                ))}
             </div>
          </div>

          {/* Practice Feed */}
          <div className="space-y-8">
             <div className="flex items-center justify-between px-4">
                <div className="flex items-center gap-4">
                   <h2 className="text-[15px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Curated Technical Challenges</h2>
                   <span className="px-3 py-1 rounded-full bg-[#0A66C2]/10 dark:bg-blue-400/10 text-[10px] font-black text-[#0A66C2] dark:text-blue-400 uppercase tracking-[0.3em] border border-blue-100 dark:border-blue-900">
                      High Impact
                   </span>
                </div>
                <button className="text-[12px] font-black text-[#0A66C2] dark:text-blue-400 uppercase tracking-widest hover:underline flex items-center gap-2 group transition-all">
                   Explore Bank <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
             </div>

             <div className="grid grid-cols-1 gap-6">
                {questions.map((item) => (
                  <div 
                    key={item.q} 
                    className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 cursor-pointer group shadow-soft"
                  >
                     <div className="flex gap-8 items-start">
                        <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-100 dark:border-slate-700 group-hover:bg-[#0A66C2]/5 dark:group-hover:bg-blue-400/5 group-hover:border-[#0A66C2]/20 dark:group-hover:border-blue-400/20 group-hover:rotate-6 transition-all duration-500 shrink-0">
                           <BookOpen className="w-7 h-7 text-slate-400 dark:text-slate-600 group-hover:text-[#0A66C2] dark:group-hover:text-blue-400 transition-colors" />
                        </div>
                        <div className="space-y-3">
                           <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                              <h4 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-[#0A66C2] dark:group-hover:text-blue-400 transition-colors tracking-tight leading-tight">
                                {item.q}
                              </h4>
                              <span className={`w-fit px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                                item.difficulty === 'Easy' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800' : 
                                item.difficulty === 'Medium' ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-800' : 
                                'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-800'
                              }`}>
                                 {item.difficulty}
                              </span>
                           </div>
                           <p className="text-[13px] text-slate-500 dark:text-slate-400 font-bold leading-relaxed italic opacity-80">
                              <span className="font-black text-[#0A66C2] dark:text-blue-400 uppercase tracking-widest mr-3 not-italic border-b border-blue-100 dark:border-blue-800 pb-0.5">{item.category}</span>
                              • {item.answers} sample answers from elite candidates
                           </p>
                        </div>
                     </div>
                     
                     <div className="flex items-center gap-4">
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-[11px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-[#0A66C2] dark:hover:border-blue-400 transition-all active:scale-95">
                           <Video className="w-4 h-4" /> Start Practice
                        </button>
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-8 py-3.5 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white text-[11px] font-black uppercase tracking-widest hover:bg-black dark:hover:bg-slate-700 transition-all active:scale-95 shadow-xl border border-white/5">
                           Model Answers
                        </button>
                     </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Premium AI Feedback CTA */}
          <div className="bg-slate-900 dark:bg-slate-800 rounded-[4rem] p-12 text-white relative overflow-hidden group shadow-2xl border border-white/5 transition-all duration-700">
             <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="space-y-10">
                   <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl">
                         <Award className="w-7 h-7 text-yellow-400" />
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40">Elite Protocol</span>
                   </div>
                   
                   <div className="space-y-5">
                      <h2 className="text-4xl font-black leading-tight tracking-tighter">
                         Elevate performance with <br/><span className="text-yellow-400">Bio-Behavioral AI</span>
                      </h2>
                      <p className="text-white/60 text-lg font-bold leading-relaxed italic opacity-80">
                        "Unlock real-time behavioral insights, facial expression mapping, and semantic clarity scores used by global leadership."
                      </p>
                   </div>
                   
                   <div className="flex flex-col sm:flex-row items-center gap-6">
                      <button className="w-full sm:w-auto h-14 px-12 rounded-full bg-yellow-400 text-slate-900 font-black text-[13px] uppercase tracking-widest hover:bg-yellow-300 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-2xl shadow-yellow-400/20">
                         Activate Pro <Zap className="w-4 h-4 fill-slate-900" />
                      </button>
                      <button className="w-full sm:w-auto h-14 px-8 rounded-full border border-white/20 text-white font-black text-[12px] uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95">
                         Analytical Case Studies
                      </button>
                   </div>
                </div>

                <div className="relative hidden md:block group-hover:translate-x-3 transition-transform duration-1000">
                   <div className="bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/10 p-10 space-y-8 relative z-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
                       <div className="flex items-center justify-between">
                          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40">Resonance Score</span>
                          <span className="text-2xl font-black text-emerald-400 tracking-tighter">92.4%</span>
                       </div>
                       <div className="space-y-4">
                          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                             <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 w-[92%] shadow-[0_0_25px_rgba(52,211,153,0.4)]" />
                          </div>
                          <p className="text-[12px] text-white/50 font-bold leading-relaxed italic">Strategic pace and lexical clarity achieved. Reduce linguistic filler frequency by 12% for optimal impact.</p>
                       </div>
                       
                       <div className="grid grid-cols-2 gap-6">
                          <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-colors duration-500 group/item">
                             <Mic className="w-5 h-5 text-blue-400 mb-3 group-hover/item:scale-110 transition-transform" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-1">Spectral Clarity</span>
                             <span className="text-base font-black text-white">Elite Grade</span>
                          </div>
                          <div className={`p-6 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-colors duration-500 group/item`}>
                             <Video className="w-5 h-5 text-purple-400 mb-3 group-hover/item:scale-110 transition-transform" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-1">Somatic Sync</span>
                             <span className="text-base font-black text-white">Positive</span>
                          </div>
                       </div>
                   </div>
                   
                   {/* Decorative background glow */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#0A66C2]/20 blur-[120px] -z-10" />
                </div>
             </div>
          </div>
        </main>
      </div>
    </div>
  );
}
