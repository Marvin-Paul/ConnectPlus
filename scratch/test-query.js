require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  try {
    console.log("Testing Prisma.post.findMany with URL:", process.env.DATABASE_URL?.split('@')[1]);
    const posts = await prisma.post.findMany({
      take: 5,
      include: { author: { select: { firstName: true } } }
    });
    console.log("Success! Fetched", posts.length, "posts");
  } catch (err) {
    console.error("Prisma Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

test();
