"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Flower, TreesIcon as Tree, Cloud, Sun } from "lucide-react"

const items = [
  { name: "Flower", icon: Flower },
  { name: "Tree", icon: Tree },
  { name: "Cloud", icon: Cloud },
  { name: "Sun", icon: Sun },
]

export default function ZenGarden() {
  const [garden, setGarden] = useState<{ x: number; y: number; item: string }[]>([])
  const [selectedItem, setSelectedItem] = useState("Flower")
  
  const addItem = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setGarden([...garden, { x, y, item: selectedItem }])
  }
  
  const clearGarden = () => {
    setGarden([])
  }
  
  const renderIcon = (iconName: string) => {
    const item = items.find(i => i.name === iconName)
    if (!item) return null
    
    const IconComponent = item.icon
    return <IconComponent className="w-5 h-5 text-gray-800" />
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-center space-x-4 mb-4">
        {items.map((item) => {
          const IconComponent = item.icon
          return (
            <Button
              key={item.name}
              onClick={() => setSelectedItem(item.name)}
              variant={selectedItem === item.name ? "default" : "outline"}
              className="bg-white/10 hover:bg-white/20"
            >
              <IconComponent className="mr-2 h-4 w-4" />
              {item.name}
            </Button>
          )
        })}
      </div>
      <div
        className="w-full h-[500px] bg-gradient-to-b from-blue-200 to-green-200 rounded-lg relative overflow-hidden cursor-pointer"
        onClick={addItem}
      >
        {garden.map((item, index) => (
          <motion.div
            key={index}
            className="absolute"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            style={{ left: item.x - 10, top: item.y - 10 }}
          >
            {renderIcon(item.item)}
          </motion.div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Button onClick={clearGarden} variant="outline" className="bg-white/10 hover:bg-white/20">
          Clear Garden
        </Button>
      </div>
    </div>
  )
}

