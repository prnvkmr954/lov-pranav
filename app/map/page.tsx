// app/map/page.tsx
'use client'
import dynamic from 'next/dynamic'

const MapClient = dynamic(() => import('../../components/MapClient'), { ssr: false })

export default function MapPage() {
  return (
    <main className="map-page">
      <div className="map-header">
        <h1 className="map-title">Map of Our Memories</h1>
        <p className="map-subtitle">
          Every place holds a special memory in our hearts ♥
        </p>
      </div>
      
      <div className="heart-map-container">
        <MapClient />
      </div>
    </main>
  )
}