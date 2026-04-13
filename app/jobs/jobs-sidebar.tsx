"use client";

import { 
  Bookmark, 
  Bell, 
  Wallet, 
  ClipboardCheck, 
  MessageSquareReply, 
  FileText, 
  Settings,
  ChevronRight,
  Filter,
  Check,
  Zap
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const sidebarLinks = [
  { label: "My jobs", icon: Bookmark, href: "/jobs/my-jobs" },
  { label: "Job alerts", icon: Bell, href: "/jobs/alerts" },
  { label: "Salary", icon: Wallet, href: "/jobs/salary" },
  { label: "Skill Assessments", icon: ClipboardCheck, href: "/jobs/assessments" },
  { label: "Interview prep", icon: MessageSquareReply, href: "/jobs/interview-prep" },
  { label: "Resume Builder", icon: FileText, href: "/jobs/resume-builder" },
];

const experienceLevels = [
  { label: "Entry (0-2y)", id: "entry" },
  { label: "Mid (3-5y)", id: "mid" },
  { label: "Senior (6-10y)", id: "senior" },
  { label: "Director (10y+)", id: "director" }
];

export function JobsSidebar() {
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  const toggleLevel = (id: string) => {
    setSelectedLevels(prev => 
      prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-1000">
      {/* Primary Navigation Card */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-2xl shadow-slate-200/40 transition-all duration-500 hover:shadow-green-900/5">
        <nav className="py-6">
          {sidebarLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center justify-between px-8 py-4 text-[13px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all group"
            >
              <div className="flex items-center gap-4">
                <link.icon className="h-5 w-5 text-slate-300 group-hover:text-[#1B5E20] group-hover:scale-110 transition-all stroke-[2px]" />
                <span className="group-hover:text-slate-800 transition-colors">{link.label}</span>
              </div>
              <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </nav>
        
        <div className="p-8 bg-slate-50/50 border-t border-slate-50">
           <Link 
             href="/jobs/post"
             className="w-full flex items-center justify-center gap-3 py-4 rounded-full bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 active:scale-95"
           >
             <Zap className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
             Post a position
           </Link>
        </div>
      </div>

      {/* PRECISION FILTERS SECTION */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-2xl shadow-slate-200/40 p-10 space-y-10">
         <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-[#1B5E20]" />
            <h2 className="text-[14px] font-black text-slate-800 uppercase tracking-[0.3em]">Precision Filters</h2>
         </div>

         <div className="space-y-6">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4">Experience Level</h3>
            <div className="space-y-4">
               {experienceLevels.map((level) => (
                 <button 
                   key={level.id}
                   onClick={() => toggleLevel(level.id)}
                   className="w-full flex items-center gap-4 group transition-all text-left outline-none"
                 >
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${selectedLevels.includes(level.id) ? 'bg-[#1B5E20] border-[#1B5E20] shadow-lg shadow-green-100' : 'bg-white border-slate-100 group-hover:border-[#1B5E20]/30'}`}>
                       {selectedLevels.includes(level.id) && <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />}
                    </div>
                    <span className={`text-[15px] font-black tracking-tight transition-colors ${selectedLevels.includes(level.id) ? 'text-slate-800' : 'text-slate-500 group-hover:text-slate-700'}`}>
                       {level.label}
                    </span>
                 </button>
               ))}
            </div>
         </div>

         <div className="pt-8 border-t border-slate-50">
            <button className="w-full text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 hover:text-[#1B5E20] transition-colors">
               Clear all parameters
            </button>
         </div>
      </div>
    </div>
  );
}
