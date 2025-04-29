import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data - would come from the backend in a real app
const relatedArticles = [
  {
    id: "related-1",
    title: "Optimizing Servo Control for Smooth Robotic Arm Movements",
    excerpt: "Learn techniques for improving servo motor control to achieve smooth, precise movements in robotic arms.",
    image: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    category: "Hardware",
    date: "Apr 10, 2025",
    author: {
      name: "Michael Wong",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
    }
  },
  {
    id: "related-2",
    title: "Implementing Inverse Kinematics in ROS2 for Robot Manipulators",
    excerpt: "A step-by-step guide to implementing and optimizing inverse kinematics solvers for ROS2.",
    image: "https://images.pexels.com/photos/3912981/pexels-photo-3912981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    category: "Software",
    date: "Apr 5, 2025",
    author: {
      name: "Sarah Williams",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
    }
  },
  {
    id: "related-3",
    title: "Motor Driver Design for High-Precision Robotic Applications",
    excerpt: "Design considerations and implementation of motor drivers for robotics requiring high precision movement.",
    image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    category: "Electronics",
    date: "Mar 28, 2025",
    author: {
      name: "David Chen",
      avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
    }
  }
]

interface RelatedArticlesProps {
  categoryId: string
  currentArticleId: string
}

export default function RelatedArticles({ categoryId, currentArticleId }: RelatedArticlesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {relatedArticles.map((article) => (
        <Link href={`/articles/${article.id}`} key={article.id}>
          <Card className="h-full overflow-hidden hover:shadow-md transition-all hover:border-primary/20">
            <div className="relative h-40">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-3 left-3">
                <Badge>{article.category}</Badge>
              </div>
            </div>
            
            <CardContent className="p-5">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                {article.title}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {article.excerpt}
              </p>
              
              <div className="flex items-center gap-3">
                <div className="relative h-6 w-6 rounded-full overflow-hidden">
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-xs">
                  <p className="font-medium">{article.author.name}</p>
                  <p className="text-muted-foreground">{article.date}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}