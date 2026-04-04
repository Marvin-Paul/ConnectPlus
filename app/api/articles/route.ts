export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const db = prisma as any;

export async function POST(req: Request) {
  try {
    const { title, content, coverImage, tags, username } = await req.json();

    const user = await db.user.findUnique({
      where: { username },
      select: { id: true }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const post = await db.post.create({
      data: {
        authorId: user.id,
        title,
        content,
        imageUrl: coverImage,
        tags,
        type: "ARTICLE"
      }
    });

    // Create a notification for followers (mock logic)
    await db.notification.create({
      data: {
        userId: user.id, // Self-notification for testing
        type: "SYSTEM",
        content: `Your article "${title}" is now live on the Global Article Node.`,
        sourceId: post.id,
        sourceType: "POST"
      }
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Article creation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") || "POST";

    const posts = await db.post.findMany({
      where: { type },
      include: {
        author: {
          select: { firstName: true, lastName: true, avatarUrl: true, headline: true }
        }
      },
      orderBy: { createdAt: "desc" },
      take: 20
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Posts fetch error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
