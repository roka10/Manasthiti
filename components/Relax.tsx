"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wind, Pause, Play, VolumeX, Volume2 } from "lucide-react"
import { Slider } from "@/components/ui/slider"

const relaxationTechniques = [
  {
    name: "Deep Breathing",
    duration: 120,
    audioSrc:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/white-noise-calm-ambience-tomas-herudek-1-01-15-ZJ2m7CccxxkkChdM1e7KUcit9UZsvC.mp3",
  },
  { name: "Progressive Muscle Relaxation", duration: 180, audioSrc: "/audio/muscle-relaxation.mp3" },
  { name: "Guided Imagery", duration: 120, type: "widget" },
]

export default function Relax() {
  const [activeSession, setActiveSession] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const handleSessionToggle = (technique: string) => {
    if (activeSession === technique) {
      setActiveSession(null)
      setIsPlaying(false)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    } else {
      setActiveSession(technique)
      const selectedTechnique = relaxationTechniques.find((t) => t.name === technique)
      if (selectedTechnique && selectedTechnique.audioSrc && audioRef.current) {
        audioRef.current.src = selectedTechnique.audioSrc
        audioRef.current.play()
        setIsPlaying(true)
      } else {
        setIsPlaying(false)
      }
    }
  }

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume[0])
    if (audioRef.current) {
      audioRef.current.volume = newVolume[0]
    }
  }

  const renderContent = () => {
    if (!activeSession) return null

    const selectedTechnique = relaxationTechniques.find((t) => t.name === activeSession)

    if (selectedTechnique?.type === "widget") {
      return (
        <div className="mt-6">
          <iframe
            src="https://widgets.insighttimer.com/track/morning-ritual?created_at=1739687192"
            width="100%"
            height="250"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-xl"
          />
        </div>
      )
    }

    if (selectedTechnique?.audioSrc) {
      return (
        <div className="mt-6 space-y-4">
          <div className="flex justify-center space-x-4">
            <Button onClick={togglePlayPause} variant="outline" className="text-white">
              {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isPlaying ? "Pause" : "Play"}
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <VolumeX className="w-4 h-4 text-white" />
            <Slider value={[volume]} max={1} step={0.01} onValueChange={handleVolumeChange} className="flex-grow" />
            <Volume2 className="w-4 h-4 text-white" />
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <Card className="h-full flex flex-col bg-gradient-to-br from-gray-900 to-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-white">
          <Wind className="w-6 h-6 text-[#06b6d4]" />
          <span>Relax</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="space-y-4">
          {relaxationTechniques.map((technique) => (
            <Button
              key={technique.name}
              variant="outline"
              className={`w-full justify-between bg-white/10 text-white hover:bg-white/20 ${
                activeSession === technique.name ? "bg-[#06b6d4] text-white" : ""
              }`}
              onClick={() => handleSessionToggle(technique.name)}
            >
              <span>{technique.name}</span>
              <span>{Math.floor(technique.duration / 60)} min</span>
            </Button>
          ))}
        </div>
        {renderContent()}
      </CardContent>
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
    </Card>
  )
}

