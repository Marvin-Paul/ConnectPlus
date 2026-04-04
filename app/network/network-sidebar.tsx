"use client";


import { useState } from "react";

import { 
  Users, 
  UserPlus, 
  BookOpen, 
  Calendar, 
  Newspaper, 
  Hash, 
  Bookmark,
  ChevronDown,
  Zap,
  ShieldCheck,
  Globe,
  X,
  Check
} from "lucide-react";
import Link from "next/link";

const sidebarLinks = [
  { label: "Elite Connections", count: 842, icon: Users, href: "/network/connections", color: "text-blue-600" },
  { label: "Professional Unit Sync", icon: UserPlus, href: "/network/contacts", color: "text-orange-500" },
  { label: "Network Intel Nodes", icon: BookOpen, href: "/network/following", color: "text-purple-500" },
  { label: "Regional Tech Groups", icon: Users, href: "/network/groups", color: "text-green-600" },
  { label: "Global Sync Events", icon: Calendar, href: "/events", color: "text-red-500" },
  { label: "Company Pages", count: 4, icon: Bookmark, href: "/network/pages", color: "text-yellow-500" },
  { label: "Insight Newsletters", icon: Newspaper, href: "/network/newsletters", color: "text-indigo-500" },
  { label: "High-Impact Tags", icon: Hash, href: "/network/hashtags", color: "text-slate-500" },
];

export function NetworkSidebar() {
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [syncState, setSyncState] = useState<'idle' | 'syncing' | 'done'>('idle');

  const handleSync = () => {
    setSyncState('syncing');
    setTimeout(() => {
      setSyncState('done');
    }, 2500);
  };

  return (
    <div className="space-y-8 sticky top-20 animate-in fade-in slide-in-from-left-4 duration-1000 z-40">
      <div className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-2xl shadow-slate-200/40 group/sidebar">
        <div className="p-10 border-b border-slate-50 bg-slate-50/20 backdrop-blur-md">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center border border-slate-100 group-hover/sidebar:rotate-6 transition-transform shadow-sm">
                 <ShieldCheck className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-[12px] font-black text-slate-800 uppercase tracking-[0.3em] italic">Manage Network</h2>
           </div>
        </div>
        
        <nav className="py-6 px-4">
          {sidebarLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center justify-between px-6 py-4 rounded-2xl hover:bg-slate-50 transition-all group/item"
            >
              <div className="flex items-center gap-4">
                <link.icon className={`h-5 w-5 transition-transform group-hover/item:scale-110 ${link.color} opacity-60 group-hover/item:opacity-100`} />
                <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] italic group-hover/item:text-slate-800 transition-colors">{link.label}</span>
              </div>
              {link.count && (
                <span className="text-[10px] font-black text-slate-300 group-hover/item:text-blue-600 group-hover/item:translate-x-[-4px] transition-all opacity-60 italic">{link.count}</span>
              )}
            </Link>
          ))}
        </nav>

        <button 
          onClick={(e) => {
            const btn = e.currentTarget;
            btn.disabled = true;
            btn.innerHTML = `🔄 Rearranging...`;
            setTimeout(() => {
              btn.innerHTML = `✅ Layout Optimized`;
              setTimeout(() => {
                btn.innerHTML = `Simplify Matrix`;
                btn.disabled = false;
              }, 2000);
            }, 1500);
          }}
          className="w-full flex items-center justify-center gap-3 py-6 border-t border-slate-50 text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 hover:text-blue-600 hover:bg-slate-50 transition-all active:bg-slate-100 disabled:opacity-70"
        >
          Simplify Matrix
          <ChevronDown className="h-4 w-4 rotate-180" />
        </button>
      </div>

      {/* SYNC CTA */}
      <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden group/sync shadow-[0_30px_60px_rgba(0,0,0,0.2)]">
         <div className="relative z-10 space-y-6">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/5 backdrop-blur-xl group-hover/sync:rotate-12 group-hover/sync:scale-110 transition-transform">
               <Globe className="w-7 h-7 text-blue-400" />
            </div>
            <div className="space-y-2">
               <h3 className="text-xl font-black italic tracking-tighter leading-tight">Sync Global Professional Ledger</h3>
               <p className="text-[10px] text-white/40 font-black uppercase tracking-widest leading-relaxed">Cross-pollinate your contacts into the Elite Matrix.</p>
            </div>
            <button 
               onClick={() => setIsSyncModalOpen(true)}
               className="text-[11px] font-black text-blue-400 hover:text-blue-300 hover:underline uppercase tracking-[0.2em] transition-all italic"
            >
               Initiate Link-Up
            </button>
         </div>
         <Zap className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 text-blue-400 group-hover:scale-125 transition-transform duration-1000" />
      </div>

      {/* Sync Ledger Modal */}
      {isSyncModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-lg animate-in fade-in duration-200">
          <div className="bg-slate-900 rounded-[3rem] w-full max-w-md border border-slate-800 shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
              <h2 className="text-sm font-black text-white uppercase tracking-[0.2em] italic flex items-center gap-3">
                <Globe className="w-5 h-5 text-blue-400" /> Matrix Link-Up
              </h2>
              <button 
                onClick={() => {
                  setIsSyncModalOpen(false);
                  setTimeout(() => setSyncState('idle'), 300);
                }}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                disabled={syncState === 'syncing'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-10 flex flex-col items-center text-center">
              {syncState === 'idle' && (
                <div className="space-y-6 w-full fade-in animate-in">
                  <div className="w-24 h-24 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                    <Users className="w-10 h-10 text-blue-400" />
                  </div>
                  <div>
                     <h3 className="text-xl font-black text-white tracking-tight">Import Contacts</h3>
                     <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-[260px] mx-auto mt-2">
                       Securely cross-pollinate your external contacts directly into the Connect+ Elite network.
                     </p>
                  </div>
                  <button 
                    onClick={handleSync}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-900/50 mt-4 italic"
                  >
                    Authorize Integration
                  </button>
                </div>
              )}
              
              {syncState === 'syncing' && (
                <div className="space-y-8 w-full py-6 fade-in animate-in flex flex-col items-center">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                     <div className="w-full h-full rounded-full border-4 border-slate-800 border-t-blue-500 animate-[spin_1s_linear_infinite] absolute inset-0" />
                     <div className="w-24 h-24 rounded-full border-4 border-slate-800 border-b-purple-500 animate-[spin_1.5s_linear_infinite_reverse] absolute inset-4" />
                     <Globe className="w-10 h-10 text-blue-400 animate-pulse relative z-10" />
                  </div>
                  <div>
                     <h3 className="text-lg font-black text-blue-400 animate-pulse italic tracking-tight">Syncing Ledger...</h3>
                     <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mt-3">Establishing Nodes</p>
                  </div>
                </div>
              )}

              {syncState === 'done' && (
                <div className="space-y-6 w-full fade-in animate-in zoom-in-95">
                  <div className="w-24 h-24 rounded-3xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                    <ShieldCheck className="w-12 h-12 text-green-400" />
                  </div>
                  <div>
                     <h3 className="text-xl font-black text-white tracking-tight">Integration Successful</h3>
                     <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-[260px] mx-auto mt-2">
                       <span className="text-white font-black mr-1 bg-white/10 px-2 py-0.5 rounded-full text-[10px]">142</span> 
                       new professional contacts identified in the matrix.
                     </p>
                  </div>
                  <button 
                    onClick={() => {
                      setIsSyncModalOpen(false);
                      setTimeout(() => setSyncState('idle'), 300);
                    }}
                    className="w-full py-4 rounded-2xl bg-white text-slate-900 hover:bg-slate-200 font-black text-[10px] uppercase tracking-[0.2em] transition-all mt-4 italic shadow-xl shadow-white/10"
                  >
                    Close Terminal
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
