"use client"

import { useEffect, useState } from 'react'

export default function ThreeScene() {
  const [Scene, setScene] = useState<React.ComponentType | null>(null)

  useEffect(() => {
    import('./Scene').then((mod) => {
      setScene(() => mod.default)
    })
  }, [])

  if (!Scene) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <Scene />
} 