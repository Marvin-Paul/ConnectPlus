import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ProfileHeader } from "@/components/profile/profile-header"
import { AboutSection } from "@/components/profile/about-section"
import { DashboardSection } from "@/components/profile/dashboard-section"
import { FeaturedSection } from "@/components/profile/featured-section"
import { ExperienceSection } from "@/components/profile/experience-section"
import { EducationSection } from "@/components/profile/education-section"
import { SkillsSection } from "@/components/profile/skills-section"
import { SocialProofSection } from "@/components/profile/social-proof-section"
import { AccomplishmentsSection } from "@/components/profile/accomplishments-section"
import { Sparkles } from "lucide-react"

interface ProfilePageProps {
  params: Promise<{ username: string }>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params
  let user = null;
  try {
    user = await prisma.user.findUnique({
      where: { username },
      include: {
        experiences: { orderBy: { startDate: 'desc' } },
        educations: { orderBy: { startDate: 'desc' } },
        skills: { orderBy: { createdAt: 'asc' } },
        featuredItems: true,
        certifications: true,
        projects: true,
        volunteering: true,
        honors: true,
        recommendationsReceived: {
          include: { author: true }
        }
      }
    })
  } catch (error) {
    console.error("Database connection failed for user profile fetch:", error);
    // Continue execution to allow mock data to take over for demonstration if in demo mode
  }

  if (!user) {
    // If user not found, we'll show a mockup for demonstration purposes if desired, 
    // but standard behavior is 404. Let's provide a "Demo" mode if the username matches 'demo-user'.
    if (username !== 'demo-user') {
       notFound()
    }
  }

  // Mockup for demonstration
  const mock = {
    firstName: "Marvin",
    lastName: "Muwereza",
    username: "demo-user",
    headline: "Full-Stack Architect & AI System Specialist | Ex-Lead @ Fintech Alpha",
    bio: "Passionate about building scalable digital infrastructure that drives real-world business value. Over 10 years of experience in distributed systems, high-performance web applications, and large-scale AI integration. Currently focused on creating intelligent professional platforms for the East African tech ecosystem.",
    location: "Kampala, Uganda",
    pronouns: "He/Him",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1557683311-eac922347aa1?auto=format&fit=crop&w=1200&h=300",
    isHiring: true,
    experiences: [
      { id: "e1", title: "Chief Technology Officer", company: "Connect+ Professional", location: "Kampala, Uganda", startDate: new Date(2023, 1), isCurrent: true, description: "Leading the architectural vision and engineering team for the region's premier professional networking platform." },
      { id: "e2", title: "Senior Lead Engineer", company: "SafeBoda", location: "Kampala, Uganda", startDate: new Date(2020, 5), endDate: new Date(2022, 12), isCurrent: false, description: "Architected the expansion of the courier and transport platform across multiple East African markets." }
    ],
    educations: [
      { id: "ed1", school: "Makerere University", degree: "BSc. Software Engineering", fieldOfStudy: "Computing and Informatics", startDate: new Date(2014, 8), endDate: new Date(2018, 6) }
    ],
    skills: [
      { id: "s1", name: "Next.js", endorsementCount: 242 },
      { id: "s2", name: "Distributed Systems", endorsementCount: 156 },
      { id: "s3", name: "AI/ML Integration", endorsementCount: 89 },
      { id: "s4", name: "Strategic Technical Planning", endorsementCount: 112 }
    ],
    featuredItems: [
      { id: "f1", title: "Building Connect+: The Architecture", description: "Deep dive into the serverless-first approach...", type: "ARTICLE" }
    ],
    certifications: [
      { id: "c1", name: "AWS Solutions Architect Professional", issuingOrg: "AWS", issueDate: new Date() },
      { id: "c2", name: "Next.js GDE (Google Developer Expert)", issuingOrg: "Google", issueDate: new Date() }
    ],
    projects: [
      { id: "p1", name: "OpenSoko", description: "Decentralized marketplace for regional trade." }
    ],
    volunteering: [
      { id: "v1", role: "Mentor", organization: "Women in Tech Uganda", description: "Guiding the next generation of female engineers." }
    ],
    honors: [
      { id: "h1", title: "Tech Innovator of the Year (2025)", issuer: "Kampala Innovation Week" }
    ],
    recommendationsReceived: [
      {
        id: "r1",
        author: { firstName: "Catherine", lastName: "Namubiru", headline: "CIO at MTN Uganda", avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80" },
        content: "Marvin is a visionary architect. His ability to translate complex business requirements into robust, scalable technical solutions is unmatched in the region.",
        relationship: "Catherine managed Marvin"
      }
    ]
  }

  // Use the actual user data from DB, but fill in the rich mockup data for the demo view
  const displayUser = {
    ...mock,
    ...user, // DB data overrides mock data if it exists
    username: user?.username || username,
    firstName: user?.firstName || user?.name?.split(' ')[0] || mock.firstName,
    lastName: user?.lastName || user?.name?.split(' ').slice(1).join(' ') || mock.lastName,
    experiences: user?.experiences?.length ? user.experiences : mock.experiences,
    skills: user?.skills?.length ? user.skills : mock.skills,
    // Add other merges as needed...
  } as any

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-[1152px] mx-auto pt-8 px-4 flex flex-col gap-6 animate-pro-fade">
        <ProfileHeader user={displayUser as any} />
        <DashboardSection />
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main Feed */}
          <div className="md:col-span-8 space-y-6">
            <AboutSection username={displayUser.username} about={displayUser.bio} />
            <FeaturedSection username={displayUser.username} items={displayUser.featuredItems as any} />
            <ExperienceSection username={displayUser.username} experiences={displayUser.experiences as any} />
            <EducationSection username={displayUser.username} educations={displayUser.educations as any} />
            <SkillsSection username={displayUser.username} skills={displayUser.skills as any} />
            <SocialProofSection username={displayUser.username} recommendations={displayUser.recommendationsReceived as any} />
          </div>

          {/* Sidebar */}
           <div className="md:col-span-4 space-y-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-8 flex flex-col items-center text-center space-y-6 shadow-soft transition-all hover:shadow-dropdown">
                <div className="w-14 h-14 bg-primary/5 dark:bg-primary/10 rounded-full flex items-center justify-center border border-primary/10 dark:border-primary/20">
                   <Sparkles className="w-6 h-6 text-primary" />
                </div>
                 <div className="space-y-2">
                   <h3 className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest text-[11px]">Connect+ Premium</h3>
                   <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic opacity-80">Increase your profile visibility to industry leaders with our Premium features.</p>
                 </div>
                 <Link href="/premium" className="w-full bg-slate-900 dark:bg-[#1B5E20] hover:bg-slate-800 dark:hover:bg-[#1B5E20]/90 text-white py-3 rounded-lg font-bold text-[11px] uppercase tracking-widest transition-all shadow-sm">
                    Upgrade to Premium
                 </Link>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-6 space-y-6 shadow-soft">
                <h3 className="font-extrabold text-[12px] text-foreground dark:text-slate-100 uppercase tracking-widest px-2">People also viewed</h3>
                <div className="space-y-6">
                   {[1, 2, 3].map((i) => (
                     <div key={i} className="flex gap-4 group cursor-pointer items-start px-2">
                       <div className="w-12 h-12 rounded-full bg-muted dark:bg-slate-800 shrink-0 border border-border dark:border-slate-700 overflow-hidden">
                         <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i+10}`} className="w-full h-full object-cover" alt="" />
                       </div>
                        <div className="min-w-0">
                         <h4 className="text-[14px] font-bold text-slate-900 dark:text-slate-200 group-hover:text-[#1B5E20] dark:group-hover:text-green-500 transition-colors truncate">Professional {i}</h4>
                         <p className="text-[12px] text-slate-500 dark:text-slate-400 font-medium line-clamp-1 italic opacity-80">Senior System Architect</p>
                         <button className="mt-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all uppercase tracking-widest">
                           Connect
                         </button>
                       </div>
                     </div>
                   ))}
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
