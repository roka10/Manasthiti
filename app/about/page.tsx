import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import BackButton from "@/components/BackButton"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <BackButton />
      <h1 className="text-3xl font-bold text-center text-white mb-8 animate-fade-in-down">About Us</h1>
      <Card className="bg-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Our Mission</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">
            At MANN Mental Health, we are dedicated to providing innovative and accessible mental health support. Our
            goal is to empower individuals to take control of their mental well-being through technology-driven
            solutions and personalized care. We believe that everyone deserves access to quality mental health
            resources, and we're committed to breaking down barriers and stigmas surrounding mental health.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

