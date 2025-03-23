"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

const quotes = [
  "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela",
  "Mental health is not a destination, but a process. It's about how you drive, not where you're going. - Noam Shpancer",
  "You don't have to control your thoughts. You just have to stop letting them control you. - Dan Millman",
  "There is hope, even when your brain tells you there isn't. - John Green",
]

export default function Quote() {
  const [quote, setQuote] = useState("")

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)])
  }, [])

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-md">
      <CardContent className="p-6">
        <p className="text-lg text-center text-gray-800 dark:text-white italic animate-fade-in transition-opacity duration-1000 ease-in-out">
          "{quote}"
        </p>
      </CardContent>
    </Card>
  )
}

