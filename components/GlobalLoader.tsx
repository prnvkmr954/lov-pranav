// components/GlobalLoader.tsx
'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function GlobalLoader() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(true)
  const [fade, setFade] = useState(false)

  useEffect(() => {
    setVisible(true)
    setFade(false)

    const t1 = setTimeout(() => setFade(true), 900)         // start fade first
    const t2 = setTimeout(() => setVisible(false), 1300)    // then hide

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [pathname])

  if (!visible) return null

  return (
    <div className={`loading-screen ${fade ? 'hide' : ''}`}>
      <div className="loading-hearts">
        <span className="loading-heart loading-heart-left">❤️</span>
        <span className="loading-heart loading-heart-right">❤️</span>
        <span className="loading-heart loading-heart-center">💖</span>
      </div>

      <p className="loading-text-main">
        Bringing our memories together…
      </p>
      <p className="loading-text-sub">
        Love is loading, just for you. ✨
      </p>
    </div>
  )
}
