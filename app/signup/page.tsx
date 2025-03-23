"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import BackButton from "@/components/BackButton"
import { useAuth } from "@/lib/AuthContext"
import LoadingSpinner from "@/components/LoadingSpinner"
import { FaGoogle, FaFacebook } from "react-icons/fa"
import { Badge } from "@/components/ui/badge"

const commonComplaints = [
  "Depression",
  "Anxiety",
  "Stress",
  "Insomnia",
  "Mood Swings",
  "Panic Attacks",
  "Bad Mood",
  "Apathy",
  "Anger",
  "Low Energy",
  "Concentration Issues",
]

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [gender, setGender] = useState("")
  const [complaints, setComplaints] = useState<string[]>([])
  const [additionalComplaints, setAdditionalComplaints] = useState("")
  const [showLoading, setShowLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }
    setShowLoading(true)

    // Calculate age from date of birth
    const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear()

    // In a real app, you would send this data to your backend
    const userData = {
      id: Date.now().toString(),
      name,
      email,
      dateOfBirth,
      age,
      gender,
      complaints: [...complaints, ...additionalComplaints.split(",").map((c) => c.trim())].filter(Boolean),
    }
    login(userData)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setShowLoading(false)
    router.push("/")
  }

  const toggleComplaint = (complaint: string) => {
    setComplaints((prev) => (prev.includes(complaint) ? prev.filter((c) => c !== complaint) : [...prev, complaint]))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      {showLoading && <LoadingSpinner message="Creating your account..." />}
      <BackButton />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white animate-fade-in-down">Create an account</CardTitle>
            <CardDescription className="text-gray-300 animate-fade-in">
              Enter your details to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white animate-fade-in">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="bg-white/10 text-white placeholder-gray-400 animate-fade-in"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white animate-fade-in">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="bg-white/10 text-white placeholder-gray-400 animate-fade-in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob" className="text-white animate-fade-in">
                    Date of Birth
                  </Label>
                  <Input
                    id="dob"
                    type="date"
                    className="bg-white/10 text-white animate-fade-in"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-white animate-fade-in">
                    Gender
                  </Label>
                  <Select onValueChange={setGender} required>
                    <SelectTrigger className="bg-white/10 text-white border-gray-600">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white animate-fade-in">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    className="bg-white/10 text-white animate-fade-in"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white animate-fade-in">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    className="bg-white/10 text-white animate-fade-in"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white animate-fade-in">Common Complaints</Label>
                <div className="flex flex-wrap gap-2">
                  {commonComplaints.map((complaint) => (
                    <Badge
                      key={complaint}
                      variant={complaints.includes(complaint) ? "default" : "outline"}
                      className={`cursor-pointer ${
                        complaints.includes(complaint) ? "bg-[#06b6d4] hover:bg-[#0891b2]" : "hover:bg-white/20"
                      }`}
                      onClick={() => toggleComplaint(complaint)}
                    >
                      {complaint}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalComplaints" className="text-white animate-fade-in">
                  Additional Complaints (comma-separated)
                </Label>
                <Textarea
                  id="additionalComplaints"
                  className="bg-white/10 text-white placeholder-gray-400 animate-fade-in"
                  placeholder="Enter any additional complaints, separated by commas"
                  value={additionalComplaints}
                  onChange={(e) => setAdditionalComplaints(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-[#06b6d4] to-[#10b981] animate-fade-in">
                Sign up
              </Button>
            </form>

            <div className="mt-4 flex flex-col space-y-2">
              <Button
                type="button"
                variant="outline"
                className="w-full bg-white/10 text-white hover:bg-white/20"
                onClick={() => {}}
              >
                <FaGoogle className="mr-2" /> Sign up with Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full bg-white/10 text-white hover:bg-white/20"
                onClick={() => {}}
              >
                <FaFacebook className="mr-2" /> Sign up with Facebook
              </Button>
            </div>

            <p className="text-center text-sm text-gray-300 animate-fade-in mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-[#06b6d4] hover:underline">
                Log in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

