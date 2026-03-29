import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function DELETE(req: Request) {
  try {
    const body = await req.json()
    const { username, skillId } = body

    if (!username || !skillId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { username }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    await prisma.skill.delete({
      where: { id: skillId, userId: user.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Skill delete error:", error)
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 })
  }
}
