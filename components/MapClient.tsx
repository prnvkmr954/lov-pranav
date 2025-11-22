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
      { lat: 31.24, lng: 75.51, title: 'Where we met', text: 'That first hello in the college lab.' },
      { lat: 30.71, lng:  76.72, title: 'Where we Started our Career', text: 'Place Where we Both Started Our Career' },
      { lat: 24.588, lng:  73.71, title: 'Our First ICS', text: 'Place Where we Both Started Our Career' },
      { lat: 29.393, lng:  79.45, title: 'Where we Started our Career', text: 'Place Where we Both Started Our Career' },
      { lat: 30.118, lng:  78.29, title: 'Where we Started our Career', text: 'Place Where we Both Started Our Career' }
    ]

    // Create custom heart icon - larger and pink filled with blinking animation
    const createHeartIcon = () => {
      return L.divIcon({
        html: `
          <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" class="blinking-heart" style="filter: drop-shadow(0 4px 8px rgba(219, 39, 119, 0.5));">
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
          <div class="memory-popup" style="font-family: 'Playfair Display', serif; padding: 12px; min-width: 200px;">
            <strong style="color: #b1303b; font-size: 1.1rem; display: block; margin-bottom: 8px;">${m.title}</strong>
            <div style="color: #6f6667; font-family: 'Cormorant Garamond', serif; line-height: 1.6;">${m.text}</div>
          </div>
        `, {
          maxWidth: 250,
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

    return () => {
      map.remove()
    }
  }, [])

  return <div id="map" style={{ height: 600, borderRadius: 20 }} />
}