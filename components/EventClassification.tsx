import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function EventClassification() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI-Driven Event Classification</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Current State:</span>
            <Badge variant="outline" className="bg-green-100 text-green-800">
              Normal Activity
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span>Last Stress Event:</span>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Stress Level:</span>
            <span className="font-semibold text-yellow-600">Moderate</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

