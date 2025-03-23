"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, Environment } from "@react-three/drei"
import type * as THREE from "three"

const breathingStages = ["Inhale", "Hold", "Exhale", "Hold"]

function BreathingSphere() {
  const sphereRef = useRef<THREE.Mesh>(null)
  const [scale, setScale] = useState(1)

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      const t = clock.getElapsedTime()
      const newScale = 1 + Math.sin(t * 0.5) * 0.2
      setScale(newScale)
      sphereRef.current.scale.setScalar(newScale)
    }
  })

  return (
    <Sphere ref={sphereRef} args={[1, 64, 64]}>
      <meshStandardMaterial color="#06b6d4" metalness={0.5} roughness={0.2} />
    </Sphere>
  )
}

export default function BreathingExercise() {
  const [isActive, setIsActive] = useState(false)
  const [currentStage, setCurrentStage] = useState(0)
  const [timer, setTimer] = useState(4)
  const controls = useAnimation()

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            setCurrentStage((prevStage) => (prevStage + 1) % breathingStages.length)
            return 4
          }
          return prevTimer - 1
        })
      }, 1000)

      controls.start({
        scale: currentStage === 0 ? 1.2 : currentStage === 2 ? 0.8 : 1,
        transition: { duration: 4, ease: "easeInOut" },
      })
    }

    return () => clearInterval(interval)
  }, [isActive, currentStage, controls])

  const toggleExercise = () => {
    setIsActive(!isActive)
    if (!isActive) {
      setCurrentStage(0)
      setTimer(4)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-white/10 backdrop-blur-sm border-none">
        <CardContent className="p-8">
          <div className="flex flex-col items-center">
            <div className="w-64 h-64 mb-8">
              <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <BreathingSphere />
                <Environment preset="sunset" />
              </Canvas>
            </div>
            <motion.div
              className="text-4xl font-bold text-white mb-4"
              key={currentStage}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              {breathingStages[currentStage]}
            </motion.div>
            <motion.div
              className="text-6xl font-bold text-[#06b6d4] mb-8"
              key={timer}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {timer}
            </motion.div>
            <Button
              onClick={toggleExercise}
              className="bg-gradient-to-r from-[#06b6d4] to-[#10b981] text-white hover:opacity-90 transition-all duration-300"
            >
              {isActive ? "Stop" : "Start"} Exercise
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

