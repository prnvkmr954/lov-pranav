// app/layout.tsx
import GlobalLoader from '@/components/GlobalLoader'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import type { ReactNode } from 'react'
import SpecialDayEngine from '@/components/SpecialDayEngine';

export const metadata = {
  title: 'Lov & PK — Heartfelt Trail 💖',
  description: 'A love story from a college lab in 2016 to cities, careers and forever — told through envelopes, photos, maps and time.',
  openGraph: {
    title: 'Lov & PK — Heartfelt Trail 💖',
    description: 'A love story from a college lab in 2016 to cities, careers and forever — told through envelopes, photos, maps and time.',
    url: 'https://loveleenpranav.com/assets/about-photo.jpg',
    siteName: 'Lov & PK — Heartfelt Trail',
    images: [
      {
        url: 'https://loveleenpranav.com/assets/about-photo.jpg',
        width: 1200,
        height: 630,
        alt: 'Lov & PK — Our Love Story'
      },
    ],
    locale: 'en_IN',
    type: 'website',
  }
};


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        
      </head>
      <body>
        {/* Sidebar plus content */}
        <GlobalLoader />
        <SpecialDayEngine />
        <Sidebar />
        <main className="main-content">
          
          <div className="content-wrapper">{children}</div>
        </main>
      </body>
    </html>
  )
}
