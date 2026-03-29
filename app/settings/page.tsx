"use client";

import { useState } from "react";
import { Settings, ShieldCheck, Bell, User, Eye, Globe, Lock, Trash2, CheckCircle2, MoreHorizontal, Sparkles, ChevronRight, Loader2 } from "lucide-react";
import { useUser } from "@/components/providers/user-provider";

export default function SettingsPage() {
  const { user: contextUser, loading } = useUser();
  const [activeSection, setActiveSection] = useState<"account" | "privacy" | "notifications" | "security">("account");

  if (loading) {
     return (
       <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-[#1B5E20] animate-spin" />
       </div>
     );
  }

  const userName = contextUser ? `${contextUser.firstName} ${contextUser.lastName}` : "Marvin Muwereza";
  const userAvatar = contextUser?.avatarUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80";

  const sections = [
    { id: "account", label: "Account preferences", icon: User },
    { id: "privacy", label: "Privacy data", icon: Eye },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="space-y-4">
           <div className="flex items-center gap-2 px-3 py-1 bg-[#1B5E20]/5 text-[#1B5E20] w-fit rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-[#1B5E20]/10">
              <ShieldCheck className="w-3 h-3" /> account security & privacy
           </div>
           <h1 className="text-5xl font-black text-slate-800 tracking-tighter leading-none">
              Control your <span className="text-[#1B5E20]">Universe</span>
           </h1>
           <p className="text-lg text-slate-500 font-medium max-w-xl italic">
              Manage how you appear, who sees your activity, and the security of your professional data.
           </p>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl group transition-all cursor-pointer">
           <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-800 group-hover:scale-110 transition-transform">
              <img src={userAvatar} className="w-full h-full object-cover" alt="" />
           </div>
           <div>
              <h4 className="text-[12px] font-black text-white uppercase tracking-widest leading-none">{userName}</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 opacity-60">Verified Admin</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         {/* Navigation Sidebar */}
         <aside className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden py-4">
               {sections.map((section) => (
                 <button 
                   key={section.id}
                   onClick={() => setActiveSection(section.id as any)}
                   className={`w-full flex items-center justify-between px-8 py-4 transition-all group ${activeSection === section.id ? 'bg-slate-50 text-[#1B5E20]' : 'text-slate-500 hover:bg-slate-50/50 hover:text-slate-800'}`}
                 >
                    <div className="flex items-center gap-4">
                       <section.icon className={`w-5 h-5 ${activeSection === section.id ? 'text-[#1B5E20]' : 'text-slate-400 group-hover:text-slate-600'}`} />
                       <span className="text-sm font-black uppercase tracking-widest tracking-tighter">{section.label}</span>
                    </div>
                    {activeSection === section.id && <ChevronRight className="w-4 h-4" />}
                 </button>
               ))}
            </div>
            
            <div className="p-8 rounded-[2.5rem] bg-[#1B5E20] text-white shadow-2xl relative overflow-hidden group flex flex-col items-center text-center">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-green-400 mb-4">Privacy guard</h3>
               <p className="text-sm font-medium opacity-80 leading-relaxed mb-6">Your data is secured using enterprise-grade encryption architecture.</p>
               <button className="px-8 py-2.5 rounded-full bg-white text-[#1B5E20] font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all">
                  Read Whitepaper
               </button>
               <ShieldCheck className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 text-green-400 group-hover:scale-110 transition-transform duration-500" />
            </div>
         </aside>

         {/* Content Area */}
         <main className="lg:col-span-8 space-y-12 pb-32">
            
            {activeSection === "account" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                 <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-3">Personal account preferences</h2>
                 
                 <div className="space-y-4">
                    {[
                      { label: "Profile Information", desc: "Name, Headline, and Location settings" },
                      { label: "Display Mode", desc: "Choose between Light, Dark, or System Sync" },
                      { label: "Language", desc: "Set your preferred platform language" },
                      { label: "Autoplay Videos", desc: "Choose if media should play automatically in your feed" }
                    ].map(item => (
                      <div key={item.label} className="p-8 bg-white rounded-[2.5rem] border border-slate-100 hover:shadow-2xl transition-all duration-500 group cursor-pointer flex items-center justify-between">
                         <div className="space-y-1">
                            <h4 className="text-lg font-black text-slate-800 tracking-tight group-hover:text-[#1B5E20] transition-colors">{item.label}</h4>
                            <p className="text-xs text-slate-500 font-medium italic opacity-80">{item.desc}</p>
                         </div>
                         <button className="p-2.5 rounded-full border border-slate-100 text-slate-400 group-hover:text-[#1B5E20] group-hover:bg-[#1B5E20]/5 transition-all">
                            <ChevronRight className="w-5 h-5" />
                         </button>
                      </div>
                    ))}
                 </div>
              </div>
            )}

            {activeSection === "privacy" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                 <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-3">How others see your activity</h2>
                 
                 <div className="space-y-4">
                    <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 hover:shadow-2xl transition-all duration-500 group flex items-center justify-between">
                       <div className="space-y-1">
                          <h4 className="text-lg font-black text-slate-800 tracking-tight group-hover:text-[#1B5E20] transition-colors">Profile Viewing Options</h4>
                          <p className="text-xs text-slate-500 font-medium italic opacity-80">Choose whether you appear as "Anonymous" or yourself when viewing profiles.</p>
                       </div>
                       <select className="h-10 px-4 rounded-xl border border-slate-200 bg-slate-50 text-[10px] font-black uppercase tracking-widest outline-none transition-all">
                          <option>Full Identity</option>
                          <option>Professional Characteristics</option>
                          <option>Private Mode</option>
                       </select>
                    </div>

                    <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 hover:shadow-2xl transition-all duration-500 group flex items-center justify-between">
                       <div className="space-y-1">
                          <h4 className="text-lg font-black text-slate-800 tracking-tight group-hover:text-[#1B5E20] transition-colors">Who can see your email?</h4>
                          <p className="text-xs text-slate-500 font-medium italic opacity-80">Control visibility of your primary contact email.</p>
                       </div>
                       <select className="h-10 px-4 rounded-xl border border-slate-200 bg-slate-50 text-[10px] font-black uppercase tracking-widest outline-none transition-all">
                          <option>Connections Only</option>
                          <option>Everyone</option>
                          <option>Only Me</option>
                       </select>
                    </div>

                    <div className="p-8 bg-red-50/30 rounded-[2.5rem] border border-red-50 hover:shadow-2xl transition-all duration-500 group flex items-center justify-between">
                       <div className="space-y-1">
                          <h4 className="text-lg font-black text-red-800 tracking-tight">Close Account</h4>
                          <p className="text-xs text-red-600/60 font-medium italic">Permanently remove all your data from Connect+.</p>
                       </div>
                       <button className="flex items-center gap-2 px-6 py-2 rounded-full bg-red-500 text-white font-black text-[10px] uppercase tracking-widest hover:bg-red-600 transition-colors shadow-red-100 shadow-xl">
                          <Trash2 className="w-3.5 h-3.5" /> Deactivate
                       </button>
                    </div>
                 </div>
              </div>
            )}

            {activeSection === "notifications" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                 <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-3">Communication alerts</h2>
                 <div className="space-y-4">
                    {['Network Invites', 'Job Recommendations', 'Direct Messages', 'Platform Updates', 'Event RSVPs'].map(item => (
                      <div key={item} className="p-8 bg-white rounded-[2.5rem] border border-slate-100 hover:shadow-2xl transition-all duration-500 group flex items-center justify-between">
                         <h4 className="text-lg font-black text-slate-800 tracking-tight group-hover:text-[#1B5E20] transition-colors">{item}</h4>
                         <div className="flex items-center gap-8">
                            <label className="flex items-center gap-3 cursor-pointer">
                               <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-[#1B5E20] focus:ring-[#1B5E20]" />
                               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                               <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-[#1B5E20] focus:ring-[#1B5E20]" />
                               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Push</span>
                            </label>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            )}

         </main>
      </div>
    </div>
  );
}
