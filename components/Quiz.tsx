// components/Quiz.tsx
'use client'
import { useState } from 'react'
import Button from './ui/Button'
export default function Quiz() {
  const [selected, setSelected] = useState<string | null>(null)
  const correct = 'Samosa'
  const options = ['Pizza', 'Chips', 'Samosa']
  // Helper to determine button variant
  const getVariant = (option: string) => {
    if (!selected) return 'ghost';
    return option === correct ? 'primary' : 'outline';
  };

  return (
    <div id="quiz-wrap">
      <div className="q">What is their favorite snack?</div>
      <div className="opts">
        {options.map(o => (
          <Button
            key={o}
            variant={getVariant(o)}
            size="sm"
            onClick={() => setSelected(o)}
            disabled={!!selected}
          >
            {o}
          </Button>
        ))}
      </div>
      <div className="quiz-result" aria-live="polite" style={{ marginTop: 12 }}>
        {selected ? (selected === correct ? 'Correct! You know them well ❤️' : `Nice try — correct was ${correct}.`) : ''}
      </div>
    </div>
  )
}
