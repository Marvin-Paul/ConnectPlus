"use client";

import { Settings, ChevronRight } from "lucide-react";

interface NotificationSidebarProps {
  activeFilter: string;
  onFilterChange: (label: string) => void;
}

export function NotificationSidebar({ activeFilter, onFilterChange }: NotificationSidebarProps) {
  return (
    <div className="space-y-6">
      <div className="animate-in slide-in-from-left-4 duration-500 space-y-4">
        {/* MANAGE (Pill Style Buttons) */}
        <div>
           <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">Manage</h3>
           <div className="flex flex-wrap gap-2">
              {[
                { label: "All", count: 17 },
                { label: "Jobs", count: 5 },
                { label: "My posts", count: 2 },
                { label: "Mentions", count: 1 }
              ].map((item) => (
                <button 
                  key={item.label}
                  onClick={() => onFilterChange(item.label)}
                  className={`px-4 py-1.5 rounded-full text-[14px] font-bold transition-all border ${
                    activeFilter === item.label 
                    ? 'bg-[#01754f] text-white border-[#01754f]' 
                    : 'bg-white text-slate-600 border-slate-300 hover:border-slate-500 hover:bg-slate-50'
                  }`}
                >
                   {item.label}
                </button>
              ))}
           </div>
        </div>

        {/* SETTINGS (Slim Profile Style) */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-slate-50 rounded-xl px-2 py-3 transition-all">
           <div className="flex items-center gap-3">
              <Settings className="w-4 h-4 text-slate-400 group-hover:rotate-90 transition-transform duration-500" />
              <span className="text-[12px] font-bold text-slate-700 uppercase tracking-tight">Notification Settings</span>
           </div>
           <ChevronRight className="w-4 h-4 text-slate-300" />
        </div>
      </div>
    </div>
  );
}
