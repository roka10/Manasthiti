"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import BackButton from "@/components/BackButton"
import { useAuth } from "@/lib/AuthContext"
import LoadingSpinner from "@/components/LoadingSpinner"
import { FaGoogle, FaFacebook } from "react-icons/fa"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showLoading, setShowLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowLoading(true)
    // In a real app, you would verify the credentials with your backend
    const userData = { id: Date.now().toString(), name: email.split("@")[0], email }
    login(userData)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setShowLoading(false)
    router.push("/")
  }

  const handleSocialLogin = async (provider: string) => {
    setShowLoading(true)
    // In a real app, you would implement the social login logic here
    const userData = {
      id: Date.now().toString(),
      name: `${provider} User`,
      email: `${provider.toLowerCase()}@example.com`,
    }
    login(userData)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setShowLoading(false)
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      {showLoading && <LoadingSpinner message="Logging in..." />}
      <BackButton />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white animate-fade-in-down">Welcome back</CardTitle>
            <CardDescription className="text-gray-300 animate-fade-in">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
              <Button type="submit" className="w-full bg-gradient-to-r from-[#06b6d4] to-[#10b981] animate-fade-in">
                Log in
              </Button>
            </form>
            <div className="mt-4 flex flex-col space-y-2">
              <Button
                type="button"
                variant="outline"
                className="w-full bg-white/10 text-white hover:bg-white/20"
                onClick={() => handleSocialLogin("Google")}
              >
                <FaGoogle className="mr-2" /> Login with Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full bg-white/10 text-white hover:bg-white/20"
                onClick={() => handleSocialLogin("Facebook")}
              >
                <FaFacebook className="mr-2" /> Login with Facebook
              </Button>
            </div>
            <p className="text-center text-sm text-gray-300 animate-fade-in mt-4">
              Don't have an account?{" "}
              <Link href="/signup" className="text-[#06b6d4] hover:underline">
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

