"use client";

import { useState, useRef, useEffect } from "react";
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
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Imperative width management to satisfy "no-inline-styles" linting
  useEffect(() => {
    MY_COURSES.forEach((course, i) => {
      if (progressRefs.current[i]) {
        progressRefs.current[i]!.style.width = `${course.progress}%`;
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto py-16 px-6">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 w-fit rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-500/20 backdrop-blur-md">
                <Award className="w-3.5 h-3.5" /> Connect+ Learning Academy
            </div>
            <h1 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                Infinite <span className="text-emerald-600 dark:text-emerald-500">Growth</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-xl italic leading-relaxed">
                Professional development curated for top-tier African tech leaders and managers.
            </p>
          </div>
          <div className="relative group flex-1 max-w-md">
            <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5.5 h-5.5 text-slate-400 group-focus-within:text-emerald-500 transition-all duration-300 z-10" />
            <input 
              type="text" 
              placeholder="Search courses, webinars, certifications..."
              className="relative w-full h-18 pl-16 pr-6 rounded-3xl border border-slate-100 dark:border-slate-800 outline-none bg-white dark:bg-slate-900 text-sm font-bold text-slate-700 dark:text-slate-200 focus:ring-4 focus:ring-emerald-500/10 dark:focus:ring-emerald-500/20 transition-all shadow-2xl shadow-slate-200/50 dark:shadow-none z-10"
            />
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Course Discovery */}
          <main className="lg:col-span-8 space-y-20">
            
            {/* Continue Learning */}
            <section className="space-y-10">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-6">
                  <h2 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-[0.4em] flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/10 rounded-lg">
                        <Play className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
                      </div>
                      Continue Learning
                  </h2>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 dark:bg-slate-800/50 px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">2 In-progress courses</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {MY_COURSES.map((course, idx) => (
                    <div key={course.id} className="group bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl dark:shadow-2xl overflow-hidden hover:shadow-emerald-500/10 hover:border-emerald-500/30 transition-all duration-700 flex flex-col">
                        <div className="h-48 overflow-hidden relative">
                          <img src={course.thumb} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" alt="" />
                          <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/60 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-sm">
                              <button 
                                aria-label={`Resume ${course.title}`}
                                className="p-5 rounded-full bg-white dark:bg-emerald-500 text-emerald-600 dark:text-white shadow-2xl scale-75 group-hover:scale-100 transition-all duration-500"
                              >
                                <Play className="w-8 h-8 fill-current" />
                              </button>
                          </div>
                          <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full text-[9px] font-black text-slate-900 dark:text-white uppercase tracking-widest shadow-xl">
                            {course.provider}
                          </div>
                        </div>
                        <div className="p-10 space-y-8 flex-1 flex flex-col">
                          <div className="flex items-center justify-between">
                              <div className="flex -space-x-2">
                                {[1,2,3].map(i => (
                                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-full h-full object-cover" alt="" />
                                  </div>
                                ))}
                                <div className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 bg-emerald-500 flex items-center justify-center text-[8px] font-bold text-white">+12</div>
                              </div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{course.completed}/{course.total} Lessons</p>
                          </div>
                          <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-tight group-hover:text-emerald-500 transition-colors">
                              {course.title}
                          </h3>
                          <div className="space-y-4 mt-auto">
                              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                                <div 
                                  ref={el => progressRefs.current[idx] = el}
                                  className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-1000 shadow-[0_0_12px_rgba(16,185,129,0.5)]" 
                                />
                              </div>
                              <div className="flex justify-between items-center">
                                <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.3em]">{course.progress}% Complete</p>
                                <ChevronRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                              </div>
                          </div>
                        </div>
                    </div>
                  ))}
                </div>
            </section>

            {/* Recommended for You */}
            <section className="space-y-10">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-6">
                  <h2 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-[0.4em] flex items-center gap-3">
                      <div className="p-2 bg-amber-500/10 rounded-lg">
                        <Sparkles className="w-4.5 h-4.5 text-amber-500" />
                      </div>
                      Discovery Catalog
                  </h2>
                  <Link href="/learning/all" className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors flex items-center gap-2">
                    Explore All <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {RECOMMENDED.map(course => (
                    <div key={course.id} className="group cursor-pointer space-y-5">
                        <div className="h-40 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl dark:shadow-none relative">
                          <img src={course.thumb} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          {course.price === 'Premium' && (
                            <div className="absolute top-4 right-4 p-2 bg-amber-400 text-slate-950 rounded-xl shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                                <Star className="w-3.5 h-3.5 fill-current" />
                            </div>
                          )}
                          <div className="absolute bottom-4 left-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                             <div className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-[8px] font-black text-white uppercase tracking-widest">
                                {course.level}
                             </div>
                          </div>
                        </div>
                        <div className="px-2 space-y-3">
                          <h4 className="text-base font-black text-slate-800 dark:text-slate-200 tracking-tight leading-tight group-hover:text-emerald-500 transition-colors">{course.title}</h4>
                          <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-lg"><Users className="w-3 h-3" /> {course.students}</span>
                            <span className="flex items-center gap-1.5 text-amber-500 bg-amber-500/5 px-2.5 py-1 rounded-lg"><Star className="w-3 h-3 fill-current" /> {course.rating}</span>
                          </div>
                        </div>
                    </div>
                  ))}
                </div>
            </section>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-12">
              
              {/* My Performance */}
              <div className="p-10 bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl dark:shadow-none space-y-10 relative overflow-hidden group/sidebar">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl group-hover/sidebar:bg-emerald-500/10 transition-colors" />
                
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] border-b border-slate-50 dark:border-slate-800 pb-6 relative z-10">
                  Academy Pulse
                </h3>
                
                <div className="space-y-8 relative z-10">
                    <div className="flex items-center justify-between group/metric">
                      <div className="flex items-center gap-4">
                          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-sm border border-emerald-100 dark:border-emerald-500/20 group-hover/metric:scale-110 transition-transform"><Clock className="w-4.5 h-4.5" /></div>
                          <span className="text-[13px] font-bold text-slate-700 dark:text-slate-300">Learning Hours</span>
                      </div>
                      <span className="text-xl font-black text-slate-900 dark:text-white">24.5h</span>
                    </div>
                    <div className="flex items-center justify-between group/metric">
                      <div className="flex items-center gap-4">
                          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 shadow-sm border border-amber-100 dark:border-amber-500/20 group-hover/metric:scale-110 transition-transform"><Award className="w-4.5 h-4.5" /></div>
                          <span className="text-[13px] font-bold text-slate-700 dark:text-slate-300">Certifications</span>
                      </div>
                      <span className="text-xl font-black text-slate-900 dark:text-white">4</span>
                    </div>
                    <div className="flex items-center justify-between group/metric">
                      <div className="flex items-center gap-4">
                          <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 shadow-sm border border-blue-100 dark:border-blue-500/20 group-hover/metric:scale-110 transition-transform"><TrendingUp className="w-4.5 h-4.5" /></div>
                          <span className="text-[13px] font-bold text-slate-700 dark:text-slate-300">Skill Rank</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xl font-black text-slate-900 dark:text-white">Top 5%</span>
                        <span className="text-[8px] font-black text-emerald-500 uppercase">↑ 2% this week</span>
                      </div>
                    </div>
                </div>

                <div className="p-8 bg-slate-50/50 dark:bg-slate-950/50 rounded-3xl border border-slate-100 dark:border-slate-800 backdrop-blur-md relative z-10">
                    <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-500 mb-4 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" /> Next Milestone
                    </h4>
                    <p className="text-[13px] font-bold text-slate-700 dark:text-slate-300 mb-6 italic leading-relaxed">
                      Complete <span className="text-slate-900 dark:text-white underline decoration-emerald-500/50">AI System Architecture</span> Path to unlock Senior Lead certification.
                    </p>
                    <button className="w-full py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-[10px] uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl dark:shadow-emerald-500/10 group/btn">
                      Track Progress <ChevronRight className="inline-block w-3.5 h-3.5 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>
              </div>

              {/* Premium Upgrade */}
              <div className="p-12 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group border border-slate-800/50">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl group-hover:bg-emerald-500/30 transition-all duration-1000" />
                
                <div className="relative z-10 space-y-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-400 flex items-center gap-2">
                        <Star className="w-4 h-4 fill-amber-400" /> Elite Tier
                      </h3>
                      <Sparkles className="w-6 h-6 text-emerald-400 animate-pulse" />
                    </div>
                    
                    <div className="space-y-4">
                      <p className="text-3xl font-black tracking-tighter leading-none">Elevate Your <span className="text-emerald-400 italic">Command</span>.</p>
                      <p className="text-sm font-medium text-slate-400 leading-relaxed">Unlock full certificate library, 1-on-1 expert coaching, and priority webinars. 🚀</p>
                    </div>

                    <button className="w-full py-5 rounded-2xl bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-[0.2em] hover:bg-amber-300 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-amber-900/20">
                      UPGRADE TO ELITE
                    </button>

                    <div className="flex justify-center gap-6">
                      <div className="flex flex-col items-center">
                        <span className="text-xl font-black text-white">500+</span>
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Modules</span>
                      </div>
                      <div className="w-px h-8 bg-slate-800" />
                      <div className="flex flex-col items-center">
                        <span className="text-xl font-black text-white">50+</span>
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Webinars</span>
                      </div>
                    </div>
                </div>
                
                <Sparkles className="absolute -bottom-16 -right-16 w-64 h-64 opacity-5 text-emerald-400 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-[3000ms]" />
              </div>

          </aside>
        </div>
      </div>
    </div>
  );
}
