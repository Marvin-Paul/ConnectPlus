import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: any) {
  try {
    // Correctly handle Next.js 15 params promise
    const awaitedParams = await params;
    const username = awaitedParams?.username;
    
    if (!username) {
      return NextResponse.json({ error: "No username provided" }, { status: 400 });
    }

    console.log(`[API] Fetching profile for: ${username}`);

    let user = null;
    try {
      // res-safe DB call
      user = await prisma.user.findUnique({
        where: { username }
      });
    } catch (dbError: any) {
      console.error("[API] Prisma Database Error:", dbError.message);
      // Swallow DB errors for 'demo-user' to ensure it works offline/during connection flakiness
      if (username !== 'demo-user') {
        throw dbError; // re-throw to outer catch for actual 500
      }
    }

    if (!user) {
      if (username === 'demo-user') {
        return NextResponse.json({
          firstName: "Marvin",
          lastName: "Muwereza",
          username: "demo-user",
          headline: "Senior Full-Stack Engineer | AI Systems Architect | Uganda Tech Alliance",
          avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
          bannerUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=400&h=200",
          location: "Kampala, Uganda"
        });
      }
      return NextResponse.json({ error: "User profile not found in alliance database." }, { status: 404 });
    }

    return NextResponse.json(user);
    
  } catch (error: any) {
    console.error(`[API] Fatal Error on route /api/profile/:`, error.message);
    return NextResponse.json({ error: "System Integrity Compromised", details: error.message }, { status: 500 });
  }
}
