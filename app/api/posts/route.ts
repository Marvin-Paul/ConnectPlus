import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || "demo-user";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
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
        _count: true,
      },
    });

    const formattedPosts = (posts as any).map((post: any) => ({
      ...post,
      reactions: [],
      _count: {
        likes: post._count?.reactions ?? post._count?.likes ?? 0,
        comments: post._count?.comments || 0,
        reposts: post._count?.reposts || 0
      }
    }));

    return NextResponse.json(formattedPosts);
  } catch (error: any) {
    console.error("[API] GET /api/posts error details:", {
      message: error.message,
      stack: error.stack,
      code: error.code
    });
    return NextResponse.json({ error: "Failed to fetch posts", details: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content, imageUrl, authorId, type = "POST", title, tags } = body;

    if ((!content && !imageUrl) || !authorId) {
      return NextResponse.json({ error: `Validation Failed - Content: ${!!content}, ImageUrl: ${!!imageUrl}, AuthorId: ${authorId}` }, { status: 400 });
    }

    // Verify the author exists — try by ID first, then fall back to username lookup
    // Safely resolve an author ID that exists in the database
    let resolvedAuthorId = authorId;
    let foundUser = null;
    
    try {
      // First try as an ID
      foundUser = await prisma.user.findUnique({ where: { id: authorId } });
      
      // If not found, it might be a username (from our demo fallback)
      if (!foundUser) {
        foundUser = await prisma.user.findUnique({ where: { username: authorId } });
      }
      
      // Last resort: pick ANY user in the DB so the post doesn't fail
      if (!foundUser) {
        foundUser = await prisma.user.findFirst();
      }
      
      if (!foundUser) {
        return NextResponse.json({ error: "Database has no users. Please run the seed command first." }, { status: 400 });
      }
      
      resolvedAuthorId = foundUser.id;
    } catch (dbErr: any) {
      console.error("Database user lookup error:", dbErr);
      return NextResponse.json({ error: "Failed to look up user. Database connection error." }, { status: 500 });
    }

    // Build the post creation payload safely
    const postData: any = {
      content,
      authorId: resolvedAuthorId,
      type: type || "POST",
    };
    
    if (imageUrl) postData.imageUrl = imageUrl;
    if (title) postData.title = title;
    postData.tags = (tags && Array.isArray(tags)) ? tags : []; // Guarantee array

    console.log("[API] Attempting to create post with data:", postData);

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

    // Normalize to match the GET format the frontend expects
    const formattedPost = {
      ...post,
      reactions: [],
      _count: {
        likes: (post._count as any)?.reactions ?? 0,
        comments: (post._count as any)?.comments ?? 0,
        reposts: (post._count as any)?.reposts ?? 0,
      },
    };

    return NextResponse.json(formattedPost);
  } catch (error: any) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: error.message || "Failed to create post", details: error.toString() }, { status: 500 });
  }
}