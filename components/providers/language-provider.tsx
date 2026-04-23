"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "fr" | "sw" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    language: "Language",
    language_desc: "Set your preferred platform language",
    save: "Save Changes",
    cancel: "Cancel",
    select_lang: "Select Language",
    en: "English",
    fr: "French",
    sw: "Swahili",
    ar: "Arabic",
  },
  fr: {
    language: "Langue",
    language_desc: "Définissez votre langue préférée",
    save: "Enregistrer",
    cancel: "Annuler",
    select_lang: "Choisir la langue",
    en: "Anglais",
    fr: "Français",
    sw: "Swahili",
    ar: "Arabe",
  },
  sw: {
    language: "Lugha",
    language_desc: "Weka lugha unayopendelea",
    save: "Hifadhi",
    cancel: "Ghairi",
    select_lang: "Chagua Lugha",
    en: "Kiingereza",
    fr: "Kifaransa",
    sw: "Kiswahili",
    ar: "Kiarabu",
  },
  ar: {
    language: "اللغة",
    language_desc: "اختر لغتك المفضلة للمنصة",
    save: "حفظ التغييرات",
    cancel: "إلغاء",
    select_lang: "اختر اللغة",
    en: "الإنجليزية",
    fr: "الفرنسية",
    sw: "السواحيلية",
    ar: "العربية",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("connect-plus-lang") as Language;
    if (saved && translations[saved]) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("connect-plus-lang", lang);
    // Force a small delay to simulate a professional configuration sync
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
