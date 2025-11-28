/* eslint-disable react-hooks/purity */
/* eslint-disable @next/next/no-img-element */
// components/SpecialDayEngine.tsx
'use client'

import React, { useEffect, useMemo, useState, useRef, useCallback } from 'react'
import { SPECIAL_DATES, type SpecialDate } from '@/lib/specialDates'

function monthDayFromISO(iso: string) {
  const d = new Date(iso)
  return { mm: d.getMonth() + 1, dd: d.getDate(), yyyy: d.getFullYear() }
}

/** utility: difference in years from date */
function yearsSince(iso: string) {
  const now = new Date()
  const d = new Date(iso)
  let years = now.getFullYear() - d.getFullYear()
  const mNow = now.getMonth()
  const dMonth = d.getMonth()
  if (mNow < dMonth || (mNow === dMonth && now.getDate() < d.getDate())) years--
  return years
}

// ============== SKETCH COUPLE SVG COMPONENT ==============
const SketchCouple = ({ animate = true }: { animate?: boolean }) => (
  <svg 
    className="sketch-couple" 
    viewBox="0 0 320 200" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* ... SVG paths as in your original file ... */}
    {/* (I kept the original SVG content unchanged for brevity in this reply) */}
    <g className="heart-bloom">
      <path 
        d="M150 85 C150 75, 160 70, 165 78 C170 70, 180 75, 180 85 C180 100, 165 110, 165 110 C165 110, 150 100, 150 85"
        fill="#ff6b8a"
        stroke="#e54d6d"
        strokeWidth="1.5"
      />
    </g>
    {/* ...rest of SVG... */}
  </svg>
)

// ============== HUGGING SKETCH SVG ==============
const HuggingSketch = ({ animate = true }: { animate?: boolean }) => (
  <svg 
    className="sketch-hugging" 
    viewBox="0 0 200 180" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* ... SVG content unchanged ... */}
  </svg>
)

// ============== AUDIO VISUALIZER COMPONENT ==============
const AudioVisualizer = ({ isPlaying, audioContext, analyser }: { 
  isPlaying: boolean
  audioContext: AudioContext | null
  analyser: AnalyserNode | null 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  useEffect(() => {
    if (!canvasRef.current || !analyser || !isPlaying) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      return
    }

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const draw = () => {
      if (!isPlaying) return
      
      animationRef.current = requestAnimationFrame(draw)
      analyser.getByteFrequencyData(dataArray)

      // Clear with gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, 'rgba(255, 240, 245, 0.1)')
      gradient.addColorStop(1, 'rgba(255, 220, 230, 0.05)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw romantic heart-shaped visualization (safe fallback if roundRect doesn't exist)
      const barCount = 32
      const barWidth = canvas.width / barCount
      const centerX = canvas.width / 2

      for (let i = 0; i < barCount; i++) {
        const dataIndex = Math.floor(i * bufferLength / barCount)
        const barHeight = (dataArray[dataIndex] / 255) * (canvas.height * 0.8)
        
        const barGradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight)
        barGradient.addColorStop(0, '#ff6b8a')
        barGradient.addColorStop(0.5, '#ff8fab')
        barGradient.addColorStop(1, '#ffb3c6')
        ctx.fillStyle = barGradient

        const x1 = centerX + (i * barWidth / 2)
        const x2 = centerX - ((i + 1) * barWidth / 2)
        const w = Math.max(2, barWidth / 2 - 2)

        // rounded rect fallback
        ctx.fillRect(x1, canvas.height - barHeight, w, barHeight)
        ctx.fillRect(x2, canvas.height - barHeight, w, barHeight)
      }

      // Draw floating hearts based on audio intensity
      const avgIntensity = dataArray.reduce((a, b) => a + b, 0) / bufferLength
      if (avgIntensity > 100) {
        ctx.font = `${10 + (avgIntensity / 20)}px Arial`
        ctx.fillText('💕', Math.random() * canvas.width, Math.random() * canvas.height / 2)
      }
    }

    draw()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, analyser])

  return (
    <div className="audio-visualizer-container">
      <canvas 
        ref={canvasRef} 
        className="audio-visualizer-canvas"
        width={400}
        height={80}
      />
      {isPlaying && (
        <div className="visualizer-hearts">
          <span className="v-heart vh1">💗</span>
          <span className="v-heart vh2">💕</span>
          <span className="v-heart vh3">💗</span>
        </div>
      )}
    </div>
  )
}


// ============== CELEBRATION CONFETTI COMPONENT ==============
const CelebrationConfetti = () => {
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    emoji: string
    delay: number
    duration: number
  }>>([])

  useEffect(() => {
    const emojis = ['🎉', '💕', '💖', '✨', '🌸', '💝', '🎊', '❤️', '💗', '🌹']
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2
    }))
    setParticles(newParticles)

    // Cleanup after animation
    const timer = setTimeout(() => setParticles([]), 6000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="celebration-confetti">
      {particles.map(p => (
        <span
          key={p.id}
          className="confetti-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}


/* ============== LOVE NOTE - HORIZONTAL SCROLL ==============
   This component is internal to this file.
*/
const LoveNote = ({ message, onClose }: { message: string, onClose: () => void }) => {
  const [scrollOpen, setScrollOpen] = useState(false)
  const [typed, setTyped] = useState('')
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    // Reset state
    setScrollOpen(false)
    setTyped('')
    setFinished(false)

    // Open scroll after delay
    const t1 = setTimeout(() => setScrollOpen(true), 300)
    
    // Start typing after scroll opens
    const t2 = setTimeout(() => {
      let idx = 0
      const typeInterval = setInterval(() => {
        idx++
        setTyped(message.slice(0, idx))
        if (idx >= message.length) {
          clearInterval(typeInterval)
          setFinished(true)
        }
      }, 30)
    }, 900)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [message])

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div 
      className="scroll-overlay show" 
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog" 
      aria-modal="true"
    >
      <div className={`scroll-container ${scrollOpen ? 'unrolled' : ''}`}>
        <button className="scroll-close" onClick={onClose} aria-label="Close">✕</button>
        
        {/* Left wooden roll */}
        <div className="scroll-roll scroll-roll-left">
          <div className="roll-end top"></div>
          <div className="roll-end bottom"></div>
        </div>
        
        {/* Paper content */}
        <div className="scroll-paper">
          <div className="scroll-content">
            <h2 className="scroll-title">A Note For You 💕</h2>
            <div className="scroll-message">
              {typed}
              <span className={`scroll-caret ${finished ? 'hide' : ''}`}>|</span>
            </div>
            <div className="scroll-signature">— Pranav 💕</div>
          </div>
        </div>
        
        {/* Right wooden roll */}
        <div className="scroll-roll scroll-roll-right">
          <div className="roll-end top"></div>
          <div className="roll-end bottom"></div>
        </div>
      </div>
    </div>
  )
}

// ============== MAIN COMPONENT ==============
export default function SpecialDayEngine() {
  const [active, setActive] = useState<SpecialDate | null>(null)
  const [open, setOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [sketchMode, setSketchMode] = useState<'couple' | 'hugging'>('couple')

  // love note visible state
  const [showLoveNote, setShowLoveNote] = useState(false)
  // NEW: currently-selected love-note message (moved inside component)
  const [loveNoteMessage, setLoveNoteMessage] = useState<string | null>(null)
  
  // Audio context for visualizer
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const audioSourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const audioElRef = useRef<HTMLAudioElement | null>(null)
  const prevPlayingRef = useRef<boolean>(false)

  // default fallback message
  const defaultLoveMessage = `My dearest Loveleen,\n\nFrom our first hello in the college lab to every little everyday moment — you made my life gentle and wonderful. Forever yours, Pranav.`

  // Find matches for today
  useEffect(() => {
    const todayMatches = SPECIAL_DATES.filter(sd => {
      try {
        const { mm, dd } = monthDayFromISO(sd.date)
        const now = new Date()
        return now.getMonth() + 1 === mm && now.getDate() === dd
      } catch {
        return false
      }
    })

    if (todayMatches.length > 0) {
      setActive(todayMatches[0])
      setOpen(true)
      setShowCelebration(true)
    }
  }, [])

  // Auto advance slideshow
  useEffect(() => {
    if (!open || !active || (active.images || []).length <= 1) return
    const t = setInterval(() => {
      setSlideIndex(i => (i + 1) % (active.images.length || 1))
    }, 4000)
    return () => clearInterval(t)
  }, [open, active])

  // Alternate sketch animations
  useEffect(() => {
    if (!open) return
    const interval = setInterval(() => {
      setSketchMode(prev => prev === 'couple' ? 'hugging' : 'couple')
    }, 8000)
    return () => clearInterval(interval)
  }, [open])

  // Initialize audio with Web Audio API for visualizer
  const initAudio = useCallback((src: string) => {
    if (audioElRef.current) {
      audioElRef.current.pause()
    }

    const audio = new Audio(src)
    audio.loop = true
    audio.volume = 0.6
    audio.crossOrigin = 'anonymous'
    audioElRef.current = audio

    return audio
  }, [])

  // Setup audio context for visualization
  const setupAudioContext = useCallback(() => {
    if (!audioElRef.current || audioContextRef.current) return

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 256
      
      const source = audioContext.createMediaElementSource(audioElRef.current)
      source.connect(analyser)
      analyser.connect(audioContext.destination)

      audioContextRef.current = audioContext
      analyserRef.current = analyser
      audioSourceRef.current = source
    } catch (e) {
      console.log('Audio context setup failed:', e)
    }
  }, [])

  // Audio source
  const audioSrc = active?.music ?? null

  // Initialize audio when active changes
  useEffect(() => {
    if (audioSrc && open) {
      initAudio(audioSrc)
    }
    return () => {
      if (audioElRef.current) {
        audioElRef.current.pause()
        audioElRef.current = null
      }
    }
  }, [audioSrc, open, initAudio])

  const handleClose = () => {
    setOpen(false)
    setActive(null)
    setShowCelebration(false)
    setShowLoveNote(false)
    setLoveNoteMessage(null)
    if (audioElRef.current) {
      audioElRef.current.pause()
      audioElRef.current.currentTime = 0
    }
    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
      analyserRef.current = null
    }
  }

  const handlePlayToggle = async () => {
    if (!audioElRef.current) return
    
    if (playing) {
      audioElRef.current.pause()
      setPlaying(false)
    } else {
      try {
        setupAudioContext()
        await audioElRef.current.play()
        setPlaying(true)
      } catch {
        setPlaying(false)
      }
    }
  }

  // ----- NEW: handle open love note (replaces the alert)
 // ----- NEW: handle open love note (replaces the alert)
const handleOpenLoveNote = () => {
    prevPlayingRef.current = playing
  // get messages from active: supports both secretMessage (array OR string) and secretMessages
  let msgsArr: string[] | null = null
  if (active) {
    // prefer plural key if present
    if (Array.isArray((active as any).secretMessages) && (active as any).secretMessages.length) {
      msgsArr = (active as any).secretMessages
    } else if (Array.isArray((active as any).secretMessage) && (active as any).secretMessage.length) {
      msgsArr = (active as any).secretMessage
    } else if (typeof (active as any).secretMessage === 'string') {
      msgsArr = [(active as any).secretMessage]
    }
  }

  const message = msgsArr && msgsArr.length
    ? msgsArr[Math.floor(Math.random() * msgsArr.length)]
    : defaultLoveMessage

  setLoveNoteMessage(message)

  // <-- Removed: pausing music when opening the love note.
  // We want the music to keep playing while the note is open.

  setShowLoveNote(true)
}


  if (!open || !active) return null

  // Compute years/days
  const years = yearsSince(active.date)
  const days = Math.floor((Date.now() - new Date(active.date).getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="special-overlay">
      {/* Celebration confetti on load */}
      {showCelebration && <CelebrationConfetti />}
      
      <div className="special-modal">
        {/* Close Button */}
        <button 
          className="special-close" 
          onClick={handleClose} 
          aria-label="Close popup"
          title="Close"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Left Side - Counter & Sketch */}
        <div className="special-left">
          {/* Animated Sketch */}
          <div className="sketch-wrap">
            <div className={`sketch-container ${sketchMode === 'couple' ? 'active' : ''}`}>
              <SketchCouple animate={sketchMode === 'couple'} />
            </div>
            <div className={`sketch-container ${sketchMode === 'hugging' ? 'active' : ''}`}>
              <HuggingSketch animate={sketchMode === 'hugging'} />
            </div>
          </div>

          {/* Counter Section */}
          <div className="special-counter">
            <div className="special-counter-title">✨ Happy {active.name} ✨</div>
            <div className="special-counter-years">
              {years >= 0 ? (
                <>
                  <span className="num">{years}</span>
                  <span className="label">Years Together</span>
                </>
              ) : (
                <>
                  <span className="num">{Math.max(0, days)}</span>
                  <span className="label">Days of Love</span>
                </>
              )}
            </div>

            <div className="special-meta">
              <div className="special-date">💕 Since {new Date(active.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</div>
              <div className="special-days">
                {days.toLocaleString()} days · {Math.max(0, Math.floor(days / 30)).toLocaleString()} months
              </div>
            </div>

            {/* Audio Visualizer */}
            {audioSrc && (
              <AudioVisualizer 
                isPlaying={playing} 
                audioContext={audioContextRef.current}
                analyser={analyserRef.current}
              />
            )}

            {/* Action Buttons */}
            <div className="special-actions">
              {audioSrc && (
                <button 
                  className={`btn music-btn ${playing ? 'playing' : ''}`} 
                  onClick={handlePlayToggle}
                >
                  {playing ? (
                    <>
                      <span className="music-icon">🎵</span> Pause Music
                    </>
                  ) : (
                    <>
                      <span className="music-icon">🎶</span> Play Our Song
                    </>
                  )}
                </button>
              )}
              {/* show button if there is any secret message available */}
              {(Array.isArray((active as any).secretMessage) && (active as any).secretMessage.length) ||
               Array.isArray((active as any).secretMessages) ? (
                <button 
                  className="btn ghost love-note-btn" 
                  onClick={handleOpenLoveNote}
                >
                  💌 Open Love Note
                </button>
              ) : null}
            </div>
          </div>

          {/* Initials Flare */}
          <div className="special-flare">
            <div className="initials">𝓛 ♥ 𝓟</div>
          </div>
        </div>

        {/* Right Side - Slideshow */}
        <div className="special-right">
          <div className="slideshow">
            {active.images && active.images.length > 0 ? (
              <img
                key={active.images[slideIndex]}
                src={active.images[slideIndex]}
                alt={`${active.name} memory ${slideIndex + 1}`}
                className="slide"
                loading="eager"
              />
            ) : (
              <div className="slide empty">
                <span className="empty-heart">💕</span>
                <span>Memories loading…</span>
              </div>
            )}

            {/* Slide Controls */}
            <div className="slide-controls">
              {active.images?.map((_, i) => (
                <button
                  key={i}
                  className={`dot ${i === slideIndex ? 'active' : ''}`}
                  onClick={() => setSlideIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Visual Extras */}
      {active.showPetals && <div className="petals" />}
      {active.showFireworks && <div className="fireworks" />}

      {/* Always show floating hearts */}
      <div className="floating-love-particles">
        {Array.from({ length: 12 }).map((_, i) => (
          <span 
            key={i} 
            className="love-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${12 + Math.random() * 16}px`
            }}
          >
            {['💕', '💖', '💗', '❤️', '💝'][Math.floor(Math.random() * 5)]}
          </span>
        ))}
      </div>

      {/* LOVE NOTE modal (animated) */}
   {showLoveNote && loveNoteMessage && (
  <LoveNote 
    message={loveNoteMessage}
    onClose={() => {
      setShowLoveNote(false)
      setLoveNoteMessage(null)

      // Only resume if the music *was* playing before the note opened.
      if (audioElRef.current && !playing && prevPlayingRef.current) {
        audioElRef.current.play().catch(()=>{})
        setPlaying(true)
      }

      // reset the ref
      prevPlayingRef.current = false
    }}
  />
)}

    </div>
  )
}
