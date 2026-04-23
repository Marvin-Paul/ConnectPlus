"use client";

import { UserPlus, X, Check, UserCheck, Sparkles, Zap, MessageSquare, Briefcase, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const initialInvitations = [
  {
    id: "i1",
    name: "Dr. Catherine Namubiru",
    headline: "Chief Information Officer at MTN Uganda | Tech Leader | Advocate for Women in STEM",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    mutualConnections: 14,
    recentMutual: "Sarah M.",
    message: "Hi Marvin! I've been following your work on Connect+. Let's chat about potential MTN collaborations.",
    role: "Leadership"
  },
  {
    id: "i2",
    name: "Alex Okello",
    headline: "Senior Backend Engineer at SafeBoda | Go enthusiast",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    mutualConnections: 8,
    recentMutual: "Isaac K.",
    role: "Engineer"
  }
];

export function InvitationsCard() {
  const [invitations, setInvitations] = useState(initialInvitations);
  const [acceptedIds, setAcceptedIds] = useState<string[]>([]);

  const handleAccept = (id: string) => {
    setAcceptedIds([...acceptedIds, id]);
  };

  const handleDismiss = (id: string) => {
    setInvitations(invitations.filter(inv => inv.id !== id));
  };

  if (invitations.length === 0 && acceptedIds.length === 0) {
    return (
      <div className="bg-white rounded-[3rem] border border-slate-100 p-16 text-center shadow-2xl relative overflow-hidden group">
        <div className="relative z-10 space-y-4">
           <Zap className="w-12 h-12 text-[#1B5E20]/20 mx-auto" />
           <p className="text-[13px] font-black text-slate-400 uppercase tracking-[0.4em] italic leading-relaxed">No pending elite <br /> invitations at this moment</p>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#1B5E20]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow animate-pro-fade">
      <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm">
            <UserPlus className="w-5 h-5 text-primary dark:text-green-500" />
          </div>
          <div>
            <h2 className="text-[14px] font-bold text-slate-900 dark:text-slate-100 leading-tight">Invitations</h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold tracking-wide uppercase opacity-80 mt-0.5">Manage Requests</p>
          </div>
        </div>
        <Link 
          href="/network/invitations" 
          aria-label="Manage connection invitations"
          title="Manage invitations"
          className="group/manage flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
        >
          <span className="text-[13px] font-bold text-primary dark:text-green-500 group-hover/manage:underline">Manage</span>
          <ChevronRight className="w-4 h-4 text-primary dark:text-green-500 transition-transform group-hover/manage:translate-x-0.5" />
        </Link>
      </div>
      
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {invitations.map((inv) => {
          const isAccepted = acceptedIds.includes(inv.id);
          
          return (
            <div key={inv.id} className={`p-5 transition-colors ${isAccepted ? 'bg-green-50/20 dark:bg-green-950/10' : 'hover:bg-slate-50 dark:hover:bg-slate-900/40'}`}>
              <div className="flex gap-4">
                <Link href={`/profile/${inv.id}`} className="shrink-0">
                  <div className={`w-14 h-14 rounded-full overflow-hidden border-2 transition-all ${isAccepted ? 'border-green-500' : 'border-white dark:border-slate-800 shadow-sm'}`}>
                    <img src={inv.avatar} alt={inv.name} className="w-full h-full object-cover" />
                  </div>
                </Link>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Link href={`/profile/${inv.id}`} className="text-[15px] font-bold text-slate-900 dark:text-slate-100 hover:text-primary dark:hover:text-green-500 hover:underline leading-tight transition-colors">
                          {inv.name}
                        </Link>
                        {inv.role === "Leadership" && <span className="text-[10px] font-black text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-1.5 py-0.5 rounded border border-blue-100 dark:border-blue-800 uppercase tracking-tight">Executive</span>}
                      </div>
                      <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium mt-0.5 line-clamp-1 opacity-90">
                        {inv.headline}
                      </p>
                      
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex -space-x-1.5">
                           {[1,2,3].map(i => (
                             <div key={i} className="w-5 h-5 rounded-full border border-white bg-slate-200" />
                           ))}
                        </div>
                        <span className="text-[11px] text-secondary font-medium">
                          {inv.mutualConnections} mutual connections
                        </span>
                      </div>
                    </div>

                    {!isAccepted ? (
                      <div className="flex items-center gap-2 mt-3 sm:mt-0 shrink-0">
                        <button 
                          onClick={() => handleDismiss(inv.id)}
                          aria-label={`Ignore ${inv.name}'s invitation`}
                          title="Ignore"
                          className="min-h-[34px] py-1.5 px-4 rounded-full text-slate-500 dark:text-slate-400 font-bold text-[13px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center justify-center whitespace-nowrap shrink-0"
                        >
                          Ignore
                        </button>
                        <button 
                          onClick={() => handleAccept(inv.id)}
                          aria-label={`Accept ${inv.name}'s invitation`}
                          title="Accept"
                          className="min-h-[34px] py-1.5 px-6 rounded-full border-2 border-[#1B5E20] text-[#1B5E20] dark:border-green-500 dark:text-green-500 font-bold text-[13px] hover:bg-[#1B5E20]/5 dark:hover:bg-green-500/10 transition-all flex items-center justify-center whitespace-nowrap shadow-sm shrink-0"
                        >
                          Accept
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 mt-3 sm:mt-0 shrink-0">
                        <div className="min-h-[34px] py-1.5 px-4 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[12px] border border-emerald-100 flex items-center gap-1.5 shrink-0">
                          <Check className="w-3.5 h-3.5" />
                          Accepted
                        </div>
                        <button 
                          aria-label={`Send message to ${inv.name}`}
                          title="Message"
                          className="h-9 w-9 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shrink-0 shadow-sm"
                        >
                           <MessageSquare className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {inv.message && !isAccepted && (
                    <div className="mt-3 p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 relative group/msg">
                      <div className="flex items-start gap-2">
                         <p className="text-[13px] text-slate-700 dark:text-slate-300 font-medium italic leading-relaxed">
                           &ldquo;{inv.message}&rdquo;
                         </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <button 
        aria-label="Show more connection invitations"
        className="w-full py-4 text-[13px] font-bold text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-green-500 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-all border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-1"
      >
        Show more <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
