import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { generateToken, setAuthCookie } from "@/lib/auth";

export const runtime = "nodejs";

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
    let email = identifier;

    // 2. Identify if identifier is email or phone
    const isEmail = identifier.includes('@');
    
    if (!isEmail) {
      // Try finding user by phone in Prisma to get the email
      const userWithPhone = await prisma.user.findFirst({
        where: { phone: identifier },
        select: { email: true }
      });

      if (userWithPhone) {
        email = userWithPhone.email;
      } else {
        // If not found in Prisma by phone, we can't proceed to Supabase with an email
        return NextResponse.json(
          { message: "Invalid email/phone or password" },
          { status: 401 }
        );
      }
    }

    // 3. Authenticate with Supabase
    const authResponse = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (authResponse.error) {
      return NextResponse.json(
        { message: "Invalid email/phone or password" },
        { status: 401 }
      );
    }

    const { user: authUser } = authResponse.data;

    if (!authUser) {
       return NextResponse.json(
         { message: "Authentication failed" },
         { status: 500 }
       );
    }

    // 3. Ensure user exists in Prisma (Sync)
    let user = await prisma.user.findUnique({
      where: { id: authUser.id }
    });

    if (!user) {
       // Auto-create Prisma profile if it exists in Supabase Auth but not and DB
       // This can happen if users were imported or if a previous sync failed.
       user = await prisma.user.create({
         data: {
           id: authUser.id,
           email: authUser.email!,
           name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || "User",
           phone: authUser.phone || authUser.user_metadata?.phone || "",
           passwordHash: 'AUTH_MANAGED_BY_SUPABASE',
           username: authUser.email?.split("@")[0].toLowerCase() + "_" + Math.floor(Math.random() * 1000),
         }
       });
    }

    // 4. Generate local JWT and set cookie
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
