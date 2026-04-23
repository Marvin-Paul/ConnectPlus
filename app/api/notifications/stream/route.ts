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
      const safeEnqueue = (data: string) => {
        try {
          controller.enqueue(encoder.encode(data));
        } catch (err) {
          console.warn("[SSE] Enqueue failed (stream likely closed):", err);
          cleanup();
        }
      };

      // Send initial heartbeat and retry interval
      safeEnqueue("retry: 5000\n\n");
      safeEnqueue(": heartbeat\n\n");

      // Subscribe to real-time events from the NotificationService
      const unsubscribe = NotificationService.subscribe(userId, (notification) => {
        const data = JSON.stringify(notification);
        safeEnqueue(`data: ${data}\n\n`);
      });

      // Keep connection alive with heartbeats every 30 seconds
      const heartbeat = setInterval(() => {
        safeEnqueue(": heartbeat\n\n");
      }, 30000);

      const cleanup = () => {
        unsubscribe();
        clearInterval(heartbeat);
        try {
          controller.close();
        } catch (e) {
          // Ignore if already closed
        }
      };

      // Clean up on close
      request.signal.addEventListener("abort", cleanup);
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
