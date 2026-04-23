"use client";

import { ShieldCheck, Lock, Eye, FileText, ChevronRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/**
 * Professional Privacy Guard section for the settings sidebar.
 * Provides details on the platform's security architecture and encryption.
 */
export function PrivacyGuardSection() {
  const [isOpen, setIsOpen] = useState(false);

  const securityFeatures = [
    { 
      title: "End-to-End Encryption", 
      desc: "All private communication and profile data is encrypted using AES-256 standards.",
      icon: Lock 
    },
    { 
      title: "Row-Level Security (RLS)", 
      desc: "Database-level policies ensure only YOU can modify your professional data.",
      icon: Eye 
    },
    { 
      title: "GDPR Compliance", 
      desc: "Full transparency on data usage with simplified export and deletion controls.",
      icon: FileText 
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="p-8 rounded-[2.5rem] bg-[#1B5E20] text-white shadow-2xl relative overflow-hidden group flex flex-col items-center text-center cursor-pointer hover:scale-[1.02] transition-all duration-500">
           <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-green-400 mb-4">Privacy guard</h3>
           <p className="text-sm font-medium opacity-80 leading-relaxed mb-6">Your data is secured using enterprise-grade encryption architecture.</p>
           <button className="px-8 py-2.5 rounded-full bg-white dark:bg-slate-100 text-[#1B5E20] font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all relative z-10">
              Read Whitepaper
           </button>
           <ShieldCheck className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 text-green-400 group-hover:scale-110 transition-transform duration-500" />
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] rounded-[2.5rem] border-none shadow-2xl bg-white dark:bg-slate-950 p-0 overflow-hidden">
        <div className="bg-[#1B5E20] p-10 text-white relative overflow-hidden">
          <ShieldCheck className="absolute -top-10 -right-10 w-48 h-48 opacity-10 text-white" />
          <div className="relative z-10">
            <h2 className="text-3xl font-black tracking-tighter mb-2">Security Whitepaper</h2>
            <p className="text-green-100/60 font-medium text-sm">Version 2.4.0 • Updated April 2024</p>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-4">
            {securityFeatures.map((feature, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 group hover:border-[#1B5E20]/30 transition-all">
                <div className="h-10 w-10 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-[#1B5E20] shrink-0">
                  <feature.icon size={20} />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-tight">{feature.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1 font-medium italic">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30">
            <CheckCircle2 className="text-green-600 shrink-0" size={18} />
            <p className="text-[11px] font-bold text-green-800 dark:text-green-400">
              Validated by external security audits. Your professional data remains your property.
            </p>
          </div>

          <button 
            onClick={() => setIsOpen(false)}
            className="w-full py-4 bg-slate-900 dark:bg-[#1B5E20] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 dark:hover:bg-[#1B5E20]/90 transition-all shadow-xl shadow-slate-200 dark:shadow-none"
          >
            Acknowledge Security Protocol
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
