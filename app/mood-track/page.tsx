import MoodTrack from "@/components/MoodTrack"
import BackButton from "@/components/BackButton"

export default function MoodTrackPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <BackButton />
      <h1 className="text-3xl font-bold text-center text-white mb-8">Mood Track</h1>
      <MoodTrack />
    </div>
  )
}

