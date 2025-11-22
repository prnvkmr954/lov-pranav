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

    memories.forEach(m => {
      L.marker([m.lat, m.lng]).addTo(map).bindPopup(`<strong>${m.title}</strong><div>${m.text}</div>`)
    })

    return () => {
      map.remove()
    }
  }, [])
  return <div id="map" style={{ height: 520, borderRadius: 12 }} />
}
