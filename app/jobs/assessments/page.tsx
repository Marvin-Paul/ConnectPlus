"use client";

import { useState } from "react";
import { JobsSidebar } from "../jobs-sidebar";
import { ClipboardCheck, Star, Play, Video, ShieldCheck, ChevronRight, BookOpen, Clock, X } from "lucide-react";
import { QuizPlayer } from "@/components/learning/quiz-player";

export default function AssessmentsPage() {
  const [activeTab, setActiveTab] = useState<"available" | "completed">("available");
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);

  const quizzes = [
    { id: "react-dev", title: "React Development", duration: "15 min", questions: 20, level: "ADVANCED", icon: Star, badge: "React Verified" },
    { id: "python-ds", title: "Python for Data Science", duration: "25 min", questions: 35, level: "INTERMEDIATE", icon: BookOpen, badge: "Python Pro" },
    { title: "Adobe Illustrator", duration: "10 min", questions: 15, level: "BEGINNER", icon: ShieldCheck, badge: "Visual Design" }
  ];

  const tasks = [
    { title: "Customer Escalation Strategy", type: "Scenario", time: "10 min" },
    { title: "Portfolio Video Introduction", type: "Video", time: "1 min" }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 transition-colors duration-500 pb-20">
      <div className="max-w-7xl mx-auto py-12 px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <aside className="lg:col-span-3">
          <JobsSidebar />
        </aside>

        <main className="lg:col-span-9 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-soft overflow-hidden transition-all duration-500">
             {activeQuizId ? (
                <div className="relative">
                   <button 
                     onClick={() => setActiveQuizId(null)}
                     className="absolute top-6 right-6 p-2 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-red-500 transition-all z-20"
                     aria-label="Close Quiz"
                     title="Exit Assessment"
                   >
                     <X className="w-5 h-5" />
                   </button>
                   <QuizPlayer quizId={activeQuizId} onClose={() => setActiveQuizId(null)} />
                </div>
             ) : (
                <>
                  <div className="p-12 border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl">
                     <h1 className="text-4xl font-black text-slate-900 dark:text-white flex items-center gap-5 tracking-tight">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700">
                           <ClipboardCheck className="w-10 h-10 text-[#0a66c2] dark:text-blue-400" />
                        </div>
                        Certification Lab
                     </h1>
                     <p className="text-sm text-slate-500 dark:text-slate-400 mt-6 font-bold uppercase tracking-widest italic opacity-80 leading-relaxed max-w-2xl">
                       Demonstrate your professional expertise. Earn verified badges that appear directly on your profile to stand out to global recruiters.
                     </p>
                  </div>

                  <div className="p-10">
                     <div className="flex gap-10 mb-12 border-b border-slate-100 dark:border-slate-800">
                        <button 
                          onClick={() => setActiveTab("available")}
                          className={`pb-5 text-[11px] font-black uppercase tracking-[0.2em] border-b-4 transition-all duration-300 ${activeTab === "available" ? "border-[#0a66c2] dark:border-blue-400 text-[#0a66c2] dark:text-blue-400" : "border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white"}`}
                        >
                          Available Assessments
                        </button>
                        <button 
                           onClick={() => setActiveTab("completed")}
                           className={`pb-5 text-[11px] font-black uppercase tracking-[0.2em] border-b-4 transition-all duration-300 ${activeTab === "completed" ? "border-[#0a66c2] dark:border-blue-400 text-[#0a66c2] dark:text-blue-400" : "border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white"}`}
                        >
                          Credential Vault (0)
                        </button>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {quizzes.map((quiz) => (
                          <div key={quiz.title} className="p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-[#0a66c2]/20 dark:hover:border-blue-400/20 transition-all duration-500 cursor-pointer group bg-white dark:bg-slate-800/30 relative overflow-hidden">
                             <div className="flex items-start justify-between relative z-10">
                                <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl group-hover:bg-[#0a66c2]/5 dark:group-hover:bg-blue-400/5 group-hover:scale-110 transition-all duration-700">
                                   <quiz.icon className="w-10 h-10 text-[#0a66c2] dark:text-blue-400" />
                                </div>
                                <div className="px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-[#0a66c2] dark:text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-100 dark:border-blue-800">
                                  {quiz.level}
                                </div>
                             </div>
                             <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-10 tracking-tight group-hover:text-[#0a66c2] dark:group-hover:text-blue-400 transition-colors">{quiz.title}</h3>
                             <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-3 flex items-center gap-3 italic">
                               <Clock className="w-4 h-4" /> {quiz.duration} • {quiz.questions} Problems
                             </p>
                             <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                                <span className="text-[10px] font-black text-[#057642] dark:text-emerald-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                   <ShieldCheck className="w-5 h-5" /> Verified Badge: {quiz.badge}
                                </span>
                                <button 
                                  onClick={() => quiz.id && setActiveQuizId(quiz.id)}
                                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-[#0a66c2] dark:bg-blue-600 text-white font-black text-[11px] uppercase tracking-widest hover:bg-[#004182] dark:hover:bg-blue-500 transition-all active:scale-95 shadow-xl shadow-blue-900/10 dark:shadow-blue-500/10 group/btn"
                                >
                                  Engage Lab
                                  <Play className="w-4 h-4 fill-white group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                             </div>
                             <div className="absolute top-0 right-0 w-48 h-48 bg-[#0a66c2]/5 dark:bg-blue-400/5 rounded-full -mr-24 -mt-24 group-hover:scale-150 transition-transform duration-1000" />
                          </div>
                        ))}
                     </div>

                     <div className="mt-20 p-12 rounded-[4rem] bg-slate-50/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 relative overflow-hidden group backdrop-blur-md">
                        <h2 className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] mb-10 text-center">Specialized Technical Verification Tasks</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                           {tasks.map((task) => (
                             <div key={task.title} className="p-8 bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between hover:shadow-2xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-500 cursor-pointer group/task hover:-translate-y-1">
                                <div className="flex gap-6 items-center">
                                   <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl group-hover/task:bg-[#0a66c2]/10 dark:group-hover/task:bg-blue-400/10 transition-colors">
                                      {task.type === "Video" ? <Video className="w-6 h-6 text-[#0a66c2] dark:text-blue-400" /> : <Play className="w-6 h-6 text-[#0a66c2] dark:text-blue-400" />}
                                   </div>
                                   <div>
                                      <h4 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">{task.title}</h4>
                                      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest mt-1 italic">{task.type} • {task.time} Session</p>
                                   </div>
                                </div>
                                <div className="w-10 h-10 rounded-full border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-300 dark:text-slate-600 group-hover/task:text-blue-500 dark:group-hover/task:text-blue-400 group-hover/task:translate-x-1 transition-all">
                                   <ChevronRight className="w-5 h-5" />
                                </div>
                             </div>
                           ))}
                        </div>
                        <ShieldCheck className="absolute -bottom-32 -right-32 w-[30rem] h-[30rem] opacity-[0.03] dark:opacity-[0.05] text-[#0a66c2] dark:text-blue-400 group-hover:rotate-12 transition-transform duration-1000" />
                     </div>
                  </div>
                </>
             )}
          </div>
        </main>
      </div>
    </div>
  );
}
