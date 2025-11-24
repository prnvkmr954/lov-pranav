// components/RomanticParticles.tsx
'use client'
import { useEffect, useRef } from 'react'

export default function RomanticParticles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    let scene: any, camera: any, renderer: any, particles: any
    let animationId: number

    const init = async () => {
      const THREE = await import('three')

      scene = new THREE.Scene()
      
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.z = 50

      renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true 
      })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor(0x000000, 0)
      containerRef.current?.appendChild(renderer.domElement)

      // Create particle system with more spread
      const particleCount = 150
      const positions = new Float32Array(particleCount * 3)
      const colors = new Float32Array(particleCount * 3)
      const sizes = new Float32Array(particleCount)
      const velocities: number[][] = []

      // Soft romantic color palette
      const colorPalette = [
        new THREE.Color(0xff4081), // Pink
        new THREE.Color(0xff6090), // Light pink
        new THREE.Color(0xffc0cb), // Soft pink
        new THREE.Color(0xffb3d9), // Lavender pink
        new THREE.Color(0xffd700), // Gold
        new THREE.Color(0xffe4e1)  // Misty rose
      ]

      for (let i = 0; i < particleCount; i++) {
        // Spread particles across entire view
        positions[i * 3] = (Math.random() - 0.5) * 100      // X: -50 to 50
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100  // Y: -50 to 50
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100  // Z: -50 to 50
        
        // Color
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
        colors[i * 3] = color.r
        colors[i * 3 + 1] = color.g
        colors[i * 3 + 2] = color.b
        
        // Varied sizes for depth
        sizes[i] = Math.random() * 3 + 0.5
        
        // Slower, gentler velocities
        velocities.push([
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015
        ])
      }

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

      // Enhanced shader with blur effect
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 }
        },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          varying vec3 vColor;
          varying float vAlpha;
          uniform float time;
          
          void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            
            // Calculate alpha based on Z position (depth fade)
            vAlpha = 1.0 - (abs(mvPosition.z) / 100.0);
            vAlpha = clamp(vAlpha, 0.15, 0.5);
            
            // Pulsing size effect
            float pulse = 1.0 + sin(time * 0.5 + position.x * 0.1) * 0.2;
            gl_PointSize = size * (300.0 / -mvPosition.z) * pulse;
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          varying float vAlpha;
          
          void main() {
            vec2 center = gl_PointCoord - vec2(0.5);
            float dist = length(center);
            
            // Soft edge with blur
            float strength = 1.0 - smoothstep(0.0, 0.5, dist);
            strength = pow(strength, 1.5);
            
            // Additional blur ring
            float outerGlow = 1.0 - smoothstep(0.3, 0.6, dist);
            outerGlow *= 0.3;
            
            vec3 finalColor = vColor * (strength + outerGlow);
            float finalAlpha = (strength + outerGlow) * vAlpha;
            
            gl_FragColor = vec4(finalColor, finalAlpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })

      particles = new THREE.Points(geometry, material)
      scene.add(particles)

      // Mouse interaction
      let mouseX = 0
      let mouseY = 0
      let targetX = 0
      let targetY = 0
      
      const handleMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1
      }
      
      document.addEventListener('mousemove', handleMouseMove)

      // Animation loop
      let time = 0
      const animate = () => {
        animationId = requestAnimationFrame(animate)
        time += 0.01

        // Update particle positions
        const positions = particles.geometry.attributes.position.array
        
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3
          
          // Gentle floating motion
          positions[i3] += velocities[i][0] + Math.sin(time * 0.3 + i) * 0.005
          positions[i3 + 1] += velocities[i][1] + Math.cos(time * 0.3 + i * 0.5) * 0.005
          positions[i3 + 2] += velocities[i][2]
          
          // Wrap around boundaries for continuous effect
          if (positions[i3] > 50) positions[i3] = -50
          if (positions[i3] < -50) positions[i3] = 50
          if (positions[i3 + 1] > 50) positions[i3 + 1] = -50
          if (positions[i3 + 1] < -50) positions[i3 + 1] = 50
          if (positions[i3 + 2] > 50) positions[i3 + 2] = -50
          if (positions[i3 + 2] < -50) positions[i3 + 2] = 50
        }
        
        particles.geometry.attributes.position.needsUpdate = true
        material.uniforms.time.value = time

        // Very gentle rotation
        particles.rotation.y += 0.0002
        particles.rotation.x = Math.sin(time * 0.1) * 0.05
        
        // Smooth camera movement following mouse
        targetX += (mouseX * 2 - targetX) * 0.02
        targetY += (mouseY * 2 - targetY) * 0.02
        
        camera.position.x = targetX
        camera.position.y = targetY
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
        if (containerRef.current && renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement)
        }
        geometry.dispose()
        material.dispose()
        renderer.dispose()
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
        zIndex: 0,
        filter: 'blur(1px)', // Add CSS blur for softer effect
        opacity: 0.7 // Make it more subtle
      }}
    />
  )
}