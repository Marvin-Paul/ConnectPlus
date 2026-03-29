import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PATCH(req: Request) {
  try {
    const body = await req.json()
    const { username, skillId, isPinned } = body

    if (!username || !skillId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { username }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Optional: Max 3 pins logic
    if (isPinned) {
      const pinnedSkillsCount = await prisma.skill.count({
        where: { userId: user.id, isPinned: true }
      })
      if (pinnedSkillsCount >= 3) {
        return NextResponse.json({ error: "Max 3 skills can be pinned" }, { status: 400 })
      }
    }

    const updatedSkill = await prisma.skill.update({
      where: { id: skillId, userId: user.id },
      data: { isPinned }
    })

    return NextResponse.json(updatedSkill)
  } catch (error) {
    console.error("Skill pin error:", error)
    return NextResponse.json({ error: "Failed to update skill pinning" }, { status: 500 })
  }
}
