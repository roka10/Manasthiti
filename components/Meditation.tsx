"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Book, Heart, Leaf, Brain, NotebookIcon as Lotus, Moon } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const meditationOptions = [
  { name: "Learn meditation", icon: Book, description: "Start your meditation journey" },
  { name: "Relieve stress", icon: Heart, description: "Reduce anxiety and stress" },
  { name: "Relax yourself", icon: Leaf, description: "Deep relaxation techniques" },
  { name: "Brain power", icon: Brain, description: "Improve focus and clarity" },
  { name: "Relax meditation", icon: Lotus, description: "Peaceful guided sessions" },
  { name: "Care for yourself", icon: Moon, description: "Self-care meditation" },
]

export default function Meditation() {
  const [activeTab, setActiveTab] = useState("meditate")

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="meditate" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="meditate">Meditate</TabsTrigger>
          <TabsTrigger value="breathe">Breathe</TabsTrigger>
        </TabsList>

        <TabsContent value="meditate">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {meditationOptions.map((option, index) => (
              <motion.div
                key={option.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-sm border-none hover:bg-white/20 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-to-br from-[#06b6d4] to-[#10b981] p-3 rounded-full">
                        <option.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{option.name}</h3>
                        <p className="text-sm text-gray-300">{option.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="breathe">
          <Card className="bg-white/10 backdrop-blur-sm border-none">
            <CardHeader>
              <CardTitle className="text-center text-white">Breathing Exercise</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <p className="text-gray-300 mb-6 text-center">
                Start a guided breathing exercise to help you relax and focus.
              </p>
              <Link href="/meditation/breathing">
                <Button className="bg-gradient-to-r from-[#06b6d4] to-[#10b981] text-white hover:opacity-90 transition-all duration-300">
                  Start Breathing Exercise
                </Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

