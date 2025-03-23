"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

const games = [
  { name: "Memory Match", path: "/games/memory-match", description: "Test and improve your memory skills" },
  { name: "Zen Garden", path: "/games/zen-garden", description: "Create a peaceful digital garden" },
  { name: "Mood Tracker", path: "/games/mood-tracker", description: "Track and visualize your daily mood" },
  { name: "Mindfulness Maze", path: "/games/mindfulness-maze", description: "Navigate through a relaxing maze" },
]

export default function Games() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {games.map((game, index) => (
        <motion.div
          key={game.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="bg-white/10 backdrop-blur-sm border-none hover:bg-white/20 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl text-white">{game.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300 mb-4">{game.description}</p>
              <Link href={game.path}>
                <Button className="w-full bg-gradient-to-r from-[#06b6d4] to-[#10b981] hover:opacity-90 transition-all duration-300">
                  Play Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

