"use client";

import { 
  Users, 
  UserPlus, 
  BookOpen, 
  Calendar, 
  Newspaper, 
  Hash, 
  Bookmark,
  ChevronDown,
  Sparkles,
  Zap,
  ShieldCheck,
  Globe
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
  return (
    <div className="space-y-8 sticky top-20 animate-in fade-in slide-in-from-left-4 duration-1000">
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

        <button className="w-full flex items-center justify-center gap-3 py-6 border-t border-slate-50 text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 hover:text-blue-600 hover:bg-slate-50 transition-all active:bg-slate-100">
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
            <button className="text-[11px] font-black text-blue-400 hover:text-blue-300 hover:underline uppercase tracking-[0.2em] transition-all italic">
               Initiate Link-Up
            </button>
         </div>
         <Zap className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 text-blue-400 group-hover:scale-125 transition-transform duration-1000" />
      </div>
    </div>
  );
}
