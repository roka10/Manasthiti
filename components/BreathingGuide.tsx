"use client"

import { Canvas } from "@react-three/fiber"
import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import type * as THREE from "three"

function BreathingSphere() {
  const sphereRef = useRef<THREE.Mesh>(null)
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale")
  const [scale, setScale] = useState(1)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    if (sphereRef.current) {
      // Breathing cycle
      const breathCycle = Math.sin(t * 0.5) * 0.5 + 1.5
      sphereRef.current.scale.setScalar(breathCycle)

      // Update phase
      if (t % 12 < 4) {
        setPhase("inhale")
        setScale(breathCycle)
      } else if (t % 12 < 8) {
        setPhase("hold")
      } else {
        setPhase("exhale")
        setScale(breathCycle)
      }
    }
  })

  return (
    <>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#06b6d4" transparent opacity={0.6} roughness={0.2} metalness={0.8} />
      </mesh>
      <Html position={[0, -2, 0]} center>
        <div className="text-white text-xl font-bold bg-black/50 px-4 py-2 rounded-full">{phase.toUpperCase()}</div>
      </Html>
    </>
  )
}

export default function BreathingGuide() {
  return (
    <div className="h-[400px] w-full rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <BreathingSphere />
      </Canvas>
    </div>
  )
}

