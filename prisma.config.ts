import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL") + (env("DATABASE_URL").includes('?') ? '&pgbouncer=true' : '?pgbouncer=true'),
  },
  migrations: {
    seed: "node prisma/seed.ts",
  },
});
