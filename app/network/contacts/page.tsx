"use client";

import { useState } from "react";
import { NetworkSidebar } from "../network-sidebar";
import { UserPlus, Search, Phone, Mail, Share2, Plus, Users, Sparkles } from "lucide-react";

export default function ContactsPage() {
  const [syncedContacts, setSyncedContacts] = useState([
    { id: "s1", name: "David Walusimbi", value: "+256 701 234 567", category: "Phone", avatar: "DW", isOnPlatform: true },
    { id: "s2", name: "Fatuma Ali", value: "fatuma.ali@gmail.com", category: "Email", avatar: "FA", isOnPlatform: false },
    { id: "s3", name: "Lillian Nsereko", value: "+256 772 987 654", category: "Phone", avatar: "LN", isOnPlatform: true }
  ]);

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
                    <UserPlus className="w-8 h-8 text-[#1B5E20]" /> Contacts ({syncedContacts.length})
                 </h1>
                 <p className="text-sm text-[#666666] mt-1 font-medium">Sync and invite professionals from your address book.</p>
              </div>
              <button 
                className="flex items-center gap-3 px-8 py-3 rounded-full bg-[#1B5E20] text-white font-black text-xs hover:bg-[#154d1a] transition-all shadow-green-100 shadow-xl tracking-widest"
              >
                 <Plus className="w-4 h-4" /> Sync more contacts
              </button>
           </div>

           <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                 <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-2xl relative overflow-hidden group">
                    <h3 className="text-sm font-black uppercase tracking-widest opacity-80 mb-4">Network Accelerator</h3>
                    <p className="text-xs font-bold leading-relaxed opacity-60 max-w-[200px]">Unlock more connections by syncing your professional contacts securely.</p>
                    <div className="mt-8 flex items-center gap-3">
                       <button className="px-6 py-2 rounded-full bg-blue-500 text-white font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-colors shadow-blue-900/40 shadow-xl">
                          <Share2 className="w-3.5 h-3.5" /> Invite all
                       </button>
                    </div>
                    <Sparkles className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 text-blue-400 group-hover:scale-110 transition-transform duration-500" />
                 </div>

                 <div className="p-8 rounded-3xl border border-slate-100 bg-[#f9fafb] flex flex-col justify-center gap-4">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                       <Users className="w-4 h-4 text-[#1B5E20]" /> community growth
                    </h3>
                    <p className="text-[13px] text-[#666666] leading-relaxed font-medium">
                       Professional networks grow stronger when they are trusted. Invite your real-world colleagues to build a better community together.
                    </p>
                 </div>
              </div>

              <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2">Address book members</h2>
              <div className="space-y-4">
                 {syncedContacts.map((contact) => (
                   <div key={contact.id} className="p-6 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors group">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                         <div className="flex gap-4 items-center">
                            <div className="w-12 h-12 rounded-full bg-[#edf3f8] flex items-center justify-center font-black text-[#0a66c2] text-sm shadow-sm group-hover:scale-105 transition-transform duration-300">
                               {contact.avatar}
                            </div>
                            <div>
                               <h4 className="text-base font-bold text-slate-800">{contact.name}</h4>
                               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 flex items-center gap-2 opacity-80">
                                 {contact.category === "Phone" ? <Phone className="w-3 h-3" /> : <Mail className="w-3 h-3" />} {contact.value}
                               </p>
                            </div>
                         </div>
                         <div className="flex items-center gap-3">
                            {contact.isOnPlatform ? (
                              <button className="px-6 py-2 rounded-full bg-slate-100 text-[#666666] font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-colors">
                                 On Connect+
                              </button>
                            ) : (
                              <button className="px-10 py-2 rounded-full bg-white border border-[#1B5E20] text-[#1B5E20] font-black text-[10px] uppercase tracking-widest hover:bg-[#1B5E20]/5 transition-colors shadow-sm">
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
