"use client";

import { JobsSidebar } from "../jobs-sidebar";
import { MessageSquareReply, Play, BookOpen, Star, ChevronRight } from "lucide-react";

export default function InterviewPrepPage() {
  const categories = [
    { title: "Common Questions", count: "26 questions", icon: MessageSquareReply },
    { title: "System Design", count: "12 topics", icon: Play },
    { title: "Behavioral Prep", count: "15 techniques", icon: Star }
  ];

  const questions = [
    { q: "Tell me about yourself", category: "Common", answers: 124 },
    { q: "What is your greatest strength?", category: "Common", answers: 98 },
    { q: "Describe a difficult situation you've faced", category: "Behavioral", answers: 42 }
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
                 <MessageSquareReply className="w-8 h-8 text-[#0a66c2]" /> Interview Prep
              </h1>
              <p className="text-sm text-[#666666] mt-2 font-medium">Practice for the interview and get expert feedback.</p>
           </div>

           <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <div key={cat.title} className="p-6 rounded-2xl border border-slate-100 bg-[#f9fafb] hover:shadow-lg transition-all cursor-pointer group">
                   <div className="p-3 bg-white w-fit rounded-xl border border-slate-200 group-hover:scale-110 transition-transform">
                      <cat.icon className="w-6 h-6 text-[#0a66c2]" />
                   </div>
                   <h3 className="text-sm font-black text-slate-800 mt-4">{cat.title}</h3>
                   <p className="text-[11px] text-[#666666] font-bold mt-1 uppercase tracking-widest">{cat.count}</p>
                </div>
              ))}
           </div>

           <div className="px-8 pb-8">
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2">Commonly asked questions</h2>
              <div className="space-y-4">
                 {questions.map((item) => (
                   <div key={item.q} className="p-6 rounded-2xl border border-slate-100 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                      <div className="flex gap-4 items-center">
                         <div className="p-2 bg-blue-50 rounded-lg">
                             <BookOpen className="w-4 h-4 text-[#0a66c2]" />
                         </div>
                         <div>
                            <h4 className="text-sm font-bold text-slate-800 group-hover:text-[#0a66c2] transition-colors">{item.q}</h4>
                            <p className="text-[10px] text-[#666666] uppercase font-bold tracking-widest mt-1">{item.category} • {item.answers} sample answers</p>
                         </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[#666666] group-hover:translate-x-1 transition-transform" />
                   </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="bg-[#0a66c2] rounded-2xl p-8 text-white relative overflow-hidden group">
            <div className="relative z-10 space-y-4">
               <h3 className="text-xl font-black">Get AI-powered feedback on your prep! ⚡</h3>
               <p className="text-white/80 text-sm max-w-lg font-medium leading-relaxed">
                 Record your answers and get instant analysis on your speaking pace, filler words, and sentiment to improve your confidence.
               </p>
               <button className="px-8 py-3 rounded-full bg-white text-[#0a66c2] font-black text-sm hover:scale-105 transition-all shadow-xl shadow-blue-900/40">
                 Unlock AI Feedback
               </button>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform" />
        </div>
      </main>
    </div>
  );
}
