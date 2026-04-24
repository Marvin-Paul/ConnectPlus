"use client";

import { useState } from "react";
import { NetworkSidebar } from "../network-sidebar";
import { Users, Search, MoreHorizontal, MessageSquare, UserMinus, Filter } from "lucide-react";
import Link from "next/link";

const initialConnections = [
  { id: "c1", name: "Sarah Johnson", headline: "Senior Product Manager @ Microsoft", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80", connectedTime: "2 months ago" },
  { id: "c2", name: "Isaac Kato", headline: "Principal DevOps Engineer @ Chipper Cash", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80", connectedTime: "1 year ago" },
  { id: "c3", name: "Catherine Namubiru", headline: "CIO at MTN Uganda | Tech Leader", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80", connectedTime: "6 months ago" },
  { id: "c4", name: "Alex Okello", headline: "Lead Backend Developer @ SafeBoda", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80", connectedTime: "3 months ago" }
];

export default function ConnectionsPage() {
  const [connections, setConnections] = useState(initialConnections);
  const [activeConnectionMenuId, setActiveConnectionMenuId] = useState<string | null>(null);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 animate-pro-fade">
      <aside className="lg:col-span-3">
        <NetworkSidebar />
      </aside>

      <main className="lg:col-span-9 space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border dark:border-slate-800 shadow-soft overflow-hidden">
           {/* Header */}
           <div className="p-6 md:p-8 border-b border-border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                 <h1 className="text-2xl md:text-3xl font-bold text-foreground dark:text-white flex items-center gap-3 tracking-tight">
                    <Users className="w-8 h-8 text-primary" /> {connections.length} Connections
                 </h1>
                 <p className="text-[14px] text-secondary/70 dark:text-slate-400 mt-1.5 font-medium">Manage your professional relationships and stay connected.</p>
              </div>
              <div className="flex items-center gap-2">
                 <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary group-focus-within:text-primary transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Search connections..." 
                      className="h-10 pl-10 pr-4 rounded-xl border border-border dark:border-slate-700 bg-white dark:bg-slate-950 text-[14px] font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-foreground dark:text-slate-200"
                    />
                 </div>
                 <button 
                    aria-label="Filter connections"
                    title="Filter connections"
                    className="p-2.5 rounded-xl border border-border dark:border-slate-700 bg-white dark:bg-slate-950 text-secondary hover:text-primary transition-all shadow-sm active:scale-95"
                 >
                    <Filter className="w-5 h-5" />
                 </button>
              </div>
           </div>

           <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
              {connections.map((conn) => (
                <div key={conn.id} className="p-6 rounded-[24px] border border-border dark:border-slate-800 hover:shadow-premium hover:border-primary/20 transition-all duration-300 group bg-white dark:bg-slate-900/50 relative">
                   <div className="flex gap-4 items-start">
                      <Link href={`/profile/${conn.name.toLowerCase().replace(/ /g, '-')}`} className="shrink-0 relative">
                         <img src={conn.avatar} className="w-16 h-16 rounded-2xl border border-border dark:border-slate-700 shadow-md object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                         <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full shadow-sm" />
                      </Link>
                      <div className="flex-1 min-w-0">
                         <Link href={`/profile/${conn.name.toLowerCase().replace(/ /g, '-')}`} className="text-[16px] font-bold text-foreground dark:text-slate-100 hover:text-primary transition-colors block truncate">
                            {conn.name}
                         </Link>
                         <p className="text-[12px] text-secondary/80 dark:text-slate-400 font-medium leading-relaxed mt-1 line-clamp-1">{conn.headline}</p>
                         <p className="text-[10px] text-secondary/50 dark:text-slate-500 font-bold uppercase tracking-widest mt-2">Connected {conn.connectedTime}</p>
                         
                         <div className="flex items-center gap-2 mt-5 pt-5 border-t border-border/50 dark:border-slate-800/50">
                            <Link 
                               href="/messaging"
                               className="flex-1 h-9 rounded-full bg-primary text-white font-bold text-[11px] uppercase tracking-wider hover:bg-primary/90 transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
                            >
                               <MessageSquare className="w-3.5 h-3.5" /> Message
                            </Link>
                            <button 
                                aria-label="Remove connection"
                                title="Remove connection"
                                className="p-2.5 rounded-full border border-border dark:border-slate-700 text-secondary/60 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all active:scale-90"
                            >
                               <UserMinus className="w-4 h-4" />
                            </button>
                         </div>
                      </div>
                      <button
                        onClick={() => setActiveConnectionMenuId(conn.id)}
                        aria-label="More options"
                        title="More options"
                        className="p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity absolute top-4 right-4 text-secondary/40 hover:text-foreground dark:hover:text-white hover:bg-muted dark:hover:bg-slate-800"
                      >
                         <MoreHorizontal className="w-5 h-5" />
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </main>

      {activeConnectionMenuId && (
        <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close connection options"
            onClick={() => setActiveConnectionMenuId(null)}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200"
          />
          <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-[24px] shadow-premium border border-border dark:border-slate-800 py-3 animate-in slide-in-from-bottom-10 duration-300 overflow-hidden">
            <div className="w-12 h-1.5 rounded-full bg-border dark:bg-slate-800 mx-auto mb-4" />
            <div className="px-2">
              <Link 
                href="/messaging" 
                onClick={() => setActiveConnectionMenuId(null)}
                className="w-full text-left px-6 py-4 text-[16px] font-bold text-foreground dark:text-slate-200 hover:bg-muted dark:hover:bg-slate-800 rounded-xl transition-colors flex items-center gap-3"
              >
                <MessageSquare className="w-5 h-5 text-secondary" />
                Message
              </Link>
              <button
                onClick={() => {
                  setConnections(prev => prev.filter(c => c.id !== activeConnectionMenuId));
                  setActiveConnectionMenuId(null);
                }}
                className="w-full text-left px-6 py-4 text-[16px] font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors flex items-center gap-3"
              >
                <UserMinus className="w-5 h-5 text-red-500" />
                Remove connection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
