// components/Hero.tsx
import Sparkles from '@/components/Sparkles'
import Bokeh from '@/components/Bokeh'

export default function Hero() {
  return (
    <section className="hero-wrapper">
      {/* Background blur and effects are handled by CSS ::before */}
      
      <div className="hero-hero">
        {/* Optional: floating background dots */}
        <Bokeh />

        {/* Main hero card */}
        <div className="hero-card">
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