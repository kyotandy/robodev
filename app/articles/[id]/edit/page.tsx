"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Eye, Save } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { MarkdownEditor } from "@/components/editor/MarkdownEditor"

const categories = [
  { value: "robotics", label: "Robotics" },
  { value: "programming", label: "Programming" },
  { value: "electronics", label: "Electronics" },
  { value: "mechanical", label: "Mechanical" },
]

export default function EditArticlePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { toast } = useToast()
  
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin")
    }
  }, [status, router])

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/articles/${params.id}`)
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to fetch article")
        }
        const article = await response.json()
        
        setTitle(article.title)
        setCategory(article.category)
        setContent(article.content)
      } catch (error) {
        console.error("Error fetching article:", error)
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to load article. Please try again.",
          variant: "destructive",
        })
      }
    }

    if (params.id) {
      fetchArticle()
    }
  }, [params.id, toast])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session) {
    return null
  }

  const handleSaveDraft = async () => {
    if (isSubmitting) return
    await handleSubmit("draft")
  }

  const handlePublish = async () => {
    if (isSubmitting) return
    await handleSubmit("published")
  }

  const handleSubmit = async (status: "draft" | "published") => {
    if (!title || !content) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/articles/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          category,
          status,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update article")
      }

      const data = await response.json()
      router.push(`/articles/${data.id}`)
      
      toast({
        title: "Success",
        description: "Article updated successfully",
      })
    } catch (error) {
      console.error("Error updating article:", error)
      toast({
        title: "Error",
        description: "Failed to update article. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Article</h1>

      <div className="space-y-6">
        <div>
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-xl font-semibold"
          />
        </div>

        <div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Card className="min-h-[500px] p-4">
          <MarkdownEditor
            value={content}
            onChange={setContent}
          />
        </Card>

        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            disabled={isSubmitting}
          >
            <Save className="mr-2 h-4 w-4" />
            Save as Draft
          </Button>
          <Button
            onClick={handlePublish}
            disabled={isSubmitting}
          >
            <Eye className="mr-2 h-4 w-4" />
            Publish
          </Button>
        </div>
      </div>
    </div>
  )
} 