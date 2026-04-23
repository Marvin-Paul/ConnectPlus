import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { NotificationService } from "@/lib/notifications";
import { ReactionType } from "@prisma/client";

/**
 * POST /api/posts/[id]/react
 * Toggles or updates a reaction on a post.
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
    const { userId, type } = body;

    if (!userId || !type) {
      return NextResponse.json({ error: "userId and type are required" }, { status: 400 });
    }

    // Verify post exists before reacting
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Check if reaction exists for this user/post combo
    const existingReaction = await prisma.reaction.findUnique({
      where: {
        userId_postId: {
          userId,
          postId: postId!,
        },
      },
    });

    if (existingReaction) {
      if (existingReaction.type === (type as ReactionType)) {
        // Toggle OFF if same type
        await prisma.reaction.delete({
          where: { id: existingReaction.id },
        });
        return NextResponse.json({ success: true, action: "removed" });
      } else {
        // Change reaction type (e.g. LIKE to LOVE)
        const updated = await prisma.reaction.update({
          where: { id: existingReaction.id },
          data: { type: type as ReactionType },
        });
        return NextResponse.json({ success: true, action: "updated", reaction: updated });
      }
    }

    // Create new reaction
    const newReaction = await prisma.reaction.create({
      data: {
        postId: postId!,
        userId,
        type: type as ReactionType,
      },
    });

    // Handle notifications using the professional service
    if (post.authorId !== userId) {
      NotificationService.create({
        userId: post.authorId,
        actorId: userId,
        type: "REACTION",
        sourceId: postId!,
        sourceType: "POST",
      });
    }

    return NextResponse.json({ success: true, action: "created", reaction: newReaction });
  } catch (error: any) {
    console.error(`[API] Error in post reaction for ${postId || 'unknown'}:`, error);
    return NextResponse.json(
      { error: "Failed to process reaction", details: error.message },
      { status: 500 }
    );
  }
}
