import { 
  Bookmark, 
  Bell, 
  Wallet, 
  ClipboardCheck, 
  MessageSquareReply, 
  FileText, 
  Settings,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

const sidebarLinks = [
  { label: "My jobs", icon: Bookmark, href: "/jobs/my-jobs" },
  { label: "Job alerts", icon: Bell, href: "/jobs/alerts" },
  { label: "Salary", icon: Wallet, href: "/jobs/salary" },
  { label: "Skill Assessments", icon: ClipboardCheck, href: "/jobs/assessments" },
  { label: "Interview prep", icon: MessageSquareReply, href: "/jobs/interview-prep" },
  { label: "Resume Builder", icon: FileText, href: "/jobs/resume-builder" },
  { label: "Job seeker guidance", icon: FileText, href: "/jobs/guidance" },
  { label: "Application settings", icon: Settings, href: "/jobs/settings" },
];

export function JobsSidebar() {
  return (
    <div className="bg-white rounded-xl border border-[#e0e0e0] overflow-hidden shadow-sm">
      <nav className="py-2">
        {sidebarLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="flex items-center justify-between px-4 py-3.5 text-sm text-[#666666] hover:bg-[#f3f3f3] transition-colors group"
          >
            <div className="flex items-center gap-3">
              <link.icon className="h-5 w-5 text-[#666666] group-hover:text-black stroke-[1.5px]" />
              <span className="group-hover:text-black font-medium">{link.label}</span>
            </div>
            <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </nav>
      
      <div className="p-4 border-t border-[#e0e0e0]">
         <Link 
           href="/jobs/post"
           className="w-full flex items-center justify-center gap-2 py-3 border-2 border-[#0a66c2] text-[#0a66c2] font-bold text-sm rounded-full hover:bg-[#0a66c2]/5 transition-colors"
         >
           <FileText className="h-4 w-4" />
           Post a free job
         </Link>
      </div>
    </div>
  );
}
