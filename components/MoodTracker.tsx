"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Smile, Meh, Frown } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const moods = [
  { name: "Happy", icon: Smile, value: 3 },
  { name: "Neutral", icon: Meh, value: 2 },
  { name: "Sad", icon: Frown, value: 1 },
]

export default function MoodTracker() {
  const [moodHistory, setMoodHistory] = useState<{ date: string; mood: number }[]>([])

  useEffect(() => {
    const storedMoodHistory = localStorage.getItem("moodHistory")
    if (storedMoodHistory) {
      setMoodHistory(JSON.parse(storedMoodHistory))
    }
  }, [])

  const addMood = (mood: number) => {
    const newMoodHistory = [...moodHistory, { date: new Date().toLocaleDateString(), mood }]
    setMoodHistory(newMoodHistory)
    localStorage.setItem("moodHistory", JSON.stringify(newMoodHistory))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-white/10 backdrop-blur-sm border-none mb-8">
        <CardHeader>
          <CardTitle className="text-white">How are you feeling today?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center space-x-4">
            {moods.map((mood) => (
              <motion.div key={mood.name} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => addMood(mood.value)}
                  className="w-20 h-20 rounded-full bg-gradient-to-r from-[#06b6d4] to-[#10b981]"
                >
                  <mood.icon className="w-10 h-10" />
                </Button>
                <p className="text-center text-white mt-2">{mood.name}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-sm border-none">
        <CardHeader>
          <CardTitle className="text-white">Mood History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moodHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="date" stroke="#ffffff60" />
                <YAxis domain={[0, 3]} ticks={[1, 2, 3]} stroke="#ffffff60" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    border: "1px solid #ffffff20",
                    borderRadius: "8px",
                  }}
                />
                <Line type="monotone" dataKey="mood" stroke="#06b6d4" strokeWidth={2} dot={{ fill: "#10b981" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

