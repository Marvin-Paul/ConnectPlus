"use client";

import { Info, ChevronDown, TrendingUp, Sparkles, MapPin, ExternalLink, ShieldCheck, Zap, BarChart3, Clock, Users } from "lucide-react";
import Link from "next/link";

const newsItems = [
  { id: "n1", title: "African Fintech Surge: $2.4B invested in 2025", time: "2H AGO", readers: "145.2K READERS", icon: Zap, color: "text-yellow-500" },
  { id: "n2", title: "MTN Uganda announces multi-billion fiber rollout", time: "5H AGO", readers: "85.8K READERS", icon: TrendingUp, color: "text-green-500" },
  { id: "n3", title: "The rise of AI in financial services", time: "10H AGO", readers: "42.3K READERS", icon: BarChart3, color: "text-blue-500" },
  { id: "n4", title: "SafeBoda expands to new regions", time: "23H AGO", readers: "12.4K READERS", icon: MapPin, color: "text-orange-500" },
  { id: "n5", title: "Chipper Cash hits new user milestone", time: "1D AGO", readers: "65.1K READERS", icon: Users, color: "text-purple-500" }
];

export function NewsSidebar() {
  return (
    <div className="space-y-8 sticky top-20 group/sidebar pb-24">
      {/* Trending News Card */}
      <div className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-2xl shadow-slate-200/40 transition-all duration-700 hover:shadow-green-900/10 animate-in slide-in-from-right-4 duration-1000">
        <div className="p-10 pb-6 flex items-center justify-between bg-white/50 backdrop-blur-xl">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover/sidebar:scale-110 transition-transform duration-500">
                 <TrendingUp className="h-5 w-5 text-[#1B5E20]" />
              </div>
              <h2 className="text-[13px] font-black text-slate-800 uppercase tracking-[0.3em]">Link Pulse</h2>
           </div>
           <Info className="h-4 w-4 text-slate-300 stroke-[1.5px] hover:text-[#1B5E20] transition-colors cursor-help" />
        </div>
        
        <div className="flex flex-col">
           {newsItems.map((item) => (
             <div key={item.id} className="px-10 py-5 hover:bg-slate-50/80 transition-all cursor-pointer group/news relative border-b border-slate-50 last:border-0 border-l-4 border-l-transparent hover:border-l-[#1B5E20]">
                <div className="flex items-start gap-5">
                   <div className={`p-2.5 rounded-xl bg-slate-100 ${item.color} group-hover/news:scale-110 group-hover/news:rotate-6 transition-transform`}>
                      <item.icon className="h-4 w-4" />
                   </div>
                   <div className="flex-1 min-w-0">
                      <h3 className="text-[15px] font-black text-slate-800 leading-[1.3] group-hover/news:text-[#1B5E20] transition-colors tracking-tight">
                         {item.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1.5 opacity-60 group-hover/news:opacity-100 transition-opacity">
                         <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">{item.time}</span>
                         <span className="w-1 h-1 bg-slate-200 rounded-full" />
                         <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.readers}</span>
                      </div>
                   </div>
                </div>
             </div>
           ))}
        </div>
        
        <button className="w-full py-6 text-[11px] font-black text-slate-400 hover:text-[#1B5E20] hover:bg-slate-50 transition-all border-t border-slate-50 uppercase tracking-[0.3em] bg-white group/all">
           Detailed Feed History <ChevronDown className="h-4 w-4 inline ml-2 group-hover/all:translate-y-1 transition-transform" />
        </button>
      </div>

      {/* Premium CTA Card */}
      <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-[0_40px_100px_rgba(0,0,0,0.3)] relative overflow-hidden group/ad animate-in slide-in-from-right-8 duration-700">
         <div className="relative z-10 flex flex-col h-full">
            <div className="w-14 h-14 bg-white/10 rounded-[1.5rem] flex items-center justify-center mb-8 border border-white/5 backdrop-blur-xl group-hover/ad:scale-110 group-hover/ad:-rotate-6 transition-transform">
               <Sparkles className="w-7 h-7 text-yellow-500 shadow-xl shadow-yellow-500/20" />
            </div>
            <h3 className="text-2xl font-black tracking-tighter leading-none mb-4 italic">Elevate your career trajectory.</h3>
            <p className="text-xs text-white/40 font-bold leading-relaxed mb-10 max-w-[220px] italic">"Unlocking insights from industry elite & mastering high-demand tech skills."</p>
            <button className="w-full py-4 rounded-full bg-yellow-400 text-slate-900 font-black text-[12px] uppercase tracking-[0.2em] hover:bg-yellow-500 transition-all shadow-2xl shadow-yellow-900/40 active:scale-95">
              Unleash Premium
            </button>
         </div>
         <Sparkles className="absolute -bottom-10 -right-10 w-64 h-64 opacity-5 text-yellow-500 group-hover/ad:scale-150 group-hover/ad:rotate-45 transition-transform duration-2000" />
      </div>

      {/* ELITE FOOTER ECOSYSTEM */}
      <footer className="px-6 py-12 border-t border-slate-100/50 mt-12 bg-slate-50/20 rounded-[4rem] backdrop-blur-sm relative overflow-hidden group/footer animate-in fade-in duration-1000">
         <div className="relative z-10 flex flex-col items-center gap-10">
            
            {/* LINK MESH */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 px-4 w-full">
               {[
                 { label: 'About', href: '/about' },
                 { label: 'Accessibility', href: '/accessibility' },
                 { label: 'Help', href: '/help' },
                 { label: 'Privacy', href: '/privacy' },
                 { label: 'Legal', href: '/legal' },
                 { label: 'Ad Choice', href: '/advertise' },
                 { label: 'Jobs', href: '/jobs' },
                 { label: 'Get App', href: '/apps' }
               ].map((link) => (
                 <Link 
                  key={link.label} 
                  href={link.href}
                  className="group/link text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 hover:text-[#1B5E20] transition-all"
                 >
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover/link:bg-[#1B5E20] group-hover/link:scale-125 transition-all" />
                    <span className="opacity-60 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all">{link.label}</span>
                 </Link>
               ))}
            </div>

            {/* BRAND SIGNATURE */}
            <div className="flex flex-col items-center gap-6 w-full">
               <div className="h-[1px] w-12 bg-slate-200 group-hover/footer:w-24 transition-all duration-700" />
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center shadow-xl group-hover/footer:rotate-12 transition-transform duration-500">
                     <ShieldCheck className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div className="flex flex-col">
                     <div className="flex items-center gap-2">
                        <span className="text-[11px] font-black text-slate-800 uppercase tracking-[0.4em] leading-none">Elite Platform</span>
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                     </div>
                     <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] opacity-50 mt-1">Connect+ Corp &copy; 2026</span>
                  </div>
               </div>
            </div>

            {/* REGIONAL NODE */}
            <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-slate-100 shadow-sm opacity-40 group-hover/footer:opacity-100 transition-all hover:border-[#1B5E20]/30">
               <MapPin className="w-3 h-3 text-[#1B5E20]" />
               <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest leading-none">Kampala Node • Central Intelligence Core</span>
            </div>
         </div>

         {/* Backdrop Glows */}
         <div className="absolute top-0 right-0 w-32 h-32 bg-green-600/5 rounded-full blur-3xl -z-0" />
         <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl -z-0" />
      </footer>
    </div>
  );
}
