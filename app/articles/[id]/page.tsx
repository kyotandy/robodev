import ArticleHeader from "@/components/articles/ArticleHeader"
import ArticleContent from "@/components/articles/ArticleContent"
import CADViewer from "@/components/cad/CADViewer"
import CommentSection from "@/components/articles/CommentSection"
import ActionBar from "@/components/articles/ActionBar"
import RelatedArticles from "@/components/articles/RelatedArticles"

// This would typically come from a database
const article = {
  id: "1",
  title: "Design and Implementation of a 6-DOF Robotic Arm with ROS2",
  publishedAt: "May 15, 2025",
  readTime: "12 min read",
  category: "Hardware",
  tags: ["robotics", "ROS2", "mechanical-design", "kinematics"],
  author: {
    id: "author-1",
    name: "Alex Johnson",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    bio: "Robotics Engineer with 8+ years of experience in mechanical design and ROS development.",
    role: "Senior Robotics Engineer"
  },
  stats: {
    views: 2543,
    comments: 32,
    likes: 187
  },
  hasCADModel: true,
  modelUrl: "https://example.com/models/robotic-arm.stl" // This would be a real URL in production
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  return (
    <div className="bg-background">
      <ArticleHeader article={article} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left sidebar with action bar - desktop only */}
          <div className="hidden lg:block lg:col-span-1">
            <ActionBar article={article} vertical={true} />
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-10">
            <div className="prose prose-stone dark:prose-invert max-w-none">
              <ArticleContent />
              
              {article.hasCADModel && (
                <div className="my-10">
                  <h3 className="text-xl font-bold mb-4">3D Model Viewer</h3>
                  <div className="border rounded-xl overflow-hidden">
                    <CADViewer modelUrl={article.modelUrl} />
                  </div>
                </div>
              )}
            </div>
            
            {/* Action bar for mobile */}
            <div className="lg:hidden my-8">
              <ActionBar article={article} vertical={false} />
            </div>
            
            <CommentSection articleId={params.id} />
          </div>
        </div>
      </div>
      
      <div className="bg-muted py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <RelatedArticles categoryId={article.category} currentArticleId={params.id} />
        </div>
      </div>
    </div>
  )
}