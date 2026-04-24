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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {suggestions.map((person) => {
        const isConnected = connectedIds.includes(person.id);
        
        return (
          <div key={person.id} className="relative group border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 bg-white">
            {/* Banner */}
            <div className="h-16 w-full relative overflow-hidden bg-slate-100">
               <img src={person.banner} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
               {!isConnected && (
                 <button 
                   onClick={() => handleDismiss(person.id)}
                   aria-label={`Dismiss suggestion for ${person.name}`}
                   className="absolute top-2 right-2 p-1.5 rounded-full bg-black/20 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-black/40"
                 >
                   <X className="h-3.5 w-3.5" />
                 </button>
               )}
            </div>
            
            {/* Content */}
            <div className="px-4 pb-5 flex flex-col items-center text-center">
              <Link href={`/profile/${person.id}`} className="-mt-9 mb-3 relative z-10 block">
                <div className={`w-18 h-18 rounded-full border-4 border-white dark:border-slate-800 overflow-hidden shadow-md transition-transform ${isConnected ? 'scale-90' : 'group-hover:scale-105'}`}>
                   <img src={person.avatar} alt={person.name} className="w-full h-full object-cover" />
                </div>
                {isConnected && (
                  <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 rounded-full p-1.5 border-2 border-white dark:border-slate-800 shadow-sm">
                     <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </Link>
              
              <div className="min-h-[48px] flex flex-col items-center justify-center">
                <Link href={`/profile/${person.id}`} className="text-[15px] font-bold text-foreground dark:text-slate-100 hover:text-primary hover:underline leading-tight line-clamp-1 flex items-center justify-center gap-1">
                  {person.name}
                  {person.verified && <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 fill-blue-600/10" />}
                </Link>
                <p className="text-[13px] text-secondary/70 dark:text-slate-400 font-medium mt-1 line-clamp-2 leading-tight">
                  {person.headline}
                </p>
              </div>
              
              <div className="flex items-center gap-1.5 mt-4 mb-5 text-[11px] text-secondary/50 dark:text-slate-500 font-bold uppercase tracking-wider">
                 <Users className="h-3.5 w-3.5 text-primary" />
                 <span>{person.mutuals} mutual connections</span>
              </div>
              
              {!isConnected ? (
                <button 
                  onClick={() => handleConnect(person.id)}
                  className="w-full h-9 flex items-center justify-center gap-2 rounded-lg bg-primary text-white font-bold text-[12px] uppercase tracking-wider hover:bg-primary/90 transition-all shadow-sm active:scale-95"
                >
                  <UserPlus className="h-4 w-4" />
                  Connect
                </button>
              ) : (
                <button className="w-full h-9 flex items-center justify-center gap-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-500 border border-emerald-100 dark:border-emerald-900/50 font-bold text-[12px] uppercase tracking-wider cursor-default opacity-90 animate-in zoom-in duration-300">
                  <Check className="h-4 w-4" />
                  Pending
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
