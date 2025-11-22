// components/Logo.tsx
import React from 'react'

export default function Logo({ width = 110, height = 110 }: { width?: number; height?: number }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 380 140"
      role="img"
      aria-label="Lov & PK logo"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0" stopColor="#ffdfe2" />
          <stop offset="1" stopColor="#f1b7bf" />
        </linearGradient>

        <linearGradient id="g2" x1="0" x2="1">
          <stop offset="0" stopColor="#ffdfe2" stopOpacity="0.9" />
          <stop offset="1" stopColor="#f1b7bf" stopOpacity="0.9" />
        </linearGradient>

        <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="6" stdDeviation="14" floodColor="#b1303b" floodOpacity="0.09" />
        </filter>

        <style>
          {`.script{font-family: "Brush Script MT", "Segoe Script", "Pacifico", cursive; font-size:64px; fill:#7b1a22;}
            .sm{font-family: Inter, Arial, sans-serif; font-size:12px; fill:#6a3e46;}
          `}
        </style>
      </defs>

      {/* rounded soft tile */}
      <rect x="0" y="0" width="380" height="140" rx="18" fill="url(#g2)" opacity="0.95" />

      {/* inner card */}
      <g transform="translate(28,22)">
        <rect x="0" y="0" width="324" height="96" rx="14" fill="white" opacity="0.04" />
        {/* Script text */}
        <text className="script" x="0" y="62">Lov</text>
        <text className="script" x="132" y="62" style={{ letterSpacing: '-6px' }}>{'&'} PK</text>

        {/* little gradient dot on right */}
        <circle cx="310" cy="36" r="10" fill="url(#g1)" opacity="0.98" filter="url(#softShadow)" />
      </g>

      {/* sub-label */}
      <text x="18" y="118" className="sm">Heartfelt Trail</text>
    </svg>
  )
}
