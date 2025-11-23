// app/gallery/page.tsx
'use client'
import GalleryGrid from '../../components/GalleryGrid'

export default function GalleryPage() {
  return (
    <main className="gallery-page">
      <h1 className="gallery-title">Our Little Photo Library 📚❤️</h1>
      <GalleryGrid />
    </main>
  )
}
