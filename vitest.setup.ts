import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock Prisma
vi.mock("./lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
    },
    notification: {
      create: vi.fn(),
    },
  },
}));
