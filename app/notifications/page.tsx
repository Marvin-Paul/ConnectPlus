"use client";

import { NotificationSidebar } from "./notification-sidebar";
import { NotificationFeed } from "./notification-feed";
import { Award, Star, Sparkles, TrendingUp, BarChart3, ChevronRight, Eye, MousePointer2, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <div className="max-w-7xl mx-auto pt-10 px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN (Sidebar) */}
        <aside className="lg:col-span-3">
          <NotificationSidebar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </aside>

        {/* CENTER COLUMN (Feed) */}
        <main className="lg:col-span-6 animate-in fade-in slide-in-from-bottom-2 duration-500 -mx-6 md:mx-0">
           
           <div className="bg-white md:rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="hidden md:flex p-10 border-b border-slate-50 items-center justify-between">
                 <h2 className="text-[13px] font-black text-slate-400 uppercase tracking-[0.4em]">Recent Notifications</h2>
                 <button className="text-[12px] font-black text-[#1B5E20] hover:underline uppercase tracking-[0.2em] decoration-2 underline-offset-4 active:scale-95 transition-transform">
                    Mark all as read
                 </button>
              </div>
              <NotificationFeed activeFilter={activeFilter} />
           </div>
        </main>

        {/* RIGHT COLUMN (Sidebar) */}
        <aside className="lg:col-span-3 space-y-8 animate-in slide-in-from-right-4 duration-700">
          
          {/* LEARNING CARD */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 hover:shadow-md transition-all group cursor-pointer">
             <div className="relative h-32 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                  alt="Learning" 
                />
             </div>
             <div className="space-y-1">
                <h3 className="text-[14px] font-bold text-slate-900 leading-tight">Elevate your career with Learning</h3>
                <p className="text-[12px] text-slate-500 italic">"Master AI and data analysis with our expert-led courses."</p>
             </div>
              <Link href="/learning" className="w-full py-2 rounded-full border border-[#0A66C2] text-[#0A66C2] font-semibold text-[12px] hover:bg-blue-50 transition-all flex items-center justify-center">
                View Courses
              </Link>
           </div>

           {/* PROFILE INSIGHTS CARD */}
           <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl p-10 space-y-10 group overflow-hidden relative active:scale-95 transition-transform">
              <div className="flex items-center justify-between">
                 <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Profile Insights</h3>
                 <span className="text-[10px] font-black text-blue-600 bg-blue-50/50 px-3 py-1 rounded-full border border-blue-100/50">WEEKLY</span>
              </div>
              
              <div className="space-y-8">
                 <div className="flex items-center justify-between group/stat">
                    <div className="flex items-center gap-3">
                       <Eye className="w-4 h-4 text-blue-400 group-hover/stat:scale-110 transition-transform" />
                       <span className="text-[13px] font-bold text-slate-600">Profile views</span>
                    </div>
                    <span className="text-xl font-black text-blue-600 tracking-tighter group-hover/stat:translate-x-[-4px] transition-transform">42</span>
                 </div>
                 
                 <div className="flex items-center justify-between group/stat">
                    <div className="flex items-center gap-3">
                       <Sparkles className="w-4 h-4 text-orange-400 group-hover/stat:rotate-12 transition-transform" />
                       <span className="text-[13px] font-bold text-slate-600">Post impressions</span>
                    </div>
                    <span className="text-xl font-black text-blue-600 tracking-tighter group-hover/stat:translate-x-[-4px] transition-transform">1,284</span>
                 </div>
              </div>

              <div className="pt-8 border-t border-slate-50 text-center">
                 <Link href="/premium/analytics" className="text-[11px] font-black text-slate-400 hover:text-blue-600 transition-all uppercase tracking-[0.3em] flex items-center justify-center gap-2 mx-auto">
                    View all analytics <ChevronRight className="w-3.5 h-3.5" />
                 </Link>
              </div>
             <ShieldCheck className="absolute -bottom-10 -right-10 w-24 h-24 opacity-5 text-blue-600 group-hover:scale-125 transition-transform duration-1000" />
          </div>

          <div className="p-10 bg-slate-100 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center space-y-4 shadow-inner">
             <Star className="w-8 h-8 text-yellow-500 mx-auto opacity-50" />
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-loose">"Premium members get 3x more recruiters seeing their profile weekly."</p>
          </div>

        </aside>
      </div>
    </div>
  );
}
