"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Mock data - would come from the backend in a real app
const featuredArticles = [
  {
    id: 1,
    title: "Design Patterns for ROS2 Architecture",
    excerpt: "Exploring the best practices for developing scalable robot applications with ROS2.",
    category: "Software",
    image: "https://images.pexels.com/photos/2085832/pexels-photo-2085832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    author: {
      name: "Alex Johnson",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    date: "May 15, 2025",
    readTime: "8 min read"
  },
  {
    id: 2,
    title: "Building Custom Motor Controllers for Precision Robotics",
    excerpt: "A deep dive into designing motor controllers for high-precision robotic applications.",
    category: "Electronics",
    image: "https://images.pexels.com/photos/3912981/pexels-photo-3912981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    author: {
      name: "Sarah Williams",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
    },
    date: "May 12, 2025",
    readTime: "12 min read"
  },
  {
    id: 3,
    title: "Advanced Kinematics for Robotic Arms",
    excerpt: "Understanding forward and inverse kinematics for multi-jointed robotic manipulators.",
    category: "Hardware",
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    author: {
      name: "David Chen",
      avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
    },
    date: "May 8, 2025",
    readTime: "10 min read"
  }
]

export default function FeaturedArticles() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slideRef = useRef<HTMLDivElement>(null)
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === featuredArticles.length - 1 ? 0 : prev + 1))
  }
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? featuredArticles.length - 1 : prev - 1))
  }
  
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 6000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Featured Articles</h2>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={prevSlide}
            className="rounded-full h-9 w-9"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={nextSlide}
            className="rounded-full h-9 w-9"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="relative overflow-hidden rounded-xl" ref={slideRef}>
        {featuredArticles.map((article, index) => (
          <div
            key={article.id}
            className={`transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0 absolute inset-0"
            }`}
          >
            <div className="relative h-[400px] md:h-[450px] w-full">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover rounded-xl"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-xl"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <Badge variant="secondary" className="mb-3">
                  {article.category}
                </Badge>
                
                <Link href={`/articles/${article.id}`}>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {article.title}
                  </h3>
                </Link>
                
                <p className="text-white/80 mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative h-8 w-8 rounded-full overflow-hidden">
                      <Image
                        src={article.author.avatar}
                        alt={article.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-white">
                        {article.author.name}
                      </p>
                      <p className="text-xs text-white/70">
                        {article.date} · {article.readTime}
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    variant="secondary" 
                    className="text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                    asChild
                  >
                    <Link href={`/articles/${article.id}`}>
                      Read More
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {featuredArticles.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === currentSlide 
                  ? "w-6 bg-primary" 
                  : "w-3 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}