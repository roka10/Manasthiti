"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Smile, Meh, Frown, ThumbsUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const moods = [
  { icon: Frown, label: "Bad", color: "text-red-500", animation: "😔" },
  { icon: Meh, label: "Okay", color: "text-yellow-500", animation: "😐" },
  { icon: Smile, label: "Good", color: "text-green-500", animation: "😊" },
]

export default function MoodTrack() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood)
    // Here you would typically save the mood to your backend
    console.log("Mood selected:", mood)
  }

  return (
    <Card className="h-full flex flex-col bg-gradient-to-br from-gray-900 to-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <ThumbsUp className="w-6 h-6 text-[#06b6d4]" />
          <span>Mood Track</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="flex justify-around mb-8">
          {moods.map((mood) => (
            <Button
              key={mood.label}
              variant="outline"
              className={`flex flex-col items-center p-4 bg-white/10 text-white hover:bg-white/20 ${selectedMood === mood.label ? "ring-2 ring-[#06b6d4]" : ""}`}
              onClick={() => handleMoodSelect(mood.label)}
            >
              <mood.icon className={`w-12 h-12 ${mood.color}`} />
              <span className="mt-2">{mood.label}</span>
            </Button>
          ))}
        </div>
        <AnimatePresence>
          {selectedMood && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-center"
            >
              <span className="text-8xl">{moods.find((m) => m.label === selectedMood)?.animation}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

