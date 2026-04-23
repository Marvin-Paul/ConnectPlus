const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ 
  connectionString,
  ssl: connectionString?.includes('supabase.com') ? { rejectUnauthorized: false } : false
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('--- PURGING LEGACY DATA ---')
  await prisma.jobApplication.deleteMany()
  await prisma.job.deleteMany()
  await prisma.repost.deleteMany()
  await prisma.comment.deleteMany()
  await prisma.reaction.deleteMany()
  await prisma.notification.deleteMany()
  await prisma.experience.deleteMany()
  await prisma.post.deleteMany()
  // Note: Users are handled via upsert to maintain auth stability

  console.log('--- DEPLOYING ELITE SEED DATA ---')

  // 1. Create Elite Admin User
  const admin = await prisma.user.upsert({
    where: { username: 'marvin-muwereza' },
    update: {},
    create: {
      email: 'mmuwereza@connect-plus.com',
      username: 'marvin-muwereza',
      passwordHash: 'elite_secure_hash',
      firstName: 'Marvin',
      lastName: 'Muwereza',
      headline: 'Full-Stack Architect & AI Specialist | Global Elite Circle',
      bio: 'Over 10 years of experience in distributed systems and AI-driven professional infrastructure across East Africa.',
      location: 'Kampala, Uganda',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256',
      isPremium: true,
      verified: true,
      isHiring: true
    }
  })

  // 2. Create Target Connection (MTN CIO)
  const catherine = await prisma.user.upsert({
    where: { username: 'catherine-namubiru' },
    update: {},
    create: {
      email: 'cn@mtn.co.ug',
      username: 'catherine-namubiru',
      passwordHash: 'high_impact_hash',
      firstName: 'Catherine',
      lastName: 'Namubiru',
      headline: 'CIO at MTN Uganda | Professional Tech Evangelist',
      location: 'Kampala, Uganda',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256',
      isPremium: true
    }
  })

  // 3. Populate Experiences (Elite Ledger)
  await prisma.experience.createMany({
    data: [
      {
        userId: admin.id,
        title: 'Chief Technology Officer',
        company: 'Connect+ Professional',
        location: 'Kampala, Uganda',
        startDate: new Date('2023-01-01'),
        isCurrent: true,
        isElite: true,
        description: 'Architecting the professional future of Africa through AI-driven networking nodes.'
      },
      {
        userId: admin.id,
        title: 'Senior Lead Architecture',
        company: 'SafeBoda',
        location: 'Kampala, Uganda',
        startDate: new Date('2020-05-01'),
        endDate: new Date('2022-12-01'),
        isCurrent: false,
        description: 'Optimized logistics and dispatch engines across multiple urban sectors.'
      }
    ]
  })

  // 4. Generate High-Impact Notifications (Pulse Hub)
  await prisma.notification.createMany({
    data: [
      {
        userId: admin.id,
        type: 'REACTION',
        content: `Catherine Namubiru and 14 others reacted to your Article: "Building the Regional Professional Engine".`,
        isRead: false
      },
      {
        userId: admin.id,
        type: 'JOB_ALERT',
        content: `Lead Cloud Architect position available at Chipper Cash (98% Match).`,
        isRead: false
      },
      {
        userId: admin.id,
        type: 'MENTION',
        content: `You were mentioned in a thread by Isaac Kato regarding the "East Africa Dev Pulse 2026" conference.`,
        isRead: false
      }
    ]
  })

  // 5. Generate Elite Post Feed (Social Heartbeat)
  await prisma.post.createMany({
    data: [
      {
        authorId: admin.id,
        content: `Connect+ is more than a platform; it's a regional ecosystem for digital trust. 74% of West African tech hiring is now moving to verified-identity workflows. #ConnectedAfrica #TrustEngine`,
        mediaUrls: [
          'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200',
          'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200'
        ],
        type: 'POST',
        visibility: 'ANYONE',
        tags: ['ConnectedAfrica', 'TrustEngine']
      },
      {
        authorId: catherine.id,
        content: `Just concluded the Q1 Infrastructure Sync at MTN. The shift toward decentralized edge computing is the next frontier for our regional connectivity. #MTN #TelecomFuture`,
        mediaUrls: ['https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200'],
        type: 'POST',
        visibility: 'ANYONE',
        tags: ['MTN', 'TelecomFuture']
      },
      {
        authorId: admin.id,
        content: `Join us for the East Africa Tech Summit 2026. We'll be deep-diving into AI-driven resource allocation and regional scalability.`,
        type: 'POST',
        isEvent: true,
        eventDate: new Date('2026-06-15T09:00:00Z'),
        eventLocation: 'Kampala Serena Hotel',
        attendeeCount: 156,
        mediaUrls: ['https://images.unsplash.com/photo-1540575861501-7ad058a869d4?auto=format&fit=crop&q=80&w=1200'],
        tags: ['AI', 'TechSummit', 'Kampala']
      }
    ]
  })

  // 6. Add Interactions to Posts
  const firstPost = await prisma.post.findFirst({ where: { authorId: admin.id } })
  if (firstPost) {
    await prisma.reaction.create({
      data: {
        userId: catherine.id,
        postId: firstPost.id,
        type: 'LIKE'
      }
    })
    
    await prisma.comment.create({
      data: {
        postId: firstPost.id,
        authorId: catherine.id,
        content: "Visionary approach, Marvin. We're seeing similar trends in our internal network audits."
      }
    })
  }

  // 7. Create Sample Elite Jobs
  await prisma.job.create({
    data: {
      postedById: catherine.id,
      title: 'Senior Infrastructure Lead',
      company: 'MTN Uganda',
      companyLogo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=128&h=128',
      location: 'Kampala, Uganda',
      employmentType: 'FULL_TIME',
      description: 'Overseeing the national fiber expansion and 5G node architecture. We are looking for an executive with deep regional expertise.',
      salaryMin: 4000,
      salaryMax: 7000,
      matchPercentage: 94,
      isRemote: false,
      isEasyApply: true,
      technicalStack: ["Fiber Optics", "Infrastructure Architecture", "5G Deployment"],
      screeningQuestions: {
        visa: "Do you require visa sponsorship to work in Uganda?",
        experience: "How many years of infrastructure leadership experience do you have?"
      }
    }
  })

  await prisma.job.create({
    data: {
      postedById: admin.id,
      title: 'Senior AI Engineer',
      company: 'Connect+ Professional',
      companyLogo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=128&h=128',
      location: 'Remote',
      employmentType: 'FULL_TIME',
      description: 'Building the future of African professional identity through agentic AI.',
      salaryMin: 5000,
      salaryMax: 9000,
      matchPercentage: 98,
      isRemote: true,
      isEasyApply: true,
      technicalStack: ["React", "Next.js", "AI/ML", "Prisma"],
      screeningQuestions: {
        visa: "Do you require visa sponsorship?",
        experience: "How many years of experience do you have with Next.js?"
      }
    }
  })

  console.log('--- SEEDING COMPLETE: PORTAL READY FOR DEPLOYMENT ---')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    pool.end()
  })
