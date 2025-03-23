import { Card, CardContent } from "@/components/ui/card"

export default function MentalHealthInfo() {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-md mt-16">
      <CardContent className="p-6">
        <p className="text-center text-gray-800 dark:text-white animate-fade-in transition-opacity duration-1000 ease-in-out">
          Mental health is a crucial part of overall well-being. It affects how we think, feel, and act. Taking care of
          your mental health can improve your mood, reduce anxiety, and help you cope with challenges. Remember, seeking
          help is a sign of strength, not weakness.
        </p>
      </CardContent>
    </Card>
  )
}

