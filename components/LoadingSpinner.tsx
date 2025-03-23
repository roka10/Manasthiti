"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

interface LoadingSpinnerProps {
  message?: string
}

export default function LoadingSpinner({ message = "Just Chill..." }: LoadingSpinnerProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 1.5) // Reduced to 1.5 seconds

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
      <Loader2 className="w-12 h-12 text-[#06b6d4] animate-spin mb-4" />
      <p className="text-white text-lg">{message}</p>
    </div>
  )
}

