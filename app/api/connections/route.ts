import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const db = prisma as any;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const status = searchParams.get("status") || "ACCEPTED";

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const connections = await db.connection.findMany({
      where: {
        OR: [
          { requesterId: userId, status },
          { addresseeId: userId, status }
        ]
      },
      include: {
        requester: {
          select: { id: true, firstName: true, lastName: true, avatarUrl: true, headline: true }
        },
        addressee: {
          select: { id: true, firstName: true, lastName: true, avatarUrl: true, headline: true }
        }
      }
    });

    return NextResponse.json(connections);
  } catch (error) {
    console.error("Error fetching connections:", error);
    return NextResponse.json({ error: "Failed to fetch connections" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { requesterId, addresseeId } = await request.json();

    if (!requesterId || !addresseeId) {
      return NextResponse.json({ error: "requesterId and addresseeId are required" }, { status: 400 });
    }

    if (requesterId === addresseeId) {
      return NextResponse.json({ error: "Cannot connect with yourself" }, { status: 400 });
    }

    // Check if connection already exists
    const existing = await db.connection.findFirst({
      where: {
        OR: [
          { requesterId, addresseeId },
          { requesterId: addresseeId, addresseeId: requesterId }
        ]
      }
    });

    if (existing) {
      return NextResponse.json(existing);
    }

    const connection = await db.connection.create({
      data: {
        requesterId,
        addresseeId,
        status: "PENDING"
      }
    });

    // Create a notification for the addressee
    const requester = await db.user.findUnique({ where: { id: requesterId }, select: { firstName: true, lastName: true } });
    await db.notification.create({
      data: {
        userId: addresseeId,
        type: "CONNECTION_REQUEST",
        content: `${requester.firstName} ${requester.lastName} requested to join your professional circle.`,
        sourceId: connection.id,
        sourceType: "CONNECTION"
      }
    });

    return NextResponse.json(connection);
  } catch (error) {
    console.error("Error creating connection:", error);
    return NextResponse.json({ error: "Failed to create connection" }, { status: 500 });
  }
}
