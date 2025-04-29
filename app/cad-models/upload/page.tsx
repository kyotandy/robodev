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
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, Save, Upload } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

const categories = [
  { value: "mechanical", label: "Mechanical" },
  { value: "electronics", label: "Electronics" },
  { value: "robotics", label: "Robotics" },
  { value: "tools", label: "Tools" },
]

export default function UploadCADModelPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { toast } = useToast()
  
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin")
    }
  }, [status, router])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session) {
    return null
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      // CADファイルの拡張子チェック
      const validExtensions = ['.stl', '.obj', '.step', '.stp', '.iges', '.igs']
      const ext = selectedFile.name.toLowerCase().substring(selectedFile.name.lastIndexOf('.'))
      
      if (!validExtensions.includes(ext)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a valid CAD file (STL, OBJ, STEP, or IGES)",
          variant: "destructive",
        })
        return
      }
      setFile(selectedFile)
    }
  }

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      // 画像ファイルの拡張子チェック
      const validExtensions = ['.jpg', '.jpeg', '.png', '.gif']
      const ext = selectedFile.name.toLowerCase().substring(selectedFile.name.lastIndexOf('.'))
      
      if (!validExtensions.includes(ext)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a valid image file (JPG, PNG, or GIF)",
          variant: "destructive",
        })
        return
      }
      setThumbnailFile(selectedFile)
    }
  }

  const handleSaveDraft = async () => {
    if (isSubmitting || !file) return
    await handleSubmit("draft")
  }

  const handlePublish = async () => {
    if (isSubmitting || !file) return
    await handleSubmit("published")
  }

  const handleSubmit = async (status: "draft" | "published") => {
    if (!file || !thumbnailFile) {
      toast({
        title: "Missing files",
        description: "Please upload both a CAD file and a thumbnail image",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Create FormData for file upload
      const formData = new FormData()
      formData.append("title", title)
      formData.append("description", description)
      formData.append("category", category)
      formData.append("status", status)
      formData.append("file", file)
      formData.append("thumbnail", thumbnailFile)

      const response = await fetch("/api/cad-models", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to upload CAD model")
      }

      const data = await response.json()
      router.push(`/cad-models/${data.id}`)
    } catch (error) {
      console.error("Error uploading CAD model:", error)
      toast({
        title: "Error",
        description: "Failed to upload CAD model. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Upload New CAD Model</h1>

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

        <div>
          <Textarea
            placeholder="Description of your CAD model..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[200px]"
          />
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">CAD File</h3>
                <Input
                  type="file"
                  onChange={handleFileChange}
                  accept=".stl,.obj,.step,.stp,.iges,.igs"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Supported formats: STL, OBJ, STEP, IGES
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Thumbnail Image</h3>
                <Input
                  type="file"
                  onChange={handleThumbnailChange}
                  accept="image/*"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Recommended: 800x600px JPG or PNG
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            disabled={isSubmitting || !file || !thumbnailFile}
          >
            <Save className="mr-2 h-4 w-4" />
            Save as Draft
          </Button>
          <Button
            onClick={handlePublish}
            disabled={isSubmitting || !file || !thumbnailFile}
          >
            <Eye className="mr-2 h-4 w-4" />
            Publish
          </Button>
        </div>
      </div>
    </div>
  )
} 