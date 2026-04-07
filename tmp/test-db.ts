import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Testing database connection...");
    const userCount = await prisma.user.count();
    console.log(`Connection successful. User count: ${userCount}`);
    
    const postCount = await prisma.post.count();
    console.log(`Post count: ${postCount}`);
    
    process.exit(0);
  } catch (error) {
    console.error("Database connection failed:");
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
