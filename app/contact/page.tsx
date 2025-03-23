import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import BackButton from "@/components/BackButton"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <BackButton />
      <h1 className="text-3xl font-bold text-center text-white mb-8 animate-fade-in-down">Contact Us</h1>
      <Card className="max-w-md mx-auto bg-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Get in Touch</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Input placeholder="Your Name" className="bg-white/10 text-white placeholder-gray-400" />
            </div>
            <div>
              <Input type="email" placeholder="Your Email" className="bg-white/10 text-white placeholder-gray-400" />
            </div>
            <div>
              <Textarea placeholder="Your Message" rows={4} className="bg-white/10 text-white placeholder-gray-400" />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-[#06b6d4] to-[#10b981]">
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

