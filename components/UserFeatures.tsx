import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil, Smile, Headphones, MessageCircle } from "lucide-react"

export default function UserFeatures() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Features</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="flex items-center space-x-2">
            <Pencil className="w-4 h-4" />
            <span>Journal</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Smile className="w-4 h-4" />
            <span>Mood Track</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Headphones className="w-4 h-4" />
            <span>Relax</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <MessageCircle className="w-4 h-4" />
            <span>Chat</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

