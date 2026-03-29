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
    <div className="max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
      <aside className="lg:col-span-3">
        <JobsSidebar />
      </aside>

      <main className="lg:col-span-9 space-y-6">
        <div className="bg-white rounded-2xl border border-[#e0e0e0] shadow-sm overflow-hidden">
           <div className="p-8 border-b border-[#e0e0e0] bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                 <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
                    <Wallet className="w-8 h-8 text-[#0a66c2]" /> Salary Insights
                 </h1>
                 <p className="text-sm text-[#666666] mt-1 font-medium italic">Transparency for a fairer professional world.</p>
              </div>
              <div className="flex items-center gap-2 p-1 bg-white rounded-xl border border-slate-200 shadow-sm">
                 <button 
                   onClick={() => setCurrency("USD")}
                   className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${currency === "USD" ? "bg-[#0a66c2] text-white" : "text-slate-500 hover:bg-slate-50"}`}
                 >
                   USD ($)
                 </button>
                 <button 
                    onClick={() => setCurrency("UGX")}
                    className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${currency === "UGX" ? "bg-[#0a66c2] text-white" : "text-slate-500 hover:bg-slate-50"}`}
                 >
                   UGX (Shs)
                 </button>
              </div>
           </div>

           <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                 <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0a66c2] to-[#004182] text-white shadow-xl shadow-blue-200 relative overflow-hidden group">
                    <h3 className="text-sm font-black uppercase tracking-widest opacity-80">Market Average (Software Engineering)</h3>
                    <div className="mt-4 flex items-baseline gap-2">
                       <span className="text-5xl font-black">{formatCurrency(62000)}</span>
                       <span className="text-xl font-bold opacity-60">/ yr</span>
                    </div>
                    <div className="mt-6 flex items-center gap-2 px-3 py-1 bg-white/20 w-fit rounded-full text-xs font-bold">
                       <TrendingUp className="w-3.5 h-3.5" /> +12% growth YoY
                    </div>
                    <DollarSign className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform" />
                 </div>

                 <div className="p-8 rounded-3xl border border-slate-100 bg-[#f9fafb] flex flex-col justify-center gap-4">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                      <Info className="w-4 h-4 text-[#0a66c2]" /> compensation transparency
                    </h3>
                    <p className="text-[13px] text-[#666666] leading-relaxed font-medium">
                       Connect+ is committed to equal pay. We encourage employers to list clear pay ranges (Min-Max) to increase applicant quality and ensure fairness.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                       {["Health Insurance", "Stock Options", "Equity"].map(tag => (
                         <span key={tag} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-black text-[#0a66c2] uppercase tracking-wider shadow-sm">
                           {tag}
                         </span>
                       ))}
                    </div>
                 </div>
              </div>

              <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2">Role-specific ranges</h2>
              <div className="space-y-4">
                 {insights.map((item) => (
                   <div key={item.role} className="p-6 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors group">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                         <div>
                            <h4 className="text-base font-bold text-slate-800">{item.role}</h4>
                            <p className="text-[11px] text-[#057642] font-black uppercase tracking-widest mt-1">Growth: {item.growth}</p>
                         </div>
                         <div className="flex items-center gap-6">
                            <div className="text-right">
                               <p className="text-[10px] text-[#666666] font-black uppercase tracking-widest mb-1">Potential Range</p>
                               <p className="text-sm font-black text-slate-800">
                                 {formatCurrency(item.min)} — {formatCurrency(item.max)}
                               </p>
                            </div>
                            <ChevronDown className="w-5 h-5 text-[#666666] opacity-0 group-hover:opacity-100 transition-opacity" />
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}
