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
      viewers: 1248, // TODO: Implement profile view tracking in backend
      impressions: 5892, // TODO: Implement impression tracking in backend
      connections: contextUser?.totalConnections || 501
    }
  };

  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden shadow-soft group sticky top-[84px] animate-pro-fade">
      {/* Banner */}
      <div className="h-20 relative overflow-hidden bg-muted">
         {user.banner && <img src={user.banner} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />}
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
             <div className="w-20 h-20 rounded-lg border-4 border-white overflow-hidden bg-muted shadow-md hover:shadow-lg transition-all duration-300">
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
             </div>
          </Link>
          {user.verified && (
            <div className="absolute bottom-1 right-1/2 translate-x-12 bg-primary p-1 rounded-full border-2 border-white shadow-sm">
               <ShieldCheck className="w-3.5 h-3.5 text-white" />
            </div>
          )}
        </div>
        
        {/* User Info */}
        <div className="border-b border-border/50 pb-5">
          <Link href={`/profile/${user.username}`} className="group/name block">
             <h2 className="text-[18px] font-extrabold text-foreground group-hover/name:text-primary transition-colors leading-tight">
               {user.name}
             </h2>
          </Link>
          <p className="text-[12px] font-semibold text-secondary mt-1.5 leading-relaxed">
            {user.headline}
          </p>
        </div>

        {/* Stats */}
        <div className="py-4 border-b border-border/50 space-y-3">
          <div className="flex justify-between items-center group/stat cursor-pointer">
            <span className="text-[11px] font-bold text-secondary uppercase tracking-tight group-hover/stat:text-primary transition-colors">Profile viewers</span>
            <span className="text-[12px] font-extrabold text-primary">{user.stats.viewers.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center group/stat cursor-pointer">
            <span className="text-[11px] font-bold text-secondary uppercase tracking-tight group-hover/stat:text-primary transition-colors">Connections</span>
            <span className="text-[12px] font-extrabold text-primary">{user.stats.connections.toLocaleString()}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-4">
           <Link href="/premium" className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-slate-200/50 transition-all group/cta">
              <div className="w-8 h-8 rounded bg-accent/20 flex items-center justify-center shrink-0">
                 <Zap className="w-4 h-4 text-accent" />
              </div>
              <div>
                 <p className="text-[11px] font-extrabold text-foreground uppercase tracking-wider">Try Premium</p>
                 <p className="text-[10px] font-bold text-secondary mt-0.5">Scale your network faster</p>
              </div>
              <ChevronRight className="w-4 h-4 ml-auto text-secondary group-hover/cta:translate-x-0.5 transition-transform" />
           </Link>
        </div>
      </div>

      <div className="px-5 py-3 bg-muted/30 border-t border-border flex flex-col gap-3">
          <Link href="/network/connections" className="flex items-center gap-3 group/link">
             <Bookmark className="w-4 h-4 text-secondary group-hover/link:text-primary transition-colors" />
             <span className="text-[12px] font-bold text-secondary group-hover/link:text-foreground transition-colors">Saved items</span>
          </Link>
          <Link href="/network/groups" className="flex items-center gap-3 group/link">
             <Users className="w-4 h-4 text-secondary group-hover/link:text-primary transition-colors" />
             <span className="text-[12px] font-bold text-secondary group-hover/link:text-foreground transition-colors">Groups</span>
          </Link>
      </div>
    </div>
  );
}
