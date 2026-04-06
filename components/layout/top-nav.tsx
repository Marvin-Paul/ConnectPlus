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
     return isAuthPage ? null : <div className="h-[52px] bg-white border-b sticky top-0 z-[100]" />;
  }

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setActiveDropdown(null);
    }
  };

  return (
    <header className="sticky top-0 z-[100] border-b bg-white animate-in slide-in-from-top-4 duration-500">
      <div className="mx-auto flex w-full max-w-6xl items-center h-[52px] px-4 gap-2 md:gap-4">
        
        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center gap-2">
          <div className="h-[34px] w-[34px] flex items-center justify-center rounded-lg bg-primary text-white shadow-lg overflow-hidden shrink-0">
             <span className="text-xl font-black tracking-tighter leading-none">c+</span>
          </div>
          <span className="hidden xl:block text-xl font-black tracking-tight text-slate-900 leading-none">
            Connect<span className="text-primary">+</span>
          </span>
        </Link>

        {/* Global Desktop Search (Hidden on small screens) */}
        <div className="hidden lg:flex flex-1 max-w-[280px] relative" ref={searchRef}>
            <form onSubmit={handleSearch} className="w-full relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onFocus={() => setActiveDropdown('search')}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-[34px] w-full bg-slate-100 border-none text-sm placeholder:text-slate-400 pl-10 focus-visible:ring-2 focus-visible:ring-primary/20 rounded-full"
              />
            </form>
        </div>

        {/* Navigation Items (Visible on mobile too, consistent with screenshot) */}
        <nav className="flex-1 flex items-center justify-center md:justify-end h-full">
          {user && navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`flex flex-col items-center justify-center min-w-[45px] md:min-w-[64px] lg:min-w-[70px] h-full transition relative group ${isActivePath(link.href) ? 'text-primary' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <div className="relative">
                <link.icon className={`h-[22px] w-[22px] md:h-6 md:w-6 stroke-[1.5px] transition-transform group-hover:scale-110 ${isActivePath(link.href) ? 'fill-primary/10' : ''}`} />
                {link.badge && (
                  <span className="absolute -top-1.5 -right-2.5 bg-red-500 text-white text-[9px] font-black px-1 rounded-full min-w-[15px] h-[15px] flex items-center justify-center border-2 border-white">
                    {link.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest hidden xl:block opacity-70 group-hover:opacity-100">{link.label}</span>
              <div className={`absolute bottom-0 left-1 right-1 h-0.5 bg-primary transition-transform origin-center ${isActivePath(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
            </Link>
          ))}

          {/* Guest Buttons (Hidden more aggressively to save space) */}
          {!user && !loading && (
            <div className="flex items-center gap-2 h-full">
              <Link href="/login" className="px-4 h-9 flex items-center justify-center rounded-full border-2 border-primary text-primary font-bold text-[11px] uppercase tracking-widest hover:bg-primary/10 transition-all">Sign in</Link>
            </div>
          )}

          {/* User Profile Section (Restored as per screenshot) */}
          {user && (
            <div className="flex items-center ml-1 md:ml-4">
              <div className="hidden sm:block h-6 w-px bg-slate-100 mx-1 md:mx-2" />
              
              <div className="relative h-full" ref={meRef}>
                <button 
                  onClick={() => setActiveDropdown(activeDropdown === 'me' ? null : 'me')}
                  aria-label="Toggle profile menu"
                  title="Profile Menu"
                  className={`flex flex-col items-center justify-center w-[45px] md:w-14 h-full group ${activeDropdown === 'me' ? 'text-primary' : 'text-slate-500'}`}
                >
                  <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden border-2 transition-all flex items-center justify-center bg-primary text-white font-bold text-xs ${activeDropdown === 'me' ? 'border-primary' : 'border-slate-100 group-hover:border-primary'}`}>
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt="Me" className="w-full h-full object-cover" />
                    ) : (
                      <span className="uppercase">{user.firstName[0]}{user.lastName[0]}</span>
                    )}
                  </div>
                  <ChevronDown className={`h-3 w-3 mt-0.5 transition-transform duration-300 ${activeDropdown === 'me' ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === 'me' && (
                  <div className="absolute top-full right-0 w-[260px] bg-white rounded-b-2xl shadow-[0_15px_50px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden mt-1 animate-in slide-in-from-top-2 duration-300">
                    <div className="p-4 flex items-center gap-3 bg-slate-50/50">
                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                           {user.avatarUrl ? <img src={user.avatarUrl} className="w-full h-full rounded-full object-cover" alt="" /> : <span className="uppercase">{user.firstName[0]}{user.lastName[0]}</span>}
                        </div>
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

              {/* Tools (Desktop only) */}
              <div className="hidden lg:relative lg:h-full" ref={bizRef}>
                <button 
                   onClick={() => setActiveDropdown(activeDropdown === 'biz' ? null : 'biz')}
                   aria-label="Business solutions"
                   className={`flex items-center justify-center w-10 h-full group ${activeDropdown === 'biz' ? 'text-primary' : 'text-slate-500 hover:text-primary'}`}
                >
                  <Grid3X3 className="h-6 w-6 stroke-[1.5px]" />
                </button>
                {activeDropdown === 'biz' && (
                  <div className="absolute top-full right-0 w-[240px] bg-white rounded-b-2xl shadow-xl border border-slate-100 overflow-hidden mt-1 p-2">
                    <Link href="/jobs/post" onClick={() => setActiveDropdown(null)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                        <PlusCircle className="w-5 h-5 text-primary" />
                        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-700">Post a Job</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
