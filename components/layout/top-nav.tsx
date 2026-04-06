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
  MoreHorizontal
} from "lucide-react";

// navLinks moved inside component to be fully dynamic based on mock state

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


  const userName = user ? `${user.firstName} ${user.lastName}` : "Marvin Muwereza";
  const userHeadline = user?.headline || "Senior Full-Stack Engineer | AI Expert";
  const userAvatar = user?.avatarUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80";
  
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
        
        {/* ── Mobile Top Nav (Hidden on md+) ── */}
        <div className="flex w-full md:hidden items-center gap-3 h-full">
           <Link href="/profile/demo-user" className="shrink-0 w-8 h-8 rounded-full overflow-hidden border border-slate-200">
             <img src={userAvatar} alt="Profile" className="w-full h-full object-cover" />
           </Link>
           
           <form onSubmit={handleSearch} className="flex-1 relative h-[34px] group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600" />
              <Input
                type="search"
                placeholder="Search"
                value={searchQuery}
                onFocus={() => setShowSearchSuggestions(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-full w-full bg-[#edf3f8] border-none text-[14px] text-slate-900 placeholder:text-slate-600 pl-9 rounded-[4px] focus-visible:ring-0 focus-visible:ring-offset-0"
              />
           </form>

           <Link href="/messaging" className="shrink-0 text-slate-500 hover:text-slate-900 relative">
             <MessageSquare className="h-6 w-6 fill-current" />
             <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white"></div>
           </Link>
        </div>

        {/* ── Desktop Logo & Search (Hidden on mobile) ── */}
        <div className="hidden md:flex items-center gap-2 flex-1 max-w-[400px] relative" ref={searchRef}>
          <Link href="/" className="inline-flex items-center">
            <div className="inline-grid h-[34px] w-[34px] place-items-center rounded-lg bg-primary text-white shadow-lg shadow-primary/10">
               <span className="text-xl font-black leading-none tracking-tighter">c+</span>
            </div>
          </Link>

          <div className="relative flex-1 ml-4 group">
            <form onSubmit={handleSearch}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <Input
                id="global-search"
                type="search"
                placeholder="Search people, jobs, posts..."
                value={searchQuery}
                autoComplete="off"
                onFocus={() => setShowSearchSuggestions(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-[34px] w-full bg-slate-100 border-none text-sm placeholder:text-slate-400 pl-10 focus-visible:ring-2 focus-visible:ring-primary/20 focus:w-[130%] transition-all duration-500 rounded-full z-20"
              />
            </form>

            {/* Search Suggestions Dropdown */}
            {showSearchSuggestions && (searchQuery.length > 0 || suggestions.length > 0) && (
              <div className="absolute top-[calc(100%+8px)] left-0 w-[480px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden animate-in slide-in-from-top-2 duration-300 z-50">
                 <div className="p-4 border-b border-slate-50 bg-slate-50/50">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Professional Suggestions</h4>
                 </div>
                 <div className="max-h-[400px] overflow-y-auto">
                    {suggestions.map((s, i) => (
                      <div 
                        key={i} 
                        onClick={() => {
                          setSearchQuery(s.label);
                          setShowSearchSuggestions(false);
                          router.push(`/search?q=${encodeURIComponent(s.label)}`);
                        }}
                        className="px-6 py-4 hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-50 last:border-0 group flex items-center gap-4"
                      >
                         <div className="shrink-0 w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                            {'avatar' in s ? <img src={s.avatar} className="w-full h-full object-cover" /> : <s.icon className="w-5 h-5 text-slate-400" />}
                         </div>
                         <div className="flex-1 min-w-0">
                            <h5 className="text-[13px] font-black text-slate-800 tracking-tight leading-none group-hover:text-primary transition-colors italic">{s.label}</h5>
                            <p className="text-[11px] text-slate-400 font-bold mt-1 line-clamp-1 italic">{s.sub}</p>
                         </div>
                         <ChevronRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                      </div>
                    ))}
                 </div>
                 <button 
                  onClick={handleSearch}
                  className="w-full py-4 text-center text-[11px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 transition-all outline-none"
                 >
                   View all Link Results
                 </button>
              </div>
            )}
          </div>
        </div>

        {/* Global Navigation (Desktop only) */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center h-full">
          {navLinks.map((link) => {
            if (link.label === "Notifications") {
              return (
                <div key={link.label} className="relative h-full" ref={notifRef}>
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === 'notifications' ? null : 'notifications')}
                    className={`flex flex-col items-center justify-center min-w-[50px] md:min-w-[80px] h-full transition hover:text-primary relative group ${activeDropdown === 'notifications' || isActivePath(link.href) ? 'text-primary' : 'text-slate-500'}`}
                  >
                    <div className="relative">
                      <link.icon className={`h-6 w-6 stroke-[1.5px] group-hover:scale-110 transition-transform ${isActivePath(link.href) ? 'fill-primary/10' : ''}`} />
                      {link.badge && (
                        <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[9px] font-black px-1 rounded-full min-w-[16px] h-[16px] grid place-items-center border-2 border-white shadow-sm">
                          {link.badge > 9 ? '9+' : link.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] mt-0.5 font-bold uppercase tracking-widest hidden lg:block opacity-70 group-hover:opacity-100 transition-opacity scale-90">{link.label}</span>
                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-transform origin-center ${activeDropdown === 'notifications' || isActivePath(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                  </button>

                  {activeDropdown === 'notifications' && (
                    <div className="absolute top-[52px] right-[-140px] w-[400px] bg-white rounded-b-3xl shadow-[0_20px_80px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden animate-in slide-in-from-top-2 duration-300">
                      <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-white">
                        <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Recent Notifications</h4>
                        {notifications.filter(n => n.unread).length > 0 && (
                          <button 
                            onClick={() => setNotifications(prev => prev.map(n => ({...n, unread: false})))}
                            className="text-[11px] font-black text-primary uppercase tracking-widest hover:underline"
                          >
                            Mark all read
                          </button>
                        )}
                      </div>
                      <div className="max-h-[500px] overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-8 text-center text-slate-500 text-xs font-medium">No new notifications.</div>
                        ) : notifications.map((notif) => (
                          <div key={notif.id} className="p-6 flex items-start gap-4 hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-50 last:border-0 group">
                            <div className={`w-14 h-14 rounded-full ${notif.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                              <notif.icon className={`h-7 w-7 ${notif.color}`} />
                            </div>
                            <div className="flex-1 min-w-0 pr-4">
                              <p className="text-[15px] font-black text-slate-800 leading-[1.3] mb-1">{notif.text}</p>
                              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-1 block italic">{notif.time}</span>
                            </div>
                            <div className="flex items-center gap-4 shrink-0 relative">
                                {notif.unread && (
                                  <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
                                )}
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenNotifMenuId(openNotifMenuId === notif.id ? null : notif.id);
                                  }}
                                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${openNotifMenuId === notif.id ? 'bg-slate-200 text-slate-900' : 'bg-slate-50 hover:bg-slate-100 text-slate-400'}`}
                                >
                                   <MoreHorizontal className="h-5 w-5" />
                                </button>

                             </div>
                          </div>
                        ))}
                      </div>
                        <Link 
                        href="/notifications" 
                        onClick={() => setActiveDropdown(null)}
                        className="w-full py-5 bg-slate-50/50 border-t border-slate-100 text-center block text-[12px] font-black uppercase tracking-widest text-slate-500 hover:text-primary hover:bg-slate-100 transition-all active:bg-slate-200"
                      >
                        See all notifications
                      </Link>
                    </div>
                  )}
                </div>
              );
            }

            if (link.label === "Messaging") {
              return (
                <div key={link.label} className="relative h-full" ref={msgRef}>
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === 'messaging' ? null : 'messaging')}
                    className={`flex flex-col items-center justify-center min-w-[50px] md:min-w-[80px] h-full transition hover:text-primary relative group ${activeDropdown === 'messaging' || isActivePath(link.href) ? 'text-primary' : 'text-slate-500'}`}
                  >
                    <div className="relative">
                      <link.icon className={`h-6 w-6 stroke-[1.5px] group-hover:scale-110 transition-transform ${isActivePath(link.href) ? 'fill-primary/10' : ''}`} />
                      {link.badge && (
                        <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[9px] font-black px-1 rounded-full min-w-[16px] h-[16px] grid place-items-center border-2 border-white shadow-sm">
                          {link.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] mt-0.5 font-bold uppercase tracking-widest hidden lg:block opacity-70 group-hover:opacity-100 transition-opacity scale-90">{link.label}</span>
                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-transform origin-center ${activeDropdown === 'messaging' || isActivePath(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                  </button>

                  {activeDropdown === 'messaging' && (
                    <div className="absolute top-[52px] right-[-100px] w-[360px] bg-white rounded-b-3xl shadow-[0_20px_80px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden animate-in slide-in-from-top-2 duration-300">
                      <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Direct Messages</h4>
                        <Link href="/messaging" onClick={() => setActiveDropdown(null)} className="text-[9px] font-black text-primary uppercase tracking-widest hover:underline">New Message</Link>
                      </div>
                      <div className="max-h-[400px] overflow-y-auto">
                        {messages.length === 0 ? (
                           <div className="p-8 text-center text-slate-500 text-xs font-medium">No direct messages.</div>
                        ) : messages.map((chat) => (
                          <div key={chat.id} className="p-4 flex gap-3 hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-50 last:border-0">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 font-black text-slate-400 text-xs overflow-hidden">
                              {chat.avatar.startsWith('http') ? <img src={chat.avatar} className="w-full h-full object-cover" alt="" /> : chat.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="text-xs font-black text-slate-800 tracking-tight leading-none mb-1">{chat.name}</h5>
                              <p className={`text-[11px] leading-snug line-clamp-1 italic ${chat.unread ? 'font-bold text-slate-700' : 'text-slate-400 font-medium'}`}>{chat.text}</p>
                            </div>
                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">{chat.time}</span>
                          </div>
                        ))}
                      </div>
                      <Link 
                        href="/messaging" 
                        onClick={() => setActiveDropdown(null)}
                        className="w-full py-3.5 bg-slate-50 border-t border-slate-100 text-center block text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary hover:bg-slate-100 transition-all"
                      >
                        See all in Messaging
                      </Link>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`flex flex-col items-center justify-center min-w-[50px] md:min-w-[80px] h-full transition hover:text-primary relative group ${isActivePath(link.href) ? 'text-primary' : 'text-slate-500'}`}
              >
                <div className="relative">
                  <link.icon className={`h-6 w-6 stroke-[1.5px] group-hover:scale-110 transition-transform ${isActivePath(link.href) ? 'fill-primary/10' : ''}`} />
                  {link.badge && (
                    <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[9px] font-black px-1 rounded-full min-w-[16px] h-[16px] grid place-items-center border-2 border-white shadow-sm">
                      {link.badge > 9 ? '9+' : link.badge}
                    </span>
                  )}
                </div>
                <span className="text-[11px] mt-0.5 font-bold uppercase tracking-widest hidden lg:block opacity-70 group-hover:opacity-100 transition-opacity scale-90">{link.label}</span>
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-transform origin-center ${isActivePath(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </Link>
            );
          })}

          {/* Profile Dropdown */}
          <div className="relative h-full" ref={meRef}>
            <button 
              onClick={() => setActiveDropdown(activeDropdown === 'me' ? null : 'me')}
              className={`flex flex-col items-center justify-center min-w-[50px] md:min-w-[64px] h-full text-slate-500 hover:text-primary md:border-r border-slate-100 md:mr-2 md:pr-2 group transition-all ${activeDropdown === 'me' ? 'text-primary' : ''}`}
            >
              <div className={`w-7 h-7 rounded-full overflow-hidden mb-0.5 border-2 transition-all ${activeDropdown === 'me' ? 'border-primary' : 'border-slate-100 group-hover:border-primary'}`}>
                <img src={userAvatar} alt="Me" className="w-full h-full object-cover" />
              </div>
              <div className="flex items-center gap-0.5">
                <span className="text-[11px] font-bold uppercase tracking-widest hidden lg:block opacity-70 scale-90">Me</span>
                <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${activeDropdown === 'me' ? 'rotate-180' : ''}`} />
              </div>
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-transform origin-center ${activeDropdown === 'me' ? 'scale-x-100' : 'scale-x-0'}`} />
            </button>

            {activeDropdown === 'me' && (
              <div className="absolute top-[52px] right-0 w-[280px] bg-white rounded-b-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden animate-in slide-in-from-top-2 duration-300">
                 <div className="p-5 flex items-start gap-3">
                    <img src={userAvatar} className="w-12 h-12 rounded-full object-cover shadow-md" alt="" />
                    <div className="flex-1 min-w-0">
                       <h4 className="font-black text-slate-800 tracking-tight leading-tight truncate">{userName}</h4>
                       <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5 leading-relaxed">{userHeadline}</p>
                    </div>
                 </div>
                 <div className="px-4 pb-4">
                    <Link href="/profile/demo-user" onClick={() => setActiveDropdown(null)} className="w-full flex items-center justify-center py-1.5 rounded-full border border-[#1B5E20] text-[#1B5E20] font-black text-[11px] uppercase tracking-widest hover:bg-green-50 transition-colors">
                       View Profile
                    </Link>
                 </div>
                 <div className="py-2 border-t border-slate-100">
                    <Link href="/settings" onClick={() => setActiveDropdown(null)} className="px-5 py-2.5 flex items-center gap-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                       <Settings className="w-4 h-4 text-slate-400" /> Settings & Privacy
                    </Link>
                    <Link href="/help" onClick={() => setActiveDropdown(null)} className="px-5 py-2.5 flex items-center gap-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                       <HelpCircle className="w-4 h-4 text-slate-400" /> Help Center
                    </Link>
                 </div>
                 <div className="border-t border-slate-100 py-2">
                    <button 
                      onClick={() => {
                        window.location.reload();
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
              className={`hidden md:flex flex-col items-center justify-center min-w-[80px] h-full text-slate-500 hover:text-primary group relative transition-all ${activeDropdown === 'business' ? 'text-primary' : ''}`}
            >
              <Grid3X3 className="h-6 w-6 stroke-[1.5px] group-hover:scale-110 transition-transform" />
              <div className="flex items-center gap-0.5">
                <span className="text-[11px] font-bold uppercase tracking-widest hidden lg:block opacity-70 scale-90">Business</span>
                <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${activeDropdown === 'business' ? 'rotate-180' : ''}`} />
              </div>
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-transform origin-center ${activeDropdown === 'business' ? 'scale-x-100' : 'scale-x-0'}`} />
            </button>

            {activeDropdown === 'business' && (
              <div className="absolute top-[52px] right-0 w-[340px] bg-white rounded-b-[2.5rem] shadow-[0_30px_90px_rgba(0,0,0,0.2)] border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-300">
                 <div className="p-8 border-b border-slate-50 bg-slate-50/30">
                    <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#1B5E20] mb-6">Employer Solutions</h4>
                    <div className="grid grid-cols-2 gap-4">
                       <Link href="/jobs/post" onClick={() => setActiveDropdown(null)} className="p-4 rounded-2xl bg-white border border-slate-100 group/item hover:border-[#1B5E20] transition-all flex flex-col items-center text-center shadow-sm">
                          <PlusCircle className="w-6 h-6 text-[#1B5E20] mb-2 group-hover/item:scale-110 transition-transform" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">Post a Job</span>
                       </Link>
                       <Link href="/network/talent" onClick={() => setActiveDropdown(null)} className="p-4 rounded-2xl bg-white border border-slate-100 group/item hover:border-[#1B5E20] transition-all flex flex-col items-center text-center shadow-sm">
                          <Target className="w-6 h-6 text-blue-500 mb-2 group-hover/item:scale-110 transition-transform" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">Talent Solutions</span>
                       </Link>
                    </div>
                 </div>
                 
                 <div className="p-6 space-y-2">
                    {[
                      { href: "/network/pages", icon: BarChart3, label: "Company Page Mgmt", desc: "Customize branding & analytics", color: "text-orange-500" },
                      { href: "/advertise", icon: TrendingUp, label: "Advertise", desc: "Sponsored jobs & spotlights", color: "text-purple-500" },
                      { href: "/learning", icon: BookOpen, label: "Learning Academy", desc: "Expert training modules", color: "text-green-500" },
                      { href: "/jobs/post", icon: Zap, label: "Post a Job (Lite)", desc: "Quick hire for small business", color: "text-yellow-500" }
                    ].map((item, idx) => (
                      <Link key={idx} href={item.href} onClick={() => setActiveDropdown(null)} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 group/row transition-all">
                         <div className={`p-2 rounded-xl bg-slate-100 ${item.color} group-hover/row:scale-110 transition-transform`}>
                            <item.icon className="w-4 h-4" />
                         </div>
                         <div className="flex-1 min-w-0">
                            <h5 className="text-[11px] font-black uppercase tracking-widest text-slate-800">{item.label}</h5>
                            <p className="text-[9px] text-slate-400 font-bold mt-0.5 line-clamp-1 italic">{item.desc}</p>
                         </div>
                         <ChevronRight className="w-3 h-3 text-slate-300 group-hover/row:text-[#1B5E20] transition-colors" />
                      </Link>
                    ))}
                 </div>
                 
                 <div className="p-6 bg-[#1B5E20] text-center">
                     <p className="text-[10px] font-black uppercase tracking-widest text-green-200 mb-1">Scale your vision</p>
                     <Link href="/business-suite" onClick={() => setActiveDropdown(null)} className="text-sm font-black text-white hover:underline flex items-center justify-center gap-2 mx-auto">
                        Explore Business Suite <PlusCircle className="w-4 h-4" />
                     </Link>
                   </div>
               </div>
            )}
          </div>
          
          {/* Unleash Premium Button */}
          <div className="hidden md:relative h-full" ref={premRef}>
            <button 
              onClick={() => setActiveDropdown(activeDropdown === 'premium' ? null : 'premium')}
              className={`flex flex-col items-center justify-center min-w-[100px] h-full text-accent font-black uppercase tracking-[0.1em] hover:text-accent/80 leading-[1.1] text-center transition-all group ${activeDropdown === 'premium' ? 'bg-accent/10' : ''}`}
            >
              <div className="relative">
                 <Sparkles className={`w-6 h-6 mb-0.5 transition-all duration-500 ${activeDropdown === 'premium' ? 'rotate-180 scale-125' : 'group-hover:scale-110'}`} />
                 <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                 </span>
              </div>
              <span className="text-[10px] scale-90">Unleash <br /> Premium</span>
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-[#A57C00] transition-transform origin-center ${activeDropdown === 'premium' ? 'scale-x-100' : 'scale-x-0'}`} />
            </button>

            {activeDropdown === 'premium' && (
              <div className="absolute top-[52px] right-0 w-[380px] bg-slate-900 rounded-b-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.4)] overflow-hidden animate-in slide-in-from-top-4 duration-500 border border-slate-800">
                 {/* Header */}
                 <div className="p-10 bg-gradient-to-br from-[#1B5E20] to-slate-900 border-b border-white/5">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-yellow-500 mb-4 flex items-center gap-2">
                       <Star className="w-4 h-4 fill-yellow-500" /> Exclusive Access
                    </h3>
                    <h4 className="text-2xl font-black text-white tracking-tighter leading-tight mb-2">Connect+ Premium</h4>
                    <p className="text-xs text-white/60 font-medium leading-relaxed italic">"Get noticed by 3x more recruiters and unlock elite career insights."</p>
                 </div>

                 <div className="p-8 space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                       {[
                         { href: "/premium/analytics", icon: Star, label: "Featured Applicant", desc: "Top-tier ranking in recruiter lists", color: "text-yellow-500" },
                         { href: "/premium/analytics", icon: Eye, label: "Who Viewed You", desc: "90-day detailed visitor analytics", color: "text-blue-400" },
                         { href: "/premium/analytics", icon: DollarSign, label: "Salary Insights", desc: "Precise role-based negotiation data", color: "text-green-400" },
                         { href: "/messaging", icon: Mail, label: "Direct InMail", desc: "Message hiring managers instantly", color: "text-purple-400" },
                         { href: "/premium/analytics", icon: BarChart3, label: "Applicant Insights", desc: "Competitive intelligence & rankings", color: "text-orange-400" },
                         { href: "/learning", icon: BookOpen, label: "Elite Learning", desc: "Full certification library access", color: "text-indigo-400" }
                       ].map((feat, idx) => (
                         <Link key={idx} href={feat.href} onClick={() => setActiveDropdown(null)} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 group/feat transition-all cursor-pointer">
                            <div className={`p-2.5 rounded-xl bg-white/5 ${feat.color} group-hover/feat:scale-110 transition-transform`}>
                               <feat.icon className="w-4.5 h-4.5" />
                            </div>
                            <div className="flex-1">
                               <h5 className="text-[11px] font-black uppercase tracking-widest text-white">{feat.label}</h5>
                               <p className="text-[9px] text-white/40 font-bold mt-1 line-clamp-1 italic">{feat.desc}</p>
                            </div>
                            <div className="w-1.5 h-1.5 bg-yellow-500/20 rounded-full group-hover/feat:bg-yellow-500 transition-colors" />
                         </Link>
                       ))}
                    </div>

                    <div className="pt-6 border-t border-white/5 flex flex-col gap-4">
                       <Link href="/premium/analytics" onClick={() => setActiveDropdown(null)} className="w-full py-4 rounded-full bg-yellow-400 text-slate-900 font-black text-center text-xs uppercase tracking-[0.2em] hover:bg-yellow-500 transition-all shadow-xl shadow-yellow-900/20 active:scale-95">
                          Start 1 Month Zero Cost
                       </Link>
                       <p className="text-[8px] text-white/30 text-center uppercase tracking-widest font-black">Cancel anytime. Experience professional link infinity.</p>
                    </div>
                 </div>
              </div>
            )}
          </div>
        </nav>

      </div>

      {selectedNotif && (
        <div className="fixed inset-0 z-[140]">
          <button
            type="button"
            aria-label="Close notification options"
            onClick={() => setOpenNotifMenuId(null)}
            className="absolute inset-0 bg-black/20"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[2rem] shadow-[0_-20px_60px_rgba(0,0,0,0.2)] border-t border-slate-100 py-2 animate-in slide-in-from-bottom-4 duration-200">
            <div className="w-12 h-1.5 rounded-full bg-slate-300 mx-auto my-3" />
            <button
              onClick={() => {
                setNotifications(prev => prev.map(n => n.id === selectedNotif.id ? { ...n, unread: false } : n));
                setOpenNotifMenuId(null);
              }}
              className="w-full text-left px-6 py-4 text-[18px] font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Mark as read
            </button>
            <button
              onClick={() => {
                setNotifications(prev => prev.filter(n => n.id !== selectedNotif.id));
                setOpenNotifMenuId(null);
              }}
              className="w-full text-left px-6 py-4 text-[18px] font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Remove notification
            </button>
            <button onClick={() => setOpenNotifMenuId(null)} className="w-full text-left px-6 py-4 text-[18px] font-medium text-slate-700 hover:bg-slate-50 transition-colors">
              Notification settings
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
