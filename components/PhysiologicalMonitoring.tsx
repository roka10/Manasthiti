import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, TreesIcon as Lungs, Droplet, Thermometer } from "lucide-react"

export default function PhysiologicalMonitoring() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Real-Time Physiological Monitoring</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Heart className="text-red-500" />
            <span>Heart Rate: 72 bpm</span>
          </div>
          <div className="flex items-center space-x-2">
            <Lungs className="text-blue-500" />
            <span>Breathing: 16 rpm</span>
          </div>
          <div className="flex items-center space-x-2">
            <Droplet className="text-cyan-500" />
            <span>Sweating: Normal</span>
          </div>
          <div className="flex items-center space-x-2">
            <Thermometer className="text-orange-500" />
            <span>Skin Temp: 36.5°C</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

