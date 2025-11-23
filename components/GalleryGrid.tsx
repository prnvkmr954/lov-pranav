'use client'
import { useState } from 'react'
import Lightbox from './Lightbox'

const IMAGES = [
  { src: '/assets/udaipur.jpg',    title: 'Udaipur' },
  { src: '/assets/zirakpur.jpg',   title: 'Zirakpur' },
  { src: '/assets/ganga-maa.jpeg', title: 'Rishikesh' },
  { src: '/assets/udaipur-3.jpg',  title: 'Udaipur – Aurika' },
]

export default function GalleryGrid() {
  const [open, setOpen] = useState(false)
  const [src, setSrc] = useState<string | null>(null)

  return (
    <>
      <div className="gallery-grid">
        <div className="book-grid">
          {IMAGES.map(i => (
            <div
              key={i.src}
              className="book-item"
              onClick={() => { setSrc(i.src); setOpen(true) }}
            >
              <div className="book-inner">
                <div className="book-cover">
                  <span className="book-sticker">♥</span>
                  <span className="book-tag">Memory</span>
                </div>
                <div className="book-photo">
                  <img src={i.src} alt={i.title} />
                </div>
              </div>
              <div className="book-label">{i.title}</div>
            </div>
          ))}
        </div>
      </div>

      <Lightbox isOpen={open} src={src} onClose={() => setOpen(false)} />
    </>
  )
}
