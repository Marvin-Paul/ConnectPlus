import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { username, name } = body

    if (!username || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { username }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const newSkill = await prisma.skill.upsert({
      where: {
        userId_name: {
          userId: user.id,
          name: name.trim(),
        }
      },
      update: {},
      create: {
        userId: user.id,
        name: name.trim(),
      }
    })

    return NextResponse.json(newSkill)
  } catch (error) {
    console.error("Skill add error:", error)
    return NextResponse.json({ error: "Failed to add skill" }, { status: 500 })
  }
}
