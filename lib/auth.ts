import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "./prisma";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-for-development-only";

export interface JWTPayload {
  userId: string;
  email: string;
}

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export const generateToken = (payload: JWTPayload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token: string): JWTPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
};

export const getAuthUser = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) return null;

    const decoded = verifyToken(token);
    if (!decoded || !decoded.userId) return null;

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        username: true,
        avatarUrl: true,
        headline: true,
        isPremium: true,
        verified: true,
        role: true,
        _count: {
          select: {
            followers: true,
            posts: true,
          }
        }
      } as any
    });
    
    if (!user) return null;

    // Fetch connection count separately if needed, or simplify for now
    const connectionCount = await prisma.connection.count({
      where: {
        OR: [
          { requesterId: user.id, status: 'ACCEPTED' },
          { addresseeId: user.id, status: 'ACCEPTED' }
        ]
      }
    });

    return {
      ...user,
      totalConnections: connectionCount
    };
  } catch (error) {
    console.error("[Auth] getAuthUser failure:", error);
    return null;
  }
};

export const setAuthCookie = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
};

export const removeAuthCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("auth-token");
};
