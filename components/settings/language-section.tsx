"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Globe, ChevronRight, Check } from "lucide-react";
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
 * Professional Language settings section.
 * Supports English, French, Swahili, and Arabic with RTL integration.
 */
export function LanguageSection() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { id: "en", label: "English", sub: "Professional standard", flag: "🇺🇸" },
    { id: "fr", label: "Français", sub: "Francophonie africaine", flag: "🇫🇷" },
    { id: "sw", label: "Kiswahili", sub: "Umoja wa Afrika Mashariki", flag: "🇰🇪" },
    { id: "ar", label: "العربية", sub: "شمال أفريقيا والشرق الأوسط", flag: "🇸🇦" },
  ];

  const currentLang = languages.find((l) => l.id === language) || languages[0];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-500 group cursor-pointer flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="h-14 w-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
              <Globe size={28} />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-black text-slate-800 dark:text-white tracking-tight group-hover:text-primary transition-colors">
                {t("language")}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium italic opacity-80">
                {t("language_desc")} • {currentLang.label}
              </p>
            </div>
          </div>
          <button 
            aria-label="Change language"
            className="p-2.5 rounded-full border border-slate-100 dark:border-slate-800 text-slate-400 group-hover:text-primary group-hover:bg-primary/5 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px] rounded-[2.5rem] border-none shadow-2xl dark:bg-slate-950">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {t("select_lang")}
          </DialogTitle>
          <DialogDescription className="text-slate-500 dark:text-slate-400 font-medium">
            Choose the language that best fits your professional workflow.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          {languages.map((l) => (
            <button
              key={l.id}
              onClick={() => {
                setLanguage(l.id as any);
                setIsOpen(false);
              }}
              className={`w-full p-5 rounded-2xl border-2 transition-all flex items-center justify-between group ${
                language === l.id
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-slate-50 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-2xl transition-colors ${
                  language === l.id ? "bg-primary" : "bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700"
                }`}>
                  {l.flag}
                </div>
                <div className="text-left">
                  <p className="font-black text-sm uppercase tracking-wider">{l.label}</p>
                  <p className="text-[10px] font-medium opacity-60 leading-tight">{l.sub}</p>
                </div>
              </div>
              {language === l.id && (
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
