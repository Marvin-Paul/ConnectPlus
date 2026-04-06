import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { userId, content } = body; // Reposting can have optional new content/repost text

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const originalPostId = id;

    // Create a new post that is the repost
    const originalPost = await prisma.post.findUnique({ where: { id: originalPostId } });
    
    if (!originalPost) {
      return NextResponse.json({ error: "Original post not found" }, { status: 404 });
    }

    const repost = await prisma.post.create({
      data: {
        authorId: userId,
        content: content || "",
        tags: originalPost.tags,
        type: "REPOST",
      },
    });

    // Create the Repost link record
    await prisma.repost.create({
      data: {
        userId,
        originalPostId,
        repostPostId: repost.id,
      },
    });

    // Create notification
    if (originalPost.authorId !== userId) {
      await prisma.notification.create({
        data: {
          userId: originalPost.authorId,
          type: "REPOST",
          content: `someone reposted your content`,
          sourceId: repost.id,
          sourceType: "POST",
        },
      });
    }

    return NextResponse.json(repost);
  } catch (error) {
    console.error("Error reposting:", error);
    return NextResponse.json({ error: "Failed to repost" }, { status: 500 });
  }
}
