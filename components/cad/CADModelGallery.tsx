import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Eye, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock data - would come from the backend in a real app
const models = [
  {
    id: "model-1",
    title: "6-DOF Robotic Arm",
    thumbnail: "https://images.pexels.com/photos/5722937/pexels-photo-5722937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    category: "Hardware",
    fileFormat: "STL",
    author: {
      name: "Alex Johnson",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    stats: {
      views: 1245,
      downloads: 342
    }
  },
  {
    id: "model-2",
    title: "Quadruped Robot Chassis",
    thumbnail: "https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    category: "Hardware",
    fileFormat: "STEP",
    author: {
      name: "Sarah Williams",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
    },
    stats: {
      views: 987,
      downloads: 213
    }
  },
  {
    id: "model-3",
    title: "Drone Frame with Camera Mount",
    thumbnail: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    category: "Hardware",
    fileFormat: "STL",
    author: {
      name: "Michael Smith",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
    },
    stats: {
      views: 756,
      downloads: 189
    }
  },
  {
    id: "model-4",
    title: "Custom Motor Housing",
    thumbnail: "https://images.pexels.com/photos/7599735/pexels-photo-7599735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    category: "Hardware",
    fileFormat: "STEP",
    author: {
      name: "Emily Chen",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
    },
    stats: {
      views: 651,
      downloads: 154
    }
  },
  {
    id: "model-5",
    title: "Gripper Mechanism",
    thumbnail: "https://images.pexels.com/photos/3861968/pexels-photo-3861968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    category: "Hardware",
    fileFormat: "IGES",
    author: {
      name: "David Chen",
      avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
    },
    stats: {
      views: 542,
      downloads: 128
    }
  },
  {
    id: "model-6",
    title: "PCB Enclosure",
    thumbnail: "https://images.pexels.com/photos/3912477/pexels-photo-3912477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    category: "Electronics",
    fileFormat: "STL",
    author: {
      name: "Lisa Rodriguez",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
    },
    stats: {
      views: 487,
      downloads: 105
    }
  }
]

export default function CADModelGallery() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {models.map((model) => (
        <Card key={model.id} className="overflow-hidden hover:shadow-md transition-all">
          <Link href={`/models/${model.id}`} className="block">
            <div className="relative h-48">
              <Image
                src={model.thumbnail}
                alt={model.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                <Badge variant="secondary" className="bg-black/60 text-white backdrop-blur-sm">
                  {model.fileFormat}
                </Badge>
                <Badge>{model.category}</Badge>
              </div>
            </div>
          </Link>
          
          <CardContent className="p-4">
            <Link href={`/models/${model.id}`}>
              <h3 className="font-semibold mb-2">{model.title}</h3>
            </Link>
            
            <div className="flex items-center space-x-3">
              <div className="relative h-6 w-6 rounded-full overflow-hidden">
                <Image
                  src={model.author.avatar}
                  alt={model.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-sm">{model.author.name}</span>
            </div>
          </CardContent>
          
          <CardFooter className="p-4 pt-0 flex justify-between items-center border-t mt-2 text-sm text-muted-foreground">
            <div className="flex space-x-4">
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                {model.stats.views}
              </div>
              <div className="flex items-center">
                <Download className="h-4 w-4 mr-1" />
                {model.stats.downloads}
              </div>
            </div>
            
            <Button size="sm" variant="outline" asChild>
              <Link href={`/models/${model.id}`}>
                View
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}