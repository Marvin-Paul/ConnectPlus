export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const db = prisma as any;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username") || "demo-user";

    const user = await db.user.findUnique({
      where: { username },
      select: { id: true }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const notifications = await db.notification.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 20
    });

    return NextResponse.json(notifications);
  } catch (error: any) {
    console.error("Notifications fetch error:", error);
    return NextResponse.json({ 
      error: "Internal Server Error", 
      details: error.message || String(error),
      code: error.code
    }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, readAll, username } = await req.json();

    if (readAll && username) {
      const user = await db.user.findUnique({
        where: { username },
        select: { id: true }
      });
      if (user) {
        await db.notification.updateMany({
          where: { userId: user.id, isRead: false },
          data: { isRead: true }
        });
      }
    } else if (id) {
      await db.notification.update({
        where: { id },
        data: { isRead: true }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Notification update error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
