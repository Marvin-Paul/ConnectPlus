const { PrismaClient } = require("@prisma/client");

async function main() {
  console.log("Starting test...");
  try {
    const prisma = new PrismaClient({
      datasourceUrl: process.env.DATABASE_URL
    });
    console.log("Prisma Client initialized.");
    
    console.log("Attempting to count users...");
    const count = await prisma.user.count();
    console.log("User count:", count);
    
    await prisma.$disconnect();
    console.log("Disconnected.");
  } catch (err) {
    console.error("Caught error:");
    console.error(err.message);
    if (err.code) console.error("Code:", err.code);
    process.exit(1);
  }
}

main();
