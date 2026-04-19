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
    <div className="max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
      <aside className="lg:col-span-3">
        <JobsSidebar />
      </aside>

      <main className="lg:col-span-9 space-y-6">
        <div className="bg-white rounded-[2.5rem] border border-[#e0e0e0] shadow-sm overflow-hidden">
           {activeQuizId ? (
              <div className="relative">
                 <button 
                   onClick={() => setActiveQuizId(null)}
                   className="absolute top-6 right-6 p-2 rounded-full bg-slate-50 text-slate-400 hover:text-red-500 transition-all z-20"
                   aria-label="Close Quiz"
                   title="Exit Assessment"
                 >
                   <X className="w-5 h-5" />
                 </button>
                 <QuizPlayer quizId={activeQuizId} onClose={() => setActiveQuizId(null)} />
              </div>
           ) : (
              <>
                <div className="p-10 border-b border-[#e0e0e0] bg-gradient-to-br from-slate-50 to-white">
                   <h1 className="text-3xl font-black text-slate-800 flex items-center gap-4">
                      <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
                         <ClipboardCheck className="w-8 h-8 text-primary" />
                      </div>
                      Skill Assessments
                   </h1>
                   <p className="text-sm text-[#666666] mt-4 font-medium max-w-xl leading-relaxed">Demonstrate your professional expertise. Earn verified badges that appear directly on your profile to stand out to regional and global recruiters.</p>
                </div>

                <div className="p-10">
                   <div className="flex gap-8 mb-10">
                      <button 
                        onClick={() => setActiveTab("available")}
                        className={`pb-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === "available" ? "border-primary text-primary" : "border-transparent text-slate-400 hover:text-slate-600"}`}
                      >
                        Available Tests
                      </button>
                      <button 
                         onClick={() => setActiveTab("completed")}
                         className={`pb-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === "completed" ? "border-primary text-primary" : "border-transparent text-slate-400 hover:text-slate-600"}`}
                      >
                        My Badges (0)
                      </button>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {quizzes.map((quiz) => (
                        <div key={quiz.title} className="p-8 rounded-[2rem] border border-slate-100 hover:border-primary/30 hover:shadow-2xl transition-all cursor-pointer group bg-white relative overflow-hidden">
                           <div className="flex items-start justify-between relative z-10">
                              <div className="p-5 bg-slate-50 rounded-2xl group-hover:bg-primary/5 group-hover:scale-110 transition-all duration-500">
                                 <quiz.icon className="w-8 h-8 text-primary" />
                              </div>
                              <div className="px-3 py-1 bg-blue-50 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">
                                {quiz.level}
                              </div>
                           </div>
                           <h3 className="text-xl font-extrabold text-slate-800 mt-8 group-hover:text-primary transition-colors">{quiz.title}</h3>
                           <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-2 flex items-center gap-2">
                             <Clock className="w-4 h-4" /> {quiz.duration} • {quiz.questions} Questions
                           </p>
                           <div className="mt-10 flex items-center justify-between relative z-10">
                              <span className="text-[10px] font-black text-[#057642] uppercase tracking-wider flex items-center gap-1.5">
                                 <ShieldCheck className="w-4 h-4" /> Badge: {quiz.badge}
                              </span>
                              <button 
                                onClick={() => quiz.id && setActiveQuizId(quiz.id)}
                                className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-primary text-white font-black text-[11px] uppercase tracking-widest hover:bg-[#004182] hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-premium group/btn"
                              >
                                Start Quiz
                                <Play className="w-3.5 h-3.5 fill-white group-hover/btn:translate-x-1 transition-transform" />
                              </button>
                           </div>
                           <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                        </div>
                      ))}
                   </div>

                   <div className="mt-16 p-10 rounded-[2.5rem] bg-slate-50/50 border border-slate-100 relative overflow-hidden group">
                      <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Specialized verification tasks</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                         {tasks.map((task) => (
                           <div key={task.title} className="p-6 bg-white rounded-2xl border border-slate-200/50 flex items-center justify-between hover:shadow-xl transition-all cursor-pointer hover:border-primary/20">
                              <div className="flex gap-4 items-center">
                                 <div className="p-3 bg-slate-50 rounded-xl group-hover/task:bg-primary/5 transition-colors">
                                    {task.type === "Video" ? <Video className="w-5 h-5 text-primary" /> : <Play className="w-5 h-5 text-primary" />}
                                 </div>
                                 <div className="space-y-1">
                                    <h4 className="text-sm font-bold text-slate-800">{task.title}</h4>
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{task.type} • {task.time}</p>
                                 </div>
                              </div>
                              <ChevronRight className="w-5 h-5 text-slate-300" />
                           </div>
                         ))}
                      </div>
                      <ShieldCheck className="absolute -bottom-20 -right-20 w-80 h-80 opacity-[0.02] text-primary group-hover:rotate-12 transition-transform duration-1000" />
                   </div>
                </div>
              </>
           )}
        </div>
      </main>
    </div>
  );
}
