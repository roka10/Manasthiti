import AIVoiceChat from "@/components/AIVoiceChat"
import BackButton from "@/components/BackButton"

export default function AIChatPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <BackButton />
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">AI Voice Chat</h1>
      <AIVoiceChat />
    </div>
  )
}

