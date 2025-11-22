// components/Sparkles.tsx
'use client'

import { useEffect } from "react"


export default function Sparkles() {
  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Create a fixed overlay that covers the entire viewport
    let overlay = document.querySelector('.global-sparkles-overlay') as HTMLElement | null
    if (!overlay) {
      overlay = document.createElement('div')
      overlay.className = 'global-sparkles-overlay'
      overlay.style.position = 'fixed'
      overlay.style.left = '0'
      overlay.style.top = '0'
      overlay.style.width = '100vw'
      overlay.style.height = '100vh'
      overlay.style.pointerEvents = 'none'
      overlay.style.zIndex = '9999'
      overlay.style.overflow = 'hidden'
      document.body.appendChild(overlay)
    }

    // CONFIG: slower speed and continuous spawning
    const CONFIG = {
      spawnBase: 1500,      // Spawn every 1.5-3.5 seconds (slower)
      spawnRandom: 2000,
      fallBase: 15000,      // 15-22 seconds to fall (much slower)
      fallRandom: 7000,
      driftMax: 60,         // More horizontal drift
      scaleMin: 0.7,
      scaleMax: 1.2,
    }

    const symbols = ['♥', '❄', '♡', '❅', '✨', '⭐']
    let running = true

    function createSparkle() {
      if (!overlay || !running) return

      const el = document.createElement('div')
      const sym = symbols[Math.floor(Math.random() * symbols.length)]
      el.className = 'global-sparkle'
      
      // Different classes for different symbols
      if (sym === '♥' || sym === '♡') {
        el.classList.add('heart')
      } else if (sym === '❄' || sym === '❅') {
        el.classList.add('snow')
      } else {
        el.classList.add('star')
      }
      
      el.textContent = sym

      const w = window.innerWidth
      const h = window.innerHeight

      // Start from top, random X position
      const x = Math.round(Math.random() * w)
      const startY = -50 // Start above viewport

      el.style.position = 'absolute'
      el.style.left = `${x}px`
      el.style.top = `${startY}px`
      el.style.fontSize = '18px'
      el.style.lineHeight = '1'
      el.style.opacity = '0.85'
      el.style.textShadow = '0 1px 2px rgba(255,255,255,0.6)'
      el.style.willChange = 'transform, opacity'

      const dur = CONFIG.fallBase + Math.random() * CONFIG.fallRandom
      const drift = (Math.random() - 0.5) * (CONFIG.driftMax * 2)
      const scale = CONFIG.scaleMin + Math.random() * (CONFIG.scaleMax - CONFIG.scaleMin)
      const rotation = Math.random() * 360

      // Create keyframes animation
      const keyframes = [
        { 
          transform: `translateX(0px) translateY(0px) scale(${scale}) rotate(0deg)`,
          opacity: 0 
        },
        { 
          transform: `translateX(${drift * 0.3}px) translateY(${h * 0.2}px) scale(${scale}) rotate(${rotation * 0.3}deg)`,
          opacity: 0.85,
          offset: 0.15
        },
        { 
          transform: `translateX(${drift * 0.7}px) translateY(${h * 0.7}px) scale(${scale * 0.95}) rotate(${rotation * 0.7}deg)`,
          opacity: 0.8,
          offset: 0.7
        },
        { 
          transform: `translateX(${drift}px) translateY(${h + 50}px) scale(${scale * 0.8}) rotate(${rotation}deg)`,
          opacity: 0 
        }
      ]

      const animation = el.animate(keyframes, {
        duration: dur,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fill: 'forwards'
      })

      overlay.appendChild(el)

      animation.onfinish = () => {
        try { el.remove() } catch (e) {}
      }
    }

    function spawnLoop() {
      if (!running) return
      createSparkle()
      const next = CONFIG.spawnBase + Math.random() * CONFIG.spawnRandom
      setTimeout(spawnLoop, Math.round(next))
    }

    // Start spawning
    spawnLoop()

    // Cleanup function
    return () => {
      running = false
      if (overlay && overlay.parentNode) {
        overlay.remove()
      }
    }
  }, [])

  return null
}