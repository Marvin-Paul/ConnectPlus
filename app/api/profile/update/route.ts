import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { username, ...data } = body

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 })
    }

    const updatedUser = await prisma.user.upsert({
      where: { username },
      update: {
        firstName: data.firstName,
        lastName: data.lastName,
        headline: data.headline,
        location: data.location,
        pronouns: data.pronouns,
        bio: data.bio,
      },
      create: {
        username,
        email: `${username}@example.com`,
        passwordHash: "demo-password-hash",
        firstName: data.firstName,
        lastName: data.lastName,
        headline: data.headline,
        location: data.location,
        pronouns: data.pronouns,
        bio: data.bio,
      }
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
