import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, avatarUrl } = body;

    if (!username || !avatarUrl) {
      return NextResponse.json({ error: "username and avatarUrl are required" }, { status: 400 });
    }

    // Upsert so the demo user is always updated/created
    const updatedUser = await prisma.user.upsert({
      where: { username },
      update: { avatarUrl },
      create: {
        username,
        email: `${username}@example.com`,
        passwordHash: "demo-password-hash",
        firstName: "Marvin",
        lastName: "Muwereza",
        avatarUrl,
      },
    });

    return NextResponse.json({ avatarUrl: updatedUser.avatarUrl });
  } catch (error) {
    console.error("Avatar update error:", error);
    return NextResponse.json({ error: "Failed to update avatar" }, { status: 500 });
  }
}
