"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bookmark, Share, ThumbsUp, MessageSquare, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

interface ActionBarProps {
  article: {
    stats: {
      views: number
      comments: number
      likes: number
    }
  }
  vertical?: boolean
}

export default function ActionBar({ article, vertical = false }: ActionBarProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [likeCount, setLikeCount] = useState(article.stats.likes)
  
  const handleLike = () => {
    if (isLiked) {
      setLikeCount(prevCount => prevCount - 1)
    } else {
      setLikeCount(prevCount => prevCount + 1)
    }
    setIsLiked(!isLiked)
  }
  
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }
  
  const handleShare = () => {
    // In a real app, this would open a share dialog or copy link to clipboard
    navigator.clipboard.writeText(window.location.href)
    alert("Link copied to clipboard!")
  }
  
  return (
    <div 
      className={cn(
        "flex gap-2",
        vertical 
          ? "flex-col items-center sticky top-24" 
          : "flex-row items-center justify-center md:justify-start"
      )}
    >
      <Button
        variant="outline"
        size={vertical ? "icon" : "sm"}
        className={cn(
          "rounded-full",
          isLiked && "text-blue-500 border-blue-200 dark:border-blue-800"
        )}
        onClick={handleLike}
      >
        <ThumbsUp className={cn("h-4 w-4", !vertical && "mr-1.5")} />
        {!vertical && <span>{likeCount}</span>}
      </Button>
      {vertical && <span className="text-sm">{likeCount}</span>}
      
      <Button
        variant="outline"
        size={vertical ? "icon" : "sm"}
        className="rounded-full"
      >
        <MessageSquare className={cn("h-4 w-4", !vertical && "mr-1.5")} />
        {!vertical && <span>{article.stats.comments}</span>}
      </Button>
      {vertical && <span className="text-sm">{article.stats.comments}</span>}
      
      <Button
        variant="outline"
        size={vertical ? "icon" : "sm"}
        className={cn(
          "rounded-full",
          isBookmarked && "text-amber-500 border-amber-200 dark:border-amber-800"
        )}
        onClick={handleBookmark}
      >
        <Bookmark className={cn("h-4 w-4", !vertical && "mr-1.5")} />
        {!vertical && <span>Save</span>}
      </Button>
      {vertical && isBookmarked && <span className="text-xs text-muted-foreground">Saved</span>}
      
      <Button
        variant="outline"
        size={vertical ? "icon" : "sm"}
        className="rounded-full"
        onClick={handleShare}
      >
        <Share className={cn("h-4 w-4", !vertical && "mr-1.5")} />
        {!vertical && <span>Share</span>}
      </Button>
      
      {vertical && (
        <>
          <div className="h-px w-full bg-border my-2"></div>
          <div className="flex items-center text-muted-foreground text-xs">
            <Eye className="h-3.5 w-3.5 mr-1" />
            {article.stats.views}
          </div>
        </>
      )}
    </div>
  )
}