import { ReactNode } from "react";
import Link from "next/link";
import { Sparkles, Globe, ShieldCheck, Zap } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#F3F6F8] selection:bg-[#0A66C2]/10 selection:text-[#0A66C2]">
      {/* Visual Side: High-Fidelity Professional Branding */}
      <div className="hidden lg:flex flex-col justify-between p-16 bg-[#0A66C2] relative overflow-hidden group">
        {/* Dynamic Professional Gradients & Orbs */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] transition-transform duration-[20s] animate-pulse" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-[#004182]/40 rounded-full blur-[100px] animate-pulse" />
        
        <div className="relative z-10 flex items-center gap-4">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 bg-white text-[#0A66C2] rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl transform group-hover:rotate-6 transition-transform duration-500">
              C+
            </div>
            <span className="text-2xl font-bold tracking-tighter text-white">Connect<span className="opacity-80">Plus</span></span>
          </Link>
          <div className="h-6 w-[1px] bg-white/20 mx-2" />
          <span className="text-[11px] font-bold text-white/50 tracking-[0.2em] uppercase mt-1">Professional Core</span>
        </div>

        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-bold tracking-wide mb-8 backdrop-blur-md border border-white/10">
             <Sparkles className="w-3.5 h-3.5 text-accent" />
             NEW: Elite Networking Mode Active
          </div>
          <h2 className="text-6xl font-black text-white leading-[1.05] tracking-tight mb-8">
            Scale your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">professional</span> <br />
            identity.
          </h2>
          <p className="text-white/70 text-lg leading-relaxed font-medium mb-12">
            The next generation of professional discovery. Connect with industry leaders, elite engineers, and global visionaries.
          </p>
          
          <div className="grid grid-cols-2 gap-8">
             <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                   <Globe className="w-5 h-5 text-white" />
                </div>
                <div>
                   <h4 className="text-white font-bold text-sm">Global Reach</h4>
                   <p className="text-white/40 text-[12px] mt-0.5">150+ Countries synced</p>
                </div>
             </div>
             <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                   <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                   <h4 className="text-white font-bold text-sm">Elite Security</h4>
                   <p className="text-white/40 text-[12px] mt-0.5">Pro-Grade Verification</p>
                </div>
             </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                 {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0A66C2] bg-white/10 overflow-hidden ring-2 ring-white/10">
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`} alt="" className="w-full h-full object-cover" />
                    </div>
                 ))}
              </div>
              <span className="text-[11px] font-bold text-white/40 uppercase tracking-widest">Join 85k+ Experts</span>
           </div>
           <div className="text-white/20 text-[10px] font-bold uppercase tracking-widest">
             &copy; 2026 Connect+ Ecosystem
           </div>
        </div>
      </div>

      {/* Logic Side: Premium Authentication Form Container */}
      <div className="flex items-center justify-center p-8 sm:p-12 md:p-24 relative">
        <div className="absolute inset-0 bg-[#F3F6F8] pointer-events-none" />
        
        {/* Subtle geometric accents for mobile */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-[#0A66C2]/5 rounded-full blur-[80px] lg:hidden" />
        
        <div className="w-full max-w-[420px] bg-white p-10 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-white relative z-10 overflow-hidden transform hover:translate-y-[-2px] transition-transform duration-500">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#0A66C2]/5 to-transparent rounded-bl-[100px]" />
          {children}
        </div>
      </div>
    </div>
  );
}
