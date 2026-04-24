"use client";

import { useState } from "react";
import { NetworkSidebar } from "../network-sidebar";
import { 
  BookOpen, 
  UserMinus, 
  Search, 
  Filter, 
  Users, 
  TrendingUp, 
  Sparkles, 
  Plus, 
  CheckCircle2, 
  ArrowUpRight,
  ChevronDown,
  LayoutGrid,
  ListFilter
} from "lucide-react";
import Link from "next/link";

const initialFollowing = [
  { id: "f1", name: "David Walusimbi", headline: "Data Scientist | Python | AI Research", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80", count: 842, industry: "AI & Tech" },
  { id: "f2", name: "Fatuma Ali", headline: "UI/UX Designer | Creative | Visual Storyteller", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80", count: 2104, industry: "Design" },
  { id: "f3", name: "Lillian Nsereko", headline: "Product Lead @ PayWay | Simplifying payments across Africa", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80", count: 1240, industry: "Fintech" }
];

const initialFollowers = [
  { id: "fl1", name: "Robert Kizito", headline: "Frontend Architect | Next.js GDE", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80", count: 3242, industry: "Software" }
];

export default function FollowingPage() {
  const [activeTab, setActiveTab] = useState<"following" | "followers">("following");
  const [following, setFollowing] = useState(initialFollowing);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = (activeTab === "following" ? following : initialFollowers).filter(person => 
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.headline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 animate-pro-fade">
      <aside className="lg:col-span-3">
        <NetworkSidebar />
      </aside>

      <main className="lg:col-span-9 space-y-6">
        {/* Insight Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="p-6 rounded-[24px] border border-border dark:border-slate-800 bg-white dark:bg-slate-900 shadow-soft relative overflow-hidden group">
              <div className="relative z-10">
                 <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-primary/10 dark:bg-primary/20">
                       <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-[11px] font-bold text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">+12.4%</span>
                 </div>
                 <h3 className="text-[24px] font-bold text-foreground dark:text-white tracking-tight">84%</h3>
                 <p className="text-[12px] text-secondary/60 dark:text-slate-400 font-medium mt-1 uppercase tracking-wider">Profile Influence</p>
              </div>
              <Sparkles className="absolute -bottom-6 -right-6 w-24 h-24 opacity-5 text-primary group-hover:scale-110 transition-transform duration-500" />
           </div>

           <div className="p-6 rounded-[24px] border border-border dark:border-slate-800 bg-white dark:bg-slate-900 shadow-soft relative overflow-hidden group">
              <div className="relative z-10">
                 <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-primary/10 dark:bg-primary/20">
                       <Users className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-[11px] font-bold text-primary bg-primary/5 dark:bg-primary/10 px-2 py-0.5 rounded-full">Active</span>
                 </div>
                 <h3 className="text-[24px] font-bold text-foreground dark:text-white tracking-tight">4,842</h3>
                 <p className="text-[12px] text-secondary/60 dark:text-slate-400 font-medium mt-1 uppercase tracking-wider">Total Reach</p>
              </div>
           </div>

           <div className="p-6 rounded-[24px] bg-slate-900 dark:bg-slate-950 shadow-premium relative overflow-hidden group">
              <div className="relative z-10">
                 <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-white/10 border border-white/5 backdrop-blur-md">
                       <CheckCircle2 className="w-5 h-5 text-primary-light" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-primary-light" />
                 </div>
                 <h3 className="text-[24px] font-bold text-white tracking-tight">Elite</h3>
                 <p className="text-[12px] text-white/50 font-medium mt-1 uppercase tracking-wider">Network Status</p>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] -mr-16 -mt-16" />
           </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border dark:border-slate-800 shadow-soft overflow-hidden">
           {/* Tab Navigation */}
           <div className="p-6 md:p-8 border-b border-border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                 <div>
                    <h1 className="text-2xl font-bold text-foreground dark:text-white flex items-center gap-3 tracking-tight">
                       <BookOpen className="w-8 h-8 text-primary" /> Network Insight
                    </h1>
                    <p className="text-[14px] text-secondary/70 dark:text-slate-400 mt-1.5 font-medium">Manage your professional audience and influence.</p>
                 </div>
                 <div className="flex p-1 bg-muted/50 dark:bg-slate-800/50 rounded-xl w-fit">
                    <button 
                      onClick={() => setActiveTab("following")}
                      className={`px-6 py-2 text-[13px] font-bold rounded-lg transition-all ${activeTab === "following" ? "bg-white dark:bg-slate-700 text-primary shadow-sm" : "text-secondary hover:text-foreground dark:text-slate-400 dark:hover:text-white"}`}
                    >
                      Following ({following.length})
                    </button>
                    <button 
                      onClick={() => setActiveTab("followers")}
                      className={`px-6 py-2 text-[13px] font-bold rounded-lg transition-all ${activeTab === "followers" ? "bg-white dark:bg-slate-700 text-primary shadow-sm" : "text-secondary hover:text-foreground dark:text-slate-400 dark:hover:text-white"}`}
                    >
                      Followers ({initialFollowers.length})
                    </button>
                 </div>
              </div>

              {/* Action Bar */}
              <div className="flex flex-col md:flex-row items-center gap-4 mt-8">
                 <div className="relative flex-1 w-full group">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary/40 group-focus-within:text-primary transition-colors" />
                    <input 
                      type="text" 
                      placeholder={`Search ${activeTab}...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-11 pl-10 pr-4 rounded-xl border border-border dark:border-slate-700 bg-white dark:bg-slate-950 text-[14px] font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-foreground dark:text-slate-200"
                    />
                 </div>
                 <div className="flex items-center gap-2 w-full md:w-auto">
                    <button className="flex-1 md:flex-none h-11 px-4 rounded-xl border border-border dark:border-slate-700 bg-white dark:bg-slate-950 text-secondary hover:text-foreground dark:text-slate-400 dark:hover:text-white transition-all flex items-center justify-center gap-2 text-[13px] font-bold">
                       <ListFilter className="w-4 h-4" /> Filter
                    </button>
                    <button className="flex-1 md:flex-none h-11 px-4 rounded-xl border border-border dark:border-slate-700 bg-white dark:bg-slate-950 text-secondary hover:text-foreground dark:text-slate-400 dark:hover:text-white transition-all flex items-center justify-center gap-2 text-[13px] font-bold">
                       <ChevronDown className="w-4 h-4" /> Sort by
                    </button>
                 </div>
              </div>
           </div>

           <div className="p-6 md:p-8">
              {filteredData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {filteredData.map((person) => (
                     <div key={person.id} className="p-5 rounded-[24px] border border-border dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:shadow-premium hover:border-primary/20 transition-all duration-300 group relative">
                        <div className="flex gap-4 items-start">
                           <div className="relative shrink-0">
                              <img src={person.avatar} className="w-16 h-16 rounded-2xl border border-border dark:border-slate-700 shadow-md object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center shadow-sm">
                                 <Plus className="w-3 h-3 text-white" />
                              </div>
                           </div>
                           <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                 <h4 className="text-[16px] font-bold text-foreground dark:text-slate-100 tracking-tight leading-tight truncate group-hover:text-primary transition-colors">{person.name}</h4>
                                 <span className="text-[10px] font-bold text-secondary/40 dark:text-slate-500 uppercase tracking-widest">{person.industry}</span>
                              </div>
                              <p className="text-[13px] text-secondary/80 dark:text-slate-400 font-medium leading-relaxed mt-1 line-clamp-1">{person.headline}</p>
                              
                              <div className="flex items-center gap-4 mt-4">
                                 <div className="flex items-center gap-1.5 text-[11px] text-secondary/40 dark:text-slate-500 font-bold uppercase tracking-wider">
                                    <Users className="w-3.5 h-3.5 text-primary" /> {person.count.toLocaleString()}
                                 </div>
                                 <div className="flex items-center gap-1.5 text-[11px] text-secondary/40 dark:text-slate-500 font-bold uppercase tracking-wider">
                                    <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Top tier
                                 </div>
                              </div>
                           </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-border/50 dark:border-slate-800/50">
                           <button className="flex-1 h-9 rounded-full bg-primary text-white font-bold text-[11px] uppercase tracking-wider hover:bg-primary/90 transition-all shadow-md active:scale-95">
                              Message
                           </button>
                           {activeTab === "following" ? (
                             <button 
                               onClick={() => setFollowing(prev => prev.filter(f => f.id !== person.id))}
                               className="px-6 h-9 rounded-full border border-border dark:border-slate-700 bg-white dark:bg-slate-900 text-secondary/60 dark:text-slate-400 font-bold text-[11px] uppercase tracking-wider hover:text-red-500 hover:border-red-100 dark:hover:bg-red-900/10 transition-all active:scale-95"
                             >
                                Unfollow
                             </button>
                           ) : (
                             <button className="px-6 h-9 rounded-full border border-primary text-primary font-bold text-[11px] uppercase tracking-wider hover:bg-primary hover:text-white transition-all active:scale-95">
                                Follow back
                             </button>
                           )}
                        </div>
                     </div>
                   ))}
                </div>
              ) : (
                <div className="py-20 flex flex-col items-center text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
                   <div className="w-20 h-20 rounded-3xl bg-muted/30 dark:bg-slate-800/50 flex items-center justify-center border border-dashed border-border dark:border-slate-700">
                      <Search className="w-8 h-8 text-secondary/20" />
                   </div>
                   <div className="space-y-2">
                      <h3 className="text-lg font-bold text-foreground dark:text-white tracking-tight">No results found</h3>
                      <p className="text-[14px] text-secondary/60 dark:text-slate-400 font-medium max-w-[280px] mx-auto">
                        We couldn't find anyone matching "{searchQuery}" in your {activeTab} list.
                      </p>
                   </div>
                   <button 
                     onClick={() => setSearchQuery("")}
                     className="px-8 py-2.5 rounded-full bg-primary text-white font-bold text-[12px] uppercase tracking-widest hover:bg-primary/90 transition-all active:scale-95"
                   >
                     Clear search
                   </button>
                </div>
              )}
           </div>
        </div>
      </main>
    </div>
  );
}
