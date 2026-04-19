import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/posts/[id]/share
 * Handles reposting content by creating a new post record linked to the original.
 */
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  let postId: string | undefined;
  try {
    const { id } = await context.params;
    postId = id;

    const body = await request.json();
    const { userId, content } = body; 

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    // Verify original post exists
    const originalPost = await prisma.post.findUnique({ where: { id: postId } });
    
    if (!originalPost) {
      return NextResponse.json({ error: "Original post not found" }, { status: 404 });
    }

    // Create the Repost content (new Post record)
    const repostPost = await prisma.post.create({
      data: {
        authorId: userId,
        content: content || "",
        tags: originalPost.tags,
        type: "REPOST",
        visibility: originalPost.visibility,
      },
    });

    // Create formal mapping in Repost table
    await prisma.repost.create({
      data: {
        userId,
        originalPostId: postId!,
        repostPostId: repostPost.id,
      },
    });

    // Notification logic (async)
    if (originalPost.authorId !== userId) {
      prisma.notification.create({
        data: {
          userId: originalPost.authorId,
          type: "REPOST",
          content: `reposted your content`,
          sourceId: repostPost.id,
          sourceType: "POST",
        },
      }).catch(err => console.error("[Notification Error]:", err));
    }

    return NextResponse.json({ 
      success: true, 
      message: "Content successfully reposted",
      repost: repostPost 
    });
  } catch (error: any) {
    console.error(`[API] Error reposting content from ${postId || 'unknown'}:`, error);
    return NextResponse.json({ 
      error: "Failed to repost content", 
      details: error.message 
    }, { status: 500 });
  }
}
