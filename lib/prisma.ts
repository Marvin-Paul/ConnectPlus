import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

/**
 * Enhanced Prisma Client Initialization
 * Uses @prisma/adapter-pg for robust connection pooling and better performance 
 * on serverless environments like Next.js.
 */

const globalForPrisma = global as unknown as { 
  prisma?: PrismaClient;
  pool?: pg.Pool;
  adapter?: PrismaPg;
};

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("[Prisma] DATABASE_URL is missing from environment variables.");
}

const pool = globalForPrisma.pool ?? new pg.Pool({ 
  connectionString,
  max: 10, // Adjust based on your Supabase tier
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const adapter = globalForPrisma.adapter ?? new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.pool = pool;
  globalForPrisma.adapter = adapter;
}

