// components/Letters.tsx
'use client'
import { useState } from 'react'
import Button from './ui/Button'

const LETTERS = [
  { id: 1, text: 'My dearest... Here is a memory.' },
  { id: 2, text: 'Another short love note.' }
]

export default function Letters() {
  const [openId, setOpenId] = useState<number | null>(null)
  return (
    <div className="letters-grid">
      {LETTERS.map(l => (
        <div key={l.id} className={`envelope ${openId === l.id ? 'open' : ''}`}>
          <div className="env-top"></div>
          <div className="env-body">
           <Button onClick={()=> setOpenId(openId===l.id?null:l.id)} variant="outline" size="sm">
               {openId===l.id ? 'Close' : 'Open'}
          </Button>

            <div className="letter-content">{openId === l.id ? l.text : ''}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
