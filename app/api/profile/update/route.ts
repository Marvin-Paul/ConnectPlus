import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

const profileUpdateSchema = z.object({
  headline: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().optional(),
  avatarUrl: z.string().optional(),
  bannerUrl: z.string().optional(),
});

export async function PATCH(req: Request) {
  try {
    const authUser = await getAuthUser();
    
    if (!authUser) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = profileUpdateSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { message: validatedData.error.issues[0].message },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: authUser.id },
      data: validatedData.data,
    });

    return NextResponse.json(
      { message: "Profile updated successfully", user: updatedUser },
      { status: 200 }
    );

  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
