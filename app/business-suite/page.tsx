"use client";

import { 
  BarChart3, 
  TrendingUp, 
  BookOpen, 
  Zap, 
  PlusCircle, 
  CheckCircle2, 
  Sparkles, 
  Globe, 
  Users, 
  Rocket, 
  ShieldCheck, 
  Award,
  ChevronRight,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";

const BUSINESS_PRODUCTS = [
  { 
    href: "/network/pages", 
    icon: BarChart3, 
    label: "COMPANY PAGE MGMT", 
    desc: "Customize branding & analytics", 
    color: "text-orange-500",
    bg: "bg-orange-50"
  },
  { 
    href: "/advertise", 
    icon: TrendingUp, 
    label: "ADVERTISE", 
    desc: "Sponsored jobs & spotlights", 
    color: "text-purple-500",
    bg: "bg-purple-50"
  },
  { 
    href: "/learning", 
    icon: BookOpen, 
    label: "LEARNING ACADEMY", 
    desc: "Expert training modules", 
    color: "text-green-500",
    bg: "bg-green-50"
  },
  { 
    href: "/jobs/post", 
    icon: Zap, 
    label: "POST A JOB (LITE)", 
    desc: "Quick hire for small business", 
    color: "text-yellow-500",
    bg: "bg-yellow-50"
  }
];

export default function BusinessSuitePage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Hero Header */}
      <div className="bg-white border-b border-slate-100 mb-12">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center space-y-8">
           <div className="flex items-center justify-center gap-2 px-4 py-1.5 bg-[#1B5E20]/5 text-[#1B5E20] w-fit mx-auto rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-[#1B5E20]/10">
              <ShieldCheck className="w-4 h-4" /> Connect+ Enterprise
           </div>
           <h1 className="text-6xl font-black text-slate-800 tracking-tighter leading-none italic">
              Empowering <span className="text-[#1B5E20]">Elite</span> Enterprises.
           </h1>
           <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed italic opacity-80">
              "Access the toolkit that powers Africa's most successful recruitment and branding strategies."
           </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
         {/* Main Hub Content */}
         <div className="lg:col-span-8 space-y-12">
            
            {/* Visual Feature Grid (from User Image) */}
            <div className="bg-white rounded-[3.5rem] p-12 shadow-2xl border border-slate-100 space-y-12">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {BUSINESS_PRODUCTS.map((prod, idx) => (
                    <Link key={idx} href={prod.href} className="flex items-center gap-8 p-6 rounded-[2.5rem] hover:bg-slate-50 transition-all group active:scale-95">
                       <div className={`p-5 rounded-[2rem] ${prod.bg} ${prod.color} shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
                          <prod.icon className="w-8 h-8" />
                       </div>
                       <div className="flex-1">
                          <h3 className="text-lg font-black text-slate-800 tracking-tight leading-none group-hover:text-[#1B5E20] transition-colors">{prod.label}</h3>
                          <p className="text-[11px] text-slate-400 font-bold mt-2 uppercase tracking-widest italic line-clamp-1">{prod.desc}</p>
                       </div>
                       <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-[#1B5E20] transition-all" />
                    </Link>
                  ))}
               </div>

               {/* Scale Your Vision Banner */}
               <div className="bg-[#1B5E20] rounded-[2.5rem] p-12 text-center relative overflow-hidden group">
                  <div className="relative z-10 space-y-4">
                     <p className="text-[11px] font-black uppercase tracking-[0.4em] text-green-200">Scale your vision</p>
                     <h4 className="text-2xl font-black text-white tracking-widest flex items-center justify-center gap-3">
                        Explore Business Suite <PlusCircle className="w-6 h-6" />
                     </h4>
                     <p className="text-[10px] text-green-900 font-bold uppercase tracking-widest opacity-60">Verified Business Infinity Access</p>
                  </div>
                  <Sparkles className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 text-white group-hover:scale-125 transition-transform duration-700" />
               </div>
            </div>

            {/* Business Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-10 bg-slate-900 rounded-[3rem] text-white shadow-2xl space-y-6 relative overflow-hidden group">
                   <Users className="w-8 h-8 text-blue-400 mb-2 opacity-50" />
                   <h3 className="text-2xl font-black tracking-tighter">Recruiter Talent Solution</h3>
                   <p className="text-sm text-slate-400 font-medium leading-relaxed italic">Hire the top 1% of tech and business leadership specialized in African markets.</p>
                   <button className="px-8 py-3 rounded-full bg-blue-500 text-white font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center gap-2">
                       Enter Dashboard <ArrowUpRight className="w-4 h-4" />
                   </button>
                   <div className="absolute top-0 right-0 p-8">
                       <Sparkles className="w-12 h-12 text-blue-400 opacity-10 group-hover:rotate-180 transition-transform duration-1000" />
                   </div>
                </div>

                <div className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-xl space-y-6">
                   <TrendingUp className="w-8 h-8 text-purple-500 mb-2 opacity-50" />
                   <h3 className="text-2xl font-black text-slate-800 tracking-tighter">Growth Analytics</h3>
                   <p className="text-sm text-slate-500 font-medium leading-relaxed italic">Track brand sentiment and page engagement across all regions instantly.</p>
                   <button className="px-8 py-3 rounded-full border border-slate-200 text-slate-800 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2">
                       View Reports <ArrowUpRight className="w-4 h-4" />
                   </button>
                </div>
            </div>
         </div>

         {/* Sidebar Stats */}
         <div className="lg:col-span-4 space-y-8">
            <div className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-xl space-y-8">
               <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#1B5E20] border-b border-slate-50 pb-6">Your Enterprise Pulse</h3>
               
               <div className="space-y-8">
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Reach</span>
                     <span className="text-2xl font-black text-slate-800">12.4M</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Ads</span>
                     <span className="text-2xl font-black text-slate-800">4</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Talent Apps</span>
                     <span className="text-2xl font-black text-[#1B5E20]">250+</span>
                  </div>
               </div>

               <div className="p-6 rounded-2xl bg-[#1B5E20]/5 border border-[#1B5E20]/10">
                  <p className="text-xs font-bold text-[#1B5E20]/60 italic text-center leading-relaxed">"Verified business accounts get 40% more inbound recruiter leads weekly."</p>
               </div>
            </div>

            <div className="p-10 bg-gradient-to-br from-[#1B5E20] to-green-900 rounded-[3rem] text-white shadow-2xl space-y-6 relative overflow-hidden">
               <Rocket className="w-10 h-10 mb-4 opacity-70" />
               <h3 className="text-2xl font-black tracking-tight leading-none">Ready to scale?</h3>
               <p className="text-sm text-green-200 font-medium italic">Launch your next enterprise-wide campaign in under 5 minutes.</p>
               <button className="w-full py-4 rounded-full bg-white text-[#1B5E20] font-black text-xs uppercase tracking-[0.2em] hover:bg-green-50 transition-all shadow-xl shadow-green-900/30">
                  GET STARTED NOW
               </button>
               <PlusCircle className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 rotate-12" />
            </div>
         </div>
      </div>
    </div>
  );
}
