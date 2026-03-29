"use client";

import { Bookmark, Sparkles, Users, TrendingUp, ShieldCheck, ChevronRight, Plus, Loader2 } from "lucide-react";
import Link from "next/link";
import { useUser } from "../providers/user-provider";

export function ProfileCard() {
  const { user: contextUser, loading } = useUser();

  if (loading) {
    return (
      <div className="bg-white rounded-[2.5rem] border border-slate-100 p-12 flex items-center justify-center shadow-xl">
        <Loader2 className="w-8 h-8 text-slate-200 animate-spin" />
      </div>
    );
  }

  const user = {
    name: contextUser ? `${contextUser.firstName} ${contextUser.lastName}` : "Marvin Muwereza",
    headline: contextUser?.headline || "Senior Full-Stack Engineer | AI Systems Architect | Uganda Tech Alliance",
    avatar: contextUser?.avatarUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    banner: contextUser?.bannerUrl || "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=400&h=200",
    stats: {
      viewers: 1248,
      impressions: 5892,
      connections: 501
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-xl shadow-slate-200/50 group sticky top-20">
      {/* Banner */}
      <div className="h-20 relative overflow-hidden">
         <img src={user.banner} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="" />
         <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="px-6 pb-8">
        {/* Avatar */}
        <div className="relative -mt-10 mb-6 flex justify-center">
          <Link href="/profile/demo-user">
             <div className="w-20 h-20 rounded-[2.5rem] border-4 border-white overflow-hidden bg-white shadow-2xl hover:rotate-6 transition-all duration-500">
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
             </div>
          </Link>
          <div className="absolute top-0 right-1/2 translate-x-12 translate-y-2 bg-[#1B5E20] p-1 rounded-full border-2 border-white shadow-xl">
             <ShieldCheck className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
        
        {/* User Info */}
        <div className="text-center border-b border-slate-50 pb-6">
          <Link href="/profile/demo-user" className="group/name">
             <h2 className="text-xl font-black text-slate-800 group-hover/name:text-[#1B5E20] transition-colors leading-none tracking-tight">
               {user.name}
             </h2>
          </Link>
          <p className="text-[11px] text-slate-500 mt-2 leading-relaxed px-4 font-medium italic opacity-80">
            {user.headline}
          </p>
        </div>

        {/* Stats */}
        <div className="py-6 border-b border-slate-50 space-y-4">
          <div className="flex justify-between items-center px-2 hover:bg-slate-50 rounded-xl py-2 transition-all cursor-pointer group/stat">
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 group-hover/stat:text-slate-600">Profile viewers</span>
            <span className="text-[12px] font-black text-[#1B5E20]">{user.stats.viewers.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center px-2 hover:bg-slate-50 rounded-xl py-2 transition-all cursor-pointer group/stat">
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 group-hover/stat:text-slate-600">Impressions</span>
            <span className="text-[12px] font-black text-[#1B5E20]">{user.stats.impressions.toLocaleString()}</span>
          </div>
        </div>

        {/* Premium Upgrade */}
        <div className="px-2 pt-6">
           <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-yellow-50 rounded-lg">
                 <Sparkles className="w-3.5 h-3.5 text-[#A57C00]" />
              </div>
              <p className="text-[10px] font-medium text-slate-500 leading-tight">Strengthen your professional profile with AI insights</p>
           </div>
           <button className="w-full py-3 rounded-full bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 group/prem flex items-center justify-center gap-2">
              Unleash Premium <Plus className="w-3.5 h-3.5 text-yellow-500 group-hover/prem:rotate-90 transition-transform" />
           </button>
        </div>
      </div>

      {/* Quick Access Footer */}
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col gap-2">
         <Link href="/network/connections" className="flex items-center justify-between group/link hover:underline decoration-[#1B5E20]">
            <div className="flex items-center gap-2">
               <Bookmark className="w-3.5 h-3.5 text-slate-400 group-hover/link:text-[#1B5E20]" />
               <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 group-hover/link:text-slate-800">My Link Items</span>
            </div>
            <span className="text-[10px] font-black text-slate-400">12</span>
         </Link>
         <Link href="/network/groups" className="flex items-center justify-between group/link hover:underline decoration-[#1B5E20]">
            <div className="flex items-center gap-2">
               <Users className="w-3.5 h-3.5 text-slate-400 group-hover/link:text-[#1B5E20]" />
               <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 group-hover/link:text-slate-800">My Communities</span>
            </div>
            <span className="text-[10px] font-black text-slate-400">8</span>
         </Link>
      </div>
    </div>
  );
}
