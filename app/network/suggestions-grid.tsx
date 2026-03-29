"use client";

import { UserPlus, X, Users, Check, UserCheck, Sparkles, Zap, ChevronRight, Globe, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const initialSuggestions = [
  {
    id: "s1",
    name: "Robert Kizito",
    headline: "Frontend Architect | Next.js GDE | Helping developers build fast apps",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    banner: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80",
    mutuals: 24,
    verified: true
  },
  {
    id: "s2",
    name: "Lillian Nsereko",
    headline: "Product Lead @ PayWay | Simplifying payments across Africa",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    banner: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80",
    mutuals: 8,
    verified: false
  },
  {
    id: "s3",
    name: "David Walusimbi",
    headline: "Data Scientist | Python | AI Research",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    banner: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80",
    mutuals: 15,
    verified: true
  },
  {
    id: "s4",
    name: "Fatuma Ali",
    headline: "UI/UX Designer | Creative | Visual Storyteller",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80",
    mutuals: 42,
    verified: false
  }
];

export function SuggestionsGrid() {
  const [suggestions, setSuggestions] = useState(initialSuggestions);
  const [connectedIds, setConnectedIds] = useState<string[]>([]);

  const handleConnect = (id: string) => {
    setConnectedIds([...connectedIds, id]);
  };

  const handleDismiss = (id: string) => {
    setSuggestions(suggestions.filter(s => s.id !== id));
  };

  if (suggestions.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {suggestions.map((person) => {
        const isConnected = connectedIds.includes(person.id);
        
        return (
          <div key={person.id} className="relative group border border-slate-100 rounded-[3.5rem] overflow-hidden hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-700 bg-white animate-in zoom-in-95 duration-700">
            {/* Elite Banner */}
            <div className="h-24 w-full relative overflow-hidden">
               <img src={person.banner} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-[3000ms]" alt="" />
               {!isConnected && (
                 <button 
                   onClick={() => handleDismiss(person.id)}
                   className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900/40 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-slate-900 border border-white/20"
                 >
                   <X className="h-3.5 w-3.5" />
                 </button>
               )}
               <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white to-transparent" />
            </div>
            
            {/* Elite Profiling */}
            <div className="px-8 pb-10 flex flex-col items-center text-center relative">
              <Link href={`/profile/${person.id}`} className="-mt-12 mb-6 relative group/avatar z-10 block">
                <div className={`w-24 h-24 rounded-[2.5rem] border-[8px] border-white overflow-hidden shadow-2xl transition-all duration-700 ${isConnected ? 'scale-90 border-green-50' : 'group-hover:scale-110 group-hover:-rotate-6'}`}>
                  <img src={person.avatar} alt={person.name} className="w-full h-full object-cover" />
                </div>
                {isConnected && (
                  <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-2xl p-2 border-4 border-white shadow-xl animate-in zoom-in duration-500">
                     <UserCheck className="h-5 w-5 text-white" />
                  </div>
                )}
                {person.verified && !isConnected && (
                   <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-2xl p-2 border-4 border-white shadow-xl">
                      <ShieldCheck className="h-5 w-5 text-white" />
                   </div>
                )}
              </Link>
              
              <Link href={`/profile/${person.id}`} className={`text-xl font-black h-7 leading-none truncate transition-colors italic tracking-tighter ${isConnected ? 'text-green-700' : 'text-slate-800 hover:text-blue-600 hover:underline'}`}>
                {person.name}
              </Link>
              
              <p className="text-[11px] text-slate-400 mt-4 h-12 line-clamp-3 leading-relaxed font-black uppercase tracking-widest opacity-60 italic group-hover:opacity-100 transition-opacity">
                "{person.headline}"
              </p>
              
              <div className="flex items-center gap-2 mt-6 mb-8 py-2 px-4 rounded-full bg-slate-50 border border-slate-100 opacity-60 group-hover:opacity-100 transition-all">
                 <Users className="h-3.5 w-3.5 text-blue-600" />
                 <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">{person.mutuals} regional links</span>
              </div>
              
              {!isConnected ? (
                <button 
                  onClick={() => handleConnect(person.id)}
                  className="w-full h-12 flex items-center justify-center gap-3 px-8 rounded-full bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all active:scale-95"
                >
                  <UserPlus className="h-4 w-4" />
                  Link Unit
                </button>
              ) : (
                <button className="w-full h-12 flex items-center justify-center gap-3 px-8 rounded-full bg-green-600 text-white font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-green-100 italic opacity-90 cursor-default animate-in slide-in-from-bottom duration-500">
                  <Check className="h-4 w-4" />
                  Pending
                </button>
              )}
            </div>
            
            {/* Infinite background aura */}
            <div className="absolute -z-10 top-0 left-0 w-full h-full bg-slate-50/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        );
      })}
    </div>
  );
}
