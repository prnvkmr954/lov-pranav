// app/timeline/page.tsx
'use client'
import { useEffect } from 'react'

export default function TimelinePage() {
  useEffect(() => {
    const items = document.querySelectorAll('.timeline-item')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.2 })
    items.forEach((i) => obs.observe(i))
    return () => obs.disconnect()
  }, [])

  return (
    <main>
      <section className="container">
        <h1>Our Timeline</h1>
        <div className="timeline">
          <div className="timeline-item"><div className="timeline-year">2017</div><div className="timeline-body">We met in college — that first hello.</div></div>
          <div className="timeline-item"><div className="timeline-year">2018</div><div className="timeline-body">First date — endless talks.</div></div>
          <div className="timeline-item"><div className="timeline-year">2020</div><div className="timeline-body">Long separation, stayed strong.</div></div>
          <div className="timeline-item"><div className="timeline-year">2023</div><div className="timeline-body">Reunited in the same city.</div></div>
        </div>
      </section>
    </main>
  )
}
