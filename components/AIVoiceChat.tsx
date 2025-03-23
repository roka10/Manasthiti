"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mic, Send, Bot } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import JournalSection from "./JournalSection"

type Message = {
  role: "user" | "ai"
  content: string
}

export default function AIVoiceChat() {
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<Message[]>([])

  const handleSend = async () => {
    if (message.trim()) {
      const newMessage: Message = { role: "user", content: message }
      setChatHistory([...chatHistory, newMessage])
      setMessage("")

      // Simulate AI response (replace with actual API call in production)
      const aiResponse = await getAIResponse(message)
      setChatHistory((prev) => [...prev, { role: "ai", content: aiResponse }])
    }
  }

  const handleVoiceInput = () => {
    // Implement voice recognition here
    console.log("Voice input activated")
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] gap-4">
      <Card className="flex-grow flex flex-col bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-gray-800 dark:text-white">
            <Bot className="w-6 h-6 text-[#06b6d4]" />
            <span>AI Voice Chat</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
          <ScrollArea className="flex-grow mb-4">
            {chatHistory.map((chat, index) => (
              <div key={index} className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"} mb-2`}>
                <div
                  className={`max-w-[70%] p-2 rounded-lg ${
                    chat.role === "user"
                      ? "bg-[#06b6d4] text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                  }`}
                >
                  {chat.content}
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="flex space-x-2">
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
            <Button
              onClick={handleVoiceInput}
              variant="outline"
              className="bg-white dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <Mic className="w-4 h-4" />
            </Button>
            <Button onClick={handleSend} className="bg-[#06b6d4] text-white hover:bg-[#0891b2]">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="w-1/3">
        <JournalSection />
      </div>
    </div>
  )
}

// Simulated AI response function (replace with actual API call in production)
async function getAIResponse(message: string): Promise<string> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const lowercaseMessage = message.toLowerCase()

  if (lowercaseMessage.includes("mental health")) {
    return "Mental health is essential for overall well-being. Some tips for maintaining good mental health include regular exercise, maintaining a healthy diet, getting enough sleep, practicing mindfulness or meditation, and staying connected with loved ones. If you're struggling, don't hesitate to reach out to a mental health professional."
  } else if (lowercaseMessage.includes("stress relief") || lowercaseMessage.includes("relaxation")) {
    return "Here's a simple stress relief exercise you can try: Close your eyes and take a deep breath in through your nose for 4 seconds, hold it for 7 seconds, then exhale slowly through your mouth for 8 seconds. Repeat this 4-7-8 breathing technique 4 times. This can help calm your mind and reduce stress."
  } else if (lowercaseMessage.includes("exercise") || lowercaseMessage.includes("workout")) {
    return "Regular exercise is great for both physical and mental health. A simple exercise routine could include 30 minutes of brisk walking, 10 minutes of bodyweight exercises like push-ups and squats, and 5 minutes of stretching. Remember to start slowly and gradually increase intensity over time."
  } else {
    return "I'm here to help with questions about mental health and basic health relief exercises. Could you please clarify your question or concern?"
  }
}

