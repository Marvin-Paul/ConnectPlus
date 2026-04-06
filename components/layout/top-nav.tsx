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
  User,
  Settings,
  HelpCircle,
  LogOut,
  Sparkles,
  PlusCircle,
  Target,
  BarChart3,
  BookOpen,
  Zap,
  Star,
  Eye,
  DollarSign,
  Mail,
  TrendingUp,
  ChevronRight,
  ThumbsUp,
  MoreHorizontal,
  ChevronRightCircle
} from "lucide-react";

export function TopNav() {
  const { user, loading } = useUser();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openNotifMenuId, setOpenNotifMenuId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const [notifications, setNotifications] = useState([
    { id: 1, text: "David Walusimbi and 14 others reacted to your update.", time: "2H", icon: ThumbsUp, color: "text-blue-500", bg: "bg-blue-50", unread: true },
    { id: 2, text: "Lead Backend Engineer role at SafeBoda matches your profile.", time: "5H", icon: Briefcase, color: "text-orange-500", bg: "bg-orange-50", unread: true },
    { id: 3, text: "Sarah Namayanja mentioned you in a comment.", time: "6H", icon: MessageSquare, color: "text-pink-500", bg: "bg-pink-50", unread: true },
    { id: 4, text: "12 people viewed your profile today. unlock Premium.", time: "10H", icon: Star, color: "text-yellow-500", bg: "bg-yellow-50", unread: true }
  ]);
  const [messages, setMessages] = useState([
    { id: 1, name: "Dr. Catherine Namubiru", text: "Let's chat about potential MTN collaborations.", time: "3:42 PM", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80", unread: true },
    { id: 2, name: "Recruiter @ Chipper Cash", text: "Is your InMail working? We have an opening.", time: "1:20 PM", avatar: "CC", unread: false },
    { id: 3, name: "Isaac Kato", text: "Documentation sent. Check your email.", time: "Yesterday", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80", unread: false }
  ]);

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/network", label: "My Network", icon: Users },
    { href: "/jobs", label: "Jobs", icon: Briefcase },
    { 
      href: "/messaging", 
      label: "Messaging", 
      icon: MessageSquare, 
      badge: messages.filter(m => m.unread).length > 0 ? messages.filter(m => m.unread).length : undefined 
    },
    { 
      href: "/notifications", 
      label: "Notifications", 
      icon: Bell, 
      badge: notifications.filter(n => n.unread).length > 0 ? notifications.filter(n => n.unread).length : undefined 
    },
  ];

  const isActivePath = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const userName = user ? `${user.firstName} ${user.lastName}` : "Guest User";
  const userHeadline = user?.headline || "Visitor";
  const userAvatar = user?.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=Guest`;
  
  const meRef = useRef<HTMLDivElement>(null);
  const bizRef = useRef<HTMLDivElement>(null);
  const premRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const msgRef = useRef<HTMLDivElement>(null);

  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const selectedNotif = notifications.find(n => n.id === openNotifMenuId) || null;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (meRef.current && !meRef.current.contains(event.target as Node) && 
          bizRef.current && !bizRef.current.contains(event.target as Node) &&
          premRef.current && !premRef.current.contains(event.target as Node) &&
          notifRef.current && !notifRef.current.contains(event.target as Node) &&
          msgRef.current && !msgRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setOpenNotifMenuId(null);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) setShowSearchSuggestions(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchSuggestions(false);
    }
  };

  const suggestions = [
    { type: 'person', label: 'Dr. Catherine Namubiru', sub: 'CIO at MTN Uganda', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80' },
    { type: 'job', label: 'Senior Backend Engineer', sub: 'SafeBoda • Kampala • Remote', icon: Briefcase },
    { type: 'person', label: 'Isaac Kato', sub: 'Tech Lead @ Chipper Cash', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80' },
    { type: 'post', label: 'Next.js 15 & React 19 Trends', sub: 'Trending in Uganda Tech', icon: TrendingUp }
  ].filter(s => s.label.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <header className="sticky top-0 z-[100] border-b bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between h-[52px] px-4">
        
        {/* Logo & Search */}
        <div className="flex items-center gap-2 flex-1 max-w-[400px] relative" ref={searchRef}>
          <Link href="/" className="inline-flex items-center">
            <div className="inline-grid h-[34px] w-[34px] place-items-center rounded-lg bg-primary text-white shadow-lg shadow-primary/10">
               <span className="text-xl font-black leading-none tracking-tighter">c+</span>
            </div>
          </Link>

          <div className="relative flex-1 ml-4 group hidden md:block">
            <form onSubmit={handleSearch}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <Input
                id="global-search"
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onFocus={() => setShowSearchSuggestions(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-[34px] w-full bg-slate-100 border-none text-sm placeholder:text-slate-400 pl-10 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all duration-500 rounded-full"
              />
            </form>

            {showSearchSuggestions && searchQuery.length > 0 && (
              <div className="absolute top-[calc(100%+8px)] left-0 w-[400px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden z-50">
                {suggestions.map((s, i) => (
                  <div key={i} className="px-5 py-3 hover:bg-slate-50 flex items-center gap-3 cursor-pointer border-b border-slate-50 last:border-0" onClick={() => { setSearchQuery(s.label); setShowSearchSuggestions(false); router.push(`/search?q=${s.label}`); }}>
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden">
                       {'avatar' in s ? <img src={s.avatar} alt={s.label} className="w-full h-full object-cover" /> : <s.icon className="w-4 h-4 text-slate-400" />}
                    </div>
                    <div>
                      <h5 className="text-[12px] font-bold text-slate-800 leading-none">{s.label}</h5>
                      <p className="text-[10px] text-slate-400 mt-0.5">{s.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center h-full">
          {user && navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`flex flex-col items-center justify-center min-w-[50px] md:min-w-[80px] h-full transition hover:text-primary relative group ${isActivePath(link.href) ? 'text-primary' : 'text-slate-500'}`}
            >
              <div className="relative">
                <link.icon className={`h-6 w-6 stroke-[1.5px] transition-transform group-hover:scale-110 ${isActivePath(link.href) ? 'fill-primary/10' : ''}`} />
                {link.badge && (
                  <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[9px] font-black px-1 rounded-full min-w-[16px] h-[16px] grid place-items-center border-2 border-white">
                    {link.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-0.5 font-bold uppercase tracking-widest hidden lg:block opacity-70 group-hover:opacity-100 transition-opacity scale-90">{link.label}</span>
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-transform origin-center ${isActivePath(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
            </Link>
          ))}

          {!user && !loading ? (
            <div className="flex items-center gap-3 ml-4 h-full">
              <Link
                href="/signup"
                className="px-6 h-10 flex items-center justify-center rounded-full text-slate-500 font-bold text-[11px] uppercase tracking-widest hover:text-primary hover:bg-slate-50 transition-all"
              >
                Join now
              </Link>
              <Link
                href="/login"
                className="px-6 h-10 flex items-center justify-center rounded-full border-2 border-primary text-primary font-bold text-[11px] uppercase tracking-widest hover:bg-primary/5 transition-all"
              >
                Sign in
              </Link>
            </div>
          ) : user ? (
            <>
              {/* Profile */}
              <div className="relative h-full" ref={meRef}>
                <button 
                  onClick={() => setActiveDropdown(activeDropdown === 'me' ? null : 'me')}
                  className={`flex flex-col items-center justify-center min-w-[50px] md:min-w-[64px] h-full text-slate-500 hover:text-primary transition-all ${activeDropdown === 'me' ? 'text-primary' : ''}`}
                >
                  <div className={`w-7 h-7 rounded-full overflow-hidden mb-0.5 border-2 transition-all ${activeDropdown === 'me' ? 'border-primary' : 'border-slate-100'}`}>
                    <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex items-center gap-0.5">
                    <span className="text-[11px] font-bold uppercase tracking-widest hidden lg:block opacity-70 scale-90">Me</span>
                    <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${activeDropdown === 'me' ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {activeDropdown === 'me' && (
                  <div className="absolute top-[52px] right-0 w-[280px] bg-white rounded-b-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden animate-in slide-in-from-top-2 duration-300">
                    <div className="p-5 flex items-start gap-3">
                        <img src={userAvatar} className="w-12 h-12 rounded-full object-cover shadow-md" alt={userName} />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-black text-slate-800 tracking-tight leading-tight truncate">{userName}</h4>
                          <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5 leading-relaxed">{userHeadline}</p>
                        </div>
                    </div>
                    <div className="px-4 pb-4">
                        <Link href={`/profile/${user.username || 'demo-user'}`} onClick={() => setActiveDropdown(null)} className="w-full flex items-center justify-center py-1.5 rounded-full border border-primary text-primary font-black text-[11px] uppercase tracking-widest hover:bg-primary/5 transition-colors">
                          View Profile
                        </Link>
                    </div>
                    <div className="py-2 border-t border-slate-100">
                        <Link href="/settings" onClick={() => setActiveDropdown(null)} className="px-5 py-2.5 flex items-center gap-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                          <Settings className="w-4 h-4 text-slate-400" /> Settings & Privacy
                        </Link>
                    </div>
                    <div className="border-t border-slate-100 py-2">
                        <button 
                          onClick={async () => {
                            await fetch("/api/logout", { method: "POST" });
                            window.location.href = "/login";
                          }}
                          className="w-full px-5 py-3 flex items-center gap-3 text-sm font-black text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all text-left"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Business Dropdown */}
              <div className="relative h-full" ref={bizRef}>
                <button 
                  onClick={() => setActiveDropdown(activeDropdown === 'business' ? null : 'business')}
                  className={`hidden md:flex flex-col items-center justify-center min-w-[80px] h-full text-slate-500 hover:text-primary transition-all ${activeDropdown === 'business' ? 'text-primary' : ''}`}
                >
                  <Grid3X3 className="h-6 w-6 stroke-[1.5px]" />
                  <div className="flex items-center gap-0.5">
                    <span className="text-[11px] font-bold uppercase tracking-widest hidden lg:block opacity-70 scale-90">Business</span>
                    <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${activeDropdown === 'business' ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {activeDropdown === 'business' && (
                  <div className="absolute top-[52px] right-0 w-[300px] bg-white rounded-b-[2rem] shadow-[0_30px_90px_rgba(0,0,0,0.2)] border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-300">
                    <div className="p-6 border-b border-slate-50 bg-slate-50/30">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-primary mb-4">Employer Solutions</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <Link href="/jobs/post" onClick={() => setActiveDropdown(null)} className="p-4 rounded-xl bg-white border border-slate-100 hover:border-primary transition-all flex flex-col items-center text-center">
                              <PlusCircle className="w-5 h-5 text-primary mb-2" />
                              <span className="text-[9px] font-black uppercase tracking-widest text-slate-700">Post a Job</span>
                          </Link>
                          <Link href="/network/talent" onClick={() => setActiveDropdown(null)} className="p-4 rounded-xl bg-white border border-slate-100 hover:border-primary transition-all flex flex-col items-center text-center">
                              <Target className="w-5 h-5 text-blue-500 mb-2" />
                              <span className="text-[9px] font-black uppercase tracking-widest text-slate-700">Talent Hub</span>
                          </Link>
                        </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : null}
        </nav>
      </div>

      {/* Notifications Side-Menu (Mobile) or dropdown menu logic here could be added back if needed */}
    </header>
  );
}
