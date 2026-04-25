"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "../providers/user-provider";
import { useNotifications } from "../providers/notification-provider";
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
  Home,
  BookOpen,
  Calendar,
  FileText,
  Megaphone,
  Layout,
  LayoutDashboard,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

export function TopNav() {
  const { user, loading } = useUser();
  const { unreadCount } = useNotifications();
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

  const getUserInitials = () => {
    if (!user) return "GU";
    const first = user.firstName?.[0] || "";
    const last = user.lastName?.[0] || "";
    if (!last) return first.toUpperCase() || "U";
    return `${first}${last}`.toUpperCase();
  };

  return (
    <header className="sticky top-0 z-[100] border-b border-border bg-white dark:bg-slate-950 h-[64px] shadow-soft transition-all duration-200">
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
        <nav className="flex items-center h-full">
          {[
            { label: 'Home', icon: Home, href: '/', mobileHidden: false },
            { label: 'Network', icon: UsersIcon, href: '/network', mobileHidden: true },
            { label: 'Academy', icon: BookOpen, href: '/learning', mobileHidden: true },
            { label: 'Jobs', icon: Briefcase, href: '/jobs', mobileHidden: true },
            { label: 'Messaging', icon: MessageCircle, href: '/messaging', mobileHidden: true },
            { label: 'Notifications', icon: Bell, href: '/notifications', badge: true, mobileHidden: true },
          ].map((item) => (
            <Link 
              key={item.label}
              href={item.href}
              className={`${item.mobileHidden ? 'hidden md:flex' : 'flex'} flex-col items-center justify-center min-w-[64px] h-full gap-1 transition-all hover:bg-muted group relative ${pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)) ? 'text-primary' : 'text-secondary'}`}
            >
              <div className="relative">
                <item.icon className={`h-5 w-5 stroke-[2.5px] transition-transform group-hover:-translate-y-0.5 ${pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)) ? 'text-primary' : 'group-hover:text-primary'}`} />
                {item.label === 'Notifications' && unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 border-2 border-white rounded-full text-[10px] font-black text-white px-1 shadow-sm animate-in zoom-in duration-300">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
                {item.label !== 'Notifications' && item.badge && (
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
            <div className="flex items-center gap-2 pl-4 h-full">
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
                     <div className="flex items-center gap-0.5">
                        <span className="text-[11px] font-bold tracking-wide uppercase">Me</span>
                        <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'me' ? 'rotate-180' : ''}`} />
                     </div>
                  </button>

                  {activeDropdown === 'me' && (
                     <div className="absolute top-[calc(100%+4px)] right-0 w-[260px] bg-white dark:bg-slate-900 rounded-xl shadow-dropdown border border-border dark:border-slate-800 overflow-hidden animate-pro-fade z-[110]">
                       <div className="p-4 flex items-center gap-3 bg-muted/50 dark:bg-slate-800/50">
                           <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-[16px] shadow-sm shrink-0 overflow-hidden">
                              {user.avatarUrl ? <img src={user.avatarUrl} className="w-full h-full object-cover" alt="" /> : <span>{getUserInitials()}</span>}
                           </div>
                           <div className="min-w-0 pr-2">
                             <h4 className="font-bold text-foreground tracking-tight truncate leading-none text-[15px]">{user.firstName} {user.lastName}</h4>
                             <p className="text-[11px] text-secondary truncate mt-1">{user.headline || 'Professional Member'}</p>
                             <Link href={`/profile/${user.username}`} onClick={() => setActiveDropdown(null)} className="text-[12px] text-primary font-bold hover:underline mt-2 block w-fit border border-primary px-2 py-0.5 rounded-full">View Profile</Link>
                           </div>
                       </div>
                       
                        <div className="px-2 py-2 border-t border-border/50">
                            <div className="px-3 py-1.5 text-[11px] font-black text-secondary/40 uppercase tracking-[0.1em]">Account & Privacy</div>
                            <Link href="/settings" onClick={() => setActiveDropdown(null)} className="flex items-center gap-3 px-3 py-2.5 text-[14px] font-semibold text-secondary hover:text-primary hover:bg-muted rounded-lg transition-all">
                               <Settings className="w-4 h-4" />
                               Settings & Privacy
                            </Link>
                            <Link href="/help" onClick={() => setActiveDropdown(null)} className="flex items-center gap-3 px-3 py-2.5 text-[14px] font-semibold text-secondary hover:text-primary hover:bg-muted rounded-lg transition-all">
                               <HelpCircle className="w-4 h-4" />
                               Help & Support
                            </Link>
                        </div>

                        <div className="px-2 py-2 border-t border-border/50 bg-muted/20">
                             <button 
                                onClick={async () => { 
                                  await fetch("/api/logout", { method: "POST" }); 
                                  window.location.href = "/login"; 
                                }}
                                className="w-full flex items-center gap-3 px-3 py-2.5 text-[14px] font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-all"
                             >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                             </button>
                        </div>
                     </div>
                  )}
               </div>

               <div className="w-[1px] h-8 bg-border/60 mx-1" />

               <div className="flex items-center relative h-full" ref={bizRef as any}>
                  <button 
                     onClick={() => setActiveDropdown(activeDropdown === 'work' ? null : 'work')}
                     className={`flex flex-col items-center justify-center min-w-[64px] h-full gap-1 transition-all hover:bg-muted group ${activeDropdown === 'work' ? 'text-primary' : 'text-secondary'}`}
                  >
                     <Grid3X3 className={`h-5 w-5 stroke-[2.5px] transition-transform group-hover:-translate-y-0.5 ${activeDropdown === 'work' ? 'text-primary' : 'group-hover:text-primary'}`} />
                     <div className="flex items-center gap-0.5">
                        <span className="text-[11px] font-bold tracking-wide uppercase">Work</span>
                        <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'work' ? 'rotate-180' : ''}`} />
                     </div>
                  </button>

                  {activeDropdown === 'work' && (
                     <div className="absolute top-[calc(100%+4px)] right-0 w-[320px] bg-white dark:bg-slate-900 rounded-xl shadow-dropdown border border-border dark:border-slate-800 overflow-hidden animate-pro-fade z-[110]">
                        <div className="p-4 border-b border-border/50">
                           <h3 className="font-black text-[13px] uppercase tracking-wider text-foreground">Business Services</h3>
                        </div>
                        <div className="p-4 grid grid-cols-3 gap-4">
                           {[
                              { label: 'Learning', icon: BookOpen, href: '/learning', color: 'bg-green-50 text-green-600' },
                              { label: 'Insights', icon: TrendingUp, href: '/business-suite', color: 'bg-blue-50 text-blue-600' },
                              { label: 'Post Job', icon: Briefcase, href: '/jobs/post', color: 'bg-orange-50 text-orange-600' },
                              { label: 'Advertise', icon: Megaphone, href: '/advertise', color: 'bg-purple-50 text-purple-600' },
                              { label: 'Articles', icon: FileText, href: '/articles', color: 'bg-slate-50 text-slate-600' },
                              { label: 'Events', icon: Calendar, href: '/events', color: 'bg-red-50 text-red-600' },
                              { label: 'Suite', icon: LayoutDashboard, href: '/business-suite', color: 'bg-indigo-50 text-indigo-600' },
                           ].map((biz) => (
                              <Link 
                                 key={biz.label} 
                                 href={biz.href}
                                 onClick={() => setActiveDropdown(null)}
                                 className="flex flex-col items-center gap-2 group/biz"
                              >
                                 <div className={`w-12 h-12 rounded-xl ${biz.color} flex items-center justify-center shadow-sm group-hover/biz:scale-110 transition-transform`}>
                                    <biz.icon className="w-5 h-5" />
                                 </div>
                                 <span className="text-[10px] font-bold text-secondary group-hover/biz:text-primary text-center leading-tight">{biz.label}</span>
                              </Link>
                           ))}
                        </div>
                        <div className="p-4 bg-muted/30 border-t border-border/50">
                           <Link href="/business-suite" className="text-[12px] font-bold text-primary hover:underline flex items-center justify-between">
                              Create a Company Page
                              <ChevronRight className="w-3 h-3" />
                           </Link>
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
