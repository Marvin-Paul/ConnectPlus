"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "../providers/user-provider";
import { 
  Search, 
  ChevronDown, 
  Grid3X3,
  LogOut,
  Bell,
  MessageCircle,
  Users as UsersIcon,
  Settings,
  HelpCircle,
  ShieldCheck,
  Briefcase,
} from "lucide-react";

export function TopNav() {
  const { user, loading } = useUser();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const meRef = useRef<HTMLDivElement>(null);
  const bizRef = useRef<HTMLButtonElement>(null);
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

  const getUserInitials = () => {
    if (!user) return "GU";
    const first = user.firstName?.[0] || "";
    const last = user.lastName?.[0] || "";
    if (!last) return first.toUpperCase() || "U";
    return `${first}${last}`.toUpperCase();
  };

  return (
    <header className="sticky top-0 z-[100] border-b border-border bg-white h-[64px] shadow-soft transition-all duration-200">
      <div className="mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 justify-between gap-4">
        
        {/* Left: Branding & Search */}
        <div className="flex items-center gap-6 flex-1">
          <Link href="/" className="shrink-0 flex items-center transition-transform active:scale-95 group">
            <div className="h-[40px] w-[40px] flex items-center justify-center rounded-xl bg-primary text-white shadow-premium group-hover:rotate-6 transition-transform">
               <span className="font-black text-xl tracking-tighter">C+</span>
            </div>
            <div className="hidden lg:flex flex-col ml-3">
              <span className="text-[18px] font-bold tracking-tight text-foreground leading-none">
                Connect
              </span>
              <span className="text-[11px] font-bold text-accent uppercase tracking-wider mt-0.5">
                Plus
              </span>
            </div>
          </Link>

          {/* Search */}
          <div className="flex-1 relative hidden md:block max-w-[480px]" ref={searchRef}>
              <form onSubmit={(e) => { e.preventDefault(); router.push(`/search?q=${searchQuery}`); }} className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Search network, jobs, articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-11 w-full bg-muted border-transparent text-[14px] pl-12 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary rounded-xl transition-all"
                />
              </form>
          </div>
        </div>

        {/* Right: Navigation */}
        <nav className="flex items-center gap-1 h-full">
          {[
            { label: 'Feed', icon: Grid3X3, href: '/', mobileHidden: false },
            { label: 'Network', icon: UsersIcon, href: '/network', mobileHidden: true },
            { label: 'Jobs', icon: Briefcase, href: '/jobs', mobileHidden: true },
            { label: 'Notifications', icon: Bell, href: '/notifications', badge: true, mobileHidden: true },
          ].map((item) => (
            <Link 
              key={item.label}
              href={item.href}
              className={`${item.mobileHidden ? 'hidden md:flex' : 'flex'} flex-col items-center justify-center min-w-[64px] h-full gap-1 transition-all hover:bg-muted group relative ${pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)) ? 'text-primary' : 'text-secondary'}`}
            >
              <div className="relative">
                <item.icon className={`h-5 w-5 stroke-[2.5px] transition-transform group-hover:-translate-y-0.5 ${pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)) ? 'text-primary' : 'group-hover:text-primary'}`} />
                {item.badge && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full animate-pulse shadow-sm" />
                )}
              </div>
              <span className="text-[10px] font-bold tracking-wider uppercase transition-colors">{item.label}</span>
              {(pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))) && (
                <div className="absolute bottom-0 w-8 h-1 bg-primary rounded-t-full" />
              )}
            </Link>
          ))}

          <div className="w-[1px] h-10 bg-border mx-2" />

          {!loading && user ? (
            <div className="flex items-center gap-2 pl-4">
               <div className="flex items-center relative h-full" ref={meRef}>
                  <button 
                     onClick={() => setActiveDropdown(activeDropdown === 'me' ? null : 'me')}
                     className={`flex flex-col items-center justify-center min-w-[64px] h-full gap-1 transition-all hover:bg-muted group ${activeDropdown === 'me' ? 'text-primary' : 'text-secondary'}`}
                  >
                     <div className={`w-6 h-6 rounded-full flex items-center justify-center bg-primary text-white font-bold text-[10px] border-2 transition-all overflow-hidden shrink-0 ${activeDropdown === 'me' ? 'border-primary ring-2 ring-primary/20' : 'border-white'}`}>
                       {user.avatarUrl ? (
                         <img src={user.avatarUrl} alt="Me" className="w-full h-full object-cover" />
                       ) : (
                         <span className="leading-none">{getUserInitials()}</span>
                       )}
                     </div>
                     <span className="text-[11px] font-bold tracking-wide uppercase">Me</span>
                  </button>

                  {activeDropdown === 'me' && (
                     <div className="absolute top-[calc(100%+4px)] right-0 w-[240px] bg-white rounded-xl shadow-dropdown border border-border overflow-hidden animate-pro-fade z-[110]">
                       <div className="p-4 flex items-center gap-3 bg-muted/50">
                           <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-[14px] shadow-sm shrink-0 overflow-hidden">
                              {user.avatarUrl ? <img src={user.avatarUrl} className="w-full h-full object-cover" alt="" /> : <span>{getUserInitials()}</span>}
                           </div>
                           <div className="min-w-0 pr-2">
                             <h4 className="font-bold text-foreground tracking-tight truncate leading-none text-[15px]">{user.firstName} {user.lastName}</h4>
                             <Link href={`/profile/${user.username}`} onClick={() => setActiveDropdown(null)} className="text-[12px] text-primary font-bold hover:underline mt-1 block">View Profile</Link>
                           </div>
                       </div>
                       
                        <div className="px-2 py-2 border-t border-border/50">
                            <div className="px-3 py-1.5 text-[11px] font-bold text-secondary/40 uppercase tracking-wider">Account Settings</div>
                            <Link href="/settings" onClick={() => setActiveDropdown(null)} className="flex items-center gap-3 px-3 py-2.5 text-[14px] font-semibold text-secondary hover:text-primary hover:bg-muted rounded-lg transition-all active:scale-[0.98]">
                               <Settings className="w-4 h-4" />
                               Privacy & Settings
                            </Link>
                            <Link href="/help" onClick={() => setActiveDropdown(null)} className="flex items-center gap-3 px-3 py-2.5 text-[14px] font-semibold text-secondary hover:text-primary hover:bg-muted rounded-lg transition-all active:scale-[0.98]">
                               <HelpCircle className="w-4 h-4" />
                               Help Center
                            </Link>
                        </div>

                        <div className="px-2 py-2 border-t border-border/50">
                             <button 
                                onClick={async () => { 
                                  await fetch("/api/logout", { method: "POST" }); 
                                  window.location.href = "/login"; 
                                }}
                                className="w-full flex items-center gap-3 px-3 py-2.5 text-[14px] font-bold text-red-500 hover:bg-red-50 rounded-lg transition-all active:scale-[0.98]"
                             >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                             </button>
                        </div>
                     </div>
                  )}
               </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 pl-4">
               <Link href="/login" className="h-10 px-6 flex items-center justify-center rounded-xl bg-primary text-white font-bold text-[13px] hover:bg-primary/90 transition-all active:scale-95 shadow-sm">Sign In</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
