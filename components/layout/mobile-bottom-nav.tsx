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
  
  // Hide on Auth/Onboarding pages
  const isAuthPage = pathname === "/login" || pathname === "/signup" || pathname?.startsWith("/onboarding");
  if (isAuthPage) return null;

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/network", label: "My Network", icon: Users },
    { label: "Post", icon: PlusSquare, onClick: () => setIsPostModalOpen(true) },
    { href: "/notifications", label: "Notifications", icon: Bell, badge: 17 },
    { href: "/jobs", label: "Jobs", icon: Briefcase },
  ];

  const isActivePath = (href?: string) => {
    if (!href) return false;
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-[#E5E7EB] flex items-center justify-around h-[56px] pb-[4px] safe-area-bottom shadow-[0_-4px_16px_rgba(0,0,0,0.03)] backdrop-blur-md">
        {navItems.map((item) => {
          const isActive = isActivePath(item.href);
          
          const iconContent = (
            <div className="relative">
              <item.icon 
                className={`h-[24px] w-[24px] transition-all duration-200 ${isActive ? 'text-[#0A66C2] scale-110 stroke-[2.2px]' : 'text-[#6B7280] stroke-[1.8px] hover:text-[#1F2937]'}`} 
              />
              {item.badge && (
                <span className="absolute -top-1.5 -right-2.5 bg-red-600 text-white text-[9px] font-bold px-1 rounded-full min-w-[16px] h-[16px] flex items-center justify-center border-2 border-white shadow-sm">
                  {Math.min(item.badge, 99)}
                </span>
              )}
            </div>
          );

          if (item.onClick) {
            return (
              <button 
                key={item.label} 
                onClick={item.onClick}
                aria-label={`Open ${item.label} modal`}
                className="flex flex-col items-center justify-center w-full h-full gap-0.5 text-[#6B7280] transition-transform active:scale-90 group"
              >
                {iconContent}
                <span className="text-[11px] font-bold tracking-tight opacity-70 group-hover:opacity-100">{item.label}</span>
              </button>
            );
          }

          return (
            <Link 
              key={item.label} 
              href={item.href || "#"} 
              className={`flex flex-col items-center justify-center w-full h-full gap-0.5 transition-all active:scale-95 ${isActive ? 'text-[#0A66C2]' : 'text-[#6B7280]'}`}
            >
               {iconContent}
               <span className={`text-[11px] tracking-tight ${isActive ? 'font-black' : 'font-bold opacity-70'}`}>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Modern Post Modal Integration */}
      <PostModal 
        isOpen={isPostModalOpen} 
        onClose={() => setIsPostModalOpen(false)}
        user={{
          name: user ? `${user.firstName} ${user.lastName}` : "Professional User",
          avatar: user?.avatarUrl || "https://api.dicebear.com/7.x/initials/svg?seed=U"
        }}
      />
    </>
  );
}
