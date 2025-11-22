// components/Lightbox.tsx
'use client'
type Props = { isOpen: boolean; src: string | null; onClose: () => void }
export default function Lightbox({ isOpen, src, onClose }: Props) {
  if (!isOpen || !src) return null
  return (
    <div className="lightbox" onClick={onClose} style={{ display: 'flex' }}>
      <img src={src} alt="" />
    </div>
  )
}
