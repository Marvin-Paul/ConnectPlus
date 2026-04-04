"use client";

import { Bookmark, Sparkles, Users, TrendingUp, ShieldCheck, ChevronRight, Plus, Loader2, Zap } from "lucide-react";
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
    username: contextUser?.username || "demo-user",
    headline: contextUser?.headline || "Senior Full-Stack Engineer | AI Systems Architect | Uganda Tech Alliance",
    avatar: contextUser?.avatarUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    banner: contextUser?.bannerUrl || "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=400&h=200",
    isPremium: contextUser?.isPremium || false,
    verified: contextUser?.verified || false,
    stats: {
      viewers: 1248,
      impressions: 5892,
      connections: 501
    }
  };

  return (
    <div id="identity-card" className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-xl shadow-bg-slate-200/50 group sticky top-20 animate-in fade-in slide-in-from-left-4 duration-1000">
      {/* Banner */}
      <div className="h-24 relative overflow-hidden">
         <img src={user.banner} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-2000" alt="" />
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
         {user.isPremium && (
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-yellow-400 text-slate-900 text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-2xl">
               <Sparkles className="w-3 h-3" /> Premium Member
            </div>
         )}
      </div>

      <div className="px-8 pb-10">
        {/* Avatar */}
        <div className="relative -mt-12 mb-6 flex justify-center">
          <Link href={`/profile/${user.username}`}>
             <div className="w-24 h-24 rounded-[2.5rem] border-[6px] border-white overflow-hidden bg-white shadow-2xl hover:scale-105 transition-all duration-500 group-hover:rotate-3">
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
             </div>
          </Link>
          {user.verified && (
            <div className="absolute top-2 right-1/2 translate-x-14 bg-primary p-1.5 rounded-full border-4 border-white shadow-2xl animate-bounce-subtle">
               <ShieldCheck className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
        
        {/* User Info */}
        <div className="text-center border-b border-slate-50/50 pb-8">
          <Link href={`/profile/${user.username}`} className="group/name">
             <h2 className="text-2xl font-black text-slate-900 group-hover/name:text-primary transition-colors leading-none tracking-tighter italic">
               {user.name}
             </h2>
          </Link>
          <p className="text-[12px] text-slate-500 mt-3 leading-relaxed px-2 font-medium italic opacity-80 line-clamp-2">
            {user.headline}
          </p>
        </div>

        {/* Stats Section */}
        <div className="py-8 border-b border-slate-50/50 space-y-5">
          <Link href="/premium/analytics" className="flex justify-between items-center px-2 hover:translate-x-1 transition-transform group/stat">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover/stat:text-primary">Profile analytics</span>
            <div className="flex items-center gap-1.5">
               <TrendingUp className="w-3.5 h-3.5 text-green-500" />
               <span className="text-[13px] font-black text-slate-900 tracking-tight">+{user.stats.viewers.toLocaleString()}</span>
            </div>
          </Link>
          <Link href="/network" className="flex justify-between items-center px-2 hover:translate-x-1 transition-transform group/stat">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover/stat:text-primary">Professional Link</span>
            <div className="flex items-center gap-1.5">
               <Users className="w-3.5 h-3.5 text-blue-500" />
               <span className="text-[13px] font-black text-slate-900 tracking-tight">{user.stats.connections.toLocaleString()}</span>
            </div>
          </Link>
        </div>

        {/* Elite CTA */}
        <div className="pt-8 text-center space-y-4">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-loose">"Master your professional narrative with LinkedIn AI Insights."</p>
           {!user.isPremium && (
              <button className="w-full py-4 rounded-full bg-slate-900 text-white font-black text-[11px] uppercase tracking-[0.2em] hover:bg-black transition-all shadow-2xl shadow-slate-900/20 active:scale-95 flex items-center justify-center gap-3 group/cta">
                 Get Linked Premium <Zap className="w-4 h-4 text-yellow-400 group-hover/cta:scale-125 transition-transform" />
              </button>
           )}
        </div>
      </div>

      {/* Quick Access Footer */}
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col gap-2">
          <Link href="/network/connections" className="flex items-center justify-between group/link hover:underline decoration-primary">
            <div className="flex items-center gap-2">
               <Bookmark className="w-3.5 h-3.5 text-slate-400 group-hover/link:text-primary" />
               <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 group-hover/link:text-slate-800">My Link Items</span>
            </div>
            <span className="text-[10px] font-black text-slate-400">12</span>
         </Link>
         <Link href="/network/groups" className="flex items-center justify-between group/link hover:underline decoration-primary">
            <div className="flex items-center gap-2">
               <Users className="w-3.5 h-3.5 text-slate-400 group-hover/link:text-primary" />
               <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 group-hover/link:text-slate-800">My Communities</span>
            </div>
            <span className="text-[10px] font-black text-slate-400">8</span>
         </Link>
      </div>
    </div>
  );
}
