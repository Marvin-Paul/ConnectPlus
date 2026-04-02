"use client";

import { useState } from "react";
import { 
  Sparkles, 
  CheckCircle2, 
  Target, 
  Eye, 
  Users, 
  MessageSquare, 
  Zap, 
  ArrowRight, 
  Rocket, 
  ShieldCheck, 
  TrendingUp, 
  Star,
  ChevronDown
} from "lucide-react";
import Link from "next/link";

const PLANS = [
  {
    id: "p1",
    name: "Core Premium",
    price: "$29",
    billing: "per month",
    description: "Get noticed by recruiters and grow your network faster.",
    features: [
      "See who viewed your profile (90 days)",
      "Uncover applicant insights on jobs",
      "5 InMail messages per month",
      "Featured applicant status",
      "Salary and market insights"
    ],
    cta: "Try Free for 1 Month",
    color: "bg-primary",
    popular: false
  },
  {
    id: "p2",
    name: "Business Elite",
    price: "$59",
    billing: "per month",
    description: "Expand your reach and build deep industry relationships.",
    features: [
      "Everything in Core Premium",
      "15 InMail messages per month",
      "Unlimited profile browsing",
      "Access to Corporate Analytics",
      "Ad-free experience"
    ],
    cta: "Buy for my Team",
    color: "bg-primary",
    popular: true
  },
  {
    id: "p3",
    name: "Recruiter Platinum",
    price: "Custom",
    billing: "annual billing",
    description: "Find and hire the top 1% of tech talent in the region.",
    features: [
      "Full Pipeline Discovery Dashboard",
      "Advanced Boolean search filters",
      "50 InMail messages per month",
      "Talent pipeline management",
      "Dedicated account strategist"
    ],
    cta: "Contact Sales",
    color: "bg-slate-900",
    popular: false
  }
];

export default function PremiumPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      {/* Hero Section */}
      <div className="text-center space-y-8 mb-24 animate-in fade-in slide-in-from-bottom-6 duration-1000">
         <div className="flex items-center gap-2 px-4 py-1.5 bg-accent/10 text-primary w-fit mx-auto rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-accent/20 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 fill-current" /> the professional edge
         </div>
         <h1 className="text-7xl font-black text-slate-800 tracking-tighter leading-[0.95] max-w-4xl mx-auto">
            Ignite your <span className="text-primary">Professional</span> <br /> 
            Superpowers with <span className="text-accent">Connect+</span>
         </h1>
         <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto italic leading-relaxed opacity-80">
            Beyond networking. Unlock deep competitive data, direct access to hidden talent, and detailed profile intelligence used by regional leaders.
         </p>
         <div className="pt-4">
            <Link href="/premium/analytics" className="px-12 py-5 bg-primary text-white font-black text-sm rounded-full hover:scale-105 transition-all shadow-2xl shadow-primary/20 tracking-widest uppercase flex items-center gap-3 mx-auto w-fit group">
               Explore Intelligence Dashboard <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
         </div>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-32">
        {[
           { icon: Eye, title: "Total Visibility", desc: "Gain full transparency on who's analyzing your profile, including recruiters from top firms." },
           { icon: Target, title: "Applicant Intel", desc: "See exactly how you rank against other candidates for any role before you apply." },
           { icon: MessageSquare, title: "Direct InMail", desc: "Reach any professional link in our global ecosystem even if you're not connected." },
           { icon: Zap, title: "Featured Priority", desc: "Premium profiles are algorithmically prioritized in search results and job applications." },
           { icon: Users, title: "Recruiter Hub", desc: "Manage your team's talent pipeline with advanced recruiter-specific discovery tools." },
           { icon: ShieldCheck, title: "Elite Certification", desc: "Showcase your commitment to growth with exclusive Connect+ Learning certifications." }
        ].map((benefit, idx) => (
          <div key={idx} className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 group">
             <div className="w-16 h-16 rounded-[1.5rem] bg-slate-50 border border-slate-100 flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform shadow-inner">
                <benefit.icon className="w-8 h-8 text-primary opacity-40 group-hover:opacity-100 transition-opacity" />
             </div>
             <h3 className="text-xl font-black text-slate-800 tracking-tight leading-none mb-4">{benefit.title}</h3>
             <p className="text-sm text-slate-500 font-medium leading-relaxed italic opacity-80">{benefit.desc}</p>
          </div>
        ))}
      </div>

      {/* Pricing Section */}
      <div className="space-y-16 mb-40">
        <div className="text-center space-y-4">
           <h2 className="text-[12px] font-black uppercase tracking-[0.4em] text-primary">Sustainable Investment</h2>
           <h3 className="text-5xl font-black text-slate-800 tracking-tighter">Chosen by 5,000+ Regional Experts</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {PLANS.map(plan => (
             <div key={plan.id} className={`relative p-12 rounded-[4rem] flex flex-col justify-between border-2 transition-all duration-700 group ${plan.popular ? 'border-primary bg-primary h-[850px] -translate-y-8 z-20 shadow-[0_50px_120px_rgba(125,57,235,0.2)]' : 'border-slate-100 bg-white h-[780px] hover:border-slate-200 shadow-xl'}`}>
                
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-2 bg-accent text-slate-900 font-black text-[10px] uppercase tracking-widest rounded-full shadow-2xl">
                    Most Popular Growth Plan
                  </div>
                )}

                <div>
                   <h4 className={`text-[11px] font-black uppercase tracking-[0.4em] mb-4 ${plan.popular ? 'text-accent' : 'text-slate-400'}`}>{plan.name}</h4>
                   <div className="flex items-baseline gap-2 mb-6">
                      <span className={`text-6xl font-black tracking-tighter ${plan.popular ? 'text-white' : 'text-slate-800'}`}>{plan.price}</span>
                      <span className={`text-sm font-bold italic ${plan.popular ? 'text-accent/60' : 'text-slate-400'}`}>{plan.billing}</span>
                   </div>
                   <p className={`text-sm font-medium leading-relaxed italic mb-10 ${plan.popular ? 'text-white/80' : 'text-slate-500 opacity-80'}`}>{plan.description}</p>
                   
                   <div className="space-y-6">
                      {plan.features.map(feat => (
                        <div key={feat} className="flex items-start gap-4">
                           <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${plan.popular ? 'text-accent' : 'text-primary'}`} />
                           <span className={`text-[12px] font-black uppercase tracking-widest leading-relaxed ${plan.popular ? 'text-white' : 'text-slate-700'}`}>{feat}</span>
                        </div>
                      ))}
                   </div>
                </div>

                <button className={`w-full py-5 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95 ${plan.popular ? 'bg-white text-primary hover:scale-105' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
                   {plan.cta}
                </button>
             </div>
           ))}
        </div>
      </div>

      {/* Comparison Detail Link */}
      <div className="text-center pb-20">
         <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-6 italic">Need a custom enterprise solution with dedicated support?</p>
         <button className="px-10 py-3 rounded-full border border-slate-100 text-slate-500 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2 mx-auto">
            Download Plan Comparison Matrix <ChevronDown className="w-4 h-4" />
         </button>
      </div>

    </div>
  );
}
