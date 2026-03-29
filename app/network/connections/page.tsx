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

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
      <aside className="lg:col-span-3">
        <NetworkSidebar />
      </aside>

      <main className="lg:col-span-9 space-y-6">
        <div className="bg-white rounded-2xl border border-[#e0e0e0] shadow-sm overflow-hidden">
           <div className="p-8 border-b border-[#e0e0e0] bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                 <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3 tracking-tighter">
                    <Users className="w-8 h-8 text-[#0a66c2]" /> {connections.length} Connections
                 </h1>
                 <p className="text-sm text-[#666666] mt-1 font-medium">Manage your professional relationships and stay connected.</p>
              </div>
              <div className="flex items-center gap-2">
                 <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#0a66c2] transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Search connections..." 
                      className="h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-[#0a66c2]/20 transition-all outline-none"
                    />
                 </div>
                 <button className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-[#0a66c2] transition-colors shadow-sm">
                    <Filter className="w-5 h-5" />
                 </button>
              </div>
           </div>

           <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
              {connections.map((conn) => (
                <div key={conn.id} className="p-6 rounded-3xl border border-slate-100 hover:shadow-xl hover:border-[#0a66c2]/20 transition-all group bg-white relative">
                   <div className="flex gap-4 items-start">
                      <Link href={`/profile/${conn.name.toLowerCase().replace(/ /g, '-')}`} className="shrink-0 relative">
                         <img src={conn.avatar} className="w-16 h-16 rounded-full border-2 border-white shadow-md object-cover group-hover:scale-105 transition-transform" alt="" />
                      </Link>
                      <div className="flex-1 min-w-0">
                         <Link href={`/profile/${conn.name.toLowerCase().replace(/ /g, '-')}`} className="text-[15px] font-black text-slate-800 hover:text-[#0a66c2] hover:underline transition-colors block truncate">
                            {conn.name}
                         </Link>
                         <p className="text-[11px] text-[#666666] font-medium leading-relaxed mt-0.5 line-clamp-2">{conn.headline}</p>
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">Connected {conn.connectedTime}</p>
                         
                         <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-50">
                            <Link 
                               href="/messaging"
                               className="flex-1 flex items-center justify-center gap-2 h-9 rounded-full bg-[#0a66c2] text-white font-black text-xs hover:bg-[#004182] transition-all shadow-blue-100 shadow-lg tracking-widest"
                            >
                               <MessageSquare className="w-3.5 h-3.5" /> Message
                            </Link>
                            <button className="p-2.5 rounded-full border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all">
                               <UserMinus className="w-4 h-4" />
                            </button>
                         </div>
                      </div>
                      <button className="p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                         <MoreHorizontal className="w-5 h-5" />
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </main>
    </div>
  );
}
