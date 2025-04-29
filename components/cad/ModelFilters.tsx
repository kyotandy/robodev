"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const ModelFilters = () => {
  const [polygonCount, setPolygonCount] = useState([0, 1000000])
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search models..." 
              className="pl-8"
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="hardware" defaultChecked />
              <Label htmlFor="hardware">Hardware (42)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="electronics" defaultChecked />
              <Label htmlFor="electronics">Electronics (28)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="embedded" defaultChecked />
              <Label htmlFor="embedded">Embedded Systems (15)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="mechanics" defaultChecked />
              <Label htmlFor="mechanics">Mechanics (23)</Label>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">File Formats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="stl" defaultChecked />
              <Label htmlFor="stl">STL (56)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="step" defaultChecked />
              <Label htmlFor="step">STEP (38)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="iges" defaultChecked />
              <Label htmlFor="iges">IGES (19)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="obj" defaultChecked />
              <Label htmlFor="obj">OBJ (27)</Label>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Complexity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span>Polygon Count</span>
                <span className="text-muted-foreground">
                  {polygonCount[0].toLocaleString()} - {polygonCount[1].toLocaleString()}
                </span>
              </div>
              <Slider 
                min={0} 
                max={1000000} 
                step={10000} 
                value={polygonCount} 
                onValueChange={setPolygonCount} 
              />
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="simple" />
                <Label htmlFor="simple">Simple (&lt; 10k polygons)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="medium" defaultChecked />
                <Label htmlFor="medium">Medium (10k-100k polygons)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="complex" defaultChecked />
                <Label htmlFor="complex">Complex (&gt; 100k polygons)</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Button className="w-full">Apply Filters</Button>
      <Button variant="outline" className="w-full">Reset</Button>
    </div>
  )
}

export default ModelFilters