"use client";

import { NotificationSidebar } from "./notification-sidebar";
import { NotificationFeed } from "./notification-feed";
import { Award, Star, Sparkles, TrendingUp, BarChart3, ChevronRight, Eye, MousePointer2, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-[#F3F6F8] pb-24">
      <div className="max-w-7xl mx-auto pt-10 px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN (Sidebar) */}
        <aside className="lg:col-span-3">
          <NotificationSidebar />
        </aside>

        {/* CENTER COLUMN (Feed) */}
        <main className="lg:col-span-6 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
           <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-[0_40px_100px_rgba(0,0,0,0.05)] overflow-hidden">
              <div className="p-10 border-b border-slate-50 flex items-center justify-between">
                 <h2 className="text-[13px] font-black text-slate-400 uppercase tracking-[0.4em]">Recent Notifications</h2>
                 <button className="text-[12px] font-black text-[#1B5E20] hover:underline uppercase tracking-[0.2em] decoration-2 underline-offset-4 active:scale-95 transition-transform">
                    Mark all as read
                 </button>
              </div>
              <NotificationFeed />
           </div>
        </main>

        {/* RIGHT COLUMN (Sidebar) */}
        <aside className="lg:col-span-3 space-y-8 animate-in slide-in-from-right-4 duration-700">
          
          {/* LEARNING CARD */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl p-8 text-center space-y-6 group cursor-pointer hover:shadow-orange-100/50 transition-all active:scale-95">
             <div className="relative h-48 rounded-[2rem] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt="Learning" 
                />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors" />
             </div>
             <div className="space-y-2">
                <h3 className="text-[15px] font-black text-slate-800 leading-tight">Learn new skills with Connect+ <br /> Learning</h3>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest italic opacity-70">"Master AI integration with our top courses."</p>
             </div>
             <button className="w-full py-4 rounded-full border-2 border-blue-100 text-blue-600 font-black text-[11px] uppercase tracking-[0.2em] hover:bg-blue-50 transition-all shadow-xl shadow-blue-50/20 active:scale-95">
                Try 1 month for free
             </button>
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
                <button className="text-[11px] font-black text-slate-400 hover:text-blue-600 transition-all uppercase tracking-[0.3em] flex items-center justify-center gap-2 mx-auto">
                   View all analytics <ChevronRight className="w-3.5 h-3.5" />
                </button>
             </div>
             <ShieldCheck className="absolute -bottom-10 -right-10 w-24 h-24 opacity-5 text-blue-600 group-hover:scale-125 transition-transform duration-1000" />
          </div>

          <div className="p-10 bg-slate-100 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center space-y-4 shadow-inner">
             <Star className="w-8 h-8 text-yellow-500 mx-auto opacity-50" />
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-loose">"Premium members get 3x more recruiters seeing their profile weekly."</p>
          </div>

        </aside>
      </div>
      
      {/* Floating Chat Button */}
      <button className="fixed bottom-10 right-10 w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:scale-110 active:scale-95 transition-all group z-[200]">
         <span className="text-2xl font-black italic group-hover:rotate-12 transition-transform tracking-tighter">N</span>
         <div className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500"></span>
         </div>
      </button>
    </div>
  );
}
