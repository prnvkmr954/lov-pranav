// components/GlobalLoader.tsx
'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function GlobalLoader() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // show loader when path changes
    setVisible(true)

    const timeout = setTimeout(() => {
      setVisible(false)
    }, 2500) // how long the loader stays (ms)

    return () => clearTimeout(timeout)
  }, [pathname])

  if (!visible) return null

  return (
    <div className="loading-screen">
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
