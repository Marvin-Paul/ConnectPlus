"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Home, Users, PlusSquare, Bell, Briefcase } from "lucide-react";
import { PostModal } from "../feed/post-modal";
import { useUser } from "../providers/user-provider";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { user } = useUser();
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  
  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/network", label: "My Network", icon: Users },
    { label: "Post", icon: PlusSquare, onClick: () => setIsPostModalOpen(true) },
    { href: "/notifications", label: "Notifications", icon: Bell, badge: 17 },
    { href: "/jobs", label: "Jobs", icon: Briefcase },
  ];

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-slate-200 flex items-center justify-around h-[52px] pb-1 safe-area-bottom shadow-[0_-4px_24px_rgba(0,0,0,0.04)]">
        {navItems.map((item) => {
          const isActive = item.href ? (pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))) : false;
          
          const iconContent = (
            <div className="relative">
              <item.icon className={`h-[22px] w-[22px] ${isActive ? 'text-[#0A66C2]' : 'text-slate-500'}`} strokeWidth={isActive ? 2.5 : 2} />
              {item.badge && (
                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[9px] font-bold px-1 rounded-full min-w-[16px] h-[16px] flex items-center justify-center border border-white">
                  {item.badge}
                </span>
              )}
            </div>
          );

          if (item.onClick) {
            return (
              <button 
                key={item.label} 
                onClick={item.onClick}
                className="flex flex-col items-center justify-center w-full h-full gap-[2px] text-slate-500 active:scale-95 transition-transform"
              >
                {iconContent}
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          }

          return (
            <Link key={item.label} href={item.href || "#"} className={`flex flex-col items-center justify-center w-full h-full gap-[2px] ${isActive ? 'text-[#0A66C2]' : 'text-slate-500'}`}>
               {iconContent}
               <span className={`text-[10px] ${isActive ? 'font-semibold' : 'font-medium'}`}>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Post Modal Portal Integration */}
      <PostModal 
        isOpen={isPostModalOpen} 
        onClose={() => setIsPostModalOpen(false)}
        user={{
          name: user ? `${user.firstName} ${user.lastName}` : "Marvin Muwereza",
          avatar: user?.avatarUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80"
        }}
      />
    </>
  );
}
