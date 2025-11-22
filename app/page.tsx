// app/page.tsx
import Hero from '@/components/Hero'

export default function Home() {
  return (
    <>
      <Hero />
      
      {/* Our Story Section */}
      <section className="our-story-section">
        <div className="section-container">
          <h2 className="section-title">Our Story</h2>
          <div className="story-grid">
            <div className="story-card">
              <div className="story-icon">💫</div>
              <h3>How We Met</h3>
              <p>
                Two souls destined to meet. From the first hello, 
                we knew there was something special between us. 
                What started as a simple conversation became the beginning 
                of our forever.
              </p>
            </div>
            
            <div className="story-card">
              <div className="story-icon">💝</div>
              <h3>Falling in Love</h3>
              <p>
                Every moment together made us fall deeper. 
                Late-night talks, shared dreams, and countless laughs. 
                We discovered that love isn't just a feeling — 
                it's choosing each other, every single day.
              </p>
            </div>
            
            <div className="story-card">
              <div className="story-icon">🌟</div>
              <h3>Our Journey</h3>
              <p>
                Through ups and downs, near and far, we grew together. 
                Every challenge made us stronger, every joy made us grateful. 
                This is more than just a relationship — it's a partnership, 
                a friendship, a love that grows with time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="stats-section">
        <div className="section-container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">∞</div>
              <div className="stat-label">Moments Shared</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">2</div>
              <div className="stat-label">Hearts United</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1</div>
              <div className="stat-label">Love Story</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">♾️</div>
              <div className="stat-label">Years to Come</div>
            </div>
          </div>
        </div>
      </section>

      {/* Love Quote Section */}
      <section className="quote-section">
        <div className="section-container">
          <div className="quote-card">
            <p className="quote-text">
              "In all the world, there is no heart for me like yours. 
              In all the world, there is no love for you like mine."
            </p>
            <p className="quote-author">— Maya Angelou</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="section-container">
          <h2 className="section-title">Explore Our Journey</h2>
          <p className="cta-description">
            Dive deeper into our story through photos, memories, and milestones
          </p>
          <div className="cta-grid">
            <a href="/timeline" className="cta-card">
              <div className="cta-icon">⏳</div>
              <h3>Timeline</h3>
              <p>Walk through our journey from the beginning to now</p>
            </a>
            
            <a href="/gallery" className="cta-card">
              <div className="cta-icon">📸</div>
              <h3>Photo Gallery</h3>
              <p>Our favorite moments captured in time</p>
            </a>
            
            <a href="/map" className="cta-card">
              <div className="cta-icon">📍</div>
              <h3>Memory Map</h3>
              <p>Places where we created beautiful memories</p>
            </a>
            
            <a href="/letters" className="cta-card">
              <div className="cta-icon">💌</div>
              <h3>Love Letters</h3>
              <p>Words from our hearts to each other</p>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}