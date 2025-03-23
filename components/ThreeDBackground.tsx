"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Sphere, Environment } from "@react-three/drei"
import type * as THREE from "three"

function AnimatedSpheres() {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.001
      group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1
    }
  })

  return (
    <group ref={group}>
      {Array.from({ length: 100 }).map((_, i) => (
        <Sphere
          key={i}
          position={[Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10]}
          scale={0.1}
        >
          <meshStandardMaterial color={`hsl(${Math.random() * 60 + 180}, 70%, 50%)`} transparent opacity={0.6} />
        </Sphere>
      ))}
    </group>
  )
}

export default function ThreeDBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 15] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <AnimatedSpheres />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  )
}

