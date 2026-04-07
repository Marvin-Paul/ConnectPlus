import { PrismaClient } from "@prisma/client";

async function main() {
  const prisma = new PrismaClient();
  try {
    console.log("Attempting to connect to database...");
    const userCount = await prisma.user.count();
    console.log(`Connection successful. User count: ${userCount}`);
    
    // Try fetching some posts too
    const posts = await prisma.post.findMany({ take: 1 });
    console.log("Posts fetch status: Success", posts.length > 0 ? "(found posts)" : "(no posts)");
    
  } catch (error) {
    console.error("Database connection failed:");
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
