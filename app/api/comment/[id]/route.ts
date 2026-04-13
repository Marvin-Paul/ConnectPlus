import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const comment = await prisma.comment.findUnique({
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
      },
    });

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    return NextResponse.json(comment);
  } catch (error) {
    console.error("Error fetching single comment:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
