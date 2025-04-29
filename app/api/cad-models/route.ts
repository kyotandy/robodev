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

    // マルチパートフォームデータを処理
    const formData = await request.formData()
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const category = formData.get("category") as string
    const status = formData.get("status") as "draft" | "published"
    const file = formData.get("file") as File
    const thumbnail = formData.get("thumbnail") as File

    if (!title || !description || !category || !file || !thumbnail) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    // TODO: ここでファイルをストレージにアップロード
    // 例: AWS S3, Cloudinary, Supabase Storageなど
    const fileUrl = "/temp/file-url" // 仮のURL
    const thumbnailUrl = "/temp/thumbnail-url" // 仮のURL

    const cadModel = await prisma.cADModel.create({
      data: {
        title,
        description,
        category,
        status,
        fileUrl,
        thumbnailUrl,
        userId: session.user.id,
        publishedAt: status === "published" ? new Date() : null,
      },
    })

    // Create stats record for the CAD model
    await prisma.stats.create({
      data: {
        targetType: "cad_model",
        targetId: cadModel.id,
        views: 0,
        likes: 0,
        comments: 0,
      },
    })

    return NextResponse.json(cadModel)
  } catch (error) {
    console.error("[CAD_MODELS_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 