"use client";

import { Bookmark, Sparkles, Users, TrendingUp, ShieldCheck, ChevronRight, Plus, Loader2, Zap } from "lucide-react";
import Link from "next/link";
import { useUser } from "../providers/user-provider";

export function ProfileCard() {
  const { user: contextUser, loading } = useUser();

  if (loading) {
    return (
      <div className="bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-12 flex items-center justify-center shadow-xl">
        <Loader2 className="w-8 h-8 text-slate-200 dark:text-slate-800 animate-spin" />
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
      viewers: 1248, // TODO: Implement profile view tracking in backend
      impressions: 5892, // TODO: Implement impression tracking in backend
      connections: contextUser?.totalConnections || 501
    }
  };

  return (
    <div className="bg-white dark:bg-slate-950 rounded-xl border border-border dark:border-slate-800 overflow-hidden shadow-soft group sticky top-[84px] animate-pro-fade">
      {/* Banner */}
      <div className="h-20 relative overflow-hidden bg-muted">
         {user.banner && (
           <img 
             src={user.banner} 
             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
             alt="" 
             onError={(e) => {
               (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=400&h=200";
             }}
           />
         )}
         {user.isPremium && (
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-accent text-white text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
               <Sparkles className="w-3 h-3" /> Premium
            </div>
         )}
      </div>

      <div className="px-5 pb-6">
        {/* Avatar */}
        <div className="relative -mt-10 mb-4">
          <Link href={`/profile/${user.username}`}>
             <div className="w-24 h-24 rounded-2xl border-4 border-white dark:border-slate-950 overflow-hidden bg-muted dark:bg-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 ring-4 ring-primary/10">
                <img 
                  src={user.avatar} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://api.dicebear.com/8.x/initials/svg?seed=${user.name}&backgroundColor=0a66c2&fontFamily=Arial&fontWeight=bold`;
                  }}
                />
             </div>
          </Link>
          {user.verified && (
            <div className="absolute bottom-0 right-0 bg-primary p-0.5 rounded-full border-2 border-white dark:border-slate-950 shadow-sm">
               <ShieldCheck className="w-2.5 h-2.5 text-white" />
            </div>
          )}
        </div>
        
        {/* User Info */}
        <div className="border-b border-border/50 dark:border-slate-800/50 pb-5">
          <Link href={`/profile/${user.username}`} className="group/name block">
             <h2 className="text-[18px] font-extrabold text-foreground dark:text-slate-200 group-hover/name:text-primary transition-colors leading-tight">
               {user.name}
             </h2>
          </Link>
          <p className="text-[12px] font-semibold text-secondary dark:text-slate-400 mt-1.5 leading-relaxed">
            {user.headline}
          </p>
        </div>

        {/* Stats */}
        <div className="py-4 border-b border-border/50 dark:border-slate-800/50 space-y-3">
          <div className="flex justify-between items-center group/stat cursor-pointer">
            <span className="text-[11px] font-bold text-secondary uppercase tracking-tight group-hover/stat:text-primary transition-colors">Profile viewers</span>
            <span className="text-[12px] font-extrabold text-primary">{user.stats.viewers.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center group/stat cursor-pointer">
            <span className="text-[11px] font-bold text-secondary dark:text-slate-500 uppercase tracking-tight group-hover/stat:text-primary transition-colors">Connections</span>
            <span className="text-[12px] font-extrabold text-primary">{user.stats.connections.toLocaleString()}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-4">
           <Link href="/premium" className="flex items-center gap-3 p-3 rounded-lg bg-muted dark:bg-slate-900 hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-all group/cta">
              <div className="w-8 h-8 rounded bg-accent/20 flex items-center justify-center shrink-0">
                 <Zap className="w-4 h-4 text-accent" />
              </div>
              <div>
                 <p className="text-[11px] font-extrabold text-foreground dark:text-slate-200 uppercase tracking-wider">Try Premium</p>
                 <p className="text-[10px] font-bold text-secondary dark:text-slate-400 mt-0.5">Scale your network faster</p>
              </div>
              <ChevronRight className="w-4 h-4 ml-auto text-secondary group-hover/cta:translate-x-0.5 transition-transform" />
           </Link>
        </div>
      </div>

      <div className="px-5 py-3 bg-muted/30 dark:bg-slate-900/30 border-t border-border dark:border-slate-800 flex flex-col gap-3">
          <Link href="/network/connections" className="flex items-center gap-3 group/link">
             <Bookmark className="w-4 h-4 text-secondary dark:text-slate-500 group-hover/link:text-primary transition-colors" />
             <span className="text-[12px] font-bold text-secondary dark:text-slate-400 group-hover/link:text-foreground dark:group-hover:text-white transition-colors">Saved items</span>
          </Link>
          <Link href="/network/groups" className="flex items-center gap-3 group/link">
             <Users className="w-4 h-4 text-secondary dark:text-slate-500 group-hover/link:text-primary transition-colors" />
             <span className="text-[12px] font-bold text-secondary dark:text-slate-400 group-hover/link:text-foreground dark:group-hover:text-white transition-colors">Groups</span>
          </Link>
      </div>
    </div>
  );
}
