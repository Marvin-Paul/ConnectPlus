const { PrismaClient } = require('@prisma/client');

async function test() {
  // Direct connection URL
  const url = "postgresql://postgres.nriqymkvilwfzuzsdxtl:0781384004marvin@db.nriqymkvilwfzuzsdxtl.supabase.co:5432/postgres";
  const prisma = new PrismaClient({
    datasources: {
      db: { url }
    }
  });

  try {
    console.log("Testing DIRECT connection...");
    const posts = await prisma.post.findMany({ take: 1 });
    console.log("Success! Fetched", posts.length, "posts");
  } catch (err) {
    console.error("Direct Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

test();
