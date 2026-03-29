"use client";

import { useState } from "react";
import { NetworkSidebar } from "../network-sidebar";
import { Users, Search, Plus, MoreHorizontal, MessageSquare, Briefcase, Sparkles, MapPin, Globe } from "lucide-react";
import Link from "next/link";

const initialGroups = [
  { id: "g1", name: "React Developers Network", count: 12400, description: "Africa's fastest growing React community focused on Next.js and frontend excellence.", avatar: "RD", banner: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=400&h=200", joined: true },
  { id: "g2", name: "HR Professionals Global", count: 8500, description: "Strategic HR management and talent acquisition practices in the digital age.", avatar: "HR", banner: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400&h=200", joined: true },
  { id: "g3", name: "Uganda Tech Alliance", count: 4200, description: "Uniting tech entrepreneurs, engineers, and stakeholders across Uganda.", avatar: "UT", banner: "https://images.unsplash.com/photo-1504384308090-c89e12bf5a67?auto=format&fit=crop&q=80&w=400&h=200", joined: false }
];

export default function GroupsPage() {
  const [groups, setGroups] = useState(initialGroups);

  const handleJoin = (id: string) => {
    setGroups(prev => prev.map(g => g.id === id ? { ...g, joined: !g.joined } : g));
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
                 <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
                    <Users className="w-8 h-8 text-[#0a66c2]" /> Groups ({groups.filter(g => g.joined).length} Joined)
                 </h1>
                 <p className="text-sm text-[#666666] mt-1 font-medium">Connect with professionals in specialized communities.</p>
              </div>
              <button className="flex items-center gap-2 px-8 py-3 rounded-full bg-[#0a66c2] text-white font-black text-xs hover:bg-[#004182] transition-all shadow-blue-100 shadow-xl tracking-widest">
                 <Plus className="w-4 h-4" /> Create group
              </button>
           </div>

           <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                 <div className="p-10 rounded-[40px] bg-gradient-to-br from-[#0a66c2] to-[#004182] text-white shadow-2xl relative overflow-hidden group">
                    <h3 className="text-lg font-black mb-4 tracking-tight leading-none">Find your tribe ✨</h3>
                    <p className="text-sm font-medium opacity-80 leading-relaxed mb-8">
                       Discover professional communities tailored to your industry, skills, and professional journey.
                    </p>
                    <button className="px-10 py-3 rounded-full bg-white text-[#0a66c2] font-black text-sm hover:scale-105 transition-all shadow-xl shadow-blue-900/40 tracking-wider">
                       Browse Discovery
                    </button>
                    <Sparkles className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 group-hover:scale-110 transition-transform duration-500" />
                 </div>

                 <div className="p-8 rounded-3xl border border-slate-100 bg-white hover:shadow-2xl transition-all cursor-pointer group">
                    <div className="flex gap-4 items-center mb-6">
                       <div className="p-3 bg-blue-50 rounded-xl group-hover:scale-110 transition-transform">
                          <Globe className="w-6 h-6 text-[#0a66c2]" />
                       </div>
                       <div>
                          <h3 className="text-base font-black text-slate-800">Global Communities</h3>
                          <p className="text-[10px] text-[#666666] font-black uppercase tracking-widest mt-1">Networking beyond borders</p>
                       </div>
                    </div>
                    <div className="space-y-3">
                       <p className="text-xs text-[#666666] font-medium leading-relaxed italic">"Join over 50,000 African professionals in regional and global tech hubs."</p>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
                 {groups.map((group) => (
                   <div key={group.id} className="relative group/card bg-white rounded-[32px] overflow-hidden border border-slate-100 hover:shadow-2xl hover:border-[#0a66c2]/20 transition-all duration-500">
                      <div className="h-28 overflow-hidden relative">
                         <img src={group.banner} className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-1000 ease-out" alt="" />
                         <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white/80 to-transparent" />
                      </div>
                      
                      <div className="p-8 pt-0 -mt-10 relative">
                         <div className="w-20 h-20 rounded-[2rem] bg-white border border-slate-100 shadow-xl flex items-center justify-center font-black text-[#0a66c2] text-xl group-hover/card:rotate-6 transition-transform">
                            {group.avatar}
                         </div>
                         <h3 className="text-xl font-black text-slate-800 tracking-tight mt-6 leading-tight group-hover/card:text-[#0a66c2] transition-colors">{group.name}</h3>
                         <p className="text-[10px] text-[#666666] font-black uppercase tracking-widest mt-2">{group.count.toLocaleString()} members</p>
                         <p className="text-xs text-slate-500 font-medium leading-relaxed mt-4 italic line-clamp-2 h-9 opacity-80">{group.description}</p>
                         
                         <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                            <button 
                              onClick={() => handleJoin(group.id)}
                              className={`flex-1 h-10 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${group.joined ? 'bg-slate-100 text-[#0a66c2]' : 'bg-[#0a66c2] text-white hover:bg-[#004182] shadow-blue-100 shadow-lg'}`}
                            >
                               {group.joined ? 'Dismiss' : 'Join Community'}
                            </button>
                            <button className="p-2.5 rounded-full text-slate-400 hover:text-slate-600 ml-2 transition-colors">
                               <MoreHorizontal className="w-5 h-5" />
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
