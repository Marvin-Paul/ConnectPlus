import { 
  Users, 
  UserPlus, 
  BookOpen, 
  Calendar, 
  Newspaper, 
  Hash, 
  Bookmark,
  ChevronDown
} from "lucide-react";
import Link from "next/link";

const sidebarLinks = [
  { label: "Connections", count: 842, icon: Users, href: "/network/connections" },
  { label: "Contacts", icon: UserPlus, href: "/network/contacts" },
  { label: "Following & Followers", icon: BookOpen, href: "/network/following" },
  { label: "Groups", icon: Users, href: "/network/groups" },
  { label: "Events", icon: Calendar, href: "/events" },
  { label: "Pages", count: 24, icon: Bookmark, href: "/network/pages" },
  { label: "Newsletters", icon: Newspaper, href: "/network/newsletters" },
  { label: "Hashtags", icon: Hash, href: "/network/hashtags" },
];

export function NetworkSidebar() {
  return (
    <div className="bg-white rounded-xl border border-[#e0e0e0] overflow-hidden shadow-sm">
      <div className="p-4 border-b border-[#e0e0e0]">
        <h2 className="text-base font-medium text-slate-800">Manage my network</h2>
      </div>
      
      <nav className="py-2">
        {sidebarLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="flex items-center justify-between px-4 py-3 text-sm text-[#666666] hover:bg-[#f3f3f3] transition-colors group"
          >
            <div className="flex items-center gap-3">
              <link.icon className="h-5 w-5 text-[#666666] group-hover:text-black" />
              <span className="group-hover:text-black font-medium">{link.label}</span>
            </div>
            {link.count && (
              <span className="text-xs font-normal text-[#666666]">{link.count}</span>
            )}
          </Link>
        ))}
      </nav>

      <button className="w-full flex items-center justify-center gap-1.5 py-4 border-t border-[#e0e0e0] text-sm font-medium text-[#666666] hover:bg-[#f3f3f3] transition-colors">
        Show less
        <ChevronDown className="h-4 w-4 rotate-180" />
      </button>

      <div className="bg-[#f0f2f5] p-px" />
      
      <div className="p-4 bg-white">
        <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-[#0a66c2]/5 to-[#0a66c2]/20 border border-[#0a66c2]/20 flex flex-col items-center justify-center text-center p-4">
          <div className="w-12 h-12 bg-[#0a66c2] text-white rounded-full grid place-items-center mb-3">
             <UserPlus className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800 leading-tight mb-2">Grow your network with Connect+ Sync</h3>
          <p className="text-[12px] text-[#666666] mb-4">Sync your contacts to find professionals you know.</p>
          <button className="text-sm font-bold text-[#0a66c2] hover:underline underline-offset-4">
            Try for free
          </button>
        </div>
      </div>
    </div>
  );
}
