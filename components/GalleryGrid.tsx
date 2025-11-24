'use client'
import { useState, useEffect } from 'react'
import Lightbox from './Lightbox'

// Multiple images per location - like pages in a notebook
const NOTEBOOKS = [
   { 
    title: 'Jalandhar',
    coverColor: '#ffc0d3',
    pages: [
      '/assets/Jalandhar-1.jpg',
      '/assets/Jalandhar-2.jpg',  // Add more Jalandhar images
      '/assets/Jalandhar-3.jpg',
      '/assets/Jalandhar-4.jpg',
      '/assets/Jalandhar-5.jpg',
      '/assets/Jalandhar-6.jpg'
    ]
  },
  { 
    title: 'Mohali',
    coverColor: '#ffc0d3',
    pages: [
      '/assets/mohali.jpg',
      '/assets/mohali-1.jpg',  // Add more Mohali images
      '/assets/mohali-2.jpg',
      '/assets/mohali-3.jpg',
      '/assets/mohali-4.jpg',
      '/assets/mohali-5.jpg'
    ]
  },
  { 
    title: 'Kasauli',
    coverColor: '#ffc0d3',
    pages: [
      '/assets/kasauli.jpg',
      '/assets/kasauli-1.jpg',
      '/assets/kasauli-2.jpg',  // Add more Kasauli images
      '/assets/kasauli-3.jpg'
    ]
  },
  { 
    title: 'Shimla',
    coverColor: '#ffc0d3',
    pages: [
      '/assets/shimla.jpg',
      '/assets/shimla-1.jpg',  // Add more Shimla images
      '/assets/shimla-2.jpg',
      '/assets/shimla-3.jpg',
    ]
  },
  { 
    title: 'Manali',
    coverColor: '#ffc0d3',
    pages: [
      '/assets/manali.jpg',
      '/assets/manali-1.jpg',  // Add more Manali images
      '/assets/manali-2.jpg',
      '/assets/manali-3.jpg',
      '/assets/manali-4.jpg'
    ]
  },
  { 
    title: 'Rishikesh',
    coverColor: '#ffcce1',
    pages: [
      '/assets/ganga-maa.jpeg',
      '/assets/rishikesh.jpg',  // Add more Rishikesh images
      '/assets/rishikesh-1.jpg',
    ]
  },
  { 
    title: 'Udaipur – Aurika',
    coverColor: '#ffd8ef',
    pages: [
      '/assets/udaipur.jpg',
      '/assets/udaipur-1.jpg',
      '/assets/udaipur-2.jpg',
      '/assets/udaipur-3.jpg',
      '/assets/udaipur-4.jpg',
      '/assets/udaipur-5.jpg',
      '/assets/udaipur-6.jpg',
    ]
  },
]

export default function GalleryGrid() {
  const [open, setOpen] = useState(false)
  const [src, setSrc] = useState<string | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [currentPages, setCurrentPages] = useState<{[key: number]: number}>({})

  // Auto-flip pages on hover
  useEffect(() => {
    if (hoveredIndex === null) return

    const interval = setInterval(() => {
      setCurrentPages(prev => ({
        ...prev,
        [hoveredIndex]: ((prev[hoveredIndex] || 0) + 1) % NOTEBOOKS[hoveredIndex].pages.length
      }))
    }, 2000) // Flip every 2 seconds

    return () => clearInterval(interval)
  }, [hoveredIndex])

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index)
  }

  const handleMouseLeave = (index: number) => {
    setHoveredIndex(null)
    // Reset to first page after a delay
    setTimeout(() => {
      setCurrentPages(prev => ({
        ...prev,
        [index]: 0
      }))
    }, 300)
  }

  return (
    <>
      <div className="gallery-grid">
        <div className="notebook-grid">
          {NOTEBOOKS.map((notebook, idx) => {
            const currentPage = currentPages[idx] || 0
            const isHovered = hoveredIndex === idx
            
            return (
              <div
                key={notebook.title}
                className={`notebook-item ${isHovered ? 'notebook-open' : ''}`}
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={() => handleMouseLeave(idx)}
                onClick={() => { 
                  setSrc(notebook.pages[currentPage])
                  setOpen(true) 
                }}
              >
                <div className="notebook-wrapper">
                  {/* Spiral binding */}
                  <div className="notebook-spiral">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="spiral-ring"></div>
                    ))}
                  </div>
                  
                  {/* Book cover */}
                  <div 
                    className="notebook-cover"
                    style={{ backgroundColor: notebook.coverColor }}
                  >
                    <div className="cover-decoration">
                      <span className="cover-heart">💕</span>
                      <h3 className="cover-title">{notebook.title}</h3>
                      <span className="cover-label">Memory Book</span>
                    </div>
                  </div>
                  
                  {/* Book pages */}
                  <div className="notebook-pages">
                    {notebook.pages.map((page, pageIdx) => (
                      <div 
                        key={pageIdx}
                        className={`notebook-page ${
                          pageIdx === currentPage ? 'page-current' : 
                          pageIdx < currentPage ? 'page-turned' : 'page-waiting'
                        }`}
                        style={{
                          '--page-index': pageIdx,
                          '--total-pages': notebook.pages.length,
                          zIndex: notebook.pages.length - pageIdx,
                        } as React.CSSProperties}
                      >
                        <div className="page-content">
                          <img src={page} alt={`${notebook.title} - Page ${pageIdx + 1}`} />
                          <div className="page-number">{pageIdx + 1}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="notebook-label">
                  <span className="label-title">{notebook.title}</span>
                  {isHovered && (
                    <span className="page-indicator">
                      Page {currentPage + 1} of {notebook.pages.length}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <Lightbox isOpen={open} src={src} onClose={() => setOpen(false)} />
    </>
  )
}