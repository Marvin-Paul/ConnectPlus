"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Monitor, ChevronRight, Check } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/**
 * Professional Display Mode settings section.
 * Supports Light, Dark, and System modes with instant feedback.
 */
export function DisplayModeSection() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 flex items-center justify-between opacity-50">
        <div className="space-y-1">
          <h4 className="text-lg font-black text-slate-800">Display Mode</h4>
          <p className="text-xs text-slate-500">Loading theme settings...</p>
        </div>
      </div>
    );
  }

  const themes = [
    { id: "light", label: "Light Mode", icon: Sun, desc: "Classic high-contrast professional look." },
    { id: "dark", label: "Dark Mode", icon: Moon, desc: "Eye-friendly interface for long sessions." },
    { id: "system", label: "System Sync", icon: Monitor, desc: "Automatically match your device settings." },
  ];

  const currentTheme = themes.find((t) => t.id === theme) || themes[2];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-500 group cursor-pointer flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="h-14 w-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
              <currentTheme.icon size={28} />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-black text-slate-800 dark:text-white tracking-tight group-hover:text-primary transition-colors">
                Display Mode
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium italic opacity-80">
                Current: {currentTheme.label}
              </p>
            </div>
          </div>
          <button 
            aria-label="Change display mode"
            className="p-2.5 rounded-full border border-slate-100 dark:border-slate-800 text-slate-400 group-hover:text-primary group-hover:bg-primary/5 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px] rounded-[2.5rem] border-none shadow-2xl dark:bg-slate-950">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Appearance Settings
          </DialogTitle>
          <DialogDescription className="text-slate-500 dark:text-slate-400 font-medium">
            Personalize your Connect+ experience with the perfect visual balance.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTheme(t.id);
                setIsOpen(false);
              }}
              className={`w-full p-5 rounded-2xl border-2 transition-all flex items-center justify-between group ${
                theme === t.id
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-slate-50 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl transition-colors ${
                  theme === t.id ? "bg-primary text-white" : "bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700"
                }`}>
                  <t.icon size={20} />
                </div>
                <div className="text-left">
                  <p className="font-black text-sm uppercase tracking-wider">{t.label}</p>
                  <p className="text-[10px] font-medium opacity-60 leading-tight">{t.desc}</p>
                </div>
              </div>
              {theme === t.id && (
                <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white">
                  <Check size={14} strokeWidth={3} />
                </div>
              )}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
