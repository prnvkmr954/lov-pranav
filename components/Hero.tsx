// components/Hero.tsx
import Sparkles from '@/components/Sparkles'
import Bokeh from '@/components/Bokeh'
import RomanticParticles from '@/components/RomanticParticles'

export default function Hero() {
  return (
    <section className="hero-wrapper">
      {/* Background blur and effects are handled by CSS ::before */}
      
      <div className="hero-hero" style={{ position: 'relative' }}>
        {/* 3D Particles Background - Behind everything */}
        <RomanticParticles />
        
        {/* Optional: floating background dots */}
        <Bokeh />

        {/* Main hero card - On top with higher z-index */}
        <div className="hero-card" style={{ position: 'relative', zIndex: 10 }}>
          <h1>Lov & PK</h1>
          <p className="hero-subtitle">Our Love Story</p>
          <p className="hero-description">
            Every love story is beautiful, but ours is my favorite. 
            This is our journey — from strangers to soulmates, 
            through laughter, tears, and countless precious moments.
          </p>
          <div className="hero-buttons">
            <a href="/timeline" className="btn btn--primary">Our Journey ♥</a>
            <a href="/gallery" className="btn btn--outline">Photo Memories 📷</a>
          </div>
        </div>
      </div>
      
      {/* Global sparkles */}
      <Sparkles />
    </section>
  )
}