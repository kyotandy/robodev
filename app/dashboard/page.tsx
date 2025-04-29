import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { format } from "date-fns"
import { PenSquare, FileUp, Plus } from "lucide-react"

type ArticleWithStats = {
  id: string
  title: string
  content: string
  status: string
  userId: string
  publishedAt: Date | null
  createdAt: Date
  updatedAt: Date
  stats: {
    views: number
    likes: number
    comments: number
  } | null
}

type CADModelWithStats = {
  id: string
  name: string
  description: string | null
  fileUrl: string
  thumbnailUrl: string | null
  userId: string
  status: string
  createdAt: Date
  updatedAt: Date
  stats: {
    views: number
    likes: number
    comments: number
  } | null
}

type SavedArticleWithDetails = {
  id: string
  userId: string
  articleId: string
  createdAt: Date
  updatedAt: Date
  article: ArticleWithStats
}

type SavedCADModelWithDetails = {
  id: string
  userId: string
  cadModelId: string
  createdAt: Date
  updatedAt: Date
  cadModel: CADModelWithStats
}

type DashboardStats = {
  views: number
  likes: number
  comments: number
}

async function getDashboardData(userId: string) {
  const [articles, cadModels, stats, savedArticles, savedCADModels] = await Promise.all([
    prisma.article.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      include: { stats: true }
    }),
    prisma.cADModel.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      include: { stats: true }
    }),
    prisma.stats.findMany({
      where: {
        OR: [
          { article: { userId } },
          { cadModel: { userId } }
        ]
      }
    }),
    prisma.savedArticle.findMany({
      where: { userId },
      include: {
        article: {
          include: { stats: true }
        }
      },
      orderBy: { createdAt: "desc" }
    }),
    prisma.savedCADModel.findMany({
      where: { userId },
      include: {
        cadModel: {
          include: { stats: true }
        }
      },
      orderBy: { createdAt: "desc" }
    })
  ])

  const totalStats = stats.reduce(
    (acc: DashboardStats, stat: any) => ({
      views: acc.views + (stat.views ?? 0),
      likes: acc.likes + (stat.likes ?? 0),
      comments: acc.comments + (stat.comments ?? 0),
    }),
    { views: 0, likes: 0, comments: 0 }
  )

  return {
    articles: articles as ArticleWithStats[],
    cadModels: cadModels as CADModelWithStats[],
    stats: totalStats,
    savedArticles: savedArticles as SavedArticleWithDetails[],
    savedCADModels: savedCADModels as SavedCADModelWithDetails[]
  }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user || !session.user.id) {
    redirect("/auth/signin")
  }

  const { articles, cadModels, stats, savedArticles, savedCADModels } = await getDashboardData(session.user.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
      </div>

      <Tabs defaultValue="articles" className="space-y-6">
        <TabsList>
          <TabsTrigger value="articles">記事</TabsTrigger>
          <TabsTrigger value="models">CADモデル</TabsTrigger>
          <TabsTrigger value="saved">保存済み</TabsTrigger>
          <TabsTrigger value="stats">統計</TabsTrigger>
        </TabsList>

        <TabsContent value="articles">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>下書き</CardTitle>
                <CardDescription>作成中の記事</CardDescription>
              </CardHeader>
              <CardContent>
                {articles.filter((article: ArticleWithStats) => article.status === "draft").length > 0 ? (
                  <div className="divide-y">
                    {articles
                      .filter((article: ArticleWithStats) => article.status === "draft")
                      .map((article: ArticleWithStats) => (
                        <div key={article.id} className="py-4 flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{article.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              最終更新: {format(new Date(article.updatedAt), "yyyy/MM/dd HH:mm")}
                            </p>
                          </div>
                          <Button asChild variant="ghost">
                            <a href={`/articles/${article.id}/edit`}>編集</a>
                          </Button>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-muted-foreground">
                    下書きの記事はありません。
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>公開済み</CardTitle>
                <CardDescription>公開中の記事</CardDescription>
              </CardHeader>
              <CardContent>
                {articles.filter((article: ArticleWithStats) => article.status === "published").length > 0 ? (
                  <div className="divide-y">
                    {articles
                      .filter((article: ArticleWithStats) => article.status === "published")
                      .map((article: ArticleWithStats) => (
                        <div key={article.id} className="py-4 flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{article.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              公開日: {format(new Date(article.publishedAt!), "yyyy/MM/dd HH:mm")}
                            </p>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>👁 {article.stats?.views ?? 0}</span>
                            <span>👍 {article.stats?.likes ?? 0}</span>
                            <span>💬 {article.stats?.comments ?? 0}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-muted-foreground">
                    公開済みの記事はありません。
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="models">
          <Card>
            <CardHeader>
              <CardTitle>CADモデル</CardTitle>
              <CardDescription>アップロード済みのCADモデル</CardDescription>
            </CardHeader>
            <CardContent>
              {cadModels.length > 0 ? (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {cadModels.map((model: CADModelWithStats) => (
                    <div key={model.id} className="relative group">
                      <div className="aspect-square rounded-lg border bg-muted/50 overflow-hidden">
                        {model.thumbnailUrl ? (
                          <img
                            src={model.thumbnailUrl}
                            alt={model.name}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-muted-foreground">
                            No Preview
                          </div>
                        )}
                      </div>
                      <div className="mt-2">
                        <h3 className="font-medium">{model.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {model.status === "public" ? "公開" : "非公開"}
                        </p>
                      </div>
                      <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button asChild variant="secondary">
                          <a href={`/cad-models/${model.id}`}>詳細</a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted-foreground">
                  CADモデルはありません。
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>保存済み記事</CardTitle>
                <CardDescription>お気に入りの記事</CardDescription>
              </CardHeader>
              <CardContent>
                {savedArticles.length > 0 ? (
                  <div className="divide-y">
                    {savedArticles.map((saved) => (
                      <div key={saved.id} className="py-4 flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{saved.article.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            保存日: {format(new Date(saved.createdAt), "yyyy/MM/dd HH:mm")}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span>👁 {saved.article.stats?.views ?? 0}</span>
                            <span>👍 {saved.article.stats?.likes ?? 0}</span>
                            <span>💬 {saved.article.stats?.comments ?? 0}</span>
                          </div>
                          <Button asChild variant="ghost">
                            <a href={`/articles/${saved.article.id}`}>表示</a>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-muted-foreground">
                    保存済みの記事はありません。
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>保存済みCADモデル</CardTitle>
                <CardDescription>お気に入りのCADモデル</CardDescription>
              </CardHeader>
              <CardContent>
                {savedCADModels.length > 0 ? (
                  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {savedCADModels.map((saved) => (
                      <div key={saved.id} className="relative group">
                        <div className="aspect-square rounded-lg border bg-muted/50 overflow-hidden">
                          {saved.cadModel.thumbnailUrl ? (
                            <img
                              src={saved.cadModel.thumbnailUrl}
                              alt={saved.cadModel.name}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground">
                              No Preview
                            </div>
                          )}
                        </div>
                        <div className="mt-2">
                          <h3 className="font-medium">{saved.cadModel.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            保存日: {format(new Date(saved.createdAt), "yyyy/MM/dd")}
                          </p>
                        </div>
                        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button asChild variant="secondary">
                            <a href={`/cad-models/${saved.cadModel.id}`}>詳細</a>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-muted-foreground">
                    保存済みのCADモデルはありません。
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="stats">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>総閲覧数</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.views}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>いいね数</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.likes}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>コメント数</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.comments}</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 