import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

async function applyRLSPolicies() {
  console.log("🛡️ Applying Professional RLS Policies to Supabase...");

  const policies = [
    // Experience
    `ALTER TABLE "Experience" ENABLE ROW LEVEL SECURITY;`,
    `DROP POLICY IF EXISTS "Allow public read access to Experience" ON "Experience";`,
    `CREATE POLICY "Allow public read access to Experience" ON "Experience" FOR SELECT TO anon, authenticated USING (true);`,
    `DROP POLICY IF EXISTS "Allow user to manage own Experience" ON "Experience";`,
    `CREATE POLICY "Allow user to manage own Experience" ON "Experience" FOR ALL TO authenticated USING (auth.uid()::text = "userId");`,

    // Education
    `ALTER TABLE "Education" ENABLE ROW LEVEL SECURITY;`,
    `DROP POLICY IF EXISTS "Allow public read access to Education" ON "Education";`,
    `CREATE POLICY "Allow public read access to Education" ON "Education" FOR SELECT TO anon, authenticated USING (true);`,
    `DROP POLICY IF EXISTS "Allow user to manage own Education" ON "Education";`,
    `CREATE POLICY "Allow user to manage own Education" ON "Education" FOR ALL TO authenticated USING (auth.uid()::text = "userId");`,

    // Skill
    `ALTER TABLE "Skill" ENABLE ROW LEVEL SECURITY;`,
    `DROP POLICY IF EXISTS "Allow public read access to Skill" ON "Skill";`,
    `CREATE POLICY "Allow public read access to Skill" ON "Skill" FOR SELECT TO anon, authenticated USING (true);`,
    `DROP POLICY IF EXISTS "Allow user to manage own Skill" ON "Skill";`,
    `CREATE POLICY "Allow user to manage own Skill" ON "Skill" FOR ALL TO authenticated USING (auth.uid()::text = "userId");`,
    
    // Post (Public access for professional networking)
    `ALTER TABLE "Post" ENABLE ROW LEVEL SECURITY;`,
    `DROP POLICY IF EXISTS "Allow public read access to Post" ON "Post";`,
    `CREATE POLICY "Allow public read access to Post" ON "Post" FOR SELECT TO anon, authenticated USING (true);`,
    `DROP POLICY IF EXISTS "Allow user to manage own Post" ON "Post";`,
    `CREATE POLICY "Allow user to manage own Post" ON "Post" FOR ALL TO authenticated USING (auth.uid()::text = "authorId");`
  ];

  for (const sql of policies) {
    try {
      console.log(`Executing: ${sql.substring(0, 50)}...`);
      await prisma.$executeRawUnsafe(sql);
    } catch (err: any) {
      console.warn(`⚠️ Policy already exists or error: ${err.message}`);
    }
  }

  console.log("✅ RLS Professional Hardening Complete.");
  await prisma.$disconnect();
}

applyRLSPolicies();
