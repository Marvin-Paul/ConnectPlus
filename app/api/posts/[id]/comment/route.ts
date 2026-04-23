import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { NotificationService } from "@/lib/notifications";

/**
 * GET /api/posts/[id]/comment
 * Retrieves all comments for a specific post.
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  let postId: string | undefined;
  try {
    const { id } = await context.params;
    postId = id;

    const comments = await prisma.comment.findMany({
      where: { postId: id },
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            avatarUrl: true,
            headline: true,
          },
        },
      },
    });

    return NextResponse.json(comments);
  } catch (error: any) {
    console.error(`[API] Error fetching comments for post ${postId || 'unknown'}:`, error);
    return NextResponse.json({ error: "Failed to fetch comments", details: error.message }, { status: 500 });
  }
}

/**
 * POST /api/posts/[id]/comment
 * Adds a new comment or reply to a post.
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
    const { userId, content, parentCommentId } = body;

    if (!userId || !content) {
      return NextResponse.json({ error: "userId and content are required" }, { status: 400 });
    }

    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const comment = await prisma.comment.create({
      data: {
        postId: postId!,
        authorId: userId,
        content,
        parentCommentId,
      },
      include: {
        author: {
          select: {
             id: true,
             firstName: true,
             lastName: true,
             avatarUrl: true,
             headline: true
          }
        },
      },
    });

    // Notify post author using professional service
    if (post.authorId !== userId) {
      NotificationService.create({
        userId: post.authorId,
        actorId: userId,
        type: "COMMENT",
        sourceId: postId!,
        sourceType: "POST",
      });
    }

    return NextResponse.json(comment);
  } catch (error: any) {
    console.error(`[API] Error creating comment for post ${postId || 'unknown'}:`, error);
    return NextResponse.json({ error: "Failed to create comment", details: error.message }, { status: 500 });
  }
}
