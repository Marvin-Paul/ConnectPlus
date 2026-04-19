import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

/**
 * GET /api/posts/[id]
 * Fetches a single post by its ID with author details and engagement counts.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  let postId: string | undefined;
  try {
    const { id } = await params;
    postId = id;

    if (!id) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    const post = await prisma.post.findUnique({
      where: { id },
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
        _count: {
          select: {
            reactions: true,
            comments: true,
            reposts: true,
          }
        },
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Normalize post object for consistent frontend consumption
    const formattedPost = {
      ...post,
      reactions: [],
      mediaUrls: post.mediaUrls || (post.imageUrl ? [post.imageUrl] : []),
      _count: {
        likes: post._count.reactions || 0,
        comments: post._count.comments || 0,
        reposts: post._count.reposts || 0,
      },
    };

    return NextResponse.json(formattedPost);
  } catch (error) {
    console.error(`[API] Error fetching post ${postId || 'unknown'}:`, error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/posts/[id]
 * Updates an existing post's content or visibility.
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  let postId: string | undefined;
  try {
    const { id } = await params;
    postId = id;

    const body = await request.json();
    const { content, visibility } = body;

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        ...(content && { content }),
        ...(visibility && { visibility }),
      },
      include: {
        author: true,
        _count: true,
      }
    });

    return NextResponse.json(updatedPost);
  } catch (error: any) {
    console.error(`[API] Error updating post ${postId || 'unknown'}:`, error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to update post", details: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/posts/[id]
 * Removes a post from the database.
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  let postId: string | undefined;
  try {
    const { id } = await params;
    postId = id;

    if (!id) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required for deletion" }, { status: 400 });
    }

    // Check if the post exists and user has permission
    const post = await prisma.post.findUnique({
      where: { id },
      select: { authorId: true },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const deleter = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });
    
    if (post.authorId !== userId && deleter?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized: You do not have permission to delete this post" }, { status: 403 });
    }

    // Perform the deletion
    await prisma.post.delete({
      where: { id },
    });

    return NextResponse.json({ 
      success: true,
      message: "Post successfully deleted",
      deletedId: id
    });
  } catch (error: any) {
    console.error(`[API] Error deleting post ${postId || 'unknown'}:`, error);
    
    if (error.code === 'P2025') {
      return NextResponse.json({ error: "Post already deleted or not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to delete post", details: error.message },
      { status: 500 }
    );
  }
}
