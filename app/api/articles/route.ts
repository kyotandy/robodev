import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const json = await request.json()
    const { title, content, category, status } = json

    if (!title || !content || !category) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const article = await prisma.article.create({
      data: {
        title,
        content,
        status,
        userId: session.user.id,
        publishedAt: status === "published" ? new Date() : null,
      },
    })

    // Create stats record for the article
    await prisma.stats.create({
      data: {
        targetType: "article",
        targetId: article.id,
        views: 0,
        likes: 0,
        comments: 0,
      },
    })

    return NextResponse.json(article)
  } catch (error) {
    console.error("[ARTICLES_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 