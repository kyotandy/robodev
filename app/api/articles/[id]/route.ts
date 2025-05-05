import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log("Fetching article with ID:", params.id)
    console.log("Request URL:", request.url)

    // Prismaの接続状態を確認
    await prisma.$connect()
    console.log("Prisma connection successful")

    const article = await prisma.article.findUnique({
      where: {
        id: params.id,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
        stats: true,
      },
    })

    console.log("Prisma query result:", article)

    if (!article) {
      console.log("Article not found with ID:", params.id)
      return new NextResponse(
        JSON.stringify({ error: "Article not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      )
    }

    await prisma.$disconnect()
    console.log("Article found:", article)
    return NextResponse.json(article)
  } catch (error) {
    console.error("Detailed error fetching article:", error)
    console.error("Error stack trace:", error instanceof Error ? error.stack : "No stack trace")
    
    if (error instanceof PrismaClientKnownRequestError) {
      console.error("Prisma error code:", error.code)
      console.error("Prisma error message:", error.message)
      if (error.code === "P2023") {
        return new NextResponse(
          JSON.stringify({ error: "Invalid ID format" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        )
      }
    }

    try {
      await prisma.$disconnect()
    } catch (disconnectError) {
      console.error("Error disconnecting from Prisma:", disconnectError)
    }
    
    return new NextResponse(
      JSON.stringify({ 
        error: "Internal Server Error", 
        details: error instanceof Error ? error.message : "Unknown error",
        type: error instanceof Error ? error.constructor.name : "Unknown type"
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new NextResponse(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      )
    }

    const body = await request.json()
    const { title, content, category, status } = body

    const article = await prisma.article.update({
      where: {
        id: params.id,
      },
      data: {
        title,
        content,
        category,
        status,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(article)
  } catch (error) {
    console.error("Error updating article:", error)
    
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return new NextResponse(
          JSON.stringify({ error: "Article not found" }),
          { status: 404, headers: { "Content-Type": "application/json" } }
        )
      }
    }
    
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error", details: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
} 