import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const comments = await prisma.comment.findMany({
      where: { postId: params.id },
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
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { userId, content, parentCommentId } = body;

    if (!userId || !content) {
      return NextResponse.json({ error: "userId and content are required" }, { status: 400 });
    }

    const postId = params.id;

    const comment = await prisma.comment.create({
      data: {
        postId,
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

    // Create notification if NOT own post
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (post && post.authorId !== userId) {
      await prisma.notification.create({
        data: {
          userId: post.authorId,
          type: "COMMENT",
          content: `someone commented on your post`,
          sourceId: postId,
          sourceType: "POST",
        },
      });
    }

    return NextResponse.json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
  }
}
