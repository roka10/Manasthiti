"use client"

import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ThumbsUp, Wind, Bot, NotebookIcon as Lotus, Activity, Brain, Gamepad } from "lucide-react"
import { motion } from "framer-motion"
import RealTimeChart from "./RealTimeChart"

const features = [
  { name: "Mood Track", icon: ThumbsUp, path: "/mood-track", color: "from-cyan-500 to-blue-500" },
  { name: "Relax", icon: Wind, path: "/relax", color: "from-purple-500 to-pink-500" },
  { name: "AI Voice Chat", icon: Bot, path: "/ai-chat", color: "from-green-500 to-emerald-500" },
  { name: "Meditation", icon: Lotus, path: "/meditation", color: "from-orange-500 to-red-500" },
  { name: "Games", icon: Gamepad, path: "/games", color: "from-yellow-500 to-amber-500" },
]

const stats = [
  { label: "Mood Score", value: "85%", icon: ThumbsUp, color: "text-cyan-500" },
  { label: "Stress Level", value: "Low", icon: Activity, color: "text-green-500" },
  { label: "Focus", value: "High", icon: Brain, color: "text-purple-500" },
]

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white/10 backdrop-blur-sm border-none">
              <CardContent className="flex items-center p-6">
                <stat.icon className={`w-8 h-8 ${stat.color} mr-4`} />
                <div>
                  <p className="text-sm text-gray-200">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={feature.path}>
              <Card className="h-full bg-white/10 backdrop-blur-sm border-none hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{feature.name}</h3>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Real-Time Chart */}
      <div className="grid grid-cols-1 gap-8">
        <RealTimeChart />
      </div>
    </div>
  )
}

