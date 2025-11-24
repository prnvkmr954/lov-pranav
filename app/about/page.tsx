// app/about/page.tsx
'use client'

export default function AboutPage() {
  return (
    <main className="about-page">
      {/* Floating hearts in the background */}
      <span className="about-heart about-heart-1">💗</span>
      <span className="about-heart about-heart-2">💖</span>
      <span className="about-heart about-heart-3">💘</span>

      <div className="about-inner">
        {/* Text side */}
        <section className="about-card">
          <p className="about-kicker">Just a little note…</p>

          <h1 className="about-title">
            About this tiny corner of our story
          </h1>

          <p className="about-text">
            This website is my love letter to us — to every train we almost missed,
            every late–night call, every silly fight, and every “we got this” that
            made us stronger.
          </p>

          <p className="about-text">
            From that first hello in the college lab to flights, trips, job shifts,
            and quiet evenings on the couch, this space is where I’ve tried to bottle
            up our memories — the loud ones, the soft ones, and the in–between ones
            that only we understand.
          </p>

          <p className="about-text">
            One day, when we look back, I want us to smile at how far we’ve walked
            together — how we turned ordinary days into a story worth keeping.
          </p>

          <p className="about-signoff">
            With all my love,
            <span> PK</span>
          </p>
        </section>

        {/* Photo side */}
        <section className="about-photo-wrap">
          <div className="about-photo-frame">
            {/* change src to your real image path */}
            <img
              src="/assets/about-photo.jpg"
              alt="Us together"
              className="about-photo"
            />
            <div className="about-photo-caption">
              “It was always you.”
            </div>
          </div>
          <div className="about-photo-shadow" />
        </section>
      </div>
    </main>
  )
}
