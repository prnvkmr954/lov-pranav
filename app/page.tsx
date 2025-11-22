// app/page.tsx
import Hero from '@/components/Hero'

export default function Home() {
  return (
    <>
      <Hero />
      <section style={{ padding: '48px 0' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', color: '#4a2023' }}>Our Timeline</h2>
        <p style={{ color: '#7a6466' }}>(Your timeline items go here — add a component)</p>
      </section>
    </>
  )
}
