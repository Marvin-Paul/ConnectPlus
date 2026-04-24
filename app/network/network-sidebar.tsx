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
  ChevronRight,
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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showLess, setShowLess] = useState(false);

  const handleSync = () => {
    setSyncState('syncing');
    setTimeout(() => {
      setSyncState('done');
    }, 2500);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setShowLess(!showLess);
    }, 1500);
  };

  return (
    <div className="space-y-6 sticky top-24 animate-in fade-in slide-in-from-left-4 duration-1000 z-40">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border dark:border-slate-800 overflow-hidden shadow-soft hover:shadow-premium transition-all duration-300 group/sidebar">
        <div className="p-5 border-b border-border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center border border-border dark:border-slate-700 shadow-sm">
                 <ShieldCheck className="h-4 w-4 text-primary" />
              </div>
              <h2 className="text-[11px] font-bold text-foreground dark:text-white uppercase tracking-widest">Manage Network</h2>
           </div>
        </div>
        
        <nav className="py-2 px-2">
          {sidebarLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group/item"
            >
              <div className="flex items-center gap-3">
                <link.icon className={`h-4 w-4 transition-transform group-hover/item:scale-110 ${link.color} opacity-70 dark:opacity-50 group-hover/item:opacity-100 dark:group-hover/item:opacity-100`} />
                <span className="text-[13px] font-semibold text-secondary dark:text-slate-400 group-hover/item:text-foreground dark:group-hover/item:text-white transition-colors">{link.label}</span>
              </div>
              {link.count && (
                <span className="text-[11px] font-bold text-secondary/40 dark:text-slate-500 group-hover/item:text-primary transition-all">{link.count}</span>
              )}
            </Link>
          ))}
        </nav>

        <button 
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="w-full flex items-center justify-center gap-2 py-4 border-t border-border dark:border-slate-800 text-[10px] font-bold uppercase tracking-widest text-secondary/60 dark:text-slate-500 hover:text-foreground dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all disabled:opacity-70"
        >
          {isRefreshing ? "Refreshing..." : (showLess ? "View More" : "Show Less")}
          <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${showLess ? "" : "rotate-180"}`} />
        </button>
      </div>

      {/* SYNC CTA */}
      <div className="bg-slate-900 dark:bg-slate-950 rounded-2xl p-8 text-white relative overflow-hidden group/sync shadow-lg">
         <div className="relative z-10 space-y-5">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/5 backdrop-blur-xl group-hover/sync:scale-105 transition-transform">
               <Globe className="w-6 h-6 text-primary-light" />
            </div>
            <div className="space-y-1.5">
               <h3 className="text-[17px] font-bold tracking-tight">Sync Professional Contacts</h3>
               <p className="text-[11px] text-white/50 font-medium leading-relaxed">Find professionals you already know across the network.</p>
            </div>
            <button 
               onClick={() => setIsSyncModalOpen(true)}
               className="text-[11px] font-bold text-primary-light hover:text-white transition-all uppercase tracking-widest flex items-center gap-2"
            >
               Get Started <ChevronRight className="w-3.5 h-3.5" />
            </button>
         </div>
         <Zap className="absolute -bottom-6 -right-6 w-24 h-24 opacity-10 text-primary group-hover:scale-110 transition-transform duration-1000" />
      </div>

      {/* Sync Ledger Modal */}
      {isSyncModalOpen && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-[28px] w-full max-w-md border border-border dark:border-slate-800 shadow-premium overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-border dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
              <h2 className="text-[11px] font-bold text-foreground dark:text-white uppercase tracking-widest flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" /> Import Contacts
              </h2>
              <button 
                onClick={() => {
                  setIsSyncModalOpen(false);
                  setTimeout(() => setSyncState('idle'), 300);
                }}
                aria-label="Close modal"
                className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-border dark:border-slate-700 flex items-center justify-center text-secondary hover:text-foreground dark:hover:text-white transition-all"
                disabled={syncState === 'syncing'}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="p-10 flex flex-col items-center text-center">
              {syncState === 'idle' && (
                <div className="space-y-6 w-full animate-in fade-in slide-in-from-bottom-4">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mx-auto border border-primary/20">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                     <h3 className="text-xl font-bold text-foreground dark:text-white tracking-tight">Expand your connections</h3>
                     <p className="text-[14px] text-secondary/70 dark:text-slate-400 font-medium leading-relaxed max-w-[280px] mx-auto mt-2">
                       Securely sync your professional contact list to discover colleagues already on Connect+.
                     </p>
                  </div>
                  <button 
                    onClick={handleSync}
                    className="w-full py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-[12px] uppercase tracking-widest transition-all shadow-lg active:scale-95"
                  >
                    Sync Contacts
                  </button>
                </div>
              )}
              
              {syncState === 'syncing' && (
                <div className="space-y-6 w-full py-6 animate-in fade-in flex flex-col items-center">
                  <div className="relative w-24 h-24 flex items-center justify-center">
                     <div className="w-full h-full rounded-full border-2 border-slate-100 dark:border-slate-800 border-t-primary animate-spin absolute inset-0" />
                     <Globe className="w-8 h-8 text-primary animate-pulse relative z-10" />
                  </div>
                  <div>
                     <h3 className="text-base font-bold text-foreground dark:text-white tracking-tight">Analyzing network...</h3>
                     <p className="text-[10px] text-secondary/40 dark:text-slate-500 font-bold uppercase tracking-widest mt-2">Connecting Nodes</p>
                  </div>
                </div>
              )}

              {syncState === 'done' && (
                <div className="space-y-6 w-full animate-in fade-in zoom-in-95">
                  <div className="w-20 h-20 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 flex items-center justify-center mx-auto shadow-sm">
                    <ShieldCheck className="w-10 h-10 text-green-600 dark:text-green-500" />
                  </div>
                  <div>
                     <h3 className="text-xl font-bold text-foreground dark:text-white tracking-tight">Sync Complete</h3>
                     <p className="text-[14px] text-secondary/70 dark:text-slate-400 font-medium leading-relaxed max-w-[280px] mx-auto mt-2">
                       <span className="text-green-700 dark:text-green-400 font-bold mr-1 bg-green-100 dark:bg-green-900/40 px-2.5 py-0.5 rounded-full text-[11px]">142</span> 
                       new professional contacts found on Connect+.
                     </p>
                  </div>
                  <button 
                    onClick={() => {
                      setIsSyncModalOpen(false);
                      setTimeout(() => setSyncState('idle'), 300);
                    }}
                    className="w-full py-4 rounded-xl bg-slate-900 dark:bg-slate-950 text-white hover:bg-slate-800 font-bold text-[12px] uppercase tracking-widest transition-all shadow-lg active:scale-95"
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
