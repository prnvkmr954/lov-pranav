// components/MapClient.tsx
'use client'
import { useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default function MapClient() {
  useEffect(() => {
    const el = document.getElementById('map')
    if (!el) return

    // Zoom level: increase number to zoom in more (13=zoomed out, 20=zoomed in a lot)
    const map = L.map(el).setView([28.6324, 77.2195], 5)
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map)

const memories = [
  { 
    lat: 31.24, lng: 75.51, 
    title: 'Where Destiny Introduced Us', 
    text:  '(Jalandhar) That first hello in the college lab felt small back then — but it changed everything. Who knew a random moment would become our forever?' ,
    image: '/assets/ihgi.jpg'
  },

  { 
    lat: 30.71, lng: 76.72, 
    title: 'Where Our Dreams Took Flight', 
    text:  '(Mohali) We stepped into the world of work together, clueless and excited — growing, learning, and cheering for each other’s success like partners in every sense.' ,
    image: '/assets/mohali.jpg'
  },

  { 
    lat: 24.588, lng: 73.71, 
    title: 'Our First Flying Adventure', 
    text:  '(Udaipur) Our first flight together — nervous smiles, hand-holding, laughter, and the beautiful surprise of feeling at home in the clouds and at Aurika’s royal comfort.' ,
    image: '/assets/udaipur-3.jpg'
  },

  { 
    lat: 29.393, lng: 79.45, 
    title: 'Just Us, Just Love', 
    text:  '(Nainital) Our first solo escape — quiet hills, slow mornings, deep conversations, long walks, and a love that felt as calm and pure as the lake itself.' ,
     image: '/assets/nainital-1.JPG'
  },

  { 
    lat: 30.118, lng: 78.29, 
    title: 'Our First Adventure Together', 
    text:  '(Rishikesh) Camping under stars, crazy rafting, secret cuddles, wild laughter, and memories that still feel like they’re flowing in the river with us.' ,
    image: '/assets/ganga-maa.jpeg'
  },

  { 
    lat: 31.108, lng: 77.16, 
    title: 'The Hills Witnessed Our Story', 
    text:  '(Shimla) With strangers who became friends, chit-chat, long rides, shared blankets, and moments that whispered — *this is just the beginning.*',
    image: '/assets/shimla.jpg'
  },

  { 
    lat: 32.243, lng: 77.19, 
    title: 'Adventure, Laughter & Us — Again', 
    text:  '(Manali) Snowy peaks, crazy fun, endless romance, and that warm feeling of loving someone so deeply that even the cold mountains couldn’t freeze our spark.',
    image: '/assets/manali-1.jpg'
  },

  { 
    lat: 12.97, lng: 77.58, 
    title: 'Our First Dreamer’s Trip', 
    text:  '(Bengaluru) Google I/O together — learning, exploring, cheering each other’s passions, and realizing that love grows stronger when ambition is shared.', 
    image: '/assets/bengaluru.jpg'  
  },

  { 
    lat: 27.175, lng: 78.042, 
    title: 'Love, Standing Tall', 
    text:  '(Agra) Our first journey to the Taj Mahal — its beauty grand, but your hand in mine… that was the real monument of love for me.' ,
    image: '/assets/tajmahal.jpg'
  },

  { 
    lat: 28.536, lng: 77.38, 
    title: 'A New City, A New Chapter', 
    text:  '(Noida) Goodbye remote life, hello new beginnings! We moved together, survived challenges together, and built a home out of two hearts.' ,
    image: '/assets/delhi.jpg'
  },

  { 
    lat: 28.464, lng: 77.029, 
    title: 'Growing, Moving, Thriving — Together', 
    text:  '(Gurugram) New jobs, new hopes, and yet the same home — you and me. Shifting cities became easy because our love always shifted with us.',
    image: '/assets/gurugram.jpg'
  },
  { 
    lat: 30.314, lng: 78.03, 
    title: 'Our First Air Bnb Getaway', 
    text:  '(Mussorie) In the life of chaos, we tried to skip the rush and went to chilly weather of Dehradun/Mussorie and spent quality time together.',
    image: '/assets/dehradun.jpeg'
  },
]

    // Create custom heart icon - larger and pink filled with blinking animation
    const createHeartIcon = () => {
      return L.divIcon({
        html: `
          <svg width="40" height="40" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" class="blinking-heart" style="filter: drop-shadow(0 4px 8px rgba(219, 39, 119, 0.5));">
            <!-- Heart shape filled with romantic deep pink -->
            <defs>
              <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#ff6b9d;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#ee5a6f;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#c41e3a;stop-opacity:1" />
              </linearGradient>
              <radialGradient id="heartShine">
                <stop offset="0%" style="stop-color:white;stop-opacity:0.5" />
                <stop offset="100%" style="stop-color:white;stop-opacity:0" />
              </radialGradient>
            </defs>
            <path d="M30,55 C15,45 5,35 5,25 C5,15 12,8 18,8 C22,8 26,11 30,15 C34,11 38,8 42,8 C48,8 55,15 55,25 C55,35 45,45 30,55 Z" 
                  fill="url(#heartGradient)" stroke="#a0123a" stroke-width="1.5"/>
            <!-- Romantic shine/highlight -->
            <ellipse cx="22" cy="20" rx="10" ry="12" fill="url(#heartShine)"/>
            <!-- Inner glow -->
            <path d="M30,55 C15,45 5,35 5,25 C5,15 12,8 18,8 C22,8 26,11 30,15 C34,11 38,8 42,8 C48,8 55,15 55,25 C55,35 45,45 30,55 Z" 
                  fill="none" stroke="#ff9cb2" stroke-width="0.5" opacity="0.6"/>
          </svg>
        `,
        iconSize: [60, 60],           // ← ADJUST SIZE HERE (width, height) | Try: [40, 40] (small), [80, 80] (large), [100, 100] (extra large)
        iconAnchor: [30, 55],         // ← ADJUST ANCHOR POINT (center, bottom) | Use half of iconSize width, and full height for bottom
        popupAnchor: [0, -55],        // ← Where popup appears relative to marker
        className: 'custom-heart-marker'
      })
    }

    memories.forEach(m => {
      const marker = L.marker([m.lat, m.lng], { icon: createHeartIcon() })
        .addTo(map)
      .bindPopup(`
              <div class="memory-popup" style="font-family: 'Playfair Display', serif; padding: 0; min-width: 230px;">
                <img src="${m.image}" class="memory-popup-image" />
                <div style="padding: 10px 12px;">
                  <strong style="color: #b1303b; font-size: 1.1rem; display: block; margin-bottom: 6px;">${m.title}</strong>
                  <div style="color: #6f6667; font-family: 'Cormorant Garamond', serif; line-height: 1.6; font-size: 0.95rem;">
                    ${m.text}
                  </div>
                </div>
              </div>
`, {
  maxWidth: 260,
  className: 'custom-popup'
})


      // Show popup on hover (ease in smoothly)
      marker.on('mouseover', function(this: L.Marker) {
        this.openPopup();
      });
      
      // Hide popup on mouse leave (ease out smoothly)
      marker.on('mouseout', function(this: L.Marker) {
        this.closePopup();
      });
    })

    // ⬇️ ADD THIS PART
if (memories.length > 0) {
  const bounds = L.latLngBounds(
    memories.map(m => [m.lat, m.lng] as [number, number])
  )

  map.fitBounds(bounds, {
    padding: [80, 80],   // extra space around markers
    maxZoom: 7           // don’t zoom in too much
  })
}

    return () => {
      map.remove()
    }
  }, [])

  return <div id="map" style={{ height: 600, borderRadius: 20 }} />
}