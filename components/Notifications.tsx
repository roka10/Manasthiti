import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, AlertTriangle, Info } from "lucide-react"

const notifications = [
  { id: 1, type: "alert", message: "High stress levels detected. Consider relaxation exercises.", icon: AlertTriangle },
  { id: 2, type: "info", message: "Your weekly mood report is ready.", icon: Info },
  { id: 3, type: "alert", message: "Medication reminder: Take your evening dose.", icon: AlertTriangle },
]

export default function Notifications() {
  return (
    <Card className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-white">
          <Bell className="w-6 h-6 text-[#06b6d4]" />
          <span>Notifications</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li key={notification.id} className="flex items-start space-x-2 p-2 rounded-md bg-white/5">
              <notification.icon
                className={`w-5 h-5 mt-1 ${notification.type === "alert" ? "text-red-500" : "text-blue-500"}`}
              />
              <p className="text-sm text-gray-200">{notification.message}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

