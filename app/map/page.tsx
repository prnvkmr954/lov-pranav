// app/map/page.tsx
'use client'
import dynamic from 'next/dynamic'
const MapClient = dynamic(() => import('../../components/MapClient'), { ssr: false })

export default function MapPage() {
  return (
    <main>
      <section className="container">
        <h1>Map of Memories</h1>
        <MapClient />
      </section>
    </main>
  )
}
