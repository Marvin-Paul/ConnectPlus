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
  { label: "Connections", count: 842, icon: Users, href: "/network/connections", color: "text-slate-600" },
  { label: "Contacts", icon: UserPlus, href: "/network/contacts", color: "text-slate-600" },
  { label: "Following & Followers", icon: BookOpen, href: "/network/following", color: "text-slate-600" },
  { label: "Groups", icon: Users, href: "/network/groups", color: "text-slate-600" },
  { label: "Events", icon: Calendar, href: "/events", color: "text-slate-600" },
  { label: "Pages", count: 4, icon: Bookmark, href: "/network/pages", color: "text-slate-600" },
  { label: "Newsletters", icon: Newspaper, href: "/network/newsletters", color: "text-slate-600" },
  { label: "Hashtags", icon: Hash, href: "/network/hashtags", color: "text-slate-600" },
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
    <div className="space-y-6 sticky top-20 animate-in fade-in slide-in-from-left-4 duration-1000 z-40">
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow group/sidebar">
        <div className="p-6 border-b border-slate-50 bg-slate-50/50 backdrop-blur-md">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center border border-slate-100 shadow-sm">
                 <ShieldCheck className="h-4 w-4 text-[#1B5E20]" />
              </div>
              <h2 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">Manage Network</h2>
           </div>
        </div>
        
        <nav className="py-2 px-2">
          {sidebarLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-50 transition-all group/item"
            >
              <div className="flex items-center gap-3">
                <link.icon className={`h-4 w-4 transition-transform group-hover/item:scale-105 ${link.color} opacity-60 group-hover/item:opacity-100`} />
                <span className="text-[13px] font-semibold text-slate-600 group-hover/item:text-slate-900 transition-colors">{link.label}</span>
              </div>
              {link.count && (
                <span className="text-[11px] font-medium text-slate-400 group-hover/item:text-[#1B5E20] transition-all">{link.count}</span>
              )}
            </Link>
          ))}
        </nav>

        <button 
          onClick={(e) => {
            const btn = e.currentTarget;
            btn.disabled = true;
            btn.innerHTML = `Refreshing...`;
            setTimeout(() => {
              btn.innerHTML = `View Less`;
              btn.disabled = false;
            }, 1500);
          }}
          className="w-full flex items-center justify-center gap-2 py-4 border-t border-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all active:bg-slate-100 disabled:opacity-70"
        >
          Show Less
          <ChevronDown className="h-3 w-3 rotate-180" />
        </button>
      </div>

      {/* SYNC CTA */}
      <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden group/sync shadow-lg">
         <div className="relative z-10 space-y-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/5 backdrop-blur-xl group-hover/sync:scale-105 transition-transform">
               <Globe className="w-6 h-6 text-blue-400" />
            </div>
            <div className="space-y-1">
               <h3 className="text-lg font-bold tracking-tight">Sync Professional Contacts</h3>
               <p className="text-[11px] text-white/50 font-medium leading-relaxed">Find professionals you already know across the Connect+ network.</p>
            </div>
            <button 
               onClick={() => setIsSyncModalOpen(true)}
               className="text-[11px] font-bold text-blue-400 hover:text-blue-300 transition-all uppercase tracking-wider"
            >
               Get Started
            </button>
         </div>
         <Zap className="absolute -bottom-6 -right-6 w-24 h-24 opacity-10 text-blue-400 group-hover:scale-110 transition-transform duration-1000" />
      </div>

      {/* Sync Ledger Modal */}
      {isSyncModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-600" /> Import Contacts
              </h2>
              <button 
                onClick={() => {
                  setIsSyncModalOpen(false);
                  setTimeout(() => setSyncState('idle'), 300);
                }}
                aria-label="Close modal"
                className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                disabled={syncState === 'syncing'}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="p-10 flex flex-col items-center text-center">
              {syncState === 'idle' && (
                <div className="space-y-6 w-full fade-in animate-in">
                  <div className="w-20 h-20 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                     <h3 className="text-lg font-bold text-slate-900 tracking-tight">Expand your connections</h3>
                     <p className="text-[13px] text-slate-500 font-medium leading-relaxed max-w-[280px] mx-auto mt-2">
                       Securely sync your professional contact list to discover colleagues and partners already on Connect+.
                     </p>
                  </div>
                  <button 
                    onClick={handleSync}
                    className="w-full py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] uppercase tracking-widest transition-all mt-2"
                  >
                    Sync Contacts
                  </button>
                </div>
              )}
              
              {syncState === 'syncing' && (
                <div className="space-y-6 w-full py-6 fade-in animate-in flex flex-col items-center">
                  <div className="relative w-24 h-24 flex items-center justify-center">
                     <div className="w-full h-full rounded-full border-2 border-slate-100 border-t-blue-600 animate-spin absolute inset-0" />
                     <Globe className="w-8 h-8 text-blue-600 animate-pulse relative z-10" />
                  </div>
                  <div>
                     <h3 className="text-base font-bold text-slate-900 tracking-tight">Analyzing network...</h3>
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">Connecting Nodes</p>
                  </div>
                </div>
              )}

              {syncState === 'done' && (
                <div className="space-y-6 w-full fade-in animate-in zoom-in-95">
                  <div className="w-20 h-20 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto">
                    <ShieldCheck className="w-10 h-10 text-emerald-600" />
                  </div>
                  <div>
                     <h3 className="text-lg font-bold text-slate-900 tracking-tight">Sync Complete</h3>
                     <p className="text-[13px] text-slate-500 font-medium leading-relaxed max-w-[280px] mx-auto mt-2">
                       <span className="text-[#1B5E20] font-bold mr-1 bg-emerald-100 px-2 py-0.5 rounded-full text-[10px]">142</span> 
                       new professional contacts found on Connect+.
                     </p>
                  </div>
                  <button 
                    onClick={() => {
                      setIsSyncModalOpen(false);
                      setTimeout(() => setSyncState('idle'), 300);
                    }}
                    className="w-full py-4 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-bold text-[11px] uppercase tracking-widest transition-all mt-2"
                  >
                    Continue
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
