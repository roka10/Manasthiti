import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function EmergencyAlert() {
  return (
    <Card className="bg-red-50">
      <CardHeader>
        <CardTitle className="text-red-800">Emergency Alert</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-red-700">
          In case of a mental health emergency, press the button below to alert your emergency contacts.
        </p>
        <Button variant="destructive" className="w-full flex items-center justify-center space-x-2">
          <AlertTriangle className="w-4 h-4" />
          <span>Activate Emergency Alert</span>
        </Button>
      </CardContent>
    </Card>
  )
}

