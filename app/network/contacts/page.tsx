"use client";

import { useState } from "react";
import { NetworkSidebar } from "../network-sidebar";
import { UserPlus, Search, Phone, Mail, Share2, Plus, Users, Sparkles } from "lucide-react";

export default function ContactsPage() {
  const [syncedContacts] = useState([
    { id: "s1", name: "David Walusimbi", value: "+256 701 234 567", category: "Phone", avatar: "DW", isOnPlatform: true },
    { id: "s2", name: "Fatuma Ali", value: "fatuma.ali@gmail.com", category: "Email", avatar: "FA", isOnPlatform: false },
    { id: "s3", name: "Lillian Nsereko", value: "+256 772 987 654", category: "Phone", avatar: "LN", isOnPlatform: true }
  ]);

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
                    <UserPlus className="w-8 h-8 text-primary" /> Contacts ({syncedContacts.length})
                 </h1>
                 <p className="text-[14px] text-secondary/70 dark:text-slate-400 mt-1.5 font-medium">Sync and invite professionals from your address book.</p>
              </div>
              <button 
                className="flex items-center justify-center gap-3 px-8 py-3 rounded-full bg-primary text-white font-bold text-[14px] hover:bg-primary/90 transition-all shadow-premium active:scale-95"
              >
                 <Plus className="w-4 h-4" /> Sync more contacts
              </button>
           </div>

           <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
                 <div className="p-8 md:p-10 rounded-[32px] bg-slate-900 dark:bg-slate-950 text-white shadow-xl relative overflow-hidden group">
                    <div className="relative z-10">
                       <h3 className="text-[11px] font-bold uppercase tracking-widest text-primary-light mb-4">Network Accelerator</h3>
                       <p className="text-[15px] font-medium leading-relaxed text-white/80 max-w-[240px]">Unlock more connections by syncing your professional contacts securely.</p>
                       <div className="mt-8 flex items-center gap-3">
                          <button className="px-8 py-2.5 rounded-full bg-primary text-white font-bold text-[12px] uppercase tracking-wider hover:bg-primary/90 transition-all shadow-lg active:scale-95 flex items-center gap-2">
                             <Share2 className="w-4 h-4" /> Invite all
                          </button>
                       </div>
                    </div>
                    <Sparkles className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 text-primary group-hover:scale-110 transition-transform duration-500" />
                 </div>

                 <div className="p-8 rounded-[32px] border border-border dark:border-slate-800 bg-muted/30 dark:bg-slate-800/30 flex flex-col justify-center gap-4">
                    <h3 className="text-[11px] font-bold text-foreground dark:text-slate-200 uppercase tracking-widest flex items-center gap-2">
                       <Users className="w-4 h-4 text-primary" /> community growth
                    </h3>
                    <p className="text-[14px] text-secondary/80 dark:text-slate-400 leading-relaxed font-medium">
                       Professional networks grow stronger when they are trusted. Invite your real-world colleagues to build a better community together.
                    </p>
                 </div>
              </div>

              <h2 className="text-[11px] font-bold text-secondary/60 dark:text-slate-500 uppercase tracking-widest mb-6 border-b border-border dark:border-slate-800 pb-4">Address book members</h2>
              <div className="space-y-4">
                 {syncedContacts.map((contact) => (
                   <div key={contact.id} className="p-5 md:p-6 rounded-[20px] border border-border dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-300 group">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                         <div className="flex gap-4 items-center">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center font-bold text-primary text-[15px] shadow-sm group-hover:scale-105 transition-transform duration-300">
                               {contact.avatar}
                            </div>
                            <div>
                               <h4 className="text-[16px] font-bold text-foreground dark:text-slate-100">{contact.name}</h4>
                               <p className="text-[12px] text-secondary/70 dark:text-slate-400 font-medium mt-1 flex items-center gap-2">
                                 {contact.category === "Phone" ? <Phone className="w-3.5 h-3.5" /> : <Mail className="w-3.5 h-3.5" />} {contact.value}
                               </p>
                            </div>
                         </div>
                         <div className="flex items-center gap-3">
                            {contact.isOnPlatform ? (
                              <button className="px-6 py-2 rounded-full bg-muted dark:bg-slate-800 text-secondary dark:text-slate-400 font-bold text-[11px] uppercase tracking-wider hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                 On Connect+
                              </button>
                            ) : (
                              <button className="px-8 py-2 rounded-full bg-white dark:bg-slate-900 border border-primary text-primary font-bold text-[11px] uppercase tracking-wider hover:bg-primary hover:text-white transition-all shadow-sm active:scale-95">
                                 Invite
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
