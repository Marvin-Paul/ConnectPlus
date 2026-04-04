export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEMO_USERNAME = "demo-user";

// Use type assertion to work around prisma client not being generated yet.
// Once you run `npx prisma generate`, these casts become redundant but harmless.
const db = prisma as any;

export async function GET() {
  try {
    const user = await db.user.findUnique({
      where: { username: DEMO_USERNAME },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ conversations: [] });
    }

    const participations = await db.conversationParticipant.findMany({
      where: { userId: user.id },
      include: {
        conversation: {
          include: {
            participants: {
              include: {
                user: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    avatarUrl: true,
                    headline: true,
                    isPremium: true,
                  },
                },
              },
            },
            messages: {
              orderBy: { createdAt: "desc" },
              take: 1,
            },
          },
        },
      },
      orderBy: {
        joinedAt: "desc",
      },
    });

    const conversations = participations.map((p: any) => {
      const otherParticipants = p.conversation.participants.filter(
        (part: any) => part.userId !== user.id
      );
      const lastMessage = p.conversation.messages[0] ?? null;
      const otherUser = otherParticipants[0]?.user;

      return {
        id: p.conversation.id,
        name: otherUser
          ? `${otherUser.firstName} ${otherUser.lastName}`
          : "Unknown",
        headline: otherUser?.headline ?? "",
        avatar: otherUser?.avatarUrl ?? null,
        isPremium: otherUser?.isPremium ?? false,
        lastMessage: lastMessage?.content ?? "",
        time: lastMessage
          ? new Date(lastMessage.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "",
        unread: lastMessage ? !lastMessage.isRead && lastMessage.senderId !== user.id : false,
        isOnline: false,
        otherUserId: otherUser?.id ?? null,
      };
    });

    return NextResponse.json({ conversations });
  } catch (err) {
    console.error("[GET /api/messaging/conversations]", err);
    return NextResponse.json({ conversations: [] });
  }
}

export async function POST(req: Request) {
  try {
    const { targetUserId } = await req.json();

    const currentUser = await db.user.findUnique({
      where: { username: DEMO_USERNAME },
      select: { id: true },
    });

    if (!currentUser || !targetUserId) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Check if conversation already exists
    const existing = await db.conversationParticipant.findFirst({
      where: {
        userId: currentUser.id,
        conversation: {
          participants: {
            some: { userId: targetUserId },
          },
        },
      },
      select: { conversationId: true },
    });

    if (existing) {
      return NextResponse.json({ conversationId: existing.conversationId });
    }

    // Create new conversation
    const conversation = await db.conversation.create({
      data: {
        participants: {
          create: [{ userId: currentUser.id }, { userId: targetUserId }],
        },
      },
    });

    return NextResponse.json({ conversationId: conversation.id });
  } catch (err) {
    console.error("[POST /api/messaging/conversations]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
