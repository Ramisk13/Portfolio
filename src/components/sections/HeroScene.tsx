import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Icosahedron } from '@react-three/drei'
import * as THREE from 'three'

function generateSpherePoints(count: number, radius: number) {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const r = radius * Math.cbrt(Math.random())
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = r * Math.cos(phi) * 0.6
  }
  return positions
}

function ParticleField() {
  const spinRef = useRef<THREE.Group>(null)
  const wrapperRef = useRef<THREE.Group>(null)
  const positions = useMemo(() => generateSpherePoints(2200, 3.2), [])

  useFrame((state, delta) => {
    if (spinRef.current) {
      spinRef.current.rotation.y += delta * 0.06
      spinRef.current.rotation.x += delta * 0.012
    }
    if (wrapperRef.current) {
      const targetX = state.mouse.y * 0.2
      const targetY = state.mouse.x * 0.25
      wrapperRef.current.rotation.x = THREE.MathUtils.lerp(
        wrapperRef.current.rotation.x,
        targetX,
        0.03
      )
      wrapperRef.current.rotation.y = THREE.MathUtils.lerp(
        wrapperRef.current.rotation.y,
        targetY,
        0.03
      )
    }
  })

  return (
    <group ref={wrapperRef}>
      <group ref={spinRef}>
        <Points positions={positions} stride={3} frustumCulled>
          <PointMaterial
            transparent
            color="#8b5cf6"
            size={0.018}
            sizeAttenuation
            depthWrite={false}
            opacity={0.8}
          />
        </Points>
        <Icosahedron args={[1.6, 1]}>
          <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.12} />
        </Icosahedron>
      </group>
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      className="!absolute inset-0"
    >
      <ParticleField />
    </Canvas>
  )
}
