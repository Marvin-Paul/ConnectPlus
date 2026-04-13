import { ReactNode } from "react";
import Link from "next/link";
import { Sparkles, Globe, ShieldCheck, Zap, Grid3X3 } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background selection:bg-primary/10 selection:text-primary">
      {/* Visual Side */}
      <div className="hidden lg:flex flex-col justify-between p-16 bg-primary relative overflow-hidden group">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-black/20 rounded-full blur-[100px]" />
        
        <div className="relative z-10 flex items-center gap-6">
          <Link href="/" className="inline-flex items-center gap-4 group/logo">
            <div className="h-[44px] w-[44px] flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-md text-white shadow-premium border border-white/20">
               <span className="font-black text-2xl tracking-tighter">C+</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-white leading-none">Connect Plus</span>
              <span className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] mt-1">Professional</span>
            </div>
          </Link>
        </div>

        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-[11px] font-extrabold tracking-widest uppercase mb-10 backdrop-blur-md border border-white/10">
             <Sparkles className="w-3.5 h-3.5 text-accent" />
             Future of Networking
          </div>
          <h2 className="text-6xl font-black text-white leading-[1.05] tracking-tighter mb-8">
            Scale your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">professional</span> <br />
            legacy.
          </h2>
          <p className="text-white/60 text-lg leading-relaxed font-semibold mb-12">
            The elite destination for builders, visionaries, and industry leaders across the African continent and beyond.
          </p>
          
          <div className="grid grid-cols-2 gap-8">
             <div className="flex gap-4 group/feat">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 transition-colors group-hover/feat:bg-white/20">
                   <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                   <h4 className="text-white font-bold text-sm">Global Core</h4>
                   <p className="text-white/40 text-[11px] font-bold mt-1 uppercase tracking-wider">Synced Network</p>
                </div>
             </div>
             <div className="flex gap-4 group/feat">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 transition-colors group-hover/feat:bg-white/20">
                   <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                   <h4 className="text-white font-bold text-sm">Elite Trust</h4>
                   <p className="text-white/40 text-[11px] font-bold mt-1 uppercase tracking-wider">Verified Identity</p>
                </div>
             </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-8 mt-12">
           <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                 {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-primary bg-muted overflow-hidden ring-2 ring-white/10">
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`} alt="" className="w-full h-full object-cover" />
                    </div>
                 ))}
              </div>
              <span className="text-[12px] font-extrabold text-white/50 uppercase tracking-widest">Join 85,000+ Profiles</span>
           </div>
        </div>
      </div>

      {/* Logic Side */}
      <div className="flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        <div className="w-full max-w-[440px] bg-white p-10 rounded-3xl shadow-premium border border-border relative z-10 animate-pro-fade">
           <div className="absolute top-0 right-0 w-32 h-32 bg-primary/[0.02] rounded-bl-[120px] pointer-events-none" />
          {children}
        </div>
        
        {/* Background Accents */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/[0.01] rounded-full blur-[120px] -z-0" />
      </div>
    </div>
  );
}
