// components/LoveNote.tsx
'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'

type LoveNoteProps = {
  open?: boolean
  onClose: () => void
  title?: string
  message: string 
}

export default function LoveNote({
  open = true,
  onClose,
  title = 'A Note For You 💕',
  message
}: LoveNoteProps) {
  const [visible, setVisible] = useState<boolean>(open)
  const [scrollOpen, setScrollOpen] = useState(false)
  const [startTyping, setStartTyping] = useState(false)
  const [lettersRevealed, setLettersRevealed] = useState<number>(0)
  const [finished, setFinished] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const chars = useMemo(() => message.split(''), [message])

  useEffect(() => {
    if (open) {
      setVisible(true)
      setScrollOpen(false)
      setStartTyping(false)
      setLettersRevealed(0)
      setFinished(false)
      
      const t1 = setTimeout(() => setScrollOpen(true), 300)
      const t2 = setTimeout(() => setStartTyping(true), 1400)
      
      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
      }
    } else {
      setScrollOpen(false)
      setTimeout(() => setVisible(false), 500)
    }
  }, [open])

  useEffect(() => {
    if (!startTyping) return
    
    let i = 0
    let timer: number | null = null

    function tick() {
      if (i <= chars.length) {
        setLettersRevealed(i)
        i++
        const delay = Math.max(10, 30 + Math.round(Math.random() * 20) - 10)
        timer = window.setTimeout(tick, delay)
      } else {
        setFinished(true)
      }
    }

    timer = window.setTimeout(tick, 200)
    return () => {
      if (timer) window.clearTimeout(timer)
    }
  }, [startTyping, chars.length])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === containerRef.current) onClose()
  }

  if (!visible) return null

  const renderedChars = chars.map((ch, idx) => {
    const revealed = idx < lettersRevealed
    return (
      <span
        key={`c-${idx}`}
        className={`scroll-char ${revealed ? 'visible' : ''}`}
      >
        {ch === '\n' ? '\n' : ch === ' ' ? '\u00A0' : ch}
      </span>
    )
  })

  return (
    <div
      ref={containerRef}
      className={`scroll-overlay ${open ? 'show' : ''}`}
      onClick={handleBackdropClick}
    >
      <div className={`scroll-container ${scrollOpen ? 'unrolled' : ''}`}>
        <button className="scroll-close" onClick={onClose}>✕</button>
        
        {/* Left roll */}
        <div className="scroll-roll scroll-roll-left">
          <div className="roll-end top"></div>
          <div className="roll-end bottom"></div>
        </div>
        
        {/* Paper */}
        <div className="scroll-paper">
          <div className="scroll-content">
            <h2 className="scroll-title">{title}</h2>
            <div className="scroll-message">
              {renderedChars}
              <span className={`scroll-caret ${finished ? 'hide' : ''}`}>|</span>
            </div>
            <div className="scroll-signature">— Pranav 💕</div>
          </div>
        </div>
        
        {/* Right roll */}
        <div className="scroll-roll scroll-roll-right">
          <div className="roll-end top"></div>
          <div className="roll-end bottom"></div>
        </div>
      </div>
    </div>
  )
}