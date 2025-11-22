// app/postcards/page.tsx
'use client'
import { useState } from 'react'

const POSTCARDS = [
  {
    id: 1,
    title: 'Udaipur',
    date: 'Summer 2023',
    image: '/assets/cards/1.jpeg',
    sender: 'From: Lov & PK'
  },
  {
    id: 2,
    title: 'Zirakpur',
    date: 'Monsoon 2023',
    image: '/assets/cards/2.jpeg',
    sender: 'From: Lov & PK'
  },
  {
    id: 3,
    title: 'Ganga Maa',
    date: 'Winter 2023',
    image: '/assets/cards/3.jpeg',
    sender: 'From: Lov & PK'
  },
  {
    id: 4,
    title: 'Palace City',
    date: 'Spring 2024',
    image: '/assets/cards/4.jpeg',
    sender: 'From: Lov & PK'
  },
  {
    id: 5,
    title: 'Our Love',
    date: 'Every Day',
    image: '/assets/cards/5.jpeg',
    sender: 'From: My Heart'
  },
  {
    id: 6,
    title: 'Memories',
    date: 'Forever',
    image: '/assets/cards/6.jpeg',
    sender: 'From: Forever'
  }
]

export default function PostcardsPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <main className="postcards-page">
      <div className="postcards-header">
        <h1 className="postcards-title">Our Postcards & Letters</h1>
        <p className="postcards-subtitle">
          Hover over the envelopes to reveal our beautiful memories ♥
        </p>
      </div>

      <div className="postcards-grid">
        {POSTCARDS.map((postcard) => (
          <div
            key={postcard.id}
            className={`envelope-wrapper ${hoveredId === postcard.id ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredId(postcard.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Front Envelope - shows by default */}
            <div className="envelope-front">
              {/* Envelope background */}
              <div className="envelope-bg">
                {/* Top flap fold line */}
                <div className="envelope-flap-line"></div>

                {/* Stamp */}
                <div className="envelope-stamp">
                  <div className="stamp-icon">♥</div>
                </div>

                {/* Postmark circle */}
                <div className="postmark">
                  <p>{postcard.date}</p>
                </div>

                {/* Address area */}
                <div className="address-area">
                  <p className="to-line">To: {postcard.title}</p>
                  <p className="from-line">{postcard.sender}</p>
                </div>
              </div>
            </div>

            {/* Photo Inside - shows on hover and pops out */}
            <div className="photo-popup">
              <img 
                src={postcard.image} 
                alt={postcard.title}
                className="popup-photo"
              />
              <div className="photo-label">
                <p className="photo-title">{postcard.title}</p>
                <p className="photo-date">{postcard.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}