// app/envelope/page.tsx
'use client'

const ENVELOPES = [
  { src: '/assets/udaipur.jpg',      title: 'Udaipur' },
  { src: '/assets/zirakpur.jpg',     title: 'Zirakpur' },
  { src: '/assets/ganga-maa.jpeg',   title: 'Rishikesh' },
  { src: '/assets/udaipur-3.jpg',    title: 'Udaipur – Aurika' },
  { src: '/assets/shimla.jpg',       title: 'Shimla' },
  { src: '/assets/manali-1.jpg',     title: 'Manali' },
  { src: '/assets/bengaluru.jpg',    title: 'Bengaluru' },
  { src: '/assets/tajmahal.jpg',     title: 'Agra – Taj Mahal' },
]

export default function EnvelopePage() {
  return (
    <main className="envelope-page">
      <h1 className="envelope-title">Love Letters from Our Journey 💌</h1>
      <p className="envelope-sub">
        Hover over any envelope to open it and reveal a memory.
      </p>

      <div className="envelope-scene">
        {ENVELOPES.map(env => (
          <div className="envelope-item" key={env.src}>
          <div className="love-envelope">
              {/* Letter / Photo card */}
              <div className="love-envelope-letter">
                <img src={env.src} alt={env.title} />
              </div>

              {/* Envelope front with flap */}
              <div className="love-envelope-front"></div>
            </div>
            <div className="envelope-caption">{env.title}</div>
          </div>
        ))}
      </div>
    </main>
  )
}
