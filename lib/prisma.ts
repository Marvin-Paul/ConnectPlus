import { PrismaClient } from "@prisma/client";

/**
 * Standard Prisma client initialization.
 * Automatically picks up DATABASE_URL from environment.
 * Supports PGBouncer via the connection string.
 */

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

