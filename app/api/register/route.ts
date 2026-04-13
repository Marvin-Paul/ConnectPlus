import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { generateToken, setAuthCookie } from "@/lib/auth";

export const runtime = "nodejs";

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

    // 2. Register user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          phone: phone,
        },
      },
    });

    if (authError) {
      console.error("Supabase Auth sign-up error:", authError);
      const status =
        typeof (authError as any)?.status === "number" ? (authError as any).status : undefined;
      const code = typeof (authError as any)?.code === "string" ? (authError as any).code : undefined;

      if (status === 429 || code === "over_email_send_rate_limit") {
        return NextResponse.json(
          {
            message:
              "Sign-up email rate limit exceeded. Wait a bit, use a different email address, or disable email confirmations in Supabase while developing.",
            code: code ?? "over_email_send_rate_limit",
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { message: authError.message, code },
        { status: 400 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        { message: "Registration failed – user not created" },
        { status: 500 }
      );
    }

    // 3. Create entry in Prisma 'User' table linked by auth ID
    // Check if user already exists in Prisma (might happen if auth succeeded once but DB failed)
    let user = await prisma.user.findUnique({ where: { id: authData.user.id } });

    if (!user) {
      const [firstName, ...lastNameParts] = name.split(' ');
      const lastName = lastNameParts.join(' ');

      user = await prisma.user.create({
        data: {
          id: authData.user.id,
          name,
          firstName: firstName || name,
          lastName: lastName || "",
          email,
          phone,
          passwordHash: 'AUTH_MANAGED_BY_SUPABASE',
          verified: false,
          username: email.split("@")[0].toLowerCase() + "_" + Math.floor(Math.random() * 1000),
        }
      });
    }

    // 4. Generate local JWT and set cookie if verification isn't required to login
    // Note: If email confirmation is enabled in Supabase, the user might not be 'active' yet.
    // In many dev environments, confirmation is disabled by default.
    const token = generateToken({ userId: user.id, email: user.email });
    await setAuthCookie(token);

    return NextResponse.json(
      { 
        message: "Registration successful. Welcome to Connect+!", 
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
