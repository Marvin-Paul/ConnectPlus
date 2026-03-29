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

    const newItem = await prisma.featuredItem.create({
      data: {
        userId: user.id,
        title: data.title,
        description: data.description,
        linkUrl: data.linkUrl,
        imageUrl: data.imageUrl,
        type: data.type || "LINK"
      }
    })

    return NextResponse.json(newItem)
  } catch (error) {
    console.error("Featured add error:", error)
    return NextResponse.json({ error: "Failed to add featured item" }, { status: 500 })
  }
}
