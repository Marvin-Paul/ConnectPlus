export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { requesterUsername, addresseeUsername, action } = body

    if (!requesterUsername || !addresseeUsername || !action) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const requester = await prisma.user.findUnique({ where: { username: requesterUsername } })
    const addressee = await prisma.user.findUnique({ where: { username: addresseeUsername } })

    if (!requester || !addressee) {
      return NextResponse.json({ error: "One or both users not found" }, { status: 404 })
    }

    if (action === "CONNECT") {
      const existing = await prisma.connection.findFirst({
        where: {
          OR: [
            { requesterId: requester.id, addresseeId: addressee.id },
            { requesterId: addressee.id, addresseeId: requester.id }
          ]
        }
      })

      if (existing) {
        return NextResponse.json({ error: "Connection already exists or is pending" }, { status: 400 })
      }

      const connection = await prisma.connection.create({
        data: {
          requesterId: requester.id,
          addresseeId: addressee.id,
          status: "PENDING"
        }
      })
      return NextResponse.json(connection)
    }

    if (action === "ACCEPT") {
        const connection = await prisma.connection.update({
            where: {
                requesterId_addresseeId: {
                    requesterId: addressee.id, // requester was the other person
                    addresseeId: requester.id
                }
            },
            data: { status: "ACCEPTED" }
        })
        return NextResponse.json(connection)
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Network connection error:", error)
    return NextResponse.json({ error: "Failed to process network action" }, { status: 500 })
  }
}
