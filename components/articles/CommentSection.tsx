"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, Reply, Flag, Loader2 } from "lucide-react"

// Mock data - would come from a database in a real app
const mockComments = [
  {
    id: "comment-1",
    author: {
      name: "David Chen",
      avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      role: "Robotics Engineer"
    },
    content: "Great article! I've been working on a similar project but had issues with the inverse kinematics solver. Your approach to using the Denavit-Hartenberg parameters is really elegant.",
    createdAt: "2 days ago",
    likes: 12,
    replies: [
      {
        id: "reply-1",
        author: {
          name: "Alex Johnson",
          avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          role: "Author"
        },
        content: "Thanks David! I found that using the analytical IK solver worked better than the numerical approach for this specific configuration. Happy to share more details if you're interested.",
        createdAt: "1 day ago",
        likes: 5
      }
    ]
  },
  {
    id: "comment-2",
    author: {
      name: "Lisa Rodriguez",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      role: "Mechanical Engineer"
    },
    content: "The CAD model is really well designed! I like how you've handled the cable routing through the arm. Have you considered using slip rings for the base rotation to avoid cable twisting?",
    createdAt: "1 day ago",
    likes: 8,
    replies: []
  }
]

interface CommentSectionProps {
  articleId: string
}

export default function CommentSection({ articleId }: CommentSectionProps) {
  const [comments, setComments] = useState(mockComments)
  const [commentText, setCommentText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")
  
  const handleSubmitComment = () => {
    if (!commentText.trim()) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      const newComment = {
        id: `comment-${Date.now()}`,
        author: {
          name: "Guest User",
          avatar: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
          role: "Reader"
        },
        content: commentText,
        createdAt: "Just now",
        likes: 0,
        replies: []
      }
      
      setComments([newComment, ...comments])
      setCommentText("")
      setIsSubmitting(false)
    }, 1000)
  }
  
  const handleSubmitReply = (commentId: string) => {
    if (!replyText.trim()) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      const newReply = {
        id: `reply-${Date.now()}`,
        author: {
          name: "Guest User",
          avatar: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
          role: "Reader"
        },
        content: replyText,
        createdAt: "Just now",
        likes: 0
      }
      
      const updatedComments = comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, newReply]
          }
        }
        return comment
      })
      
      setComments(updatedComments)
      setReplyText("")
      setReplyingTo(null)
      setIsSubmitting(false)
    }, 1000)
  }
  
  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>
      
      <div className="mb-8">
        <Textarea
          placeholder="Share your thoughts..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="mb-3 min-h-[100px]"
        />
        <div className="flex justify-end">
          <Button 
            onClick={handleSubmitComment} 
            disabled={!commentText.trim() || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Post Comment"
            )}
          </Button>
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <div className="space-y-8">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-4">
            <div className="flex space-x-4">
              <div className="relative h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-baseline">
                  <h4 className="font-medium">{comment.author.name}</h4>
                  {comment.author.role === "Author" && (
                    <Badge variant="outline" className="ml-2 text-xs">
                      Author
                    </Badge>
                  )}
                  <span className="ml-2 text-sm text-muted-foreground">{comment.createdAt}</span>
                </div>
                
                <p className="text-sm">{comment.content}</p>
                
                <div className="flex items-center space-x-4 text-sm">
                  <button className="flex items-center text-muted-foreground hover:text-foreground">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>{comment.likes}</span>
                  </button>
                  <button 
                    className="flex items-center text-muted-foreground hover:text-foreground"
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  >
                    <Reply className="h-4 w-4 mr-1" />
                    <span>Reply</span>
                  </button>
                  <button className="flex items-center text-muted-foreground hover:text-foreground">
                    <Flag className="h-4 w-4 mr-1" />
                    <span>Report</span>
                  </button>
                </div>
                
                {replyingTo === comment.id && (
                  <div className="mt-3 space-y-3">
                    <Textarea
                      placeholder={`Reply to ${comment.author.name}...`}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="text-sm"
                    />
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setReplyingTo(null)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => handleSubmitReply(comment.id)}
                        disabled={!replyText.trim() || isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                            Replying...
                          </>
                        ) : (
                          "Reply"
                        )}
                      </Button>
                    </div>
                  </div>
                )}
                
                {comment.replies.length > 0 && (
                  <div className="mt-4 pl-4 border-l space-y-4">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex space-x-3">
                        <div className="relative h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={reply.author.avatar}
                            alt={reply.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 space-y-1">
                          <div className="flex items-baseline">
                            <h5 className="font-medium text-sm">{reply.author.name}</h5>
                            {reply.author.role === "Author" && (
                              <Badge variant="outline" className="ml-2 text-xs">
                                Author
                              </Badge>
                            )}
                            <span className="ml-2 text-xs text-muted-foreground">{reply.createdAt}</span>
                          </div>
                          
                          <p className="text-sm">{reply.content}</p>
                          
                          <div className="flex items-center space-x-4 text-xs">
                            <button className="flex items-center text-muted-foreground hover:text-foreground">
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              <span>{reply.likes}</span>
                            </button>
                            <button className="flex items-center text-muted-foreground hover:text-foreground">
                              <Flag className="h-3 w-3 mr-1" />
                              <span>Report</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}