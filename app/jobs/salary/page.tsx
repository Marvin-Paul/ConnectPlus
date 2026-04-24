"use client";

import { useState } from "react";
import { JobsSidebar } from "../jobs-sidebar";
import { Wallet, Globe, TrendingUp, CheckCircle2, ChevronDown, DollarSign, Info } from "lucide-react";

export default function SalaryPage() {
  const [currency, setCurrency] = useState("USD");
  const [frequency, setFrequency] = useState("ANNUAL");

  const insights = [
    { role: "Software Engineer", min: 45000, max: 85000, median: 62000, growth: "+12%" },
    { role: "Product Designer", min: 38000, max: 72000, median: 54000, growth: "+8%" },
    { role: "Marketing Manager", min: 30000, max: 55000, median: 42000, growth: "+5%" }
  ];

  const formatCurrency = (amount: number) => {
    const rate = currency === "UGX" ? 3800 : 1;
    const finalAmount = amount * rate;
    return new Intl.NumberFormat(currency === "UGX" ? "en-UG" : "en-US", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0
    }).format(finalAmount);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 transition-colors duration-500 pb-20">
      <div className="max-w-7xl mx-auto py-12 px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <aside className="lg:col-span-3">
          <JobsSidebar />
        </aside>

        <main className="lg:col-span-9 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-soft overflow-hidden">
             <div className="p-10 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col md:flex-row md:items-center justify-between gap-6 backdrop-blur-xl">
                <div>
                   <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-4 tracking-tight leading-none">
                      <div className="p-3 bg-[#0a66c2]/10 dark:bg-blue-500/10 rounded-2xl border border-blue-500/10">
                        <Wallet className="w-8 h-8 text-[#0a66c2] dark:text-blue-400" />
                      </div>
                      Market Intelligence
                   </h1>
                   <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-bold uppercase tracking-widest italic opacity-80">Salary transparency for a fairer professional world.</p>
                </div>
                <div className="flex items-center gap-2 p-1.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                   <button 
                     onClick={() => setCurrency("USD")}
                     className={`px-6 py-2 rounded-xl text-[11px] font-black transition-all duration-300 ${currency === "USD" ? "bg-[#0a66c2] dark:bg-blue-600 text-white shadow-lg" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"}`}
                   >
                     USD ($)
                   </button>
                   <button 
                      onClick={() => setCurrency("UGX")}
                      className={`px-6 py-2 rounded-xl text-[11px] font-black transition-all duration-300 ${currency === "UGX" ? "bg-[#0a66c2] dark:bg-blue-600 text-white shadow-lg" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"}`}
                   >
                     UGX (Shs)
                   </button>
                </div>
             </div>

             <div className="p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
                   <div className="p-10 rounded-[3rem] bg-gradient-to-br from-[#0a66c2] via-[#004182] to-[#0a66c2] text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden group border border-white/5">
                      <h3 className="text-[11px] font-black uppercase tracking-[0.2em] opacity-80 italic">Global Market Average (Eng.)</h3>
                      <div className="mt-6 flex items-baseline gap-3">
                         <span className="text-6xl font-black tracking-tighter">{formatCurrency(62000)}</span>
                         <span className="text-xl font-bold opacity-40">/ yr</span>
                      </div>
                      <div className="mt-8 flex items-center gap-3 px-4 py-2 bg-white/10 w-fit rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 backdrop-blur-md">
                         <TrendingUp className="w-4 h-4 text-emerald-400" /> +12% Delta YoY
                      </div>
                      <DollarSign className="absolute -bottom-6 -right-6 w-48 h-48 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-1000" />
                   </div>

                   <div className="p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 bg-[#f9fafb] dark:bg-slate-800/30 flex flex-col justify-center gap-6 relative overflow-hidden group">
                      <h3 className="text-[11px] font-black text-slate-800 dark:text-white uppercase tracking-[0.3em] flex items-center gap-3">
                        <div className="p-2 bg-[#0a66c2]/10 rounded-lg">
                          <Info className="w-4 h-4 text-[#0a66c2] dark:text-blue-400" />
                        </div>
                        Transparency Charter
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-bold italic opacity-90">
                         Connect+ is committed to equal pay. We mandate that employers list clear compensation bands to ensure professional integrity.
                      </p>
                      <div className="flex flex-wrap gap-3">
                         {["Full Benefits", "Stock Options", "Direct Equity"].map(tag => (
                           <span key={tag} className="px-4 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[9px] font-black text-[#0a66c2] dark:text-blue-400 uppercase tracking-widest shadow-sm">
                             {tag}
                           </span>
                         ))}
                      </div>
                      <Globe className="absolute -top-10 -right-10 w-48 h-48 opacity-[0.03] dark:opacity-[0.05] text-slate-900 dark:text-white group-hover:scale-110 transition-transform duration-1000" />
                   </div>
                </div>

                <h2 className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">Role-specific compensation bands</h2>
                <div className="space-y-6">
                   {insights.map((item) => (
                     <div key={item.role} className="p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-500 group cursor-default">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                           <div className="flex items-center gap-6">
                              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:text-blue-500 transition-colors">
                                 <CheckCircle2 className="w-6 h-6" />
                              </div>
                              <div>
                                 <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none">{item.role}</h4>
                                 <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-widest mt-2 flex items-center gap-2">
                                    <TrendingUp className="w-3.5 h-3.5" /> Growth Forecast: {item.growth}
                                 </p>
                              </div>
                           </div>
                           <div className="flex items-center gap-10">
                              <div className="text-right">
                                 <p className="text-[9px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest mb-2">Market Potential Range</p>
                                 <div className="flex items-center justify-end gap-3">
                                    <p className="text-lg font-black text-slate-900 dark:text-white tabular-nums tracking-tighter">
                                      {formatCurrency(item.min)} — {formatCurrency(item.max)}
                                    </p>
                                 </div>
                              </div>
                              <div className="w-10 h-10 rounded-full border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-300 dark:text-slate-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-all">
                                 <ChevronDown className="w-5 h-5 group-hover:rotate-180 transition-transform" />
                              </div>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </main>
      </div>
    </div>
  );
}
