"use client";

import { useState } from "react";
import { JobsSidebar } from "../jobs-sidebar";
import { ClipboardCheck, Star, Play, Video, ShieldCheck, ChevronRight, BookOpen, Clock } from "lucide-react";

export default function AssessmentsPage() {
  const [activeTab, setActiveTab] = useState<"available" | "completed">("available");

  const quizzes = [
    { title: "React Development", duration: "15 min", questions: 20, level: "ADVANCED", icon: Star, badge: "React Verified" },
    { title: "Python for Data Science", duration: "25 min", questions: 35, level: "INTERMEDIATE", icon: BookOpen, badge: "Python Pro" },
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
        <div className="bg-white rounded-2xl border border-[#e0e0e0] shadow-sm overflow-hidden">
           <div className="p-8 border-b border-[#e0e0e0] bg-slate-50/50">
              <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
                 <ClipboardCheck className="w-8 h-8 text-[#0a66c2]" /> Skill Assessments
              </h1>
              <p className="text-sm text-[#666666] mt-2 font-medium">Earn badges and stand out to recruiters with verified skills.</p>
           </div>

           <div className="p-8">
              <div className="flex gap-4 mb-8">
                 <button 
                   onClick={() => setActiveTab("available")}
                   className={`pb-3 text-sm font-black border-b-2 transition-all ${activeTab === "available" ? "border-[#0a66c2] text-[#0a66c2]" : "border-transparent text-[#666666] hover:text-black"}`}
                 >
                   Available Tests
                 </button>
                 <button 
                    onClick={() => setActiveTab("completed")}
                    className={`pb-3 text-sm font-black border-b-2 transition-all ${activeTab === "completed" ? "border-[#0a66c2] text-[#0a66c2]" : "border-transparent text-[#666666] hover:text-black"}`}
                 >
                   My Badges (0)
                 </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {quizzes.map((quiz) => (
                   <div key={quiz.title} className="p-6 rounded-3xl border border-slate-100 hover:border-[#0a66c2]/40 hover:shadow-xl transition-all cursor-pointer group bg-gradient-to-br from-white to-slate-50/20">
                      <div className="flex items-start justify-between">
                         <div className="p-4 bg-white border border-slate-200 rounded-2xl group-hover:scale-110 transition-transform">
                            <quiz.icon className="w-8 h-8 text-[#0a66c2]" />
                         </div>
                         <div className="px-2 py-0.5 bg-blue-50 text-[#0a66c2] text-[9px] font-black uppercase tracking-widest rounded-full">
                           {quiz.level}
                         </div>
                      </div>
                      <h3 className="text-lg font-black text-slate-800 mt-6">{quiz.title}</h3>
                      <p className="text-xs font-bold text-[#666666] mt-1 flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" /> {quiz.duration} • {quiz.questions} Questions
                      </p>
                      <div className="mt-8 flex items-center justify-between">
                         <span className="text-[10px] font-black text-[#057642] uppercase tracking-wider flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" /> Badge: {quiz.badge}
                         </span>
                         <button className="px-6 py-2 rounded-full bg-[#0a66c2] text-white font-black text-xs group-hover:bg-[#004182] transition-colors shadow-blue-100 shadow-xl">
                           Start Quiz
                         </button>
                      </div>
                   </div>
                 ))}
              </div>

              <div className="mt-12 p-8 rounded-3xl bg-[#edf3f8]/50 border border-[#e0e0e0]/50 relative overflow-hidden">
                 <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6">interactive & video tasks</h2>
                 <div className="space-y-4 relative z-10">
                    {tasks.map((task) => (
                      <div key={task.title} className="p-6 bg-white rounded-2xl border border-slate-100 flex items-center justify-between hover:shadow-lg transition-all cursor-pointer">
                         <div className="flex gap-4 items-center">
                            <div className="p-2 bg-blue-50 rounded-lg">
                               {task.type === "Video" ? <Video className="w-4 h-4 text-[#0a66c2]" /> : <Play className="w-4 h-4 text-[#0a66c2]" />}
                            </div>
                            <div>
                               <h4 className="text-sm font-bold text-slate-800">{task.title}</h4>
                               <p className="text-[10px] text-[#666666] font-black uppercase tracking-widest mt-1">{task.type} • {task.time}</p>
                            </div>
                         </div>
                         <ChevronRight className="w-5 h-5 text-[#666666]" />
                      </div>
                    ))}
                 </div>
                 <ShieldCheck className="absolute -bottom-10 -right-10 w-48 h-48 opacity-5 text-[#0a66c2]" />
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}
