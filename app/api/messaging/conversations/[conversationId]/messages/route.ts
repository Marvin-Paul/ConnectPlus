export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEMO_USERNAME = "demo-user";

// Use type assertion to work around prisma client not being generated yet.
// Once you run `npx prisma generate`, these casts become redundant but harmless.
const db = prisma as any;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ conversationId: string }> }
) {
  try {
    const { conversationId } = await params;

    const messages = await db.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
            username: true,
          },
        },
      },
    });

    const currentUser = await db.user.findUnique({
      where: { username: DEMO_USERNAME },
      select: { id: true },
    });

    const formatted = messages.map((m: any) => ({
      id: m.id,
      text: m.content,
      time: new Date(m.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: m.senderId === currentUser?.id ? "me" : "them",
      name:
        m.senderId === currentUser?.id
          ? `${m.sender.firstName} ${m.sender.lastName} (You)`
          : `${m.sender.firstName} ${m.sender.lastName}`,
      avatar:
        m.sender.avatarUrl ??
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    }));

    // Mark messages as read
    if (currentUser) {
      await db.message.updateMany({
        where: {
          conversationId,
          senderId: { not: currentUser.id },
          isRead: false,
        },
        data: { isRead: true },
      });
    }

    return NextResponse.json({ messages: formatted });
  } catch (err) {
    console.error("[GET /api/messaging/conversations/[id]/messages]", err);
    return NextResponse.json({ messages: [] });
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ conversationId: string }> }
) {
  try {
    const { conversationId } = await params;
    const { content } = await req.json();

    if (!content?.trim()) {
      return NextResponse.json({ error: "Empty message" }, { status: 400 });
    }

    const currentUser = await db.user.findUnique({
      where: { username: DEMO_USERNAME },
      select: { id: true, firstName: true, lastName: true, avatarUrl: true },
    });

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const message = await db.message.create({
      data: {
        conversationId,
        senderId: currentUser.id,
        content: content.trim(),
      },
    });

    // Update conversation updatedAt
    await db.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });

    return NextResponse.json({
      id: message.id,
      text: message.content,
      time: new Date(message.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: "me",
      name: `${currentUser.firstName} ${currentUser.lastName} (You)`,
      avatar:
        currentUser.avatarUrl ??
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
    });
  } catch (err) {
    console.error("[POST /api/messaging/conversations/[id]/messages]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
