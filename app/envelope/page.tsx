// app/envelope/page.tsx
'use client'

import { useState } from 'react'
import Lightbox from '../../components/Lightbox'

const POSTCARDS = [
  {
    id: 1,
    title: '1st Birthday 2017',
    date: 'Summer 2016',
    image: '/assets/cards/1.jpeg',
    sender: 'From: Lov'
  },
  {
    id: 2,
    title: '2nd Birthday 2018',
    date: 'Monsoon 2023',
    image: '/assets/cards/2.jpeg',
    sender: 'From: Lov'
  },
  {
    id: 3,
    title: '3rd Birthday 2019',
    date: 'Winter 2023',
    image: '/assets/cards/3.jpeg',
    sender: 'From: Lov'
  },
  {
    id: 4,
    title: '4th Birthday 2020',
    date: 'Spring 2024',
    image: '/assets/cards/4.jpeg',
    sender: 'From: Lov'
  },
  {
    id: 5,
    title: '5th Birthday 2021',
    date: 'Every Day',
    image: '/assets/cards/5.jpeg',
    sender: 'From: Lov'
  },
  {
    id: 6,
    title: '5th Birthday 2022',
    date: 'Forever',
    image: '/assets/cards/6.jpeg',
    sender: 'From: Lov'
  },
  {
    id: 7,
    title: '6th Birthday 2023',
    date: 'Forever',
    image: '/assets/cards/6.jpeg',
    sender: 'From: Lov'
  },
  {
    id: 8,
    title: 'Chocolate Day 2024',
    date: 'Forever',
    image: '/assets/cards/8.jpeg',
    sender: 'From: Lov'
  },
  {
    id: 9,
    title: '7th Birthday 2024',
    date: 'Forever',
    image: '/assets/cards/9.jpeg',
    sender: 'From: Lov'
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

  {/* Wax seal on flap */}
  <div className="wax-seal">
    <span className="wax-seal-text">L &amp; P</span>
  </div>
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
