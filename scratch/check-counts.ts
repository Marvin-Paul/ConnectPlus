import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

async function test() {
  try {
    const userCount = await prisma.user.count();
    console.log("Total users:", userCount);
    const postCount = await prisma.post.count();
    console.log("Total posts:", postCount);
  } catch (err) {
    console.error("Test failed:", err);
  } finally {
    await prisma.$disconnect();
  }
}

test();
