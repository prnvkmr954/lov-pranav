// components/LoveConstellation.tsx
'use client'
import { useEffect, useRef } from 'react'

export default function LoveConstellation() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    let scene: any, camera: any, renderer: any
    let points: any, lines: any
    let animationId: number

    const init = async () => {
      const THREE = await import('three')

      scene = new THREE.Scene()
      
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.z = 25

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor(0x000000, 0)
      containerRef.current?.appendChild(renderer.domElement)

      // Create particle data
      const particleCount = 80
      const particlePositions = new Float32Array(particleCount * 3)
      const particleData: any[] = []

      for (let i = 0; i < particleCount; i++) {
        const x = (Math.random() - 0.5) * 50
        const y = (Math.random() - 0.5) * 50
        const z = (Math.random() - 0.5) * 30
        
        particlePositions[i * 3] = x
        particlePositions[i * 3 + 1] = y
        particlePositions[i * 3 + 2] = z
        
        particleData.push({
          velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02
          ),
          position: new THREE.Vector3(x, y, z)
        })
      }

      // Points
      const pointsGeometry = new THREE.BufferGeometry()
      pointsGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))

      const pointsMaterial = new THREE.PointsMaterial({
        color: 0xff4081,
        size: 0.5,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
      })

      points = new THREE.Points(pointsGeometry, pointsMaterial)
      scene.add(points)

      // Lines (connections)
      const maxConnections = particleCount * 3
      const linePositions = new Float32Array(maxConnections * 2 * 3)
      const lineColors = new Float32Array(maxConnections * 2 * 3)

      const linesGeometry = new THREE.BufferGeometry()
      linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
      linesGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3))

      const linesMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending
      })

      lines = new THREE.LineSegments(linesGeometry, linesMaterial)
      scene.add(lines)

      // Mouse interaction
      let mouseX = 0
      let mouseY = 0
      
      const handleMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1
      }
      
      document.addEventListener('mousemove', handleMouseMove)

      // Animation loop
      const animate = () => {
        animationId = requestAnimationFrame(animate)

        const positions = points.geometry.attributes.position.array
        const linePositions = lines.geometry.attributes.position.array
        const lineColors = lines.geometry.attributes.color.array

        // Update particle positions
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3
          
          particleData[i].position.add(particleData[i].velocity)
          
          // Boundary check
          if (particleData[i].position.x > 25 || particleData[i].position.x < -25) {
            particleData[i].velocity.x *= -1
          }
          if (particleData[i].position.y > 25 || particleData[i].position.y < -25) {
            particleData[i].velocity.y *= -1
          }
          if (particleData[i].position.z > 15 || particleData[i].position.z < -15) {
            particleData[i].velocity.z *= -1
          }
          
          positions[i3] = particleData[i].position.x
          positions[i3 + 1] = particleData[i].position.y
          positions[i3 + 2] = particleData[i].position.z
        }

        // Update connections
        let lineIndex = 0
        const maxDistance = 8

        for (let i = 0; i < particleCount; i++) {
          for (let j = i + 1; j < particleCount; j++) {
            const dist = particleData[i].position.distanceTo(particleData[j].position)
            
            if (dist < maxDistance) {
              const i6 = lineIndex * 6
              
              linePositions[i6] = particleData[i].position.x
              linePositions[i6 + 1] = particleData[i].position.y
              linePositions[i6 + 2] = particleData[i].position.z
              
              linePositions[i6 + 3] = particleData[j].position.x
              linePositions[i6 + 4] = particleData[j].position.y
              linePositions[i6 + 5] = particleData[j].position.z
              
              // Color based on distance (closer = brighter)
              const alpha = 1.0 - (dist / maxDistance)
              const color = new THREE.Color(0xff1744).lerp(new THREE.Color(0xff4081), alpha)
              
              lineColors[i6] = color.r
              lineColors[i6 + 1] = color.g
              lineColors[i6 + 2] = color.b
              
              lineColors[i6 + 3] = color.r
              lineColors[i6 + 4] = color.g
              lineColors[i6 + 5] = color.b
              
              lineIndex++
            }
          }
        }

        // Fill remaining with zeros
        for (let i = lineIndex * 6; i < linePositions.length; i++) {
          linePositions[i] = 0
          lineColors[i] = 0
        }

        points.geometry.attributes.position.needsUpdate = true
        lines.geometry.attributes.position.needsUpdate = true
        lines.geometry.attributes.color.needsUpdate = true

        // Gentle rotation
        points.rotation.y += 0.0003
        lines.rotation.y += 0.0003
        
        // Camera follows mouse subtly
        camera.position.x += (mouseX * 2 - camera.position.x) * 0.03
        camera.position.y += (mouseY * 2 - camera.position.y) * 0.03
        camera.lookAt(scene.position)

        renderer.render(scene, camera)
      }

      animate()

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }
      
      window.addEventListener('resize', handleResize)

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('resize', handleResize)
      }
    }

    init()

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  )
}