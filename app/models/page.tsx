import CADModelGallery from "@/components/cad/CADModelGallery"
import ModelFilters from "@/components/cad/ModelFilters"

export default function ModelsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">CAD Model Gallery</h1>
        <p className="text-muted-foreground">
          Browse and explore 3D models shared by the robotics community
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <ModelFilters />
        </div>
        
        <div className="lg:col-span-3">
          <CADModelGallery />
        </div>
      </div>
    </div>
  )
}