// lib/specialDates.ts
export type SpecialDate = {
  id: string                // unique id
  name: string              // label shown in UI
  date: string              // ISO string: YYYY-MM-DD (the day you want to celebrate)
  images: string[]          // public URLs (put images in /public/special/<id>/)
  music?: string            // optional music file in /public/special/<id>/music.mp3
  style?: 'cinematic' | 'soft' | 'grand' | 'minimal'
  showPetals?: boolean
  showFireworks?: boolean
  secretMessages?: string[]
}

export const SPECIAL_DATES: SpecialDate[] = [
  {
    id: 'anniversary',
    name: 'Anniversary',
    date: '2016-12-17', // <-- EDIT: set your anniversary date (YYYY-MM-DD)
    images: [
      '/special/anniversary/1.jpg',
      '/special/anniversary/2.jpg',
      '/special/anniversary/3.jpg',
      '/special/anniversary/4.jpg',
      '/special/anniversary/5.jpg',
      '/special/anniversary/6.jpg',
      '/special/anniversary/7.jpg',
      '/special/anniversary/8.jpg',
      '/special/anniversary/9.jpg',
      '/special/anniversary/10.jpg',
    ],
    music: '/special/anniversary/music.mp3',
    style: 'cinematic',
    showPetals: true,
    showFireworks: true,
    secretMessages: [
  "Another year with you feels like a thousand little joys stitched into one forever; I love you more each day. Happy Anniversary, Lov ❤️",
  "From college lab hellos to cozy mornings — you are my favourite story. Happy anniversary, always. Happy Anniversary, Lov ❤️",
  "You made ordinary days sing. Thank you for the love, the patience, and the small, perfect moments. Happy Anniversary, Lov ❤️",
  "To the one who turned my life into home: every year I fall for you again. Happy anniversary. Happy Anniversary, Lov ❤️",
  "With you, every path became an adventure and every silence became comfort. Cheers to us, today and always. Happy Anniversary, Lov ❤️",
  "Across cities and seasons, our love grew quieter and deeper — and I wouldn't change a thing. Happy anniversary. Happy Anniversary, Lov ❤️",
  "You are my kindest habit and my boldest dream. Thank you for choosing me again and again. Happy Anniversary, Lov ❤️",
  "I remember that first hello like a spark — now it’s a steady, warm flame. Happy anniversary, my heart. Happy Anniversary, Lov ❤️",
  "If I could, I'd collect every laugh, every trip, every 'we' and place them in a jar for us to open forever. Happy Anniversary, Lov ❤️",
  "There are a thousand little reasons I love you; the best is simply: I love being with you. Happy anniversary. Happy Anniversary, Lov ❤️",
  "Thank you for making me better, braver, and softer. Today I celebrate us — our past and the path ahead. Happy Anniversary, Lov ❤️",
  "To the one who makes ordinary things magical: may our days keep brightening like the sunrise we share. Happy Anniversary, Lov ❤️",
  "Every year with you is a new favourite. Here's to memories we made and the many yet to come. Happy Anniversary, Lov ❤️",
  "From silly songs to late-night talks — every small thing you do is my favourite reason to smile. Happy Anniversary, Lov ❤️",
  "I keep choosing you: through distance, changes, and everything in between. Happy anniversary, my forever. Happy Anniversary, Lov ❤️",
  "We planted seeds of love in that college lab; today they’re a whole garden. Thank you for growing with me. Happy Anniversary, Lov ❤️",
  "You are my calm and my celebration — the hand I want in storms and in sunshine. Happy anniversary. Happy Anniversary, Lov ❤️",
  "Our story is my favourite: imperfect, beautiful, and ours. Here's to turning another page together. Happy Anniversary, Lov ❤️",
  "Forever feels smaller than I need — but until then, I’ll spend every year loving you more. Happy Anniversary, Lov ❤️"
  ]
},
  {
    id: 'her-bday',
    name: "Her Birthday",
    date: '1995-02-15', // <-- EDIT
    images: [
      '/special/her-bday/1.jpg',
      '/special/her-bday/2.jpg'
    ],
    music: '/special/her-bday/music.mp3',
    style: 'soft',
    showPetals: true,
    showFireworks: false,
    secretMessages:['You are my always.']
  },
  {
    id: 'first-trip',
    name: 'First Trip',
    date: '2018-04-15', // <-- EDIT (first trip date)
    images: ['/special/first-trip/1.jpg', '/special/first-trip/2.jpg'],
    style: 'cinematic',
    showPetals: false,
    showFireworks: false,
    secretMessages:['You are my always.']
  },
  {
    id: 'first-flight',
    name: 'First Flight',
    date: '2018-04-15', // <-- EDIT (or same as first-trip)
    images: ['/special/first-flight/1.jpg'],
    style: 'minimal',
    showPetals: false,
    showFireworks: false
  },
  {
    id: 'valentine',
    name: "Valentine's Day",
    date: '2024-02-14', // <-- EDIT (or leave 02-14 to fire every year)
    images: ['/special/valentine/1.jpg'],
    style: 'grand',
    showPetals: true,
    showFireworks: true,
    secretMessages:['You are my always.']
  }
]
