import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pkg from "pg";

const { Pool } = pkg;

const globalForPrisma = globalThis as unknown as { 
  prisma?: PrismaClient;
  pool?: any;
  adapter?: any;
};

const connectionString = `${process.env.DATABASE_URL}`;

// Re-use pool across HMR reloads
const pool = globalForPrisma.pool ?? new Pool({ connectionString });
const adapter = globalForPrisma.adapter ?? new PrismaPg(pool);
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.pool = pool;
  globalForPrisma.adapter = adapter;
}
