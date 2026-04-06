import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { hashPassword, generateToken, setAuthCookie } from "@/lib/auth";

const registerSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // 1. Validate inputs
    const validatedData = registerSchema.safeParse(body);
    
    if (!validatedData.success) {
      return NextResponse.json(
        { message: validatedData.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, email, phone, password } = validatedData.data;

    // 2. Prevent duplicate accounts (same email or phone number)
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { phone },
        ],
      },
    });

    if (existingUser) {
      const field = existingUser.email === email ? "email" : "phone number";
      return NextResponse.json(
        { message: `User with this ${field} already exists` },
        { status: 409 }
      );
    }

    // 3. Hash password
    const passwordHash = await hashPassword(password);

    // 4. Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // 5. Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        passwordHash,
        verificationToken,
        verified: false,
        username: email.split("@")[0] + "_" + Math.floor(Math.random() * 1000),
      },
      select: {
        id: true,
        name: true,
        email: true,
      }
    });

    // Note: In a real production app, you would send the email here.
    // sendVerificationEmail(user.email, verificationToken);

    // 6. Generate JWT and set cookie
    const token = generateToken({ userId: user.id, email: user.email });
    await setAuthCookie(token);

    return NextResponse.json(
      { 
        message: "Registration successful. Please check your email for verification.", 
        user: { id: user.id, name: user.name, email: user.email } 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
