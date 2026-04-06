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
  Settings,
  LogOut,
  Bell,
  Menu,
  MessageCircle,
  HelpCircle
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

  const getUserInitials = () => {
    if (!user) return "GU";
    return `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase();
  };

  return (
    <header className="sticky top-0 z-[100] border-b border-[#E5E7EB] bg-white h-[56px] shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-all duration-200">
      <div className="mx-auto flex h-full max-w-6xl items-center px-4 justify-between gap-4">
        
        {/* Left: Branding & Search */}
        <div className="flex items-center gap-6 flex-1 max-w-[500px]">
          <Link href="/" className="shrink-0 flex items-center transition-transform active:scale-95">
            <div className="h-[34px] w-[34px] flex items-center justify-center rounded-lg bg-[#0A66C2] text-white shadow-sm ring-2 ring-white ring-offset-2 ring-offset-slate-50 overflow-hidden">
               <span className="text-xl font-bold tracking-tighter leading-none italic">c+</span>
            </div>
            <span className="hidden md:block ml-2.5 text-[22px] font-bold tracking-tight text-[#1F2937] leading-none font-sans">
              Connect<span className="text-[#0A66C2]">Plus</span>
            </span>
          </Link>

          {/* Search bar with Fokus highlights */}
          <div className="flex-1 relative hidden sm:block" ref={searchRef}>
              <form onSubmit={(e) => { e.preventDefault(); router.push(`/search?q=${searchQuery}`); }} className="relative group">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280] group-focus-within:text-[#0A66C2] transition-colors" />
                <Input
                  placeholder="Search professionals, insights..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 w-full bg-[#F3F6F8] border border-transparent text-[15px] pl-11 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#0A66C2]/20 focus-visible:border-[#0A66C2] rounded-[8px] transition-all"
                />
              </form>
          </div>
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-1 md:gap-2 h-full">
          
          {/* Quick Actions for Professional Engagement */}
          <div className="flex items-center gap-1 md:gap-2">
             <button className="p-2.5 rounded-[8px] text-[#6B7280] hover:text-[#1F2937] hover:bg-[#F3F6F8] transition-all" aria-label="Messages">
                <MessageCircle className="h-[22px] w-[22px] stroke-[1.8px]" />
             </button>
             <button className="p-2.5 rounded-[8px] text-[#6B7280] hover:text-[#1F2937] hover:bg-[#F3F6F8] transition-all relative" aria-label="Notifications">
                <Bell className="h-[22px] w-[22px] stroke-[1.8px]" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full ring-2 ring-white" />
             </button>
          </div>

          <div className="w-[1px] h-8 bg-[#E5E7EB] mx-1 hidden md:block" />

          {/* User Identity - Refined 'Me' Dropdown */}
          {!loading && user ? (
            <div className="flex items-center relative h-full" ref={meRef}>
               <button 
                  onClick={() => setActiveDropdown(activeDropdown === 'me' ? null : 'me')}
                  title="Profile and Settings"
                  aria-label="Toggle profile menu"
                  className={`flex items-center gap-2 h-11 px-2.5 rounded-[8px] transition-all hover:bg-[#F3F6F8] ${activeDropdown === 'me' ? 'text-[#0A66C2]' : 'text-[#6B7280]'}`}
               >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-[#0A66C2] text-white font-bold text-[13px] border-2 transition-all overflow-hidden ${activeDropdown === 'me' ? 'border-[#0A66C2] shadow-sm' : 'border-white'}`}>
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt="Me" className="w-full h-full object-cover" />
                    ) : (
                      <span className="leading-none">{getUserInitials()}</span>
                    )}
                  </div>
                  <div className="hidden lg:flex flex-col items-start mr-0.5 pointer-events-none">
                     <span className="text-[13px] font-bold text-[#1F2937] leading-none">{user.firstName}</span>
                     <span className="text-[11px] font-medium text-[#6B7280] mt-0.5">Me</span>
                  </div>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${activeDropdown === 'me' ? 'rotate-180 text-[#0A66C2]' : ''}`} />
               </button>

               {/* Dropdown Menu - Notion-style spacing and LinkedIn aesthetics */}
               {activeDropdown === 'me' && (
                  <div className="absolute top-[calc(100%+4px)] right-0 w-[240px] bg-white rounded-[12px] shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-[#E5E7EB] overflow-hidden animate-fade-in z-[110]">
                    <div className="p-4 flex items-center gap-3 bg-[#F3F6F8]/30">
                        <div className="w-10 h-10 rounded-full bg-[#0A66C2] flex items-center justify-center text-white font-bold text-[14px] shadow-sm transform transition-hover hover:scale-105">
                           {user.avatarUrl ? <img src={user.avatarUrl} className="w-full h-full rounded-full object-cover" alt="" /> : <span>{getUserInitials()}</span>}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-[#1F2937] tracking-tight truncate leading-none text-[15px]">{user.firstName} {user.lastName}</h4>
                          <p className="text-[12px] text-[#6B7280] font-medium truncate mt-1 leading-tight">{user.headline}</p>
                        </div>
                    </div>
                    
                    <div className="px-2 py-2 border-t border-[#E5E7EB]">
                        <Link href={`/profile/${user.username}`} onClick={() => setActiveDropdown(null)} className="flex items-center gap-3 px-3 py-2 text-[14px] font-medium text-[#1F2937] hover:bg-[#F3F6F8] rounded-[6px] transition-colors">
                           View Identity
                        </Link>
                        <Link href="/settings" onClick={() => setActiveDropdown(null)} className="flex items-center gap-3 px-3 py-2 text-[14px] font-medium text-[#1F2937] hover:bg-[#F3F6F8] rounded-[6px] transition-colors">
                           Privacy & Settings
                        </Link>
                        <button className="flex items-center gap-3 w-full px-3 py-2 text-[14px] font-medium text-[#1F2937] hover:bg-[#F3F6F8] rounded-[6px] transition-colors text-left">
                           Help Center
                        </button>
                    </div>
                    
                    <div className="border-t border-[#E5E7EB] p-2 bg-[#F9FAFB]/50">
                        <button 
                          onClick={async () => { await fetch("/api/logout", { method: "POST" }); window.location.href = "/login"; }}
                          className="w-full flex items-center gap-3 px-3 py-2 text-[13px] font-bold text-[#6B7280] hover:text-red-600 hover:bg-red-50 rounded-[6px] transition-all"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                    </div>
                  </div>
               )}
            </div>
          ) : !loading && (
            <div className="flex items-center gap-2">
               <Link href="/login" className="h-10 px-6 flex items-center justify-center rounded-[8px] border border-[#0A66C2] text-[#0A66C2] font-bold text-[14px] hover:bg-[#0A66C2]/5 transition-all active:scale-95">Sign In</Link>
               <Link href="/signup" className="h-10 px-6 flex items-center justify-center rounded-[8px] bg-[#0A66C2] text-white font-bold text-[14px] hover:bg-[#004182] transition-all shadow-sm active:scale-95">Join now</Link>
            </div>
          )}

          {/* Business Grid Menu */}
          {user && (
            <button 
              onClick={() => setActiveDropdown(activeDropdown === 'biz' ? null : 'biz')}
              className="p-2.5 rounded-[8px] text-[#6B7280] hover:text-[#1F2937] hover:bg-[#F3F6F8] transition-all ml-1 hidden sm:block"
              aria-label="Business tools"
              ref={bizRef}
            >
              <Grid3X3 className="h-6 w-6 stroke-[1.5px]" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
