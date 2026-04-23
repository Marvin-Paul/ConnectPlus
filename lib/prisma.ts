import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

/**
 * Enhanced Prisma Client Initialization
 * Uses @prisma/adapter-pg for robust connection pooling and better performance 
 * on serverless environments like Next.js.
 */

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const createPrismaClient = () => {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error("[Prisma] DATABASE_URL is missing from environment variables.");
    return new PrismaClient();
  }

  try {
    // Configure pg pool for optimal connection handling
    const pool = new pg.Pool({ 
      connectionString,
      max: 10, // Adjust based on your Supabase tier
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
    
    const adapter = new PrismaPg(pool);
    
    return new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });
  } catch (error) {
    console.error("[Prisma] Failed to initialize adapter-pg. Falling back to default client.", error);
    return new PrismaClient();
  }
};

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
