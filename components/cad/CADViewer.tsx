"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stage } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Cuboid as Cube, Layers, Maximize2, Minimize2, RotateCcw, Scissors } from "lucide-react"
import { Slider } from "@/components/ui/slider"

interface CADViewerProps {
  modelUrl: string
}

function Model() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

export default function CADViewer({ modelUrl }: CADViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeTab, setActiveTab] = useState("view")
  const [clippingValue, setClippingValue] = useState([0.5])
  const containerRef = useRef<HTMLDivElement>(null)
  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }
  
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])
  
  return (
    <div 
      ref={containerRef} 
      className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-background' : 'h-[400px]'}`}
    >
      <div className="absolute top-4 left-4 z-10">
        <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
          CAD Model Viewer
        </Badge>
      </div>
      
      <div className="absolute top-4 right-4 z-10 flex space-x-2">
        <Button 
          variant="outline" 
          size="icon"
          onClick={toggleFullscreen} 
          className="bg-background/80 backdrop-blur-sm hover:bg-background"
        >
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </Button>
      </div>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="bg-background/80 backdrop-blur-sm rounded-lg border"
        >
          <TabsList className="grid grid-cols-3 w-[300px]">
            <TabsTrigger value="view">
              <Cube className="h-4 w-4 mr-2" />
              View
            </TabsTrigger>
            <TabsTrigger value="section">
              <Scissors className="h-4 w-4 mr-2" />
              Section
            </TabsTrigger>
            <TabsTrigger value="layers">
              <Layers className="h-4 w-4 mr-2" />
              Layers
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="view" className="p-3 space-y-2">
            <div className="flex justify-center space-x-2">
              <Button variant="outline" size="sm">
                <RotateCcw className="h-3.5 w-3.5 mr-1" />
                Reset View
              </Button>
              <Button variant="outline" size="sm">
                Front
              </Button>
              <Button variant="outline" size="sm">
                Top
              </Button>
              <Button variant="outline" size="sm">
                Side
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="section" className="p-3 space-y-2">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Clipping Plane</span>
                <span className="text-sm text-muted-foreground">{Math.round(clippingValue[0] * 100)}%</span>
              </div>
              <Slider 
                value={clippingValue} 
                onValueChange={setClippingValue} 
                max={1} 
                step={0.01} 
              />
              <div className="flex space-x-2 pt-1">
                <Button variant="outline" size="sm" className="flex-1">X Axis</Button>
                <Button variant="secondary" size="sm" className="flex-1">Y Axis</Button>
                <Button variant="outline" size="sm" className="flex-1">Z Axis</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="layers" className="p-3 space-y-3">
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="checkbox" id="base" className="mr-2" defaultChecked />
                <label htmlFor="base" className="text-sm">Base Structure</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="motors" className="mr-2" defaultChecked />
                <label htmlFor="motors" className="text-sm">Motors & Actuators</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="electronics" className="mr-2" defaultChecked />
                <label htmlFor="electronics" className="text-sm">Electronics</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="wiring" className="mr-2" defaultChecked />
                <label htmlFor="wiring" className="text-sm">Wiring</label>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Stage environment="city" intensity={0.6}>
          <Model />
        </Stage>
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  )
}