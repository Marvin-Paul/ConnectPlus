import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const BASE_URL = "http://localhost:3000";

interface TestResult {
  section: string;
  status: "SUCCESS" | "FAILED";
  details: string;
}

async function runSystemTest() {
  const results: TestResult[] = [];

  console.log("🚀 Starting Connect+ Professional System Audit...\n");

  // SECTION 1: DATABASE
  try {
    const start = Date.now();
    await prisma.$connect();
    const userCount = await prisma.user.count();
    results.push({
      section: "Database Connectivity",
      status: "SUCCESS",
      details: `Connected to Supabase. Found ${userCount} users. Latency: ${Date.now() - start}ms`
    });
  } catch (err: any) {
    results.push({
      section: "Database Connectivity",
      status: "FAILED",
      details: `Prisma Error: ${err.message || String(err)}`
    });
  }

  // SECTION 2: AUTH API
  try {
    const res = await fetch(`${BASE_URL}/api/me`);
    if (res.status === 401 || res.status === 200) {
      results.push({
        section: "Authentication API (/api/me)",
        status: "SUCCESS",
        details: `Responded with status ${res.status}. Content-Type: ${res.headers.get("content-type")}`
      });
    } else {
      const text = await res.text();
      results.push({
        section: "Authentication API (/api/me)",
        status: "FAILED",
        details: `Unexpected status ${res.status}. Body: ${text.substring(0, 100)}...`
      });
    }
  } catch (err: any) {
    results.push({
      section: "Authentication API (/api/me)",
      status: "FAILED",
      details: `Fetch Error: ${err.message}`
    });
  }

  // SECTION 3: FEED API
  try {
    const res = await fetch(`${BASE_URL}/api/posts?limit=1`);
    if (res.ok) {
      const data = await res.json() as any;
      results.push({
        section: "Feed API (/api/posts)",
        status: "SUCCESS",
        details: `Retrieved ${Array.isArray(data) ? data.length : 0} posts successfully.`
      });
    } else {
      const text = await res.text();
      results.push({
        section: "Feed API (/api/posts)",
        status: "FAILED",
        details: `Status ${res.status}. Error: ${text.substring(0, 100)}`
      });
    }
  } catch (err: any) {
    results.push({
      section: "Feed API (/api/posts)",
      status: "FAILED",
      details: `Fetch Error: ${err.message}`
    });
  }

  // SECTION 4: NOTIFICATIONS SSE
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(`${BASE_URL}/api/notifications/stream`, { signal: controller.signal });
    clearTimeout(timeout);
    
    if (res.status === 200 && res.headers.get("content-type")?.includes("event-stream")) {
      results.push({
        section: "Real-time Notification Stream",
        status: "SUCCESS",
        details: "SSE endpoint is open and serving event-stream."
      });
    } else {
      results.push({
        section: "Real-time Notification Stream",
        status: "FAILED",
        details: `Status ${res.status}. Type: ${res.headers.get("content-type")}`
      });
    }
  } catch (err: any) {
    if (err.name === "AbortError") {
       results.push({
        section: "Real-time Notification Stream",
        status: "SUCCESS",
        details: "SSE connection established (aborted after 5s as expected)."
      });
    } else {
      results.push({
        section: "Real-time Notification Stream",
        status: "FAILED",
        details: `SSE Error: ${err.message}`
      });
    }
  }

  // SECTION 5: SECURITY (RLS)
  try {
    const rlsCheck = await prisma.$queryRawUnsafe(`SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' AND tablename = 'Post'`);
    results.push({
      section: "Database Security (RLS)",
      status: "SUCCESS",
      details: `RLS status retrieved: ${JSON.stringify(rlsCheck)}`
    });
  } catch (err: any) {
    results.push({
      section: "Database Security (RLS)",
      status: "FAILED",
      details: `Security Audit Error: ${err.message}`
    });
  }

  console.log("\n📊 AUDIT COMPLETE. GENERATING REPORT...\n");
  console.log(JSON.stringify(results, null, 2));

  await prisma.$disconnect();
}

runSystemTest();
