import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background selection:bg-primary selection:text-primary-foreground">
      {/* Left Side: Illustration / Branding */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-primary relative overflow-hidden group">
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-pulse duration-[10s]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 animate-pulse duration-[15s]" />
        
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-black text-white hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 bg-white text-primary rounded-xl flex items-center justify-center font-bold shadow-lg group-hover:scale-110 transition-transform">
              C+
            </div>
            Connect+
          </Link>
        </div>

        <div className="relative z-10 space-y-8">
          <h2 className="text-5xl font-extrabold text-white leading-tight">
            Elevate your professional <br />
            <span className="text-accent underline decoration-4 underline-offset-8 decoration-accent/30">presence.</span>
          </h2>
          <p className="text-white/80 text-xl max-w-md leading-relaxed">
            The next generation of professional networking. Built for creators, engineers, and visionaries of the digital age.
          </p>
          
          <div className="flex items-center gap-6 pt-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-primary bg-muted overflow-hidden">
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} 
                    alt="user" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="text-white/60 text-sm font-medium">Joined by 10,000+ professionals this week</p>
          </div>
        </div>

        <div className="relative z-10 text-white/40 text-xs font-medium uppercase tracking-[0.2em]">
          &copy; 2026 Connect+ Inc. • All Rights Reserved
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex items-center justify-center p-6 sm:p-12 md:p-24 relative overflow-hidden">
        {/* Subtle decorative elements for mobile/light mode */}
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-primary/5 rounded-full blur-3xl lg:hidden" />
        
        <div className="w-full max-w-[420px] relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
