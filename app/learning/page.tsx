"use client";

import { useState } from "react";
import { 
  Play, 
  BookOpen, 
  Clock, 
  Star, 
  Users, 
  Award, 
  Search, 
  Filter, 
  ChevronRight, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  Calendar,
  Lock,
  Pause,
  Layout
} from "lucide-react";
import Link from "next/link";

const MY_COURSES = [
  { id: "c1", title: "Mastering Next.js 14 & AI integration", provider: "Connect+ Elite", progress: 65, total: 12, completed: 8, thumb: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=300&h=160" },
  { id: "c2", title: "Enterprise System Design for Scale", provider: "Chipper Engineering", progress: 20, total: 18, completed: 4, thumb: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=300&h=160" }
];

const RECOMMENDED = [
  { id: "r1", title: "AI-Driven Product Management", level: "Intermediate", rating: 4.8, students: "12k", price: "Premium", thumb: "https://images.unsplash.com/photo-1579389083046-e3df9c2b3325?auto=format&fit=crop&q=80&w=400&h=220" },
  { id: "r2", title: "Strategic Leadership for Tech CIOs", level: "Advanced", rating: 4.9, students: "5.4k", price: "Premium", thumb: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=400&h=220" },
  { id: "r3", title: "Cybersecurity Essentials for Fintech", level: "Beginner", rating: 4.7, students: "28k", price: "Free", thumb: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400&h=220" }
];

export default function LearningPage() {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">
        <div className="space-y-4">
           <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 w-fit rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-green-100">
              <Award className="w-3 h-3" /> Connect+ Learning Academy
           </div>
           <h1 className="text-5xl font-black text-slate-800 tracking-tighter leading-none">
              Infinite <span className="text-green-600">Growth</span>
           </h1>
           <p className="text-lg text-slate-500 font-medium max-w-xl italic">
              Professional development curated for top-tier African tech leaders and managers.
           </p>
        </div>
        <div className="relative group flex-1 max-w-md">
           <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-green-600 transition-colors" />
           <input 
             type="text" 
             placeholder="Search courses, webinars, certifications..."
             className="w-full h-16 pl-16 pr-6 rounded-3xl border border-slate-100 outline-none bg-white text-sm font-bold text-slate-700 focus:ring-4 focus:ring-green-50 transition-all shadow-xl shadow-slate-100"
           />
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Course Discovery */}
        <main className="lg:col-span-8 space-y-16">
           
           {/* Continue Learning */}
           <section className="space-y-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                 <h2 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Play className="w-4 h-4 text-green-600" /> Continue Learning
                 </h2>
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">2 In-progress courses</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {MY_COURSES.map(course => (
                   <div key={course.id} className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                      <div className="h-40 overflow-hidden relative">
                         <img src={course.thumb} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                         <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <button className="p-4 rounded-full bg-white text-green-600 shadow-2xl">
                               <Play className="w-6 h-6 fill-current" />
                            </button>
                         </div>
                      </div>
                      <div className="p-8">
                         <div className="flex items-center justify-between mb-4">
                            <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">{course.provider}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{course.completed}/{course.total} Lessons</p>
                         </div>
                         <h3 className="text-lg font-black text-slate-800 tracking-tight leading-tight mb-6 group-hover:text-green-600 transition-colors">
                            {course.title}
                         </h3>
                         <div className="space-y-2">
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                               <div className="h-full bg-green-500 w-[65%] transition-all duration-1000" />
                            </div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] font-black">{course.progress}% Complete</p>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </section>

           {/* Recommended for You */}
           <section className="space-y-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                 <h2 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Sparkles className="w-4.5 h-4.5 text-orange-500" /> Recommended For You
                 </h2>
                 <Link href="/learning/all" className="text-[10px] font-black uppercase tracking-widest text-green-600 hover:underline">Explore Catalog</Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {RECOMMENDED.map(course => (
                   <div key={course.id} className="group cursor-pointer">
                      <div className="h-32 rounded-[2rem] overflow-hidden mb-4 border border-slate-100 shadow-lg relative">
                         <img src={course.thumb} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                         {course.price === 'Premium' && (
                           <div className="absolute top-3 right-3 p-1.5 bg-yellow-400 text-slate-900 rounded-lg shadow-xl">
                              <Star className="w-3 h-3 fill-current" />
                           </div>
                         )}
                      </div>
                      <h4 className="text-sm font-black text-slate-800 tracking-tight leading-tight group-hover:text-green-600 transition-colors mb-2">{course.title}</h4>
                      <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                         <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {course.students}</span>
                         <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500 fill-current" /> {course.rating}</span>
                      </div>
                   </div>
                 ))}
              </div>
           </section>
        </main>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-12">
            
            {/* My Performance */}
            <div className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-2xl space-y-8">
               <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-50 pb-4">Your Academy Pulse</h3>
               
               <div className="space-y-6">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-green-50 text-green-600 shadow-sm"><Clock className="w-4 h-4" /></div>
                        <span className="text-xs font-bold text-slate-700">Learning Hours</span>
                     </div>
                     <span className="text-lg font-black text-slate-800">24.5h</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-orange-50 text-orange-600 shadow-sm"><Award className="w-4 h-4" /></div>
                        <span className="text-xs font-bold text-slate-700">Certifications</span>
                     </div>
                     <span className="text-lg font-black text-slate-800">4</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 shadow-sm"><TrendingUp className="w-4 h-4" /></div>
                        <span className="text-xs font-bold text-slate-700">Skill Rank</span>
                     </div>
                     <span className="text-lg font-black text-slate-800">Top 5%</span>
                  </div>
               </div>

               <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-[#1B5E20] mb-2 flex items-center gap-2">
                     <TrendingUp className="w-3.5 h-3.5" /> Next Goal
                  </h4>
                  <p className="text-xs font-bold text-slate-700 mb-4 italic">Complete AI System Architecture Path to unlock Senior Lead certification.</p>
                  <button className="w-full py-3 rounded-full bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                     Track Progress
                  </button>
               </div>
            </div>

            {/* Premium Upgrade */}
            <div className="p-10 bg-slate-900 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group border border-slate-800">
               <div className="relative z-10">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-yellow-500 mb-6 flex items-center gap-2">
                     <Star className="w-4 h-4 fill-yellow-500" /> Exclusive Access
                  </h3>
                  <p className="text-xl font-black tracking-tight leading-tight mb-8">Unlock full certificate library and expert-led webinars. 🚀</p>
                  <button className="w-full py-4 rounded-full bg-yellow-400 text-slate-900 font-black text-xs uppercase tracking-[0.2em] hover:bg-yellow-500 transition-all shadow-xl shadow-yellow-900/20">
                     UPGRADE TO ELITE
                  </button>
               </div>
               <Sparkles className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 text-yellow-500 group-hover:scale-110 transition-transform duration-500" />
            </div>

        </aside>
      </div>
    </div>
  );
}
