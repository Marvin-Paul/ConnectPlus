import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

/**
 * GET /api/posts
 * Fetches common feed posts with pagination, sorting, and author details.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10")));
    const sort = searchParams.get("sort") || "recent";
    const skip = (page - 1) * limit;

    let orderBy: any = { createdAt: "desc" };
    if (sort === "top") {
      orderBy = [
        { comments: { _count: "desc" } },
        { createdAt: "desc" }
      ];
    }

    const posts = await prisma.post.findMany({
      take: limit,
      skip: skip,
      orderBy,
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
            reposts: true
          }
        },
        reactions: userId ? {
          where: { userId },
          select: { type: true }
        } : false,
      },
    });

    // Normalize post results for the frontend
    const formattedPosts = posts.map((post) => ({
      ...post,
      mediaUrls: post.mediaUrls || (post.imageUrl ? [post.imageUrl] : []),
      _count: {
        likes: (post._count as any)?.reactions || 0,
        comments: post._count?.comments || 0,
        reposts: post._count?.reposts || 0
      }
    }));

    return NextResponse.json(formattedPosts);
  } catch (error) {
    console.error("[API] GET /api/posts error:", error);
    return NextResponse.json({ 
      error: "Failed to fetch feed posts",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

/**
 * POST /api/posts
 * Creates a new post with support for multi-media, visibility, and tags.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      content, 
      imageUrl, 
      authorId, 
      type = "POST", 
      title, 
      tags = [],
      isEvent = false,
      eventDate,
      eventLocation,
      attendeeCount = 0,
      mediaUrls = [],
      visibility = "ANYONE"
    } = body;

    if ((!content?.trim() && !imageUrl && mediaUrls.length === 0) || !authorId) {
      return NextResponse.json({ error: "Post must have either content or media" }, { status: 400 });
    }

    if (content && content.length > 5000) {
      return NextResponse.json({ error: "Post content is too long (max 5000 characters)" }, { status: 400 });
    }

    // Resolve author: verify by ID, username, or fallback to first user for demo stability
    let foundUser = await prisma.user.findUnique({ where: { id: authorId } });
    if (!foundUser) {
        foundUser = await prisma.user.findUnique({ where: { username: authorId } });
    }
    if (!foundUser) {
        foundUser = await prisma.user.findFirst();
    }
    
    if (!foundUser) {
      return NextResponse.json({ error: "No users found in database to associate with post." }, { status: 412 });
    }

    const resolvedAuthorId = foundUser.id;

    // Safety check: ensure we don't save session-specific blob URLs to the database
    const placeholder = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80";
    
    const cleanMediaUrls = mediaUrls.map((url: string) => url.startsWith('blob:') ? placeholder : url);
    const cleanImageUrl = (imageUrl && imageUrl.startsWith('blob:')) ? placeholder : (imageUrl || cleanMediaUrls[0] || null);

    const postData: any = {
      content,
      authorId: resolvedAuthorId,
      type,
      isEvent,
      eventDate: eventDate ? new Date(eventDate) : null,
      eventLocation: eventLocation || null,
      attendeeCount: parseInt(attendeeCount.toString()),
      mediaUrls: cleanMediaUrls,
      imageUrl: cleanImageUrl,
      visibility,
      tags: Array.isArray(tags) ? tags : [],
    };
    
    if (title) postData.title = title;

    const post = await prisma.post.create({
      data: postData,
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
        _count: true,
      },
    });

    // Standardize result
    const formattedPost = {
      ...post,
      reactions: [],
      _count: {
        likes: (post._count as any)?.reactions ?? 0,
        comments: post._count.comments ?? 0,
        reposts: post._count.reposts ?? 0,
      },
    };

    return NextResponse.json(formattedPost, { status: 201 });
  } catch (error: any) {
    console.error("[API] POST /api/posts error:", error);
    return NextResponse.json({ 
      error: "Failed to create post", 
      details: error.message || String(error) 
    }, { status: 500 });
  }
}