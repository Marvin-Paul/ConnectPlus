"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2, Mail, Lock, CheckCircle2, ChevronRight, Apple } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 1500);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-6 text-center animate-pro-fade">
        <div className="bg-primary/10 p-5 rounded-full ring-8 ring-primary/5">
          <CheckCircle2 className="w-16 h-16 text-primary" />
        </div>
        <div>
           <h2 className="text-3xl font-black text-foreground tracking-tighter">Welcome back</h2>
           <p className="text-secondary font-bold mt-2">Authenticating your professional identity...</p>
        </div>
        <Loader2 className="w-8 h-8 animate-spin text-primary mt-6" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-full animate-pro-fade relative z-20">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest px-3 py-1 bg-primary/5 rounded-lg border border-primary/10 mb-2">
           Secure Access Protocol
        </div>
        <h1 className="text-3xl font-black tracking-tighter text-foreground leading-[1.1]">Connect Plus <br />Login</h1>
        <p className="text-secondary font-bold text-[13px] leading-relaxed max-w-[300px]">Sign in to manage your professional presence and network with elite talent.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-[13px] p-4 rounded-xl flex items-center gap-4 animate-pro-fade shadow-sm">
          <div className="w-1.5 h-6 bg-red-600 rounded-full shrink-0" />
          <span className="font-bold">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5">
        <div className="space-y-2.5">
          <label className="text-[10px] font-extrabold uppercase tracking-widest text-secondary ml-1" htmlFor="identifier">
            Identity Identifier
          </label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary/40 group-focus-within:text-primary transition-colors" />
            <input
              id="identifier"
              name="identifier"
              type="text"
              placeholder="e.g. hello@connectplus.africa"
              className="flex h-12 w-full rounded-xl border border-border bg-muted/50 px-11 py-2 text-[14px] font-bold text-foreground focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary hover:border-primary/50 transition-all outline-none"
              required
              value={formData.identifier}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center justify-between ml-1 text-[10px] font-extrabold uppercase tracking-widest">
            <label className="text-secondary" htmlFor="password">
              Access Key
            </label>
            <Link href="#" className="text-primary hover:underline transition-all">
              Forgot Access?
            </Link>
          </div>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary/40 group-focus-within:text-primary transition-colors" />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter secure key"
              className="flex h-12 w-full rounded-xl border border-border bg-muted/50 px-11 pr-14 py-2 text-[14px] font-bold text-foreground focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary hover:border-primary/50 transition-all outline-none shadow-sm"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary/40 hover:text-foreground transition-all active:scale-90"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex h-14 items-center justify-center rounded-xl bg-foreground text-white text-[15px] font-extrabold shadow-premium transition-all hover:bg-primary hover:translate-y-[-2px] active:scale-95 disabled:pointer-events-none disabled:opacity-50 mt-10 gap-3 group"
      >
        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
        {isLoading ? "Validating Access..." : "Initiate Connection"}
        {!isLoading && <ChevronRight className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-2" />}
      </button>

      <div className="relative my-10">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-[9px] uppercase font-extrabold tracking-[0.2em] text-secondary/40">
          <span className="bg-white px-4">SSO Integration Pool</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={async () => {
             const { supabase } = await import("@/lib/supabase");
             await supabase.auth.signInWithOAuth({
               provider: 'google',
               options: { redirectTo: `${window.location.origin}/api/auth/callback` }
             });
          }}
          className="flex h-12 items-center justify-center rounded-xl border border-border bg-white text-[13px] font-extrabold text-foreground hover:bg-muted transition-all active:scale-95 gap-3 shadow-sm hover:border-primary/20"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Google
        </button>
        <button
          type="button"
          onClick={async () => {
             const { supabase } = await import("@/lib/supabase");
             await supabase.auth.signInWithOAuth({
               provider: 'gitlab',
               options: { redirectTo: `${window.location.origin}/api/auth/callback` }
             });
          }}
          className="flex h-12 items-center justify-center rounded-xl border border-border bg-white text-[13px] font-extrabold text-foreground hover:bg-muted transition-all active:scale-95 gap-3 shadow-sm hover:border-primary/20"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#FC6D26" d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 01-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 015.12 2a.43.43 0 01.39.28l2 6.05h8.92l2-6.05A.43.43 0 0118.88 2a.42.42 0 01.41.13l2.44 7.51 1.22 3.78a.84.84 0 01-.3.97z" />
          </svg>
          GitLab
        </button>
      </div>

      <div className="text-center text-[12px] font-bold text-secondary mt-12">
        New to Connect Plus?{" "}
        <Link href="/signup" className="text-primary font-extrabold hover:underline underline-offset-4">
          Establish Identity
        </Link>
      </div>
    </form>
  );
}
