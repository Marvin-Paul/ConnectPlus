import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { receiverUsername, authorName, headline, relationship, content } = body

    if (!receiverUsername || !authorName || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const receiver = await prisma.user.findUnique({ where: { username: receiverUsername } })
    if (!receiver) {
      return NextResponse.json({ error: "Receiver not found" }, { status: 404 })
    }

    // In a real app, authorId would be the current session user ID.
    // For this demo/setup, we'll use the user himself as author if they are self-recommending 
    // or just use a default system user if not exists.
    // Let's assume for now the author is the receiver (for demo purposes) or a fixed demo ID.
    
    // Attempt to find or create a demo author user to keep database clean
    const demoAuthorUsername = "recommendation-author"
    let author = await prisma.user.findUnique({ where: { username: demoAuthorUsername } })
    
    if (!author) {
        // Create a dummy author if it doesn't exist
        author = await prisma.user.create({
            data: {
                username: demoAuthorUsername,
                email: "author@example.com",
                passwordHash: "dummy",
                firstName: authorName.split(" ")[0] || "Jane",
                lastName: authorName.split(" ")[1] || "Doe",
                headline: headline || "Professional Advocate"
            }
        })
    }

    const recommendation = await prisma.recommendation.create({
      data: {
        receiverId: receiver.id,
        authorId: author.id,
        content,
        relationship,
      }
    })

    return NextResponse.json(recommendation)
  } catch (error) {
    console.error("Recommendation add error:", error)
    return NextResponse.json({ error: "Failed to add recommendation" }, { status: 500 })
  }
}
