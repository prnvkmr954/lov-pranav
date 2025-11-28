/* eslint-disable react-hooks/static-components */
// components/Sidebar.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { JSX, useEffect, useState } from 'react'
import Logo from '@/components/Logo'

export default function Sidebar(): JSX.Element {
  const pathname = usePathname() || '/'
  const [open, setOpen] = useState<boolean>(false) // Start closed on mobile

  // set initial open based on viewport width
  useEffect(() => {
    const handle = () => {
      // Only open sidebar by default on desktop
      setOpen(window.innerWidth > 980)
    }
    handle()
    window.addEventListener('resize', handle)
    return () => window.removeEventListener('resize', handle)
  }, [])

  // sync body class so CSS can react
  useEffect(() => {
    if (!open) {
      document.body.classList.add('sidebar-collapsed')
    } else {
      document.body.classList.remove('sidebar-collapsed')
    }
  }, [open])

  function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    const active = pathname === href
    return (
      <Link
        href={href}
        className={`nav-link${active ? ' active' : ''}`}
        onClick={() => {
          // Close sidebar on mobile after navigation
          if (window.innerWidth <= 980) setOpen(false)
        }}
      >
        {children}
      </Link>
    )
  }

  return (
    <>
      {/* FIXED toggle button (outside the aside) - always visible */}
      <button
        className="sidebar-toggle-fixed"
        aria-expanded={open}
        aria-label={open ? 'Close sidebar' : 'Open sidebar'}
        onClick={() => setOpen(v => !v)}
        title={open ? 'Close sidebar' : 'Open sidebar'}
      >
        <span className={`hamburger ${open ? 'is-open' : ''}`} />
      </button>

      {/* Sidebar itself */}
      <aside className={`sidebar-love ${open ? 'open' : 'collapsed'}`} aria-label="Primary">
        <div className="logo-area">
          <div className="logo-anim">
            <Logo width={86} height={86} />
          </div>

          <div className="brand-title">Lov ♥ PK</div>
          <small className="brand-sub">Heartfelt Trail</small>
        </div>

        <nav className="love-menu" aria-label="Main navigation">
          <NavLink href="/">🏠 Home</NavLink>
          <NavLink href="/timeline">⏳ T`imeline</NavLink>
          <NavLink href="/gallery">📷 Gallery</NavLink>
          <NavLink href="/map">📍 Map</NavLink>
          <NavLink href="/envelope">📬 Envelope</NavLink>
          <NavLink href="/game">📬 Game</NavLink>
          <NavLink href="/about">📬 About Us</NavLink>
        </nav>
      </aside>
    </>
  )
}