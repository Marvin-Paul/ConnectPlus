"use client";

import { useState } from "react";
import { NetworkSidebar } from "../network-sidebar";
import { Hash, Search, TrendingUp, Sparkles } from "lucide-react";

const initialHashtags = [
  { id: "h1", name: "#RemoteWork", followers: 124000, updates: 842, followed: true, trend: "up" },
  { id: "h2", name: "#TechJobs", followers: 852000, updates: 2104, followed: true, trend: "up" },
  { id: "h3", name: "#InnovationAfrica", followers: 42000, updates: 320, followed: false, trend: "down" },
  { id: "h4", name: "#NextJs", followers: 230000, updates: 540, followed: true, trend: "up" }
];

export default function HashtagsPage() {
  const [hashtags, setHashtags] = useState(initialHashtags);
  const [filter, setFilter] = useState<'all' | 'trending'>('all');

  const handleFollow = (id: string) => {
    setHashtags(prev => prev.map(h => h.id === id ? { ...h, followed: !h.followed } : h));
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
                    <Hash className="w-8 h-8 text-[#0a66c2]" /> Hashtags ({hashtags.filter(h => h.followed).length} Followed)
                 </h1>
                 <p className="text-sm text-[#666666] mt-1 font-medium italic">"Follow key topics to customize your professional feed."</p>
              </div>
              <div className="relative group">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#0a66c2] transition-colors" />
                 <input 
                   type="text" 
                   placeholder="Search topics..." 
                   className="h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-[#0a66c2]/20 transition-all outline-none"
                 />
              </div>
           </div>

           <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                 <div className="p-8 rounded-[3rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden group">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-4">Topic authority</h3>
                    <p className="text-xl font-black text-white leading-tight mb-8">Personalize your professional universe ✨</p>
                    <button 
                       onClick={() => {
                          setFilter('trending');
                          document.getElementById('trending-section')?.scrollIntoView({ behavior: 'smooth' });
                       }}
                       className="px-10 py-3 rounded-full bg-blue-500 text-white font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-colors shadow-blue-900/40 shadow-xl"
                    >
                       Explore Trending
                    </button>
                    <Sparkles className="absolute -bottom-8 -right-8 w-32 h-32 opacity-10 text-blue-400 group-hover:scale-110 transition-transform duration-500" />
                 </div>

                 <div className="p-8 rounded-[3rem] border border-slate-100 bg-[#f9fafb] flex flex-col justify-center gap-4 shadow-sm">
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                       <TrendingUp className="w-4 h-4 text-green-500" /> Feed Intelligence
                    </h3>
                    <p className="text-[13px] text-[#666666] leading-relaxed font-medium">
                       Connect+ AI uses your followed hashtags to build a feed that prioritized high-value opportunities and professional growth content.
                    </p>
                 </div>
              </div>

              <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6 pt-2" id="trending-section">
                 <button 
                    onClick={() => setFilter('all')}
                    className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${filter === 'all' ? 'bg-[#0a66c2] text-white shadow-lg shadow-blue-100' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                 >
                    All Topics
                 </button>
                 <button 
                    onClick={() => setFilter('trending')}
                    className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${filter === 'trending' ? 'bg-[#0a66c2] text-white shadow-lg shadow-blue-100' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                 >
                    Trending Now
                 </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                 {hashtags.filter(h => filter === 'all' ? true : h.trend === 'up').map((tag) => (
                   <div key={tag.id} className="p-6 rounded-[2.5rem] border border-slate-100 bg-white hover:shadow-2xl hover:border-[#0a66c2]/20 transition-all group flex flex-col justify-between">
                      <div>
                         <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-slate-400 shadow-sm group-hover:scale-110 group-hover:bg-[#0a66c2] group-hover:text-white transition-all duration-300">
                               <Hash className="w-5 h-5" />
                            </div>
                            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${tag.trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-400'}`}>
                               {tag.trend === 'up' ? <TrendingUp className="w-2.5 h-2.5" /> : null} {tag.trend === 'up' ? 'Trending' : 'Slow'}
                            </div>
                         </div>
                         <h3 className="text-lg font-black text-slate-800 tracking-tight leading-none truncate group-hover:text-[#0a66c2] transition-colors">{tag.name}</h3>
                         <div className="mt-4 flex flex-col gap-1.5 ">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-80">{tag.followers.toLocaleString()} followers</p>
                            <p className="text-[9px] font-black text-[#057642] uppercase tracking-widest">+{tag.updates} updates this week</p>
                         </div>
                      </div>

                      <div className="mt-8 pt-4 border-t border-slate-50 w-full">
                         <button 
                           onClick={() => handleFollow(tag.id)}
                           className={`w-full py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${tag.followed ? 'bg-slate-100 text-[#0a66c2]' : 'bg-[#0a66c2] text-white hover:bg-[#004182] shadow-blue-100 shadow-lg'}`}
                         >
                            {tag.followed ? 'Unfollow Topic' : 'Follow Link'}
                         </button>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}
