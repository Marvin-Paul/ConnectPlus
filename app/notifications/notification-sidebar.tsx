"use client";

import { Settings, ChevronRight } from "lucide-react";

interface NotificationSidebarProps {
  activeFilter: string;
  onFilterChange: (label: string) => void;
}

export function NotificationSidebar({ activeFilter, onFilterChange }: NotificationSidebarProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        {/* MANAGE (Pill Style Buttons) */}
        <div>
           <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-4 px-2 italic opacity-80">Intelligence Filters</h3>
           <div className="flex flex-wrap gap-3">
              {[
                { label: "All", count: 17 },
                { label: "Jobs", count: 5 },
                { label: "My posts", count: 2 },
                { label: "Mentions", count: 1 }
              ].map((item) => (
                <button 
                  key={item.label}
                  onClick={() => onFilterChange(item.label)}
                  className={`px-5 py-2 rounded-full text-[12px] font-black uppercase tracking-widest transition-all duration-300 border ${
                    activeFilter === item.label 
                    ? 'bg-[#01754f] dark:bg-emerald-600 text-white border-[#01754f] dark:border-emerald-600 shadow-lg shadow-emerald-500/20 scale-105' 
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-[#01754f] dark:hover:border-emerald-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                   {item.label}
                </button>
              ))}
           </div>
        </div>

        {/* SETTINGS (Slim Profile Style) */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900/50 rounded-2xl px-4 py-4 transition-all duration-500">
           <div className="flex items-center gap-4">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:rotate-12 transition-transform">
                <Settings className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-[#01754f] dark:group-hover:text-emerald-400 transition-colors" />
              </div>
              <span className="text-[12px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-[0.1em]">Intelligence Settings</span>
           </div>
           <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}
