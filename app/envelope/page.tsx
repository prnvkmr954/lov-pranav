// app/envelope/page.tsx
'use client'

import { useState } from 'react'
import Lightbox from '../../components/Lightbox'

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

export default function EnvelopePage() {
  const [open, setOpen] = useState(false)
  const [src, setSrc] = useState<string | null>(null)

  const handleOpen = (imageSrc: string) => {
    setSrc(imageSrc)
    setOpen(true)
  }

  return (
    <main className="envelope-page">
      <h1 className="envelope-title">Birthday Cards From Loveleen 💌</h1>
      <p className="envelope-sub">
        These are the birthday cards she sent me — tiny envelopes full of love.
        Hover to open them, and click the card to see it in full.
      </p>

      <div className="envelope-scene">
        {POSTCARDS.map(card => (
          <div className="envelope-item" key={card.id}>
            <div
              className="letter-image"
              onClick={() => handleOpen(card.image)}
            >
              <div className="animated-mail">
                <div className="back-fold"></div>

                <div className="letter">
                  <div className="letter-border"></div>

                  <div className="letter-photo-wrapper">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="letter-photo"
                    />
                  </div>

                  <div className="letter-meta-block">
                    <div className="letter-title-text">{card.title}</div>
                    <div className="letter-date-text">{card.date}</div>
                    <div className="letter-sender-text">{card.sender}</div>
                  </div>
                </div>

                <div className="top-fold"></div>
                <div className="body"></div>
                <div className="left-fold"></div>
              </div>

              <div className="shadow"></div>
            </div>

            <div className="envelope-caption">{card.title}</div>
          </div>
        ))}
      </div>

      <Lightbox
        isOpen={open}
        src={src}
        onClose={() => setOpen(false)}
      />
    </main>
  )
}
