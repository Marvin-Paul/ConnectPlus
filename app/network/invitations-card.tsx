"use client";

import { UserPlus, X, Check, UserCheck } from "lucide-react";
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
    message: "Hi Marvin! I've been following your work on Connect+. Let's chat about potential MTN collaborations."
  },
  {
    id: "i2",
    name: "Alex Okello",
    headline: "Senior Backend Engineer at SafeBoda | Go enthusiast",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    mutualConnections: 8,
    recentMutual: "Isaac K."
  }
];

export function InvitationsCard() {
  const [invitations, setInvitations] = useState(initialInvitations);
  const [acceptedIds, setAcceptedIds] = useState<string[]>([]);

  const handleAccept = (id: string) => {
    setAcceptedIds([...acceptedIds, id]);
    // In a real app, call API here
  };

  const handleDismiss = (id: string) => {
    setInvitations(invitations.filter(inv => inv.id !== id));
  };

  if (invitations.length === 0 && acceptedIds.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-[#e0e0e0] p-8 text-center shadow-sm">
        <p className="text-sm text-[#666666]">No pending invitations</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-[#e0e0e0] overflow-hidden shadow-sm">
      <div className="flex items-center justify-between p-4 border-b border-[#e0e0e0] bg-slate-50/30">
        <h2 className="text-base font-bold text-slate-800">Invitations</h2>
        <button className="text-xs font-black text-[#0a66c2] hover:underline uppercase tracking-widest transition-all">
          Manage all
        </button>
      </div>
      
      <div className="divide-y divide-[#f3f3f3]">
        {invitations.map((inv) => {
          const isAccepted = acceptedIds.includes(inv.id);
          
          return (
            <div key={inv.id} className={`p-6 transition-all duration-500 ease-in-out ${isAccepted ? 'bg-green-50/50 opacity-100' : 'hover:bg-[#f9fafb]'}`}>
              <div className="flex flex-col sm:flex-row gap-5">
                <Link href={`/profile/${inv.id}`} className="shrink-0 relative group">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-300">
                    <img src={inv.avatar} alt={inv.name} className="w-full h-full object-cover" />
                  </div>
                  {isAccepted && (
                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-white shadow-sm">
                       <UserCheck className="h-3.5 w-3.5 text-white" />
                    </div>
                  )}
                </Link>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                         <Link href={`/profile/${inv.id}`} className={`text-[15px] font-black leading-tight truncate transition-colors ${isAccepted ? 'text-green-700' : 'text-slate-800 hover:text-[#0a66c2] hover:underline'}`}>
                           {inv.name}
                         </Link>
                         {isAccepted && <span className="text-[10px] font-black text-green-600 bg-green-100 px-2 py-0.5 rounded-full uppercase tracking-wider">Accepted</span>}
                      </div>
                      <p className="text-[12px] text-[#666666] leading-relaxed line-clamp-2 max-w-[450px]">
                        {inv.headline}
                      </p>
                      
                      <div className="flex items-center gap-2 pt-1.5 ">
                        <div className="flex -space-x-1.5">
                           <div className="w-4 h-4 rounded-full border border-white bg-[#e0e0e0] shadow-sm" />
                           <div className="w-4 h-4 rounded-full border border-white bg-[#cccccc] shadow-sm" />
                        </div>
                        <span className="text-[10px] font-bold text-[#666666] uppercase tracking-widest opacity-70">
                          {inv.mutualConnections} mutual connections
                        </span>
                      </div>
                    </div>

                    {!isAccepted ? (
                      <div className="flex items-center gap-2 shrink-0">
                        <button 
                          onClick={() => handleDismiss(inv.id)}
                          className="flex items-center justify-center p-2 rounded-full hover:bg-red-50 hover:text-red-500 transition-all group"
                          title="Ignore"
                        >
                          <X className="h-6 w-6 text-[#666666] group-hover:scale-110" />
                        </button>
                        <button 
                          onClick={() => handleAccept(inv.id)}
                          className="flex items-center justify-center px-6 h-9 rounded-full bg-[#0a66c2] text-white font-black text-xs hover:bg-[#004182] transition-all shadow-blue-100 shadow-lg tracking-wider"
                        >
                          Accept
                        </button>
                      </div>
                    ) : (
                      <button className="flex items-center justify-center px-6 h-9 rounded-full bg-green-600 text-white font-black text-xs transition-all shadow-green-100 shadow-lg tracking-wider pointer-events-none opacity-80">
                         Connected
                      </button>
                    )}
                  </div>

                  {inv.message && !isAccepted && (
                    <div className="mt-4 p-4 rounded-2xl border border-slate-100 bg-white/50 relative shadow-sm">
                      <div className="absolute -top-1.5 left-6 w-3 h-3 bg-white border-l border-t border-slate-100 rotate-45" />
                      <p className="text-[12px] text-slate-700 italic leading-relaxed font-medium">
                        &ldquo;{inv.message}&rdquo;
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
