// app/layout.tsx
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
      <body>
        {/* Sidebar plus content */}
        <Sidebar />
        <main className="main-content">
          <div className="content-wrapper">{children}</div>
        </main>
      </body>
    </html>
  )
}
