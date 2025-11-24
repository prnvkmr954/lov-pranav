// app/layout.tsx
import GlobalLoader from '@/components/GlobalLoader'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'Lov & PK — Heartfelt Trail',
  description: 'A celebration of our journey'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
      </head>
      <body>
        {/* Sidebar plus content */}
        <GlobalLoader />
        <Sidebar />
        <main className="main-content">
          
          <div className="content-wrapper">{children}</div>
        </main>
      </body>
    </html>
  )
}
