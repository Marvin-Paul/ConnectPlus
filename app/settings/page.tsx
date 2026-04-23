"use client";

import { useState } from "react";
import { ShieldCheck, Bell, User, Eye, Lock, Trash2, ChevronRight, Loader2 } from "lucide-react";
import { useUser } from "@/components/providers/user-provider";
import { ProfileInfoSection } from "@/components/settings/profile-info-section";
import { DisplayModeSection } from "@/components/settings/display-mode-section";
import { LanguageSection } from "@/components/settings/language-section";
import { GitLabConnectionSection } from "@/components/settings/gitlab-connection-section";
import { PrivacyGuardSection } from "@/components/settings/privacy-guard-section";
import { NotificationsSection } from "@/components/settings/notifications-section";

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

  const userName = contextUser ? `${contextUser.firstName} ${contextUser.lastName}` : "Professional User";
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
           <h1 className="text-5xl font-black text-slate-800 dark:text-white tracking-tighter leading-none">
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
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden py-4">
               {sections.map((section) => (
                 <button 
                   key={section.id}
                   onClick={() => setActiveSection(section.id as any)}
                   className={`w-full flex items-center justify-between px-8 py-4 transition-all group ${activeSection === section.id ? 'bg-slate-50 dark:bg-slate-800 text-[#1B5E20] dark:text-green-500' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 hover:text-slate-800 dark:hover:text-slate-200'}`}
                 >
                    <div className="flex items-center gap-4">
                       <section.icon className={`w-5 h-5 ${activeSection === section.id ? 'text-[#1B5E20] dark:text-green-500' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`} />
                       <span className="text-sm font-black uppercase tracking-widest tracking-tighter">{section.label}</span>
                    </div>
                    {activeSection === section.id && <ChevronRight className="w-4 h-4" />}
                 </button>
               ))}
            </div>
            
            <PrivacyGuardSection />
         </aside>

         {/* Content Area */}
         <main className="lg:col-span-8 space-y-12 pb-32">
            
            {activeSection === "account" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                 <h2 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] border-b border-slate-100 dark:border-slate-800 pb-3">Personal account preferences</h2>
                 
                 <div className="space-y-4">
                    <ProfileInfoSection />
                    <DisplayModeSection />
                    <LanguageSection />
                    <GitLabConnectionSection />
                 </div>
              </div>
            )}

            {activeSection === "privacy" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                 <h2 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] border-b border-slate-100 dark:border-slate-800 pb-3">How others see your activity</h2>
                 
                 <div className="space-y-4">
                    <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-500 group flex items-center justify-between">
                       <div className="space-y-1">
                          <h4 className="text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight group-hover:text-[#1B5E20] dark:group-hover:text-green-500 transition-colors">Profile Viewing Options</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium italic opacity-80">Choose whether you appear as "Anonymous" or yourself when viewing profiles.</p>
                       </div>
                       <select 
                         title="Profile Viewing Options"
                         className="h-10 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[10px] font-black uppercase tracking-widest outline-none transition-all dark:text-slate-200"
                       >
                          <option>Full Identity</option>
                          <option>Professional Characteristics</option>
                          <option>Private Mode</option>
                       </select>
                    </div>

                    <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-500 group flex items-center justify-between">
                       <div className="space-y-1">
                          <h4 className="text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight group-hover:text-[#1B5E20] dark:group-hover:text-green-500 transition-colors">Who can see your email?</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium italic opacity-80">Control visibility of your primary contact email.</p>
                       </div>
                       <select 
                         title="Email Visibility Options"
                         className="h-10 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[10px] font-black uppercase tracking-widest outline-none transition-all dark:text-slate-200"
                       >
                          <option>Connections Only</option>
                          <option>Everyone</option>
                          <option>Only Me</option>
                       </select>
                    </div>

                    <div className="p-8 bg-red-50/30 dark:bg-red-950/10 rounded-[2.5rem] border border-red-50 dark:border-red-900/30 hover:shadow-2xl transition-all duration-500 group flex items-center justify-between">
                       <div className="space-y-1">
                          <h4 className="text-lg font-black text-red-800 dark:text-red-400 tracking-tight">Close Account</h4>
                          <p className="text-xs text-red-600/60 dark:text-red-500/60 font-medium italic">Permanently remove all your data from Connect+.</p>
                       </div>
                       <button className="flex items-center gap-2 px-6 py-2 rounded-full bg-red-500 text-white font-black text-[10px] uppercase tracking-widest hover:bg-red-600 transition-colors shadow-red-100 dark:shadow-none shadow-xl">
                          <Trash2 className="w-3.5 h-3.5" /> Deactivate
                       </button>
                    </div>
                 </div>
              </div>
            )}

            {activeSection === "notifications" && (
               <NotificationsSection />
            )}

         </main>
      </div>
    </div>
  );
}
