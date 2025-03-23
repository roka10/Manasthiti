"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { PenLine, Save, Trash2 } from "lucide-react"
import { useAuth } from "@/lib/AuthContext"
import { ScrollArea } from "@/components/ui/scroll-area"

type JournalEntry = {
  id: string
  content: string
  timestamp: string
}

export default function JournalSection() {
  const [entry, setEntry] = useState("")
  const [savedEntries, setSavedEntries] = useState<JournalEntry[]>([])
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      const storedEntries = localStorage.getItem(`journal_entries_${user.id}`)
      if (storedEntries) {
        setSavedEntries(JSON.parse(storedEntries))
      }
    }
  }, [user])

  const handleSave = () => {
    if (entry.trim() && user) {
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        content: entry,
        timestamp: new Date().toISOString(),
      }
      const updatedEntries = [newEntry, ...savedEntries]
      setSavedEntries(updatedEntries)
      localStorage.setItem(`journal_entries_${user.id}`, JSON.stringify(updatedEntries))
      setEntry("")
    }
  }

  const handleDelete = (id: string) => {
    const updatedEntries = savedEntries.filter((entry) => entry.id !== id)
    setSavedEntries(updatedEntries)
    if (user) {
      localStorage.setItem(`journal_entries_${user.id}`, JSON.stringify(updatedEntries))
    }
  }

  return (
    <Card className="h-full flex flex-col bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-gray-800 dark:text-white">
          <PenLine className="w-6 h-6 text-[#06b6d4]" />
          <span>Journal</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <Textarea
          placeholder="Write your thoughts here..."
          className="flex-grow mb-4 resize-none bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        />
        <Button onClick={handleSave} className="self-end bg-[#06b6d4] text-white hover:bg-[#0891b2]">
          <Save className="w-4 h-4 mr-2" />
          Save Entry
        </Button>
        <ScrollArea className="mt-4 flex-grow">
          <div className="space-y-4">
            {savedEntries.map((savedEntry) => (
              <Card key={savedEntry.id} className="bg-gray-100 dark:bg-gray-700">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-800 dark:text-white">{savedEntry.content}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        {new Date(savedEntry.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(savedEntry.id)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

