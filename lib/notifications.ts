import { prisma } from "./prisma";
import { NotificationType } from "@prisma/client";
import { EventEmitter } from "events";

// Global event emitter to handle real-time updates across the server
const notificationEvents = new EventEmitter();

/**
 * Service to handle professional notification creation across the platform.
 * Centralizing this ensures consistent messaging and easier future updates.
 */
export const NotificationService = {
  /**
   * Create a standard notification with professional templates
   */
  async create({
    userId,
    actorId,
    type,
    sourceId,
    sourceType,
    customContent
  }: {
    userId: string;
    actorId: string;
    type: NotificationType;
    sourceId?: string;
    sourceType?: string;
    customContent?: string;
  }) {
    // Don't notify users of their own actions
    if (userId === actorId) return null;

    try {
      // Fetch actor details for professional messaging
      const actor = await prisma.user.findUnique({
        where: { id: actorId },
        select: { firstName: true, lastName: true }
      });

      const actorName = actor ? `${actor.firstName} ${actor.lastName}` : "Someone";
      let content = customContent;

      if (!content) {
        switch (type) {
          case "REACTION":
            content = `${actorName} reacted to your post.`;
            break;
          case "COMMENT":
            content = `${actorName} commented on your post.`;
            break;
          case "CONNECTION_REQUEST":
            content = `${actorName} requested to join your professional circle.`;
            break;
          case "CONNECTION_ACCEPTED":
            content = `${actorName} accepted your connection request.`;
            break;
          case "REPOST":
            content = `${actorName} shared your post with their network.`;
            break;
          case "MENTION":
            content = `${actorName} mentioned you in a post.`;
            break;
          case "JOB_ALERT":
            content = `A new job matching your profile was posted.`;
            break;
          default:
            content = `${actorName} interacted with your profile.`;
        }
      }

      const notification = await prisma.notification.create({
        data: {
          userId,
          type,
          content,
          sourceId,
          sourceType,
        }
      });

      // Emit event for real-time stream
      notificationEvents.emit(`notification:${userId}`, notification);

      return notification;
    } catch (error) {
      console.error("[NotificationService] Error creating notification:", error);
      return null;
    }
  },

  /**
   * Subscribe to real-time notifications for a user
   */
  subscribe(userId: string, callback: (notification: any) => void) {
    const eventName = `notification:${userId}`;
    notificationEvents.on(eventName, callback);
    return () => notificationEvents.off(eventName, callback);
  }
};
