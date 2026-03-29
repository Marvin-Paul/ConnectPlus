import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { username, ...data } = body

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { username }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const startDate = new Date(data.startDate)
    const endDate = data.endDate ? new Date(data.endDate) : null

    const newExperience = await prisma.experience.create({
      data: {
        userId: user.id,
        title: data.title,
        company: data.company,
        location: data.location,
        startDate,
        endDate,
        isCurrent: Boolean(data.isCurrent),
        description: data.description,
      }
    })

    return NextResponse.json(newExperience)
  } catch (error) {
    console.error("Experience add error:", error)
    return NextResponse.json({ error: "Failed to add experience" }, { status: 500 })
  }
}
