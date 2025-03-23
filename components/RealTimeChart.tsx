"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

type DataPoint = {
  time: string
  mood: number
  stress: number
  energy: number
}

export default function RealTimeChart() {
  const [data, setData] = useState<DataPoint[]>([])

  useEffect(() => {
    // Initial data
    const initialData = Array.from({ length: 10 }, (_, i) => ({
      time: new Date(Date.now() - (9 - i) * 1000 * 60).toLocaleTimeString(),
      mood: Math.random() * 100,
      stress: Math.random() * 100,
      energy: Math.random() * 100,
    }))
    setData(initialData)

    // Update data every 5 seconds
    const interval = setInterval(() => {
      setData((currentData) => {
        const newData = [
          ...currentData.slice(1),
          {
            time: new Date().toLocaleTimeString(),
            mood: Math.random() * 100,
            stress: Math.random() * 100,
            energy: Math.random() * 100,
          },
        ]
        return newData
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="w-full bg-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Real-time Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="time" stroke="#ffffff60" />
              <YAxis stroke="#ffffff60" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  border: "1px solid #ffffff20",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Line type="monotone" dataKey="mood" stroke="#06b6d4" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="energy" stroke="#10b981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

