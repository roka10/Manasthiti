"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Moon, Sun } from "lucide-react"

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true"
    setDarkMode(isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    localStorage.setItem("darkMode", (!darkMode).toString())
    document.documentElement.classList.toggle("dark")
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sun className="w-5 h-5 text-white" />
            <Label htmlFor="dark-mode" className="text-white">
              Dark Mode
            </Label>
            <Moon className="w-5 h-5 text-white" />
          </div>
          <Switch id="dark-mode" checked={darkMode} onCheckedChange={toggleDarkMode} />
        </div>
      </CardContent>
    </Card>
  )
}

