// components/Hearts3D.tsx
'use client'
import { useEffect, useRef } from 'react'

export default function Hearts3D() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Dynamic imports for Three.js
    let scene: any, camera: any, renderer: any, hearts: any[] = []
    let animationId: number

    const init = async () => {
      const THREE = await import('three')

      // Scene setup
      scene = new THREE.Scene()
      
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )
      camera.position.z = 15

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor(0x000000, 0)
      containerRef.current?.appendChild(renderer.domElement)

      // Create heart shape
      const heartShape = new THREE.Shape()
      heartShape.moveTo(0, 0)
      heartShape.bezierCurveTo(0, -0.3, -0.6, -0.3, -0.6, 0)
      heartShape.bezierCurveTo(-0.6, 0.3, 0, 0.6, 0, 1)
      heartShape.bezierCurveTo(0, 0.6, 0.6, 0.3, 0.6, 0)
      heartShape.bezierCurveTo(0.6, -0.3, 0, -0.3, 0, 0)

      const extrudeSettings = {
        depth: 0.3,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 2,
        bevelSize: 0.1,
        bevelThickness: 0.1
      }

      // Create multiple hearts with different colors and positions
      const colors = [0xff1744, 0xff4081, 0xf50057, 0xff6e9f, 0xff8a9b]
      
      for (let i = 0; i < 15; i++) {
        const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings)
        const material = new THREE.MeshPhongMaterial({
          color: colors[Math.floor(Math.random() * colors.length)],
          transparent: true,
          opacity: 0.7,
          shininess: 100
        })
        
        const heart = new THREE.Mesh(geometry, material)
        
        // Random position
        heart.position.x = (Math.random() - 0.5) * 30
        heart.position.y = (Math.random() - 0.5) * 20
        heart.position.z = (Math.random() - 0.5) * 20
        
        // Random rotation
        heart.rotation.x = Math.random() * Math.PI
        heart.rotation.y = Math.random() * Math.PI
        
        // Random scale
        const scale = 0.5 + Math.random() * 1.5
        heart.scale.set(scale, scale, scale)
        
        // Store animation properties
        heart.userData = {
          speedX: (Math.random() - 0.5) * 0.002,
          speedY: (Math.random() - 0.5) * 0.002,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          floatSpeed: Math.random() * 0.001 + 0.0005,
          floatOffset: Math.random() * Math.PI * 2
        }
        
        scene.add(heart)
        hearts.push(heart)
      }

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
      scene.add(ambientLight)

      const pointLight1 = new THREE.PointLight(0xff1744, 1, 100)
      pointLight1.position.set(10, 10, 10)
      scene.add(pointLight1)

      const pointLight2 = new THREE.PointLight(0xff4081, 0.8, 100)
      pointLight2.position.set(-10, -10, 10)
      scene.add(pointLight2)

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

        // Animate each heart
        hearts.forEach((heart, index) => {
          // Floating motion
          heart.position.y += Math.sin(Date.now() * heart.userData.floatSpeed + heart.userData.floatOffset) * 0.01
          
          // Slow drift
          heart.position.x += heart.userData.speedX
          heart.position.y += heart.userData.speedY
          
          // Rotation
          heart.rotation.y += heart.userData.rotationSpeed
          heart.rotation.z += heart.userData.rotationSpeed * 0.5
          
          // Boundary check - wrap around
          if (heart.position.x > 15) heart.position.x = -15
          if (heart.position.x < -15) heart.position.x = 15
          if (heart.position.y > 10) heart.position.y = -10
          if (heart.position.y < -10) heart.position.y = 10
        })

        // Camera follows mouse slightly
        camera.position.x += (mouseX * 2 - camera.position.x) * 0.05
        camera.position.y += (mouseY * 2 - camera.position.y) * 0.05
        camera.lookAt(scene.position)

        renderer.render(scene, camera)
      }

      animate()

      // Handle window resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }
      
      window.addEventListener('resize', handleResize)

      // Cleanup
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('resize', handleResize)
        cancelAnimationFrame(animationId)
        containerRef.current?.removeChild(renderer.domElement)
        hearts.forEach(heart => {
          heart.geometry.dispose()
          heart.material.dispose()
        })
        renderer.dispose()
      }
    }

    init()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
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