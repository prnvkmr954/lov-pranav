// components/Bokeh.tsx
'use client'
import { useEffect } from 'react'

export default function Bokeh() {
  useEffect(() => {
    const hero = document.querySelector('.hero-hero')
    if (!hero) return
    let wrap = hero.querySelector('.bokeh-wrap') as HTMLElement | null
    if (!wrap) {
      wrap = document.createElement('div')
      wrap.className = 'bokeh-wrap'
      hero.insertBefore(wrap, hero.firstChild)
    }
    const dots: HTMLElement[] = []
    for (let i = 0; i < 8; i++) {
      const d = document.createElement('div')
      d.className = 'bokeh-dot'
      const size = 40 + Math.random() * 140
      d.style.width = d.style.height = `${size}px`
      d.style.left = `${5 + Math.random() * 90}%`
      d.style.top = `${10 + Math.random() * 80}%`
      d.style.opacity = `${0.02 + Math.random() * 0.1}`
      d.style.setProperty('--dur', `${10 + Math.random() * 14}s`)
      wrap.appendChild(d)
      dots.push(d)
    }
    return () => { dots.forEach(d => d.remove()) }
  }, [])
  return null
}
