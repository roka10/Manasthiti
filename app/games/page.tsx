import Games from "@/components/Games"
import BackButton from "@/components/BackButton"

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <BackButton />
      <h1 className="text-3xl font-bold text-center text-white mb-8 animate-fade-in-down">Mental Peace Games</h1>
      <Games />
    </div>
  )
}

