"use client";

import { useState } from "react";
import { NetworkSidebar } from "../network-sidebar";
import { BookOpen, UserMinus, Search, Filter, Users, TrendingUp, Sparkles, Plus, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const initialFollowing = [
  { id: "f1", name: "David Walusimbi", headline: "Data Scientist | Python | AI Research", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80", count: 842 },
  { id: "f2", name: "Fatuma Ali", headline: "UI/UX Designer | Creative | Visual Storyteller", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80", count: 2104 },
  { id: "f3", name: "Lillian Nsereko", headline: "Product Lead @ PayWay | Simplifying payments across Africa", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80", count: 1240 }
];

const initialFollowers = [
  { id: "fl1", name: "Robert Kizito", headline: "Frontend Architect | Next.js GDE", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80", count: 3242 }
];

export default function FollowingPage() {
  const [activeTab, setActiveTab] = useState<"following" | "followers">("following");
  const [following, setFollowing] = useState(initialFollowing);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
      <aside className="lg:col-span-3">
        <NetworkSidebar />
      </aside>

      <main className="lg:col-span-9 space-y-6">
        <div className="bg-white rounded-2xl border border-[#e0e0e0] shadow-sm overflow-hidden">
           {/* Header */}
           <div className="p-8 border-b border-[#e0e0e0] bg-slate-50/50">
              <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
                 <BookOpen className="w-8 h-8 text-[#0a66c2]" /> Following & Followers
              </h1>
              <div className="flex gap-4 mt-8">
                 <button 
                   onClick={() => setActiveTab("following")}
                   className={`pb-3 text-sm font-black border-b-2 transition-all ${activeTab === "following" ? "border-[#0a66c2] text-[#0a66c2]" : "border-transparent text-[#666666] hover:text-black"}`}
                 >
                   Following ({following.length})
                 </button>
                 <button 
                   onClick={() => setActiveTab("followers")}
                   className={`pb-3 text-sm font-black border-b-2 transition-all ${activeTab === "followers" ? "border-[#0a66c2] text-[#0a66c2]" : "border-transparent text-[#666666] hover:text-black"}`}
                 >
                   Followers ({initialFollowers.length})
                 </button>
              </div>
           </div>

           <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                 <div className="p-6 rounded-2xl border border-slate-100 bg-[#edf3f8]/50 relative group overflow-hidden shadow-sm flex flex-col justify-center text-center">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0a66c2] mb-2">Network Influence</h3>
                    <div className="flex items-center justify-center gap-1.5 ">
                       <TrendingUp className="w-4 h-4 text-green-500" />
                       <span className="text-2xl font-black text-slate-800">+12.4%</span>
                    </div>
                    <Sparkles className="absolute -bottom-4 -right-4 w-24 h-24 opacity-5 text-[#0a66c2] group-hover:scale-110 transition-transform duration-500" />
                 </div>

                 <div className="p-6 rounded-2xl border border-slate-100 bg-white relative group overflow-hidden shadow-sm flex flex-col justify-center text-center">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Audience Reach</h3>
                    <div className="flex items-center justify-center gap-1.5 ">
                       <Users className="w-4 h-4 text-[#0a66c2]" />
                       <span className="text-2xl font-black text-slate-800">4,842</span>
                    </div>
                 </div>

                 <div className="p-6 rounded-[2.5rem] bg-slate-900 shadow-2xl relative group overflow-hidden flex flex-col justify-center text-center">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-2">Verified Growth</h3>
                    <div className="flex items-center justify-center gap-1.5 ">
                       <CheckCircle2 className="w-4 h-4 text-blue-400" />
                       <span className="text-2xl font-black text-white">Elite</span>
                    </div>
                    <Sparkles className="absolute -bottom-4 -right-4 w-24 h-24 opacity-10 text-blue-400 group-hover:scale-110 transition-transform duration-500" />
                 </div>
              </div>

              <div className="space-y-4">
                 {(activeTab === "following" ? following : initialFollowers).map((person) => (
                   <div key={person.id} className="p-6 rounded-3xl border border-slate-100 hover:bg-slate-50 transition-colors group">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                         <div className="flex gap-4 items-center">
                            <div className="relative">
                               <img src={person.avatar} className="w-16 h-16 rounded-full border-2 border-white shadow-md object-cover group-hover:scale-105 transition-transform duration-300" alt="" />
                               {activeTab === "followers" && (
                                 <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-white shadow-sm">
                                    <Plus className="h-3 w-3 text-white" />
                                 </div>
                               )}
                            </div>
                            <div className="min-w-0">
                               <h4 className="text-base font-bold text-slate-800 tracking-tight leading-tight">{person.name}</h4>
                               <p className="text-[11px] text-[#666666] font-medium leading-relaxed mt-0.5 line-clamp-1">{person.headline}</p>
                               <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.1em] mt-2 flex items-center gap-1.5 opacity-80">
                                 <Users className="w-3 h-3 text-[#0a66c2]" /> {person.count.toLocaleString()} influence
                               </p>
                            </div>
                         </div>
                         <div className="flex items-center gap-3">
                            {activeTab === "following" ? (
                              <button 
                                onClick={() => setFollowing(prev => prev.filter(f => f.id !== person.id))}
                                className="px-10 py-2 rounded-full border border-slate-200 bg-white text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all shadow-sm"
                              >
                                 Unfollow
                              </button>
                            ) : (
                              <button className="px-10 py-2 rounded-full bg-[#0a66c2] text-white font-black text-[10px] uppercase tracking-widest hover:bg-[#004182] transition-colors shadow-blue-100 shadow-lg">
                                 Follow back
                              </button>
                            )}
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
