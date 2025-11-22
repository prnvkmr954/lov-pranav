// /mnt/data/Sparkles.tsx
'use client'
import { useEffect } from 'react'

export default function Sparkles() {
  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const hero = document.querySelector('.hero-hero') as HTMLElement | null
    if (!hero) return

    // Create or reuse overlay BUT append to hero (so it stays above hero background pseudo)
    let overlay = hero.querySelector('.hero-sparkles-fixed') as HTMLElement | null
    if (!overlay) {
      overlay = document.createElement('div')
      overlay.className = 'hero-sparkles-fixed'
      // positioned absolute relative to hero (hero must be position: relative)
      overlay.style.position = 'absolute'
      overlay.style.left = '0'
      overlay.style.top = '0'
      overlay.style.width = '100%'
      overlay.style.height = '100%'
      overlay.style.pointerEvents = 'none'
      // ensure stacking — keep this relatively above background but below card (adjust if needed)
      overlay.style.zIndex = '40'
      hero.appendChild(overlay)
    }

    // CONFIG: tweak to control speed/frequency/drift
    const CONFIG = {
      spawnBase: 9000,
      spawnRandom: 14000,
      fallBase: 7000,
      fallRandom: 4000,
      driftMax: 40,
      scaleMin: 0.88,
      scaleMax: 1.04,
      lifespanMs: 120000,
    }

    // Update overlay bounds (overlay is sized to hero by CSS/inline styles already)
        function updateOverlay() {
          // ensure hero and overlay are still present before measuring
          if (!hero || !overlay) return
    
          // overlay is inside hero and uses width/height 100%, so no left/top calculation needed.
          // But if you want to reposition children based on hero rect, compute rect:
          const r = hero.getBoundingClientRect()
          overlay.style.width = `${r.width}px`
          overlay.style.height = `${r.height}px`
        }
        updateOverlay()

    let resizeTimer: number | undefined
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(updateOverlay, 80)
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', updateOverlay, { passive: true })

    const symbols = ['♥', '❄', '♡', '❅']
    let running = true
    let spawnTimer: number | undefined

    function createSparkle() {
      if (!overlay || !running) return

      const el = document.createElement('div')
      const sym = symbols[Math.floor(Math.random() * symbols.length)]
      el.className = 'hero-sparkle ' + ((sym === '♥' || sym === '♡') ? 'heart' : 'snow')
      el.textContent = sym

      const w = overlay.clientWidth || 300
      const h = overlay.clientHeight || 200

      const x = Math.round(8 + Math.random() * Math.max(0, w - 16))
      const startY = Math.round(h * (0.03 + Math.random() * 0.18))

      el.style.position = 'absolute'
      el.style.left = `${x}px`
      el.style.top = `${startY}px`

      const dur = CONFIG.fallBase + Math.random() * CONFIG.fallRandom
      const drift = (Math.random() - 0.5) * (CONFIG.driftMax * 2)
      const scale = CONFIG.scaleMin + Math.random() * (CONFIG.scaleMax - CONFIG.scaleMin)

      el.style.transform = `translateX(${drift}px) scale(${scale})`
      el.style.animation = `sparkleFallOverlay ${Math.round(dur)}ms cubic-bezier(.2,.7,.2,1) forwards`
      el.style.opacity = '0.98'

      overlay.appendChild(el)

      window.setTimeout(() => {
        try { el.remove() } catch (e) {}
      }, dur + 120)

      return dur
    }

    function spawnLoop() {
      if (!running) return
      createSparkle()
      const next = CONFIG.spawnBase + Math.random() * CONFIG.spawnRandom
      spawnTimer = window.setTimeout(spawnLoop, Math.round(next))
    }

    spawnLoop()
    const stopTimer = window.setTimeout(() => { running = false }, CONFIG.lifespanMs)

    return () => {
      running = false
      if (spawnTimer) clearTimeout(spawnTimer)
      if (stopTimer) clearTimeout(stopTimer)
      try { overlay && overlay.remove() } catch (e) {}
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', updateOverlay)
    }
  }, [])

  return null
}
