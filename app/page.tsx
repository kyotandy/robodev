import FeaturedArticles from "@/components/home/FeaturedArticles";
import CategoryCards from "@/components/home/CategoryCards";
import RecentArticles from "@/components/home/RecentArticles";
import PopularArticles from "@/components/home/PopularArticles";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/home/HeroSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FeaturedArticles />
        
        <section className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Explore Categories</h2>
            <Button variant="outline">View All</Button>
          </div>
          <CategoryCards />
        </section>
        
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Recent Articles</h2>
              <Button variant="outline">View All</Button>
            </div>
            <RecentArticles />
          </div>
          
          <div className="lg:col-span-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Popular Articles</h2>
              <Button variant="outline">View More</Button>
            </div>
            <PopularArticles />
          </div>
        </div>
      </div>
    </div>
  );
}