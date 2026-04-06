import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ReactionType } from "@prisma/client";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { userId, type } = body; // type is ReactionType like 'LIKE', 'LOVE', etc.

    if (!userId || !type) {
      return NextResponse.json({ error: "userId and type are required" }, { status: 400 });
    }

    const postId = id;

    // Check if reaction exists
    const existingReaction = await prisma.reaction.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existingReaction) {
      if (existingReaction.type === (type as ReactionType)) {
        // Toggle off if same type
        await prisma.reaction.delete({
          where: { id: existingReaction.id },
        });
        return NextResponse.json({ action: "removed" });
      } else {
        // Change reaction type
        const updated = await prisma.reaction.update({
          where: { id: existingReaction.id },
          data: { type: type as ReactionType },
        });
        return NextResponse.json({ action: "updated", reaction: updated });
      }
    }

    // New reaction
    const newReaction = await prisma.reaction.create({
      data: {
        postId,
        userId,
        type: type as ReactionType,
      },
    });

    // Create notification if target is NOT user's own post
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (post && post.authorId !== userId) {
      await prisma.notification.create({
        data: {
          userId: post.authorId,
          type: "REACTION",
          content: `someone reacted to your post`,
          sourceId: postId,
          sourceType: "POST",
        },
      });
    }

    return NextResponse.json({ action: "created", reaction: newReaction });
  } catch (error) {
    console.error("Error reacting to post:", error);
    return NextResponse.json({ error: "Failed to react to post" }, { status: 500 });
  }
}
