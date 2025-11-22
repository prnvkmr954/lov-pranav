// components/GalleryGrid.tsx
'use client'
import { useState } from 'react'
import Lightbox from './Lightbox'

const IMAGES = ['/assets/udaipur.jpg', '/assets/zirakpur.jpg', '/assets/ganga-maa.jpeg', '/assets/udaipur-3.jpg']

export default function GalleryGrid() {
  const [open, setOpen] = useState(false)
  const [src, setSrc] = useState<string | null>(null)
  return (
    <>
      <div className="gallery-grid">
        <div className="grid">
          {IMAGES.map(i => (
            <div key={i} className="grid-item">
              <img src={i} alt="" onClick={() => { setSrc(i); setOpen(true) }} />
            </div>
          ))}
        </div>
      </div>
      <Lightbox isOpen={open} src={src} onClose={() => setOpen(false)} />
    </>
  )
}
