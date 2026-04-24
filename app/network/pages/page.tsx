"use client";

import { useState } from "react";
import { NetworkSidebar } from "../network-sidebar";
import { Bookmark, Search, Plus, MoreHorizontal, Briefcase, Sparkles, MapPin, Globe, CheckCircle2 } from "lucide-react";

const initialPages = [
  { id: "p1", name: "SafeBoda Uganda", industry: "Transportation", location: "Kampala, Uganda", followers: 124000, logo: "SB", joined: true, activeJobs: 8 },
  { id: "p2", name: "Chipper Cash", industry: "Fintech", location: "Global (Remote)", followers: 852000, logo: "CC", joined: true, activeJobs: 12 },
  { id: "p3", name: "MTN Uganda", industry: "Telecommunications", location: "Kampala, Uganda", followers: 420000, logo: "MTN", joined: false, activeJobs: 0 }
];

export default function PagesManagementPage() {
  const [pages, setPages] = useState(initialPages);
  const [activePageMenuId, setActivePageMenuId] = useState<string | null>(null);

  const handleFollow = (id: string) => {
    setPages(prev => prev.map(p => p.id === id ? { ...p, joined: !p.joined } : p));
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
      <aside className="lg:col-span-3">
        <NetworkSidebar />
      </aside>

      <main className="lg:col-span-9 space-y-6">
        <div className="bg-white rounded-2xl border border-[#e0e0e0] shadow-sm overflow-hidden">
           {/* Header */}
           <div className="p-8 border-b border-[#e0e0e0] bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                 <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3 tracking-tighter">
                    <Bookmark className="w-8 h-8 text-orange-500" /> Company Pages ({pages.filter(p => p.joined).length} Following)
                 </h1>
                 <p className="text-sm text-[#666666] mt-1 font-medium italic">"Connecting you with top employers and hiring companies."</p>
              </div>
              <button 
                className="flex items-center gap-2 px-8 py-3 rounded-full bg-slate-900 text-white font-black text-xs hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 tracking-widest"
              >
                 <Plus className="w-4 h-4" /> Create a page
              </button>
           </div>

           <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                 <div className="p-8 rounded-[3rem] bg-orange-50/50 border border-orange-100 shadow-sm relative overflow-hidden group">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600 mb-4">Hiring Authority</h3>
                    <p className="text-base font-black text-slate-800 leading-tight mb-6">Explore company updates & hire-ready networks.</p>
                    <button className="px-8 py-2.5 rounded-full bg-orange-500 text-white font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-colors shadow-orange-100 shadow-xl">
                       Discover Top Brands
                    </button>
                    <Sparkles className="absolute -bottom-8 -right-8 w-32 h-32 opacity-10 text-orange-600 group-hover:scale-110 transition-transform duration-500" />
                 </div>

                 <div className="p-8 rounded-[3rem] border border-slate-100 bg-[#f9fafb] flex flex-col justify-center gap-4">
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                       <Briefcase className="w-4 h-4 text-orange-500" /> Career Opportunity
                    </h3>
                    <p className="text-[13px] text-[#666666] leading-relaxed font-medium">
                       Following company pages gives you priority notification when new roles matching your profile are posted.
                    </p>
                 </div>
              </div>

              <div className="space-y-4 pb-20">
                 {pages.map((brand) => (
                   <div key={brand.id} className="p-6 rounded-[2.5rem] border border-slate-100 hover:shadow-2xl hover:border-orange-50 transition-all group bg-white">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                         <div className="flex gap-6 items-center">
                            <div className="w-20 h-20 rounded-[2.5rem] bg-slate-50 border border-slate-100 shadow-sm flex items-center justify-center font-black text-slate-400 group-hover:rotate-6 transition-transform">
                               {brand.logo}
                            </div>
                            <div className="min-w-0">
                               <div className="flex items-center gap-2">
                                  <h4 className="text-xl font-black text-slate-800 tracking-tight leading-tight truncate">{brand.name}</h4>
                                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                               </div>
                               <p className="text-[11px] text-[#666666] font-medium leading-relaxed mt-1">{brand.industry} · {brand.location}</p>
                               <div className="flex items-center gap-3 mt-3">
                                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 opacity-80">{brand.followers.toLocaleString()} followers</span>
                                  {brand.activeJobs > 0 && (
                                    <span className="text-[9px] font-black uppercase tracking-widest text-[#057642] bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                                      {brand.activeJobs} Jobs posted
                                    </span>
                                  )}
                               </div>
                            </div>
                         </div>
                         <div className="flex items-center gap-3">
                            <button 
                              onClick={() => handleFollow(brand.id)}
                              className={`px-12 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${brand.joined ? 'bg-slate-100 text-slate-500 border-none' : 'bg-orange-500 text-white hover:bg-orange-600 shadow-orange-100 shadow-xl'}`}
                            >
                               {brand.joined ? 'Following' : 'Follow Link'}
                            </button>
                            <button
                              onClick={() => setActivePageMenuId(brand.id)}
                              aria-label="More options"
                              title="More options"
                              className="p-3 rounded-full text-slate-400 hover:text-slate-600 border border-slate-100 transition-colors"
                            >
                               <MoreHorizontal className="w-5 h-5 font-black" />
                            </button>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </main>

      {activePageMenuId && (
        <div className="fixed inset-0 z-[140]">
          <button
            type="button"
            aria-label="Close page options"
            onClick={() => setActivePageMenuId(null)}
            className="absolute inset-0 bg-black/20"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[2rem] shadow-[0_-20px_60px_rgba(0,0,0,0.2)] border-t border-slate-100 py-2 animate-in slide-in-from-bottom-4 duration-200">
            <div className="w-12 h-1.5 rounded-full bg-slate-300 mx-auto my-3" />
            <button
              onClick={() => {
                handleFollow(activePageMenuId);
                setActivePageMenuId(null);
              }}
              className="w-full text-left px-6 py-4 text-[18px] font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Follow / Unfollow
            </button>
            <button
              onClick={() => {
                setPages(prev => prev.filter(p => p.id !== activePageMenuId));
                setActivePageMenuId(null);
              }}
              className="w-full text-left px-6 py-4 text-[18px] font-medium text-red-500 hover:bg-red-50 transition-colors"
            >
              Remove page
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
