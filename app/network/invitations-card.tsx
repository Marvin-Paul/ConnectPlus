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
    <div className="bg-white rounded-[3.5rem] border border-slate-100 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.05)] animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between p-10 border-b border-slate-50 bg-white/50 backdrop-blur-xl">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 rounded-2xl bg-[#1B5E20]/5 flex items-center justify-center border border-[#1B5E20]/10">
              <UserPlus className="w-6 h-6 text-[#1B5E20]" />
           </div>
           <div>
              <h2 className="text-[14px] font-black text-slate-800 uppercase tracking-[0.3em] italic">Pending Engagements</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 opacity-60">Review your incoming local elite circle</p>
           </div>
        </div>
        <button className="text-[11px] font-black text-[#1B5E20] hover:underline uppercase tracking-[0.2em] transition-all bg-[#1B5E20]/5 px-6 py-2 rounded-full">
          Manage Circle
        </button>
      </div>
      
      <div className="divide-y divide-slate-50">
        {invitations.map((inv) => {
          const isAccepted = acceptedIds.includes(inv.id);
          
          return (
            <div key={inv.id} className={`p-10 transition-all duration-700 ease-in-out relative group/inv ${isAccepted ? 'bg-green-50/30' : 'hover:bg-slate-50/50'}`}>
              <div className="flex flex-col md:flex-row gap-8">
                <Link href={`/profile/${inv.id}`} className="shrink-0 relative group">
                  <div className={`w-24 h-24 rounded-[2.5rem] overflow-hidden border-2 transition-all duration-500 shadow-xl group-hover:scale-105 group-hover:-rotate-3 ${isAccepted ? 'border-green-500' : 'border-white'}`}>
                    <img src={inv.avatar} alt={inv.name} className="w-full h-full object-cover" />
                  </div>
                  {isAccepted && (
                    <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 border-4 border-white shadow-2xl animate-in zoom-in duration-500">
                       <UserCheck className="h-5 w-5 text-white" />
                    </div>
                  )}
                </Link>
                
                <div className="flex-1 min-w-0 pt-2">
                  <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-4">
                         <Link href={`/profile/${inv.id}`} className={`text-2xl font-black leading-tight tracking-tighter italic transition-colors ${isAccepted ? 'text-green-700' : 'text-slate-800 hover:text-[#1B5E20] hover:underline'}`}>
                           {inv.name}
                         </Link>
                         <div className="flex items-center gap-2">
                            {inv.role === "Leadership" && <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-widest border border-blue-100">Executive</span>}
                            {inv.role === "Engineer" && <span className="text-[9px] font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded uppercase tracking-widest border border-orange-100">Engineering</span>}
                         </div>
                      </div>
                      <p className="text-[13px] font-bold text-slate-500 leading-relaxed italic opacity-80 max-w-xl">
                        {inv.headline}
                      </p>
                      
                      <div className="flex items-center gap-4 pt-2">
                        <div className="flex -space-x-3">
                           {[1,2,3].map(i => (
                             <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 shadow-md flex items-center justify-center text-[10px] font-black group-hover/inv:translate-x-1 transition-transform" />
                           ))}
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic opacity-60">
                          {inv.mutualConnections} mutual linkings · verified
                        </span>
                      </div>
                    </div>

                    {!isAccepted ? (
                      <div className="flex items-center gap-4 shrink-0 mt-4 xl:mt-0">
                        <button 
                          onClick={() => handleDismiss(inv.id)}
                          className="w-14 h-14 flex items-center justify-center rounded-full border border-slate-100 hover:bg-red-50 hover:border-red-100 hover:text-red-500 transition-all group/btn shadow-sm active:scale-95"
                          title="Ignore"
                        >
                          <X className="h-6 w-6 text-slate-300 group-hover/btn:scale-110 group-hover/btn:rotate-90 transition-all duration-500" />
                        </button>
                        <button 
                          onClick={() => handleAccept(inv.id)}
                          className="flex items-center justify-center px-10 h-14 rounded-full bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 active:scale-95"
                        >
                          Accept Link
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4 shrink-0 mt-4 xl:mt-0">
                        <button className="flex items-center justify-center px-10 h-14 rounded-full bg-green-600 text-white font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-green-100 italic pointer-events-none opacity-90 animate-in slide-in-from-right duration-500">
                          Engaged
                        </button>
                        <button className="w-14 h-14 flex items-center justify-center rounded-full border border-green-100 bg-green-50 text-green-600 hover:bg-green-100 transition-all active:scale-95">
                           <MessageSquare className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {inv.message && !isAccepted && (
                    <div className="mt-8 p-8 rounded-[2.5rem] border border-slate-100 bg-slate-50 relative animate-in slide-in-from-top-2 duration-500 group/msg overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-[#1B5E20]/20 group-hover/msg:bg-[#1B5E20] transition-colors" />
                      <div className="flex items-start gap-4">
                         <Sparkles className="w-4 h-4 text-yellow-500 mt-1 shrink-0" />
                         <p className="text-[14px] text-slate-700 italic leading-relaxed font-bold tracking-tight">
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
      
      <button className="w-full py-8 text-[12px] font-black text-slate-400 hover:text-[#1B5E20] hover:bg-slate-50 transition-all border-t border-slate-50 uppercase tracking-[0.4em] bg-white group/footer">
        Discover more elite talent <ChevronRight className="w-4 h-4 inline ml-2 group-hover/footer:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
