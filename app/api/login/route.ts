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

    // 2. Authenticate with Supabase
    // Note: identifier could be email or phone. Supabase supports both but usually via different methods.
    // We'll try as email first.
    let authResponse = await supabase.auth.signInWithPassword({
      email: identifier,
      password: password,
    });

    if (authResponse.error && !identifier.includes('@')) {
       const userRecord = await prisma.user.findFirst({
         where: {
           OR: [
             { phone: identifier },
             { username: identifier }
           ]
         },
         select: { email: true }
       });

       if (userRecord) {
         authResponse = await supabase.auth.signInWithPassword({
           email: userRecord.email,
           password: password,
         });
       }
    }

    if (authResponse.error) {
      // --- DEVELOPER BACKDOOR ---
      // Allow logging in with seeded accounts where the password matches the raw 'passwordHash'
      const seededUser = await prisma.user.findFirst({
        where: {
          OR: [
            { email: identifier },
            { username: identifier },
            { phone: identifier }
          ]
        }
      });

      if (seededUser && seededUser.passwordHash === password) {
        // Backdoor success! Generate token manually without Supabase Auth
        const token = generateToken({ userId: seededUser.id, email: seededUser.email });
        await setAuthCookie(token);

        return NextResponse.json(
          { 
            message: "Developer backdoor login successful", 
            user: { id: seededUser.id, name: seededUser.name, email: seededUser.email } 
          },
          { status: 200 }
        );
      }
      // --------------------------

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
           phone: authUser.phone || authUser.user_metadata?.phone || null,
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

  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: `Internal Server Error: ${error?.message || String(error)}` },
      { status: 500 }
    );
  }
}
