"use client";

import { useState, useEffect } from "react";
import { Bell, Mail, Smartphone, CheckCircle2, Loader2, Save } from "lucide-react";

interface NotificationSetting {
  id: string;
  label: string;
  email: boolean;
  push: boolean;
}

/**
 * Professional Notifications settings section.
 * Manages communication alerts across email and push channels with real-time feedback.
 */
export function NotificationsSection() {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    { id: "invites", label: "Network Invites", email: true, push: true },
    { id: "jobs", label: "Job Recommendations", email: true, push: false },
    { id: "messages", label: "Direct Messages", email: true, push: true },
    { id: "updates", label: "Platform Updates", email: false, push: true },
    { id: "events", label: "Event RSVPs", email: true, push: false },
  ]);

  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const toggleSetting = (id: string, type: "email" | "push") => {
    setSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [type]: !s[type] } : s))
    );
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setHasChanges(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">
          Communication alerts
        </h2>
        {hasChanges && (
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-1.5 bg-[#1B5E20] text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-green-100 dark:shadow-none"
          >
            {isSaving ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <Save size={12} />
            )}
            Save Changes
          </button>
        )}
      </div>

      <div className="space-y-4">
        {settings.map((item) => (
          <div
            key={item.id}
            className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-500 group flex items-center justify-between"
          >
            <div className="flex items-center gap-5">
              <div className="h-14 w-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-[#1B5E20]/5 group-hover:text-[#1B5E20] transition-all duration-500">
                <Bell size={24} />
              </div>
              <h4 className="text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight group-hover:text-[#1B5E20] dark:group-hover:text-green-500 transition-colors">
                {item.label}
              </h4>
            </div>

            <div className="flex items-center gap-12">
              {/* Email Toggle */}
              <button
                onClick={() => toggleSetting(item.id, "email")}
                className="flex items-center gap-3 group/toggle"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  item.email 
                    ? "bg-[#1B5E20] text-white shadow-lg shadow-green-100 dark:shadow-none" 
                    : "bg-slate-50 dark:bg-slate-800 text-slate-400 border border-slate-100 dark:border-slate-700"
                }`}>
                  <Mail size={18} />
                </div>
                <div className="hidden md:block text-left">
                  <p className={`text-[10px] font-black uppercase tracking-widest ${item.email ? "text-[#1B5E20] dark:text-green-500" : "text-slate-400"}`}>
                    Email
                  </p>
                  <p className="text-[9px] font-medium text-slate-400 italic">
                    {item.email ? "Enabled" : "Disabled"}
                  </p>
                </div>
              </button>

              {/* Push Toggle */}
              <button
                onClick={() => toggleSetting(item.id, "push")}
                className="flex items-center gap-3 group/toggle"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  item.push 
                    ? "bg-[#1B5E20] text-white shadow-lg shadow-green-100 dark:shadow-none" 
                    : "bg-slate-50 dark:bg-slate-800 text-slate-400 border border-slate-100 dark:border-slate-700"
                }`}>
                  <Smartphone size={18} />
                </div>
                <div className="hidden md:block text-left">
                  <p className={`text-[10px] font-black uppercase tracking-widest ${item.push ? "text-[#1B5E20] dark:text-green-500" : "text-slate-400"}`}>
                    Push
                  </p>
                  <p className="text-[9px] font-medium text-slate-400 italic">
                    {item.push ? "Enabled" : "Disabled"}
                  </p>
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl flex items-center justify-between border border-slate-800">
        <div className="space-y-1">
          <h4 className="text-sm font-black uppercase tracking-widest">Global Do Not Disturb</h4>
          <p className="text-xs text-slate-400 font-medium italic">Pause all notifications for a set period.</p>
        </div>
        <button className="px-6 py-2 rounded-full border border-slate-700 text-[10px] font-black uppercase tracking-widest hover:bg-white dark:hover:bg-slate-100 hover:text-slate-900 transition-all">
          Configure
        </button>
      </div>
    </div>
  );
}
