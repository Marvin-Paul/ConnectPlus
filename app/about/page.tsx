"use client";

import { Users, Target, Briefcase, Shield, FileText, Megaphone, Building2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 md:py-12 px-4 md:px-6 space-y-12 md:space-y-16 animate-in fade-in zoom-in-95 duration-700">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-[#0a66c2] rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-blue-900/20 mb-6">
          <span className="font-black text-3xl text-white tracking-tighter leading-none">C+</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">About Connect+</h1>
        <p className="text-sm md:text-lg text-slate-500 font-medium max-w-2xl mx-auto px-4">
          Empowering the African continent through professional networking, tech mentorship, and limitless opportunity.
        </p>
      </div>

      {/* Navigation Pills */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 sticky top-[80px] bg-white/80 backdrop-blur-md z-10 py-4 border-y border-slate-100 shadow-sm rounded-2xl md:rounded-full px-2">
        {[
          { id: "about-us", label: "About Us", icon: Users },
          { id: "our-mission", label: "Our Mission", icon: Target },
          { id: "careers", label: "Careers", icon: Briefcase },
          { id: "privacy-policy", label: "Privacy", icon: Shield },
          { id: "terms-of-service", label: "Terms", icon: FileText },
          { id: "advertising", label: "Ads", icon: Megaphone },
          { id: "business-solutions", label: "Business", icon: Building2 },
        ].map((item) => (
          <a key={item.id} href={`#${item.id}`} className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-slate-50 border border-slate-200 text-[10px] md:text-xs font-bold text-slate-600 hover:bg-[#0a66c2] hover:text-white hover:border-[#0a66c2] transition-colors flex items-center gap-1.5 md:gap-2 shadow-sm">
            <item.icon className="w-3 h-3 md:w-3.5 md:h-3.5" />
            {item.label}
          </a>
        ))}
      </div>

      {/* Content Sections */}
      <div className="space-y-8 md:space-y-12 pb-20">
        <Section id="about-us" title="About Us" icon={Users}>
          <p className="text-xs md:text-sm leading-relaxed md:leading-relaxed text-slate-600 font-medium">
            Connect+ is the premier professional networking platform built exclusively for the African workforce. Launched in 2026, our platform bridges the gap between elite talent and forward-thinking enterprises across the continent. We believe that Africa's greatest asset is its human capital, and Connect+ provides the digital infrastructure to unlock that potential.
          </p>
        </Section>

        <Section id="our-mission" title="Our Mission" icon={Target}>
          <p className="text-xs md:text-sm leading-relaxed md:leading-relaxed text-slate-600 font-medium">
            Our mission is to democratize access to economic opportunity for every professional in Africa. We strive to create a thriving digital ecosystem where tech talent, entrepreneurs, and industry leaders can collaborate, share knowledge, and build the future of the continent's economy.
          </p>
        </Section>

        <Section id="careers" title="Careers" icon={Briefcase}>
          <p className="text-xs md:text-sm leading-relaxed md:leading-relaxed text-slate-600 font-medium">
            Join the team that is reshaping how Africa works. At Connect+, we are always looking for passionate engineers, designers, and strategists. We offer competitive compensation, remote-first flexibility, and the chance to work on products that directly impact millions of lives.
          </p>
          <div className="mt-4 md:mt-6">
            <Link href="/jobs" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-[#0a66c2] hover:shadow-lg transition-all active:scale-95">
              View open roles <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </Section>

        <Section id="privacy-policy" title="Privacy Policy" icon={Shield}>
          <p className="text-xs md:text-sm leading-relaxed md:leading-relaxed text-slate-600 font-medium">
            Your trust is our top priority. Connect+ adheres to the strictest data protection regulations. We do not sell your personal data to third parties. Our privacy policy outlines how we collect, use, and protect your information, ensuring that your professional identity remains secure and fully under your control.
          </p>
        </Section>

        <Section id="terms-of-service" title="Terms of Service" icon={FileText}>
          <p className="text-xs md:text-sm leading-relaxed md:leading-relaxed text-slate-600 font-medium">
            By using Connect+, you agree to foster a professional, respectful, and inclusive environment. Our terms of service detail the rules of engagement on our platform, acceptable use policies, and our commitment to maintaining a safe space for professional discourse.
          </p>
        </Section>

        <Section id="advertising" title="Advertising" icon={Megaphone}>
          <p className="text-xs md:text-sm leading-relaxed md:leading-relaxed text-slate-600 font-medium">
            Reach Africa's most engaged professional audience. Connect+ offers targeted advertising solutions for brands looking to connect with decision-makers, tech innovators, and industry leaders. Our native ad formats are designed to be non-intrusive and highly effective.
          </p>
        </Section>

        <Section id="business-solutions" title="Business Solutions" icon={Building2}>
          <p className="text-xs md:text-sm leading-relaxed md:leading-relaxed text-slate-600 font-medium">
            Scale your enterprise with Connect+ Business Solutions. From enterprise-grade recruiting tools to corporate learning academies, we provide the infrastructure your company needs to hire top talent, train your workforce, and establish your brand as an industry leader.
          </p>
        </Section>
      </div>

    </div>
  );
}

function Section({ id, title, icon: Icon, children }: { id: string, title: string, icon: any, children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-[180px] p-6 md:p-8 rounded-2xl md:rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 shadow-sm">
          <Icon className="w-4 h-4 md:w-5 md:h-5 text-slate-700" />
        </div>
        <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">{title}</h2>
      </div>
      <div className="prose prose-slate max-w-none">
        {children}
      </div>
    </section>
  );
}
