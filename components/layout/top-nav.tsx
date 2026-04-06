"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "../providers/user-provider";
import { 
  Home, 
  Users, 
  Briefcase, 
  MessageSquare, 
  Bell, 
  Search, 
  ChevronDown, 
  Grid3X3,
  Settings,
  LogOut,
  PlusCircle,
  Target,
  TrendingUp,
  ChevronRight,
  MessageCircle
} from "lucide-react";

export function TopNav() {
  const { user, loading } = useUser();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const meRef = useRef<HTMLDivElement>(null);
  const bizRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Prevent Hydration mismatch by waiting for mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (meRef.current && !meRef.current.contains(event.target as Node) && 
          bizRef.current && !bizRef.current.contains(event.target as Node) &&
          searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Hide TopNav on Auth pages to remove clutter and visual overlap
  const isAuthPage = pathname === "/login" || pathname === "/signup" || pathname?.startsWith("/onboarding");
  
  if (!isMounted || isAuthPage) {
     // Return a minimal spacer or nothing to ensure layout parity
     return isAuthPage ? null : <div className="h-[52px] bg-white border-b sticky top-0 z-[100]" />;
  }

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/network", label: "My Network", icon: Users },
    { href: "/jobs", label: "Jobs", icon: Briefcase },
    { href: "/messaging", label: "Messaging", icon: MessageSquare },
    { href: "/notifications", label: "Notifications", icon: Bell },
  ];

  const isActivePath = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setActiveDropdown(null);
    }
  };

  return (
    <header className="sticky top-0 z-[100] border-b bg-white animate-in slide-in-from-top-4 duration-500">
      <div className="mx-auto flex w-full max-w-6xl items-center h-[52px] px-4 gap-4">
        
        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center gap-2">
          <div className="h-[34px] w-[34px] flex items-center justify-center rounded-lg bg-primary text-white shadow-lg overflow-hidden shrink-0">
             <span className="text-xl font-black tracking-tighter leading-none">c+</span>
          </div>
          <span className="hidden lg:block text-xl font-black tracking-tight text-slate-900 leading-none">
            Connect<span className="text-primary">+</span>
          </span>
        </Link>

        {/* Global Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-[400px] relative" ref={searchRef}>
            <form onSubmit={handleSearch} className="w-full relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search resources, experts, trends..."
                value={searchQuery}
                onFocus={() => setActiveDropdown('search')}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-[34px] w-full bg-slate-100 border-none text-sm placeholder:text-slate-400 pl-10 focus-visible:ring-2 focus-visible:ring-primary/20 rounded-full"
              />
            </form>
            
            {activeDropdown === 'search' && searchQuery.length > 0 && (
              <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
                <div className="px-5 py-4 hover:bg-slate-50 flex items-center gap-3 cursor-pointer" onClick={() => router.push(`/search?q=${searchQuery}`)}>
                   <TrendingUp className="w-4 h-4 text-slate-400" />
                   <p className="text-sm font-medium text-slate-800">Search for &quot;{searchQuery}&quot;</p>
                </div>
              </div>
            )}
        </div>

        {/* Mobile Spacer (for alignment) */}
        <div className="flex-1 md:hidden" />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center h-full ml-auto">
          {user && navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`flex flex-col items-center justify-center min-w-[70px] h-full transition relative group ${isActivePath(link.href) ? 'text-primary' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <link.icon className={`h-6 w-6 stroke-[1.5px] mb-0.5 transition-transform group-hover:scale-110 ${isActivePath(link.href) ? 'fill-primary/10' : ''}`} />
              <span className="text-[10px] font-bold uppercase tracking-widest hidden xl:block opacity-70 group-hover:opacity-100">{link.label}</span>
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-transform origin-center ${isActivePath(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
            </Link>
          ))}

          {/* Guest Buttons */}
          {!user && !loading && (
            <div className="flex items-center gap-3 ml-4 h-full">
              <Link
                href="/signup"
                className="px-6 h-9 flex items-center justify-center rounded-full text-slate-600 font-bold text-[11px] uppercase tracking-widest hover:text-primary hover:bg-slate-50 transition-all"
              >
                Join now
              </Link>
              <Link
                href="/login"
                className="px-6 h-9 flex items-center justify-center rounded-full border-2 border-primary text-primary font-bold text-[11px] uppercase tracking-widest hover:bg-primary/10 transition-all active:scale-95 shadow-sm"
              >
                Sign in
              </Link>
            </div>
          )}

          {/* User Controls */}
          {user && (
            <>
              <div className="h-8 w-px bg-slate-100 mx-2" />
              
              {/* Profile Dropdown */}
              <div className="relative h-full" ref={meRef}>
                <button 
                  onClick={() => setActiveDropdown(activeDropdown === 'me' ? null : 'me')}
                  aria-label="Toggle profile menu"
                  title="Profile Menu"
                  className={`flex flex-col items-center justify-center w-14 h-full group ${activeDropdown === 'me' ? 'text-primary' : 'text-slate-500'}`}
                >
                  <div className={`w-7 h-7 rounded-full overflow-hidden mb-0.5 border-2 transition-all ${activeDropdown === 'me' ? 'border-primary' : 'border-slate-100 group-hover:border-primary'}`}>
                    <img src={user.avatarUrl || "https://api.dicebear.com/7.x/initials/svg?seed=U"} alt="Me" className="w-full h-full object-cover" />
                  </div>
                  <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${activeDropdown === 'me' ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === 'me' && (
                  <div className="absolute top-full right-0 w-[260px] bg-white rounded-b-2xl shadow-xl border border-slate-100 overflow-hidden mt-1 animate-in slide-in-from-top-2 duration-300">
                    <div className="p-4 flex items-center gap-3 bg-slate-50/50">
                        <img src={user.avatarUrl || ""} className="w-10 h-10 rounded-full object-cover border border-slate-100" alt="Avatar" />
                        <div className="min-w-0">
                          <h4 className="font-bold text-slate-800 tracking-tight truncate leading-none">{user.firstName} {user.lastName}</h4>
                          <p className="text-[10px] text-slate-500 font-medium truncate mt-1 leading-none">{user.headline}</p>
                        </div>
                    </div>
                    <div className="px-4 py-2 border-t border-slate-100">
                        <Link href={`/profile/${user.username}`} onClick={() => setActiveDropdown(null)} className="block py-2 text-xs font-bold text-slate-600 hover:text-primary hover:translate-x-1 transition-all">Profile Overview</Link>
                        <Link href="/settings" onClick={() => setActiveDropdown(null)} className="block py-2 text-xs font-bold text-slate-600 hover:text-primary hover:translate-x-1 transition-all">Identity Settings</Link>
                    </div>
                    <div className="border-t border-slate-100 p-2">
                        <button 
                          onClick={async () => { await fetch("/api/logout", { method: "POST" }); window.location.href = "/login"; }}
                          className="w-full flex items-center gap-3 px-3 py-2 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative h-full" ref={bizRef}>
                <button 
                   onClick={() => setActiveDropdown(activeDropdown === 'biz' ? null : 'biz')}
                   aria-label="Business solutions and tools"
                   title="Business Solutions"
                   className={`flex items-center justify-center w-14 h-full group ${activeDropdown === 'biz' ? 'text-primary' : 'text-slate-500 hover:text-primary'}`}
                >
                  <Grid3X3 className="h-6 w-6 stroke-[1.5px] transition-transform group-hover:scale-110" />
                </button>
                {activeDropdown === 'biz' && (
                  <div className="absolute top-full right-0 w-[240px] bg-white rounded-b-2xl shadow-xl border border-slate-100 overflow-hidden mt-1 p-2">
                    <Link href="/jobs/post" onClick={() => setActiveDropdown(null)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                        <PlusCircle className="w-5 h-5 text-primary" />
                        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-700">Post a Job</span>
                    </Link>
                    <Link href="/network/talent" onClick={() => setActiveDropdown(null)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                        <Target className="w-5 h-5 text-blue-500" />
                        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-700">Talent Hub</span>
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}
        </nav>

        {/* Minimal Mobile Actions (Sign in only if logged out) */}
        {!user && !loading && (
          <div className="md:hidden flex items-center h-full">
             <Link href="/login" className="text-[11px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 px-4 py-2 rounded-full transition-all">Sign In</Link>
          </div>
        )}
        
        {/* Mobile Messenger link (only if logged in) */}
        {user && (
          <Link href="/messaging" className="md:hidden relative p-2 text-slate-500">
             <MessageCircle className="w-6 h-6" />
          </Link>
        )}
      </div>
    </header>
  );
}
