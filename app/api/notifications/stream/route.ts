import { NextRequest } from "next/server";
import { NotificationService } from "@/lib/notifications";

export const dynamic = "force-dynamic";

/**
 * GET /api/notifications/stream
 * Establishes a Server-Sent Events (SSE) connection for real-time professional notifications.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return new Response("userId is required", { status: 400 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Send initial heartbeat
      controller.enqueue(encoder.encode(": heartbeat\n\n"));

      // Subscribe to real-time events from the NotificationService
      const unsubscribe = NotificationService.subscribe(userId, (notification) => {
        const data = JSON.stringify(notification);
        controller.enqueue(encoder.encode(`data: ${data}\n\n`));
      });

      // Keep connection alive with heartbeats every 30 seconds
      const heartbeat = setInterval(() => {
        controller.enqueue(encoder.encode(": heartbeat\n\n"));
      }, 30000);

      // Clean up on close
      request.signal.addEventListener("abort", () => {
        unsubscribe();
        clearInterval(heartbeat);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
    },
  });
}
