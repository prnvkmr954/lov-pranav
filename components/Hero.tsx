import Sparkles from '@/components/Sparkles'
import Bokeh from '@/components/Bokeh'

export default function Hero() {
  return (
    <section className="hero-wrapper">
      <div className="hero-hero">
        {/* floating background dots */}
        <Bokeh />

        {/* NEW sparkle overlay */}
        <Sparkles />

        {/* your existing hero card */}
        <div className="hero-card">
          <h1>
            The Story of <span className="highlight">Lov & PK</span>
          </h1>
          <p>
            A celebration of our journey, one memory at a time. Welcome to our story.
          </p>
          <div className="hero-buttons">
            <a className="btn-primary">View Timeline</a>
            <a className="btn-outline">Photo Gallery</a>
          </div>
        </div>
      </div>
    </section>
  )
}
