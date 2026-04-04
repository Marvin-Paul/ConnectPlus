import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || "demo-user"; // Fallback for demo
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const posts = await prisma.post.findMany({
      take: limit,
      skip: skip,
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
        _count: {
          select: {
            comments: true,
            reactions: true,
            reposts: true,
          },
        },
        reactions: {
          where: { userId: userId },
          select: { type: true },
        },
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content, imageUrl, authorId, type = "POST", title, tags } = body;

    if (!content || !authorId) {
      return NextResponse.json({ error: "Content and authorId are required" }, { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        content,
        imageUrl,
        authorId,
        type,
        title,
        tags: tags || [],
      },
      include: {
        author: true,
        _count: true,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
