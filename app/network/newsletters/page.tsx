"use client";

import { useState } from "react";
import { NetworkSidebar } from "../network-sidebar";
import { Newspaper, Search, NewspaperIcon, Plus, MoreHorizontal, MessageSquare, Sparkles, MapPin, Globe, CheckCircle2, Star, Clock } from "lucide-react";

const initialNewsletters = [
  { id: "n1", name: "DevOps Excellence", frequency: "Weekly", issues: 124, description: "Deep dives into kubernetes, CI/CD, and scaling infrastructures for modern SaaS.", author: "Isaac Kato", avatar: "IK", subscribed: true, banner: "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=400&h=200" },
  { id: "n2", name: "The PM Blueprint", frequency: "Bi-weekly", issues: 85, description: "Unlocking product-led growth and strategic roadmap planning in emerging markets.", author: "Sarah Johnson", avatar: "SJ", subscribed: true, banner: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400&h=200" },
  { id: "n3", name: "Uganda Tech Review", frequency: "Monthly", issues: 42, description: "Analysis of the hottest startups, funding rounds, and innovation trends across Uganda.", author: "MTN Foundation", avatar: "MTN", subscribed: false, banner: "https://images.unsplash.com/photo-1504384308090-c89e12bf5a67?auto=format&fit=crop&q=80&w=400&h=200" }
];

export default function NewslettersPage() {
  const [newsletters, setNewsletters] = useState(initialNewsletters);

  const handleSubscribe = (id: string) => {
    setNewsletters(prev => prev.map(n => n.id === id ? { ...n, subscribed: !n.subscribed } : n));
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
                 <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3 tracking-tighter leading-none">
                    <Newspaper className="w-8 h-8 text-blue-600" /> Newsletters ({newsletters.filter(n => n.subscribed).length} Subscribed)
                 </h1>
                 <p className="text-sm text-[#666666] mt-2 font-medium italic">"Stay informed with curated professional publications."</p>
              </div>
              <button 
                className="flex items-center gap-2 px-8 py-3 rounded-full bg-slate-900 text-white font-black text-xs hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 tracking-widest"
              >
                 <Plus className="w-4 h-4" /> Create a publication
              </button>
           </div>

           <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                 <div className="p-10 rounded-[2.5rem] bg-blue-50/50 border border-blue-100 shadow-sm relative overflow-hidden group flex flex-col justify-center">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-4">Curated publications</h3>
                    <p className="text-xl font-black text-slate-800 leading-tight mb-8 max-w-[200px]">Unlock deep industry insights & trends.</p>
                    <button className="px-8 py-3 rounded-full bg-blue-600 text-white font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-blue-100 shadow-xl">
                       Explore Top Editions
                    </button>
                    <Sparkles className="absolute -bottom-8 -right-8 w-32 h-32 opacity-10 text-blue-600 group-hover:scale-110 transition-transform duration-500" />
                 </div>

                 <div className="p-10 rounded-[2.5rem] border border-slate-100 bg-[#f9fafb] flex flex-col justify-center gap-4">
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                       <Clock className="w-4 h-4 text-blue-500" /> Subscription Value
                    </h3>
                    <p className="text-[13px] text-[#666666] leading-relaxed font-medium">
                       Newsletters offer a focused, uncluttered way to keep up with professional changes without the noise of the main feed.
                    </p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-32">
                 {newsletters.map((pub) => (
                   <div key={pub.id} className="relative group bg-white rounded-[32px] overflow-hidden border border-slate-100 hover:shadow-2xl hover:border-blue-50 transition-all duration-500">
                      <div className="h-28 overflow-hidden relative">
                         <img src={pub.banner} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" alt="" />
                         <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white/80 to-transparent" />
                      </div>
                      
                      <div className="p-10 pt-0 -mt-8 relative">
                         <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 shadow-xl flex items-center justify-center font-black text-blue-400 text-lg group-hover:rotate-6 transition-transform">
                            {pub.avatar}
                         </div>
                         <h3 className="text-2xl font-black text-slate-800 tracking-tighter mt-6 group-hover:text-blue-600 transition-colors leading-none">{pub.name}</h3>
                         <div className="flex items-center gap-2 mt-2 opacity-60">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                            <p className="text-[9px] text-[#666666] font-black uppercase tracking-widest">{pub.author} · {pub.issues} editions</p>
                         </div>
                         <p className="text-xs text-slate-500 font-medium leading-relaxed mt-4 italic line-clamp-2 h-9 opacity-80">{pub.description}</p>
                         
                         <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                            <div className="flex flex-col">
                               <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#0a66c2]">{pub.frequency}</p>
                            </div>
                            <button 
                              onClick={() => handleSubscribe(pub.id)}
                              className={`px-10 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${pub.subscribed ? 'bg-slate-100 text-slate-500' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100 shadow-xl'}`}
                            >
                               {pub.subscribed ? 'Unsubscribe' : 'Enroll Now'}
                            </button>
                         </div>
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
