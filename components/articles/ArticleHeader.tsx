import Image from "next/image"
import Link from "next/link"
import { CalendarIcon, ClockIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ArticleHeaderProps {
  article: {
    title: string
    publishedAt: string
    readTime: string
    category: string
    tags: string[]
    author: {
      id: string
      name: string
      avatar: string
      role: string
    }
  }
}

export default function ArticleHeader({ article }: ArticleHeaderProps) {
  return (
    <div className="bg-gradient-to-b from-background to-muted/20 py-12 border-b">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-8">
          <Link 
            href={`/category/${article.category.toLowerCase()}`}
            className="mb-4"
          >
            <Badge variant="outline" className="text-xs">
              {article.category}
            </Badge>
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {article.tags.map((tag) => (
              <Link key={tag} href={`/tags/${tag}`}>
                <Badge variant="secondary" className="cursor-pointer">
                  #{tag}
                </Badge>
              </Link>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              href={`/profile/${article.author.id}`}
              className="flex items-center space-x-3"
            >
              <div className="relative h-10 w-10 rounded-full overflow-hidden">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <h3 className="font-medium">{article.author.name}</h3>
                <p className="text-sm text-muted-foreground">{article.author.role}</p>
              </div>
            </Link>
            
            <div className="border-l h-10" />
            
            <div className="flex items-center text-sm text-muted-foreground space-x-3">
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" />
                <span>{article.publishedAt}</span>
              </div>
              <div className="flex items-center">
                <ClockIcon className="h-4 w-4 mr-1" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}