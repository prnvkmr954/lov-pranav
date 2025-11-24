// app/timeline/page.tsx - SMALLER & CONCISE VERSION
'use client'

type TimelineEvent = {
  year: string
  title: string
  subtitle: string
  note: string
  emoji: string
}

const EVENTS: TimelineEvent[] = [
  {
    year: '2016',
    title: 'Computer Lab',
    subtitle: 'IHGI College',
    note: 'Lab sessions and that one "hello" that started everything.',
    emoji: '💻'
  },
  {
    year: '2016-17',
    title: 'Instagram Era',
    subtitle: 'Digital romance',
    note: 'From DMs to WhatsApp. Songs, gifts, stories for her.',
    emoji: '📱'
  },
  {
    year: '2017',
    title: 'Mohali Move',
    subtitle: 'First distance',
    note: 'Internship called. Living in 3B2, starting career.',
    emoji: '🚗'
  },
  {
    year: 'Mid 2018',
    title: 'Together Again',
    subtitle: 'Same city',
    note: 'She came to Mohali. Office together, finally close.',
    emoji: '🏢'
  },
  {
    year: '2020',
    title: 'COVID Hit',
    subtitle: 'Lockdown',
    note: 'She went home. He stayed for her. The hardest year.',
    emoji: '😷'
  },
  {
    year: '2021',
    title: 'Came Back',
    subtitle: 'For her',
    note: 'Jharkhand to Mohali. Distance was too much.',
    emoji: '🏠'
  },
  {
    year: '2021-23',
    title: 'Birthday Meets',
    subtitle: 'Restricted',
    note: 'WFH era. Meeting only on birthdays.',
    emoji: '🎂'
  },
  {
    year: '2024',
    title: 'Noida Chapter',
    subtitle: 'Followed her',
    note: 'Office opened. She moved. He followed.',
    emoji: '🏙️'
  },
  {
    year: 'Late 2024',
    title: 'Gurgaon',
    subtitle: 'New job',
    note: 'Another city, another move. Together through it all.',
    emoji: '🌆'
  },
  {
    year: 'Soon',
    title: 'Forever',
    subtitle: 'The next chapter',
    note: 'Waiting for the day that makes it official.',
    emoji: '💍'
  }
]

const cardSides = [
  'left', 'right', 'left', 'right', 'left', 'right', 'left',
  'left',  // ← Event 8 (Noida) - changed to 'left' so line goes RIGHT
  'right', 'right'
]
export default function TimelinePage() {
  return (
    <main className="timeline-page">
      <header className="timeline-header">
        <h1 className="timeline-title">Lov & PK's Journey</h1>
        <p className="timeline-sub">
          From a computer lab to forever - through cities, distance, and a pandemic.
        </p>
      </header>

      <section className="timeline-s-container">
        <svg
          className="timeline-s-svg"
          viewBox="0 0 1000 1400"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            id="timelineSPath"
            d="
              M 100 80
              C 300 80, 500 80, 700 80
              C 850 80, 900 150, 850 220
              C 800 280, 650 280, 550 280
              C 400 280, 250 320, 200 400
              C 150 480, 200 560, 350 600
              C 500 640, 700 640, 800 700
              C 900 760, 900 840, 800 900
              C 700 960, 500 960, 350 1000
              C 200 1040, 150 1120, 250 1180
              C 350 1240, 550 1260, 750 1280
            "
          />
          <circle cx="700" cy="80" r="10" className="timeline-s-dot" />
          <circle cx="550" cy="280" r="10" className="timeline-s-dot" />
          <circle cx="200" cy="400" r="10" className="timeline-s-dot" />
          <circle cx="350" cy="600" r="10" className="timeline-s-dot" />
          <circle cx="800" cy="700" r="10" className="timeline-s-dot" />
          <circle cx="800" cy="900" r="10" className="timeline-s-dot" />
          <circle cx="350" cy="1000" r="10" className="timeline-s-dot" />
          <circle cx="250" cy="1180" r="10" className="timeline-s-dot" />
          <circle cx="750" cy="1280" r="10" className="timeline-s-dot" />
        </svg>

        <div className="timeline-s-couple">
          <div className="couple-stage stage-1">
            <span className="couple-emoji">👨‍🎓👩‍🎓</span>
            <span className="couple-label">College</span>
          </div>
          <div className="couple-stage stage-2">
            <span className="couple-emoji">💬❤️</span>
            <span className="couple-label">Texting</span>
          </div>
          <div className="couple-stage stage-3">
            <span className="couple-emoji">🚗💔</span>
            <span className="couple-label">Distance</span>
          </div>
          <div className="couple-stage stage-4">
            <span className="couple-emoji">💑🏢</span>
            <span className="couple-label">Mohali</span>
          </div>
          <div className="couple-stage stage-5">
            <span className="couple-emoji">😷💔</span>
            <span className="couple-label">COVID</span>
          </div>
          <div className="couple-stage stage-6">
            <span className="couple-emoji">🏠❤️</span>
            <span className="couple-label">Back</span>
          </div>
          <div className="couple-stage stage-7">
            <span className="couple-emoji">🎂💕</span>
            <span className="couple-label">Waiting</span>
          </div>
          <div className="couple-stage stage-8">
            <span className="couple-emoji">🏙️💑</span>
            <span className="couple-label">Noida</span>
          </div>
          <div className="couple-stage stage-9">
            <span className="couple-emoji">🌆✨</span>
            <span className="couple-label">Gurgaon</span>
          </div>
          <div className="couple-stage stage-10">
            <span className="couple-emoji">💍👰</span>
            <span className="couple-label">Forever</span>
          </div>
        </div>

        <div className="timeline-s-events">
          {EVENTS.map((event, index) => (
            <article
              key={event.year + index}
              className={`timeline-s-event event-${index + 1} ${cardSides[index]}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="timeline-s-card">
                <div className="timeline-emoji">{event.emoji}</div>
                <div className="timeline-year">{event.year}</div>
                <h2 className="timeline-card-title">{event.title}</h2>
                <p className="timeline-card-subtitle">{event.subtitle}</p>
                <p className="timeline-card-note">{event.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}