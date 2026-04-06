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

  const isAuthPage = pathname === "/login" || pathname === "/signup" || pathname?.startsWith("/onboarding");
  
  if (isAuthPage) return null;

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/network", label: "My Network", icon: Users },
    { href: "/jobs", label: "Jobs", icon: Briefcase },
    { href: "/messaging", label: "Messaging", icon: MessageSquare, badge: 1 },
    { href: "/notifications", label: "Notifications", icon: Bell, badge: 4 },
  ];

  const isActivePath = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  const getUserInitials = () => {
    if (!user) return "GU";
    return `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase();
  };

  return (
    <header className="sticky top-0 z-[100] border-b bg-white backdrop-blur-md shadow-sm h-[52px]">
      <div className="mx-auto flex h-full max-w-6xl items-center px-4 justify-between gap-2">
        
        {/* Left Side: Logo and Search */}
        <div className="flex items-center gap-3">
          <Link href="/" className="shrink-0 flex items-center">
            <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-primary text-white shadow-lg transition-transform hover:scale-105 active:scale-95">
               <span className="text-xl font-bold tracking-tighter leading-none">c+</span>
            </div>
            <span className="hidden xl:block ml-3 text-xl font-black tracking-tight text-slate-800">
              Connect<span className="text-primary">+</span>
            </span>
          </Link>

          {/* Search (Desktop only) */}
          <div className="hidden lg:flex items-center relative" ref={searchRef}>
              <form onSubmit={(e) => { e.preventDefault(); router.push(`/search?q=${searchQuery}`); }} className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 w-[240px] bg-slate-100 border-none text-sm pl-10 focus-visible:ring-2 focus-visible:ring-primary/20 rounded-full transition-all"
                />
              </form>
          </div>
        </div>

        {/* Right Side: Navigation and Profile */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-4 h-full">
          {/* Main Navigation (Visible on mobile per user screenshot) */}
          {!loading && user && (
            <nav className="flex items-center h-full">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`flex flex-col items-center justify-center w-11 sm:w-16 h-full transition relative group ${isActivePath(link.href) ? 'text-primary' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  <div className="relative">
                    <link.icon className={`h-6 w-6 stroke-[1.5px] transition-transform group-hover:scale-110 ${isActivePath(link.href) ? 'fill-primary/10' : ''}`} />
                    {link.badge && (
                      <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[9px] font-black px-1.5 rounded-full min-w-[16px] h-[16px] flex items-center justify-center border-2 border-white shadow-sm">
                        {link.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest hidden xl:block opacity-60 mt-0.5">{link.label}</span>
                  <div className={`absolute bottom-0 left-1 right-1 h-[3px] bg-primary rounded-t-full transition-transform origin-center ${isActivePath(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                </Link>
              ))}
            </nav>
          )}

          {/* User Section (Profile) */}
          {!loading && user ? (
            <div className="flex items-center ml-1 sm:ml-2 relative h-full" ref={meRef}>
               <div className="w-[1px] h-8 bg-slate-100 mx-1 hidden sm:block" />
               
               <button 
                  onClick={() => setActiveDropdown(activeDropdown === 'me' ? null : 'me')}
                  title="Profile Menu"
                  aria-label="Toggle profile menu"
                  className={`flex flex-col items-center justify-center w-11 sm:w-16 h-full group relative transition-all ${activeDropdown === 'me' ? 'text-primary' : 'text-slate-500'}`}
               >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-primary text-white font-black text-xs border-2 shadow-sm transition-all ${activeDropdown === 'me' ? 'border-primary' : 'border-slate-50 group-hover:border-primary'}`}>
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt="Me" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span className="leading-none">{getUserInitials()}</span>
                    )}
                  </div>
                  <ChevronDown className={`h-3 w-3 mt-1 transition-transform duration-300 ${activeDropdown === 'me' ? 'rotate-180' : ''}`} />
               </button>

               {/* Dropdown Menu */}
               {activeDropdown === 'me' && (
                  <div className="absolute top-full right-0 w-[280px] bg-white rounded-b-3xl shadow-[0_20px_70px_rgba(0,0,0,0.2)] border border-slate-100 overflow-hidden mt-1 animate-in slide-in-from-top-2 duration-400 z-[110]">
                    <div className="p-5 flex items-start gap-3 bg-slate-50/50">
                        <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white font-black text-lg shadow-inner shrink-0">
                           {user.avatarUrl ? <img src={user.avatarUrl} className="w-full h-full rounded-2xl object-cover" alt="" /> : <span>{getUserInitials()}</span>}
                        </div>
                        <div className="min-w-0 pr-4">
                          <h4 className="font-black text-slate-800 tracking-tight leading-tight truncate text-base">{user.firstName} {user.lastName}</h4>
                          <p className="text-[12px] text-slate-500 font-medium truncate mt-1 leading-relaxed opacity-80">{user.headline}</p>
                        </div>
                    </div>
                    <div className="px-5 py-3 border-t border-slate-100">
                        <Link href={`/profile/${user.username}`} onClick={() => setActiveDropdown(null)} className="block py-2.5 text-sm font-bold text-slate-700 hover:text-primary hover:translate-x-1 transition-all">View Identity</Link>
                        <Link href="/settings" onClick={() => setActiveDropdown(null)} className="block py-2.5 text-sm font-bold text-slate-700 hover:text-primary hover:translate-x-1 transition-all">Privacy Controls</Link>
                    </div>
                    <div className="border-t border-slate-100 p-3 bg-white">
                        <button 
                          onClick={async () => { await fetch("/api/logout", { method: "POST" }); window.location.href = "/login"; }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out from Station
                        </button>
                    </div>
                  </div>
               )}
            </div>
          ) : !loading && (
            <div className="flex items-center gap-2">
               <Link href="/login" className="px-5 h-9 flex items-center justify-center rounded-full border-2 border-primary text-primary font-black text-[11px] uppercase tracking-widest hover:bg-primary/5 transition-all active:scale-95">Sign In</Link>
            </div>
          )}

          {/* Tools (Desktop) */}
          {user && (
            <div className="hidden lg:flex items-center h-full" ref={bizRef}>
               <button 
                  onClick={() => setActiveDropdown(activeDropdown === 'biz' ? null : 'biz')}
                  className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-primary transition-colors"
               >
                 <Grid3X3 className="w-6 h-6" />
               </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
