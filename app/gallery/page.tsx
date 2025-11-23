// app/gallery/page.tsx
'use client'
import GalleryGrid from '../../components/GalleryGrid'

export default function GalleryPage() {
  return (
    <main className="gallery-page">
      <h1 className="gallery-title">
       Our Little Photo Library 💞
      </h1>


      <p className="gallery-subtitle">
        Tiny books of big feelings.
      </p>
      <p className="gallery-subtext">
        Every cover hides a moment where it was just you, me, and the world
        going quiet for a second. Hover over a book to open a little chapter
        of us. 💌
      </p>

      <GalleryGrid />
    </main>
  )
}
