import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { username, type, ...data } = body

    if (!username || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { username }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    let result
    switch (type) {
      case "CERTIFICATION":
        result = await prisma.certification.create({
          data: {
            userId: user.id,
            name: data.title,
            issuingOrg: data.organization,
            issueDate: data.date ? new Date(data.date) : null,
          }
        })
        break
      case "PROJECT":
        result = await prisma.project.create({
          data: {
            userId: user.id,
            name: data.title,
            description: data.description,
          }
        })
        break
      case "VOLUNTEER":
        result = await prisma.volunteerExperience.create({
          data: {
            userId: user.id,
            role: data.title,
            organization: data.organization,
          }
        })
        break
      case "HONOR":
        result = await prisma.honor.create({
          data: {
            userId: user.id,
            title: data.title,
            issuer: data.organization,
            issueDate: data.date ? new Date(data.date) : null,
          }
        })
        break
      default:
        return NextResponse.json({ error: "Invalid accomplishment type" }, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Accomplishment add error:", error)
    return NextResponse.json({ error: "Failed to add accomplishment" }, { status: 500 })
  }
}
