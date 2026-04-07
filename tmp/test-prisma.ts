import "dotenv/config";
import { prisma } from "../lib/prisma";

async function main() {
  console.log("Testing Prisma connection...");
  try {
    const userCount = await prisma.user.count();
    console.log("Connection successful! User count:", userCount);
  } catch (error) {
    console.error("Connection failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
