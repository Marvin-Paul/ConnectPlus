import { describe, it, expect, vi, beforeEach } from "vitest";
import { NotificationService } from "./notifications";
import { prisma } from "./prisma";

describe("NotificationService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create a professional notification for connection requests", async () => {
    // Setup mocks
    (prisma.user.findUnique as any).mockResolvedValue({
      firstName: "Jane",
      lastName: "Smith",
    });
    
    (prisma.notification.create as any).mockResolvedValue({
      id: "notif_123",
      content: "Jane Smith requested to join your professional circle.",
    });

    const result = await NotificationService.create({
      userId: "user_target",
      actorId: "user_actor",
      type: "CONNECTION_REQUEST",
    });

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: "user_actor" },
      select: { firstName: true, lastName: true },
    });

    expect(prisma.notification.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          content: "Jane Smith requested to join your professional circle.",
        }),
      })
    );

    expect(result?.id).toBe("notif_123");
  });

  it("should not notify a user of their own actions", async () => {
    const result = await NotificationService.create({
      userId: "same_user",
      actorId: "same_user",
      type: "REACTION",
    });

    expect(result).toBeNull();
    expect(prisma.notification.create).not.toHaveBeenCalled();
  });

  it("should handle custom content correctly", async () => {
    (prisma.user.findUnique as any).mockResolvedValue({
      firstName: "John",
      lastName: "Doe",
    });

    await NotificationService.create({
      userId: "target",
      actorId: "actor",
      type: "SYSTEM",
      customContent: "Welcome to the elite tier!",
    });

    expect(prisma.notification.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          content: "Welcome to the elite tier!",
        }),
      })
    );
  });
});
