"use client";

import { useState } from "react";
import { NetworkSidebar } from "../network-sidebar";
import { Users, Plus, MoreHorizontal, Sparkles, Globe, X } from "lucide-react";

const initialGroups = [
  { id: "g1", name: "React Developers Network", count: 12400, description: "Africa's fastest growing React community focused on Next.js and frontend excellence.", avatar: "RD", banner: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=400&h=200", joined: true },
  { id: "g2", name: "HR Professionals Global", count: 8500, description: "Strategic HR management and talent acquisition practices in the digital age.", avatar: "HR", banner: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400&h=200", joined: true },
  { id: "g3", name: "Uganda Tech Alliance", count: 4200, description: "Uniting tech entrepreneurs, engineers, and stakeholders across Uganda.", avatar: "UT", banner: "https://images.unsplash.com/photo-1504384308090-c89e12bf5a67?auto=format&fit=crop&q=80&w=400&h=200", joined: false }
];

export default function GroupsPage() {
  const [groups, setGroups] = useState(initialGroups);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: "", description: "" });
  const [activeTab, setActiveTab] = useState("all");
  const [activeGroupMenuId, setActiveGroupMenuId] = useState<string | null>(null);

  const handleJoin = (id: string) => {
    setGroups(prev => prev.map(g => g.id === id ? { ...g, joined: !g.joined } : g));
  };

  const handleCreateGroup = () => {
    if (!newGroup.name.trim()) return;

    const initials = newGroup.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    const createdGroup = {
      id: `g${Date.now()}`,
      name: newGroup.name,
      count: 1,
      description: newGroup.description || "A new professional community.",
      avatar: initials || "GN",
      banner: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400&h=200",
      joined: true
    };

    setGroups(prev => [createdGroup, ...prev]);
    setIsModalOpen(false);
    setNewGroup({ name: "", description: "" });
  };

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
                    <Users className="w-8 h-8 text-primary" /> Groups
                 </h1>
                 <p className="text-[14px] text-secondary/70 dark:text-slate-400 mt-1.5 font-medium">Connect with professionals in specialized communities.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-primary text-white font-bold text-[14px] hover:bg-primary/90 transition-all shadow-premium active:scale-95"
              >
                 <Plus className="w-4 h-4" /> Create group
              </button>
           </div>

           <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
                 <div className="p-8 md:p-10 rounded-[32px] bg-gradient-to-br from-primary to-[#004182] text-white shadow-xl relative overflow-hidden group">
                    <div className="relative z-10">
                       <h3 className="text-xl font-bold mb-4 tracking-tight">Find your tribe ✨</h3>
                       <p className="text-[14px] font-medium text-white/80 leading-relaxed mb-8">
                          Discover professional communities tailored to your industry, skills, and professional journey.
                       </p>
                       <button 
                          onClick={() => {
                            setActiveTab('discovery');
                            document.getElementById('discovery-section')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="px-8 py-3 rounded-full bg-white text-primary font-bold text-[14px] hover:bg-slate-50 transition-all shadow-lg active:scale-95">
                          Browse Discovery
                       </button>
                    </div>
                    <Sparkles className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 group-hover:scale-110 transition-transform duration-500" />
                 </div>

                 <div className="p-8 rounded-[32px] border border-border dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:shadow-premium transition-all cursor-pointer group flex flex-col justify-center">
                    <div className="flex gap-4 items-center mb-6">
                       <div className="p-3 bg-primary/5 dark:bg-primary/10 rounded-2xl group-hover:scale-110 transition-transform">
                          <Globe className="w-6 h-6 text-primary" />
                       </div>
                       <div>
                          <h3 className="text-lg font-bold text-foreground dark:text-slate-100">Global Communities</h3>
                          <p className="text-[10px] text-secondary/60 dark:text-slate-500 font-bold uppercase tracking-widest mt-1">Networking beyond borders</p>
                       </div>
                    </div>
                    <p className="text-[14px] text-secondary/80 dark:text-slate-400 font-medium leading-relaxed italic border-l-2 border-primary/20 pl-4 py-1">
                      "Join over 50,000 African professionals in regional and global tech hubs."
                    </p>
                 </div>
              </div>

              <div id="discovery-section" className="flex items-center gap-2 mb-8 border-b border-border dark:border-slate-800 pb-6 pt-2">
                 <button 
                    onClick={() => setActiveTab('all')}
                    className={`px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${activeTab === 'all' ? 'bg-primary text-white shadow-md' : 'bg-muted dark:bg-slate-800 text-secondary dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                 >
                    All Communities
                 </button>
                 <button 
                    onClick={() => setActiveTab('discovery')}
                    className={`px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${activeTab === 'discovery' ? 'bg-primary text-white shadow-md' : 'bg-muted dark:bg-slate-800 text-secondary dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                 >
                    Discovery
                 </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pb-10">
                 {groups.filter(g => activeTab === 'all' ? true : !g.joined).map((group) => (
                    <div key={group.id} className="relative group/card bg-white dark:bg-slate-900 rounded-[24px] overflow-hidden border border-border dark:border-slate-800 hover:shadow-premium hover:border-primary/20 transition-all duration-500 flex flex-col h-full">
                       <div className="h-28 overflow-hidden relative shrink-0">
                          <img src={group.banner} className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-1000 ease-out" alt="" />
                          <div className="absolute inset-0 bg-gradient-to-t from-white/90 dark:from-slate-900/90 via-transparent to-transparent" />
                       </div>
                       
                       <div className="p-6 md:p-8 pt-0 -mt-10 relative flex flex-col flex-1">
                          <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 border border-border dark:border-slate-700 shadow-xl flex items-center justify-center font-bold text-primary text-xl group-hover/card:rotate-6 transition-transform">
                             {group.avatar}
                          </div>
                          <h3 className="text-xl font-bold text-foreground dark:text-slate-100 tracking-tight mt-5 leading-tight group-hover/card:text-primary transition-colors">{group.name}</h3>
                          <p className="text-[10px] text-secondary/60 dark:text-slate-500 font-bold uppercase tracking-widest mt-2">{group.count.toLocaleString()} members</p>
                          <p className="text-[13px] text-secondary/80 dark:text-slate-400 font-medium leading-relaxed mt-4 line-clamp-2 h-10 opacity-90">{group.description}</p>
                          
                          <div className="mt-8 pt-6 border-t border-border/50 dark:border-slate-800/50 flex items-center justify-between mt-auto">
                             <button 
                               onClick={() => handleJoin(group.id)}
                               className={`flex-1 h-10 rounded-full font-bold text-[12px] uppercase tracking-wider transition-all ${group.joined ? 'bg-muted dark:bg-slate-800 text-primary dark:text-primary-light hover:bg-slate-200 dark:hover:bg-slate-700' : 'bg-primary text-white hover:bg-primary/90 shadow-md active:scale-95'}`}
                             >
                                {group.joined ? 'Joined' : 'Join Community'}
                             </button>
                             <button
                               onClick={() => setActiveGroupMenuId(group.id)}
                               aria-label="More options"
                               title="More options"
                               className="p-2.5 rounded-full text-secondary/60 hover:text-foreground dark:hover:text-slate-200 ml-2 transition-colors hover:bg-muted dark:hover:bg-slate-800"
                             >
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

      {/* Create Group Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-[24px] w-full max-w-lg shadow-premium overflow-hidden animate-in zoom-in-95 duration-200 border border-border dark:border-slate-800">
            <div className="px-8 py-6 border-b border-border dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
              <h2 className="text-xl font-bold text-foreground dark:text-white tracking-tight">Create New Group</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
                title="Close modal"
                className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-border dark:border-slate-700 flex items-center justify-center text-secondary hover:text-foreground dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-secondary/60 dark:text-slate-500 mb-2.5">Group Name</label>
                <input 
                  type="text" 
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                  className="w-full h-12 px-4 rounded-xl border border-border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:bg-white dark:focus:bg-slate-950 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-medium text-foreground dark:text-slate-200 outline-none placeholder:text-secondary/40"
                  placeholder="e.g. Next.js Enthusiasts Africa"
                />
              </div>
              
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-secondary/60 dark:text-slate-500 mb-2.5">Description</label>
                <textarea 
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
                  className="w-full h-32 p-4 rounded-xl border border-border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:bg-white dark:focus:bg-slate-950 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-medium text-foreground dark:text-slate-200 outline-none resize-none placeholder:text-secondary/40"
                  placeholder="What is this group about?"
                />
              </div>
            </div>
            
            <div className="px-8 py-6 border-t border-border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 rounded-full text-[13px] font-bold text-secondary dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateGroup}
                disabled={!newGroup.name.trim()}
                className="px-8 py-2.5 rounded-full text-[13px] font-bold text-white bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:hover:bg-primary shadow-premium transition-all active:scale-95"
              >
                Create Community
              </button>
            </div>
          </div>
        </div>
      )}

      {activeGroupMenuId && (
        <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close group options"
            onClick={() => setActiveGroupMenuId(null)}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200"
          />
          <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-[24px] shadow-premium border border-border dark:border-slate-800 py-3 animate-in slide-in-from-bottom-10 duration-300 overflow-hidden">
            <div className="w-12 h-1.5 rounded-full bg-border dark:bg-slate-800 mx-auto mb-4" />
            <div className="px-2">
              <button
                onClick={() => {
                  handleJoin(activeGroupMenuId);
                  setActiveGroupMenuId(null);
                }}
                className="w-full text-left px-6 py-4 text-[16px] font-bold text-foreground dark:text-slate-200 hover:bg-muted dark:hover:bg-slate-800 rounded-xl transition-colors flex items-center gap-3"
              >
                <Users className="w-5 h-5 text-secondary" />
                Join / Leave group
              </button>
              <button onClick={() => setActiveGroupMenuId(null)} className="w-full text-left px-6 py-4 text-[16px] font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors flex items-center gap-3">
                <X className="w-5 h-5 text-red-500" />
                Report group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
