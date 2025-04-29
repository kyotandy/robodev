"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RobotIcon } from "@/components/icons/robot-icon"
import { motion } from "@/lib/motion-mock"

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-background to-secondary/5">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.015] dark:opacity-[0.02]" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="block">Knowledge Hub for</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
              Robot Developers
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Share your robotics expertise, showcase CAD designs, and connect with a community 
            of hardware engineers, embedded programmers, and robot enthusiasts.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              asChild
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative overflow-hidden group"
            >
              <Link href="/articles">
                Explore Articles
                <motion.span
                  animate={{ x: isHovered ? 4 : 0 }}
                  className="ml-2 transition-transform"
                >
                  →
                </motion.span>
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              asChild
            >
              <Link href="/models">
                Browse CAD Models
              </Link>
            </Button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-16 relative"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-card rounded-lg shadow-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2 text-sm">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs font-medium text-muted-foreground">example-article.md</div>
            </div>
            <div className="p-6 font-mono text-sm">
              <div className="text-blue-500 mb-2"># Building a Robotic Arm with ROS2</div>
              <div><span className="text-rose-500">tags:</span> <span className="text-amber-500">robotics, ROS2, hardware</span></div>
              <div className="mt-4 text-muted-foreground">
                In this tutorial, we'll build a 6-DOF robotic arm controlled with ROS2...
              </div>
              <div className="mt-4">
                ```python<br />
                <span className="text-green-500"># Initialize ROS2 node</span><br />
                <span className="text-blue-500">import</span> rclpy<br />
                <span className="text-blue-500">from</span> rclpy.node <span className="text-blue-500">import</span> Node<br />
                ```
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className="absolute bottom-0 right-0 transform translate-y-1/3 translate-x-1/3 md:translate-y-1/4 md:translate-x-1/4 z-0 opacity-10">
          <RobotIcon className="w-96 h-96" />
        </div>
      </div>
    </div>
  )
}