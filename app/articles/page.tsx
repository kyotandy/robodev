import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Eye, MessageSquare, ThumbsUp } from "lucide-react"

// Mock data - would come from a database in production
const articles = [
  {
    id: "1",
    title: "Design and Implementation of a 6-DOF Robotic Arm with ROS2",
    excerpt: "Learn how to build a complete 6-DOF robotic arm system using ROS2, from mechanical design to software implementation.",
    category: "Hardware",
    image: "https://images.pexels.com/photos/5722937/pexels-photo-5722937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    author: {
      name: "Alex Johnson",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    publishedAt: "May 15, 2025",
    readTime: "12 min read",
    stats: {
      views: 2543,
      comments: 32,
      likes: 187
    }
  },
  {
    id: "2",
    title: "Implementing Sensor Fusion for Robot Localization",
    excerpt: "A comprehensive guide to combining data from multiple sensors for accurate robot positioning.",
    category: "Software",
    image: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    author: {
      name: "Sarah Williams",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
    },
    publishedAt: "May 12, 2025",
    readTime: "8 min read",
    stats: {
      views: 1876,
      comments: 24,
      likes: 143
    }
  },
  {
    id: "3",
    title: "Building Custom Motor Controllers for Precision Robotics",
    excerpt: "Design and implementation of motor controllers for high-precision robotic applications.",
    category: "Electronics",
    image: "https://images.pexels.com/photos/3912981/pexels-photo-3912981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    author: {
      name: "David Chen",
      avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
    },
    publishedAt: "May 10, 2025",
    readTime: "15 min read",
    stats: {
      views: 1543,
      comments: 18,
      likes: 98
    }
  }
]

export default function ArticlesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Articles</h1>
          <p className="text-muted-foreground">
            Latest articles from the robotics development community
          </p>
        </div>
        
        <Button asChild>
          <Link href="/articles/create">Write Article</Link>
        </Button>
      </div>
      
      <div className="space-y-6">
        {articles.map((article) => (
          <Card key={article.id} className="overflow-hidden">
            <Link href={`/articles/${article.id}`}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                
                <CardContent className="md:col-span-3 p-6">
                  <h2 className="text-2xl font-bold mb-2 line-clamp-2">
                    {article.title}
                  </h2>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="relative h-8 w-8 rounded-full overflow-hidden">
                          <Image
                            src={article.author.avatar}
                            alt={article.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{article.author.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {article.publishedAt} · {article.readTime}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {article.stats.views}
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {article.stats.comments}
                      </div>
                      <div className="flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {article.stats.likes}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}