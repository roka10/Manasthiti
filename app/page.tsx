"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Quote from "@/components/Quote"
import MentalHealthInfo from "@/components/MentalHealthInfo"
import Dashboard from "@/components/Dashboard"
import Footer from "@/components/Footer"
import LoadingSpinner from "@/components/LoadingSpinner"
import ThreeDBackground from "@/components/ThreeDBackground"
import { motion } from "framer-motion"

export default function Home() {
  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 relative">
      <ThreeDBackground />
      {showLoading && <LoadingSpinner />}
      <main className="container mx-auto px-4 py-8 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl font-bold text-center text-white mb-8 animate-fade-in-down">Welcome to MANN</h1>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <Quote />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8 mb-16"
        >
          <Link href="/login">
            <Button className="bg-gradient-to-r from-[#06b6d4] to-[#10b981] text-white hover:opacity-90 transition-all duration-300 transform hover:scale-105 text-lg px-8 py-3">
              Get Started
            </Button>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <MentalHealthInfo />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <Dashboard />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center space-x-4"
        >
          <Link href="/games">
            <Button className="bg-gradient-to-r from-[#06b6d4] to-[#10b981] text-white hover:opacity-90 transition-all duration-300 transform hover:scale-105">
              Explore Mental Peace Games
            </Button>
          </Link>
          <Button className="bg-gradient-to-r from-[#06b6d4] to-[#10b981] text-white hover:opacity-90 transition-all duration-300 transform hover:scale-105">
            Download Report
          </Button>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}

