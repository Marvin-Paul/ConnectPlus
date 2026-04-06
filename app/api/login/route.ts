import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { comparePassword, generateToken, setAuthCookie } from "@/lib/auth";

const loginSchema = z.object({
  identifier: z.string().min(1, "Email or phone is required"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // 1. Validate inputs
    const validatedData = loginSchema.safeParse(body);
    
    if (!validatedData.success) {
      return NextResponse.json(
        { message: validatedData.error.issues[0].message },
        { status: 400 }
      );
    }

    const { identifier, password } = validatedData.data;

    // 2. Find user by email or phone
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { phone: identifier },
        ],
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email/phone or password" },
        { status: 401 }
      );
    }

    // 3. Verify password
    const isPasswordValid = await comparePassword(password, user.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email/phone or password" },
        { status: 401 }
      );
    }

    // 4. Generate JWT and set cookie
    const token = generateToken({ userId: user.id, email: user.email });
    await setAuthCookie(token);

    return NextResponse.json(
      { 
        message: "Login successful", 
        user: { id: user.id, name: user.name, email: user.email } 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
