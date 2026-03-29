"use client";

import { UserPlus, X, Users, Check, UserCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const initialSuggestions = [
  {
    id: "s1",
    name: "Robert Kizito",
    headline: "Frontend Architect | Next.js GDE | Helping developers build fast apps",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    banner: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80",
    mutuals: 24,
  },
  {
    id: "s2",
    name: "Lillian Nsereko",
    headline: "Product Lead @ PayWay | Simplifying payments across Africa",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    banner: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80",
    mutuals: 8,
  },
  {
    id: "s3",
    name: "David Walusimbi",
    headline: "Data Scientist | Python | AI Research",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    banner: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80",
    mutuals: 15,
  },
  {
    id: "s4",
    name: "Fatuma Ali",
    headline: "UI/UX Designer | Creative | Visual Storyteller",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80",
    mutuals: 42,
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
    <div className="bg-white rounded-xl border border-[#e0e0e0] overflow-hidden shadow-sm mt-6">
      <div className="flex items-center justify-between p-4 border-b border-[#e0e0e0] bg-slate-50/10">
        <h2 className="text-base font-bold text-slate-800">Industry leaders you may know</h2>
        <button className="text-xs font-black text-[#0a66c2] hover:underline uppercase tracking-widest transition-all">
          See all
        </button>
      </div>
      
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {suggestions.map((person) => {
          const isConnected = connectedIds.includes(person.id);
          
          return (
            <div key={person.id} className="relative group border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:border-[#0a66c2]/20 transition-all duration-500 bg-white">
              {/* Banner */}
              <div className="h-20 w-full relative">
                 <img src={person.banner} className="w-full h-full object-cover grayscale-[20%]" alt="" />
                 {!isConnected && (
                   <button 
                     onClick={() => handleDismiss(person.id)}
                     className="absolute top-2 right-2 p-2 rounded-full bg-black/40 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-black/60"
                   >
                     <X className="h-3.5 w-3.5" />
                   </button>
                 )}
                 <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white/80 to-transparent" />
              </div>
              
              {/* Content */}
              <div className="px-5 pb-6 flex flex-col items-center text-center relative">
                <Link href={`/profile/${person.id}`} className="-mt-10 mb-3 relative group/avatar">
                  <div className={`w-20 h-20 rounded-full border-[4px] border-white overflow-hidden shadow-lg transition-transform duration-500 ${isConnected ? 'scale-90 border-green-100' : 'group-hover:scale-105'}`}>
                    <img src={person.avatar} alt={person.name} className="w-full h-full object-cover" />
                  </div>
                  {isConnected && (
                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1.5 border-4 border-white shadow-md">
                       <UserCheck className="h-4 w-4 text-white" />
                    </div>
                  )}
                </Link>
                
                <Link href={`/profile/${person.id}`} className={`text-[15px] font-black h-5 leading-tight truncate transition-colors ${isConnected ? 'text-green-700' : 'text-slate-800 hover:text-[#0a66c2] hover:underline'}`}>
                  {person.name}
                </Link>
                
                <p className="text-[11px] text-[#666666] mt-2 h-9 line-clamp-2 leading-tight font-medium opacity-80">
                  {person.headline}
                </p>
                
                <div className="flex items-center gap-1.5 mt-4 mb-5 opacity-60">
                   <Users className="h-3.5 w-3.5 text-slate-400" />
                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{person.mutuals} mutuals</span>
                </div>
                
                {!isConnected ? (
                  <button 
                    onClick={() => handleConnect(person.id)}
                    className="w-full h-10 flex items-center justify-center gap-2 px-6 rounded-full border-2 border-[#0a66c2] text-[#0a66c2] font-black text-xs hover:bg-[#0a66c2] hover:text-white transition-all duration-300 shadow-blue-50/50 shadow-lg tracking-wider"
                  >
                    <UserPlus className="h-4 w-4" />
                    Connect
                  </button>
                ) : (
                  <button className="w-full h-10 flex items-center justify-center gap-2 px-6 rounded-full bg-green-600 text-white font-black text-xs transition-all duration-300 shadow-green-100 shadow-lg tracking-wider opacity-90 cursor-default">
                    <Check className="h-4 w-4" />
                    Pending
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
