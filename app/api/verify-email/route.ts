import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ message: "Verification token is required" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findFirst({
      where: { verificationToken: token },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        verified: true,
        verificationToken: null, // Clear the token after successful verification
      },
    });

    // You could redirect to a success page or just return JSON
    return NextResponse.redirect(new URL("/login?verified=true", req.url));

  } catch (error) {
    console.error("Email verification error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
