import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ThumbsUp } from "lucide-react"

// Mock data - would come from the backend in a real app
const popularArticles = [
  {
    id: 101,
    title: "A Complete Guide to Path Planning Algorithms for Mobile Robots",
    category: "Software",
    date: "Apr 28, 2025",
    readTime: "15 min read",
    likes: 245,
    image: "https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
  },
  {
    id: 102,
    title: "Practical SLAM Implementation with ROS2 and Lidar Sensors",
    category: "Embedded",
    date: "Apr 22, 2025",
    readTime: "12 min read",
    likes: 214,
    image: "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
  },
  {
    id: 103,
    title: "Designing Robust Robotic Gripper Mechanisms",
    category: "Hardware",
    date: "Apr 18, 2025",
    readTime: "9 min read",
    likes: 198,
    image: "https://images.pexels.com/photos/8566455/pexels-photo-8566455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
  },
  {
    id: 104,
    title: "Power Management Techniques for Battery-Powered Robots",
    category: "Electronics",
    date: "Apr 15, 2025",
    readTime: "10 min read",
    likes: 187,
    image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
  },
  {
    id: 105,
    title: "Building a ROS2 Navigation Stack from Scratch",
    category: "Software",
    date: "Apr 10, 2025",
    readTime: "14 min read",
    likes: 176,
    image: "https://images.pexels.com/photos/12876612/pexels-photo-12876612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
  }
]

export default function PopularArticles() {
  return (
    <div className="bg-card rounded-xl border p-4">
      <div className="space-y-4">
        {popularArticles.map((article) => (
          <Link key={article.id} href={`/articles/${article.id}`}>
            <Card className="bg-transparent hover:bg-accent/50 transition-colors border-0 overflow-hidden">
              <CardContent className="p-3 flex gap-3">
                <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="flex-grow min-w-0">
                  <div className="flex items-center mb-1">
                    <Badge variant="outline" className="mr-2 text-xs">
                      {article.category}
                    </Badge>
                    <div className="flex items-center text-muted-foreground text-xs">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      {article.likes}
                    </div>
                  </div>
                  
                  <h4 className="font-medium text-sm line-clamp-2">
                    {article.title}
                  </h4>
                  
                  <p className="text-xs text-muted-foreground mt-1">
                    {article.date} · {article.readTime}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}