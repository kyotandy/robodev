import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Eye, MessageSquare, ThumbsUp } from "lucide-react"

// Mock data - would come from the backend in a real app
const recentArticles = [
  {
    id: 1,
    title: "Implementing Sensor Fusion for Robot Localization",
    excerpt: "Learn how to combine data from multiple sensors to improve robot positioning accuracy.",
    category: "Embedded",
    image: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    author: {
      name: "Michael Smith",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
    },
    date: "May 10, 2025",
    readTime: "7 min read",
    stats: {
      views: 1243,
      comments: 18,
      likes: 85
    }
  },
  {
    id: 2,
    title: "Designing Efficient PCBs for Battery-Powered Robots",
    excerpt: "Strategies and techniques for creating power-efficient PCBs for mobile robot applications.",
    category: "Electronics",
    image: "https://images.pexels.com/photos/2086612/pexels-photo-2086612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    author: {
      name: "Emily Chen",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
    },
    date: "May 9, 2025",
    readTime: "9 min read",
    stats: {
      views: 879,
      comments: 12,
      likes: 67
    }
  },
  {
    id: 3,
    title: "Optimizing Computer Vision Algorithms for Edge Devices",
    excerpt: "How to implement efficient computer vision algorithms on resource-constrained robot platforms.",
    category: "Software",
    image: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    author: {
      name: "James Wilson",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
    },
    date: "May 7, 2025",
    readTime: "8 min read",
    stats: {
      views: 1021,
      comments: 7,
      likes: 53
    }
  },
  {
    id: 4,
    title: "Designing Actuators for Humanoid Robot Joints",
    excerpt: "A comprehensive guide to designing compact, efficient actuators for humanoid robot applications.",
    category: "Hardware",
    image: "https://images.pexels.com/photos/8728560/pexels-photo-8728560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    author: {
      name: "Lisa Rodriguez",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
    },
    date: "May 6, 2025",
    readTime: "11 min read",
    stats: {
      views: 768,
      comments: 9,
      likes: 41
    }
  }
]

export default function RecentArticles() {
  return (
    <div className="space-y-6">
      {recentArticles.map((article) => (
        <Card key={article.id} className="overflow-hidden transition-all hover:shadow-md">
          <Link href={`/articles/${article.id}`} className="block">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative h-48 md:h-full md:col-span-1">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
                <Badge 
                  variant="secondary" 
                  className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white"
                >
                  {article.category}
                </Badge>
              </div>
              
              <div className="p-4 md:col-span-2 flex flex-col h-full">
                <CardHeader className="p-0 pb-2">
                  <h3 className="text-xl font-semibold line-clamp-2">
                    {article.title}
                  </h3>
                </CardHeader>
                
                <CardContent className="p-0 flex-grow">
                  
                  <div className="flex items-center space-x-3">
                    <div className="relative h-6 w-6 rounded-full overflow-hidden">
                      <Image
                        src={article.author.avatar}
                        alt={article.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-xs">
                      <span className="font-medium">{article.author.name}</span>
                      <p className="text-muted-foreground">
                        {article.date} · {article.readTime}
                      </p>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="p-0 pt-4 border-t mt-auto">
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Eye className="h-3.5 w-3.5 mr-1" />
                      {article.stats.views}
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-3.5 w-3.5 mr-1" />
                      {article.stats.comments}
                    </div>
                    <div className="flex items-center">
                      <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                      {article.stats.likes}
                    </div>
                  </div>
                </CardFooter>
              </div>
            </div>
          </Link>
        </Card>
      ))}
    </div>
  )
}