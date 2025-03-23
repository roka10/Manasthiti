"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const emojis = ["🌞", "🌙", "🌍", "🌈", "🌺", "🍀", "🦋", "🐬"]

type CardType = {
  id: number
  emoji: string
  isFlipped: boolean
  isMatched: boolean
}

export default function MemoryMatch() {
  const [cards, setCards] = useState<CardType[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameWon, setGameWon] = useState(false)

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const shuffledCards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }))
    setCards(shuffledCards)
    setFlippedCards([])
    setMoves(0)
    setGameWon(false)
  }

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) return

    const newCards = [...cards]
    newCards[id].isFlipped = true
    setCards(newCards)

    const newFlippedCards = [...flippedCards, id]
    setFlippedCards(newFlippedCards)

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1)
      checkForMatch(newFlippedCards)
    }
  }

  const checkForMatch = (flippedCardIds: number[]) => {
    const [firstId, secondId] = flippedCardIds
    if (cards[firstId].emoji === cards[secondId].emoji) {
      const newCards = [...cards]
      newCards[firstId].isMatched = true
      newCards[secondId].isMatched = true
      setCards(newCards)
      setFlippedCards([])

      if (newCards.every((card) => card.isMatched)) {
        setGameWon(true)
      }
    } else {
      setTimeout(() => {
        const newCards = [...cards]
        newCards[firstId].isFlipped = false
        newCards[secondId].isFlipped = false
        setCards(newCards)
        setFlippedCards([])
      }, 1000)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            initial={{ rotateY: 0 }}
            animate={{ rotateY: card.isFlipped ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              className={`h-24 flex items-center justify-center cursor-pointer ${
                card.isMatched ? "bg-green-500/20" : "bg-white/10"
              }`}
              onClick={() => handleCardClick(card.id)}
            >
              <CardContent className="p-0">
                {card.isFlipped || card.isMatched ? (
                  <span className="text-4xl">{card.emoji}</span>
                ) : (
                  <span className="text-4xl">❓</span>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="text-center">
        <p className="text-white mb-4">Moves: {moves}</p>
        {gameWon && <p className="text-green-500 text-2xl mb-4">Congratulations! You won!</p>}
        <Button onClick={initializeGame} className="bg-gradient-to-r from-[#06b6d4] to-[#10b981]">
          {gameWon ? "Play Again" : "Restart"}
        </Button>
      </div>
    </div>
  )
}

