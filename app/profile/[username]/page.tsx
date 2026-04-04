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
    experiences: user?.experiences?.length ? user.experiences : mock.experiences,
    skills: user?.skills?.length ? user.skills : mock.skills,
    // Add other merges as needed...
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-4">
      <ProfileHeader user={displayUser} />
      <DashboardSection />
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column (Main Feed) */}
        <div className="md:col-span-8 space-y-6">
          <AboutSection username={displayUser.username} about={displayUser.bio} />
          <FeaturedSection username={displayUser.username} items={displayUser.featuredItems as any} />
          <ExperienceSection username={displayUser.username} experiences={displayUser.experiences as any} />
          <EducationSection username={displayUser.username} educations={displayUser.educations as any} />
          <SkillsSection username={displayUser.username} skills={displayUser.skills as any} />
          <SocialProofSection username={displayUser.username} recommendations={displayUser.recommendationsReceived as any} />
          <AccomplishmentsSection 
            username={displayUser.username}
            certifications={displayUser.certifications as any}
            projects={displayUser.projects as any}
            volunteering={displayUser.volunteering as any}
            honors={displayUser.honors as any}
          />
        </div>

        {/* Right Column (Sidebar) */}
        <div className="md:col-span-4 space-y-6">
           <div className="bg-card border rounded-lg p-6 flex flex-col items-center text-center space-y-4 shadow-sm hover:shadow-md transition-shadow">
             <h3 className="font-bold flex items-center gap-2">
                <span className="text-primary">✨</span> Ad: Remote Work Guru
             </h3>
             <p className="text-sm text-muted-foreground font-medium">Looking for a Senior Developer to lead your remote team? Visit our jobs section.</p>
             <Link href="/jobs" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-full font-bold text-sm transition-colors text-center">
                Explore Jobs
             </Link>
           </div>

           <div className="bg-card border rounded-lg p-6 space-y-4 shadow-sm">
             <h3 className="font-bold text-md text-foreground">People also viewed</h3>
             <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3 group cursor-pointer items-start">
                    <div className="w-10 h-10 rounded-full bg-muted shrink-0 bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center font-bold text-primary">J</div>
                    <div>
                      <h4 className="text-sm font-bold group-hover:text-primary transition-colors">Jane Doe</h4>
                      <p className="text-xs text-muted-foreground line-clamp-1 italic">Product Designer @ Creative Studio</p>
                      <button className="mt-1.5 text-xs font-bold text-muted-foreground border rounded-full px-3 py-1 hover:bg-muted/50 transition-colors flex items-center gap-1">
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
  )
}
