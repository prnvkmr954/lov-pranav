// components/MapClient.tsx
'use client'
import { useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default function MapClient() {
  useEffect(() => {
    const el = document.getElementById('map')
    if (!el) return

    const map = L.map(el).setView([28.6324, 77.2195], 13)
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map)

    const memories = [
      { lat: 28.6324, lng: 77.2195, title: 'Where we met', text: 'That first hello in the campus lab.' },
      { lat: 28.635, lng: 77.21, title: 'First date', text: 'Chai and long talks.' }
    ]

    // Create custom heart icon
    const createHeartIcon = () => {
      return L.divIcon({
        className: 'heart-marker',
        html: `
          <div class="heart-marker-wrapper">
            <div class="heart-glow"></div>
            <div class="heart-icon">♥</div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
      })
    }

    memories.forEach(m => {
      const marker = L.marker([m.lat, m.lng], { icon: createHeartIcon() })
        .addTo(map)
        .bindPopup(`
          <div class="memory-popup">
            <strong>${m.title}</strong>
            <div class="memory-text">${m.text}</div>
          </div>
        `)
    })

    return () => {
      map.remove()
    }
  }, [])

  return <div id="map" style={{ height: 600, borderRadius: 20 }} />
}