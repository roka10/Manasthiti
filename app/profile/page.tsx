"use client"

import { useAuth } from "@/lib/AuthContext"
import { useRouter } from "next/navigation"
import PatientProfile from "@/components/PatientProfile"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function ProfilePage() {
  const { user } = useAuth()
  const router = useRouter()

  if (!user) {
    router.push("/login")
    return null
  }

  const handleBackToDashboard = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <Button
        onClick={handleBackToDashboard}
        variant="ghost"
        className="mb-4 text-white hover:text-gray-300 transition-colors duration-300"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>
      <h1 className="text-3xl font-bold text-center text-white mb-8">Patient Profile</h1>
      <PatientProfile />
    </div>
  )
}

