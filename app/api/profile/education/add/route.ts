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

    const startDate = data.startDate ? new Date(data.startDate) : null
    const endDate = data.endDate ? new Date(data.endDate) : null

    const newEducation = await prisma.education.create({
      data: {
        userId: user.id,
        school: data.school,
        degree: data.degree,
        fieldOfStudy: data.fieldOfStudy,
        startDate,
        endDate,
        grade: data.grade,
        description: data.description,
      }
    })

    return NextResponse.json(newEducation)
  } catch (error) {
    console.error("Education add error:", error)
    return NextResponse.json({ error: "Failed to add education" }, { status: 500 })
  }
}
