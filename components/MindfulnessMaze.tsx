"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Heart, Smile, Moon } from "lucide-react"

// Constants for the game
const CANVAS_WIDTH = 400
const CANVAS_HEIGHT = 500
const BALL_SIZE = 25
const PADDLE_WIDTH = 100
const PADDLE_HEIGHT = 15
const BRICK_ROWS = 5
const BRICK_COLS = 8
const BRICK_WIDTH = (CANVAS_WIDTH - 40) / BRICK_COLS
const BRICK_HEIGHT = 25
const BRICK_COLORS = [
  "bg-red-500", "bg-orange-500", "bg-yellow-500", 
  "bg-green-500", "bg-blue-500", "bg-indigo-500", "bg-purple-500"
]

// Affirmations shown when breaking bricks
const affirmations = [
  "Great job! You're doing well!",
  "Keep going! You've got this!",
  "That's the way! Feel the stress melt away!",
  "Excellent! Let your worries bounce away!",
  "Perfect! Take a deep breath!",
  "Awesome! Feel the tension release!",
  "Amazing! Each break is a stress reliever!",
  "Wonderful! You're in control!",
]

export default function MindfulnessMaze() {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [message, setMessage] = useState("Welcome to the Stress Bouncer! Click Start to begin.")
  const [showAffirmation, setShowAffirmation] = useState(false)
  const [currentAffirmation, setCurrentAffirmation] = useState("")
  const [breathMode, setBreathMode] = useState(false)
  const [paused, setPaused] = useState(false)
  const [level, setLevel] = useState(1)
  const [keyboard, setKeyboard] = useState(false)
  const [ballPosition, setBallPosition] = useState({ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 50 })
  const [paddlePosition, setPaddlePosition] = useState({ x: CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2 })
  
  // Game state refs
  const ballRef = useRef({ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 50 })
  const ballSpeedRef = useRef({ x: 3, y: -3 })
  const paddleRef = useRef({ x: CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2 })
  const bricksRef = useRef([])
  const lastFrameTimeRef = useRef(0)
  const requestRef = useRef()
  const canvasRef = useRef()
  const keysRef = useRef({ left: false, right: false })
  
  // Initialize bricks
  const initializeBricks = () => {
    const newBricks = []
    for (let r = 0; r < BRICK_ROWS; r++) {
      for (let c = 0; c < BRICK_COLS; c++) {
        newBricks.push({
          x: c * BRICK_WIDTH + 20,
          y: r * BRICK_HEIGHT + 50,
          status: 1,
          color: BRICK_COLORS[r % BRICK_COLORS.length]
        })
      }
    }
    bricksRef.current = newBricks
  }
  
  // Initialize game
  useEffect(() => {
    initializeBricks()
    
    // Handle mouse movement for paddle
    const handleMouseMove = (e) => {
      if (!gameStarted || paused || keyboard) return
      
      const canvas = canvasRef.current
      if (!canvas) return
      
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      
      paddleRef.current.x = mouseX - PADDLE_WIDTH / 2
      
      // Keep paddle within canvas bounds
      if (paddleRef.current.x < 0) paddleRef.current.x = 0
      if (paddleRef.current.x > CANVAS_WIDTH - PADDLE_WIDTH) {
        paddleRef.current.x = CANVAS_WIDTH - PADDLE_WIDTH
      }
      
      setPaddlePosition({ x: paddleRef.current.x })
    }
    
    // Handle keyboard events
    const handleKeyDown = (e) => {
      if (!gameStarted || paused) return
      
      if (e.key === 'ArrowLeft') {
        keysRef.current.left = true
        keysRef.current.right = false
        setKeyboard(true)
      } 
      else if (e.key === 'ArrowRight') {
        keysRef.current.right = true
        keysRef.current.left = false
        setKeyboard(true)
      }
      else if (e.key === ' ') {
        if (gameOver) {
          startGame()
        } else {
          pauseGame()
        }
      }
    }
    
    const handleKeyUp = (e) => {
      if (e.key === 'ArrowLeft') {
        keysRef.current.left = false
      } 
      else if (e.key === 'ArrowRight') {
        keysRef.current.right = false
      }
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [gameStarted, paused, keyboard])
  
  // Handle keyboard controls
  useEffect(() => {
    if (!gameStarted || paused || !keyboard) return
    
    const handleKeyboardControls = () => {
      if (keysRef.current.left) {
        paddleRef.current.x -= 7
        if (paddleRef.current.x < 0) paddleRef.current.x = 0
      }
      if (keysRef.current.right) {
        paddleRef.current.x += 7
        if (paddleRef.current.x > CANVAS_WIDTH - PADDLE_WIDTH) {
          paddleRef.current.x = CANVAS_WIDTH - PADDLE_WIDTH
        }
      }
      
      setPaddlePosition({ x: paddleRef.current.x })
      requestAnimationFrame(handleKeyboardControls)
    }
    
    const animationId = requestAnimationFrame(handleKeyboardControls)
    return () => cancelAnimationFrame(animationId)
  }, [gameStarted, paused, keyboard])
  
  // Optimized game loop with delta time for smooth animation
  useEffect(() => {
    if (!gameStarted || paused) return
    
    const updateGame = (timestamp) => {
      if (gameOver || !gameStarted || paused) return
      
      // Calculate delta time for smooth movement regardless of frame rate
      const deltaTime = timestamp - (lastFrameTimeRef.current || timestamp)
      lastFrameTimeRef.current = timestamp
      const timeMultiplier = deltaTime / (1000 / 60) // 60 FPS as baseline
      
      const ball = ballRef.current
      const ballSpeed = ballSpeedRef.current
      const paddle = paddleRef.current
      
      // Update ball position with delta time scaling for consistent speed
      ball.x += ballSpeed.x * timeMultiplier
      ball.y += ballSpeed.y * timeMultiplier
      
      // Wall collision detection
      if (ball.x + BALL_SIZE > CANVAS_WIDTH || ball.x < 0) {
        ballSpeed.x = -ballSpeed.x
        // Adjust position to prevent getting stuck in wall
        if (ball.x < 0) ball.x = 0
        if (ball.x + BALL_SIZE > CANVAS_WIDTH) ball.x = CANVAS_WIDTH - BALL_SIZE
      }
      
      if (ball.y < 0) {
        ballSpeed.y = -ballSpeed.y
        ball.y = 0 // Prevent sticking to top
      }
      
      // Paddle collision detection with improved physics
      if (
        ball.y + BALL_SIZE > CANVAS_HEIGHT - PADDLE_HEIGHT &&
        ball.y < CANVAS_HEIGHT &&
        ball.x + BALL_SIZE > paddle.x &&
        ball.x < paddle.x + PADDLE_WIDTH
      ) {
        // Change ball direction based on where it hits the paddle
        const hitPosition = (ball.x + BALL_SIZE/2 - paddle.x) / PADDLE_WIDTH
        
        // Prevent the ball from getting stuck in the paddle
        ball.y = CANVAS_HEIGHT - PADDLE_HEIGHT - BALL_SIZE
        
        // Calculate new angle based on where ball hits paddle (center = straight up, edges = angled)
        const angle = hitPosition * Math.PI - Math.PI/2 // -90° to +90° angle range
        
        // Set new velocity based on angle and current speed
        const speed = Math.sqrt(ballSpeed.x * ballSpeed.x + ballSpeed.y * ballSpeed.y)
        ballSpeed.x = Math.cos(angle) * speed * 1.05 // Slightly increase speed for challenge
        ballSpeed.y = Math.sin(angle) * speed * 1.05
        
        // Ensure y direction is always upward after paddle hit
        if (ballSpeed.y > 0) ballSpeed.y = -ballSpeed.y
      }
      
      // Bottom wall collision - lose life
      if (ball.y + BALL_SIZE > CANVAS_HEIGHT) {
        setLives(prev => {
          if (prev <= 1) {
            setGameOver(true)
            setMessage("Game Over! Click Reset to play again.")
          } else {
            ball.x = CANVAS_WIDTH / 2
            ball.y = CANVAS_HEIGHT - 50
            // Reset with slightly randomized direction for variety
            const angle = (Math.random() * Math.PI/4) - Math.PI/8 - Math.PI/2 // -67.5° to -22.5°
            const speed = 5
            ballSpeed.x = Math.cos(angle) * speed
            ballSpeed.y = Math.sin(angle) * speed
          }
          return prev - 1
        })
      }
      
      // Brick collision with improved detection
      for (let i = 0; i < bricksRef.current.length; i++) {
        const brick = bricksRef.current[i]
        if (brick.status === 1) {
          // Check for ball-brick collision
          const ballRight = ball.x + BALL_SIZE
          const ballBottom = ball.y + BALL_SIZE
          
          if (
            ballRight >= brick.x && 
            ball.x <= brick.x + BRICK_WIDTH &&
            ballBottom >= brick.y && 
            ball.y <= brick.y + BRICK_HEIGHT
          ) {
            // Determine which side of the brick was hit
            const previousBallBottom = ball.y + BALL_SIZE - ballSpeed.y * timeMultiplier
            const previousBallRight = ball.x + BALL_SIZE - ballSpeed.x * timeMultiplier
            const previousBallLeft = ball.x - ballSpeed.x * timeMultiplier
            const previousBallTop = ball.y - ballSpeed.y * timeMultiplier
            
            const fromBottom = previousBallTop <= brick.y + BRICK_HEIGHT
            const fromTop = previousBallBottom >= brick.y
            const fromLeft = previousBallRight <= brick.x
            const fromRight = previousBallLeft >= brick.x + BRICK_WIDTH
            
            // Adjust ball direction based on collision side
            if ((fromTop || fromBottom) && !(fromLeft || fromRight)) {
              ballSpeed.y = -ballSpeed.y
            } else if ((fromLeft || fromRight) && !(fromTop || fromBottom)) {
              ballSpeed.x = -ballSpeed.x
            } else {
              // Corner collision
              ballSpeed.x = -ballSpeed.x
              ballSpeed.y = -ballSpeed.y
            }
            
            // Mark brick as broken
            bricksRef.current[i].status = 0
            
            // Show affirmation
            const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)]
            setCurrentAffirmation(randomAffirmation)
            setShowAffirmation(true)
            setTimeout(() => setShowAffirmation(false), 1500)
            
            // Update score
            setScore(prev => prev + 10)
            
            // Check if all bricks are gone
            const remainingBricks = bricksRef.current.filter(b => b.status === 1)
            if (remainingBricks.length === 0) {
              // Level completed
              setLevel(prev => prev + 1)
              setMessage(`Level ${level} completed! Get ready for the next level.`)
              
              // Reset ball position
              ball.x = CANVAS_WIDTH / 2
              ball.y = CANVAS_HEIGHT - 50
              
              // Increase difficulty with better curve
              const baseSpeed = 3 + (level * 0.5) // Gradually increase base speed
              const maxSpeed = 8 // Cap maximum speed
              const newSpeed = Math.min(baseSpeed, maxSpeed)
              
              // Set with randomized angle for variety
              const angle = (Math.random() * Math.PI/2) - Math.PI/4 - Math.PI/2 // -75° to -15°
              ballSpeed.x = Math.cos(angle) * newSpeed
              ballSpeed.y = Math.sin(angle) * newSpeed
              
              // Initialize new bricks
              initializeBricks()
              
              // Pause briefly between levels
              setPaused(true)
              setTimeout(() => setPaused(false), 2000)
            }
            
            // Only process one brick collision per frame to avoid weird physics
            break
          }
        }
      }
      
      // Update state for React rendering
      setBallPosition({ x: ball.x, y: ball.y })
      
      // Continue animation
      requestRef.current = requestAnimationFrame(updateGame)
    }
    
    requestRef.current = requestAnimationFrame(updateGame)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [gameStarted, gameOver, paused, level])
  
  const startGame = () => {
    if (gameOver) {
      // Reset game
      setScore(0)
      setLives(3)
      setLevel(1)
      ballRef.current = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 50 }
      
      // Randomize initial direction for variety
      const angle = (Math.random() * Math.PI/2) - Math.PI/4 - Math.PI/2 // -75° to -15°
      const speed = 5
      ballSpeedRef.current = { 
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed  
      }
      
      paddleRef.current = { x: CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2 }
      setBallPosition({ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 50 })
      setPaddlePosition({ x: CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2 })
      initializeBricks()
      setGameOver(false)
    }
    
    setGameStarted(true)
    setMessage("Bounce away your stress! Break the blocks!")
  }
  
  const pauseGame = () => {
    setPaused(!paused)
    setMessage(paused ? "Game resumed! Continue bouncing away stress!" : "Game paused. Take a deep breath.")
  }
  
  const resetGame = () => {
    setGameStarted(false)
    setGameOver(false)
    setScore(0)
    setLives(3)
    setLevel(1)
    ballRef.current = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 50 }
    ballSpeedRef.current = { x: 3, y: -3 }
    paddleRef.current = { x: CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2 }
    setBallPosition({ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 50 })
    setPaddlePosition({ x: CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2 })
    initializeBricks()
    setMessage("Welcome to the Stress Bouncer! Click Start to begin.")
  }
  
  const startBreathMode = () => {
    setPaused(true)
    setBreathMode(true)
    setMessage("Take a deep breath in... and out...")
  }
  
  const stopBreathMode = () => {
    setBreathMode(false)
    setPaused(false)
    setMessage("Feel refreshed? Keep playing!")
  }
  
  // Render game
  const renderGame = () => {
    return (
      <div className="relative" ref={canvasRef} style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}>
        {/* Game area */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg overflow-hidden border border-gray-700">
          {/* Ball */}
          <motion.div
            className="absolute bg-cyan-400 rounded-full shadow-lg shadow-cyan-800/50"
            style={{
              width: BALL_SIZE,
              height: BALL_SIZE,
            }}
            animate={{
              x: ballPosition.x,
              y: ballPosition.y,
            }}
            transition={{ type: "tween", duration: 0 }}
          />
          
          {/* Paddle */}
          <motion.div
            className="absolute bg-purple-500 rounded-lg shadow-md shadow-purple-700/50"
            style={{
              width: PADDLE_WIDTH,
              height: PADDLE_HEIGHT,
              y: CANVAS_HEIGHT - PADDLE_HEIGHT,
            }}
            animate={{
              x: paddlePosition.x,
            }}
            transition={{ type: "tween", duration: 0 }}
          />
          
          {/* Bricks */}
          {bricksRef.current.map((brick, index) => (
            brick.status === 1 && (
              <motion.div
                key={index}
                className={`absolute rounded-sm shadow-sm ${brick.color} opacity-80`}
                style={{
                  width: BRICK_WIDTH - 4,
                  height: BRICK_HEIGHT - 4,
                  left: brick.x,
                  top: brick.y,
                }}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 0.8 }}
                exit={{ opacity: 0, scale: 1.5 }}
              />
            )
          ))}
          
          {/* Affirmation popup */}
          {showAffirmation && (
            <motion.div
              className="absolute top-1/3 left-1/2 transform -translate-x-1/2 bg-gray-800 px-4 py-2 rounded-lg shadow-lg border border-purple-500 text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <p className="text-purple-300 font-medium">{currentAffirmation}</p>
            </motion.div>
          )}
          
          {/* Breathing exercise overlay */}
          {breathMode && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
              <motion.div
                className="bg-gray-800 rounded-full w-32 h-32 flex items-center justify-center shadow-lg border-2 border-purple-400"
                animate={{
                  scale: [1, 1.5, 1.5, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  times: [0, 0.25, 0.75, 1],
                }}
              >
                <p className="text-purple-200 text-center text-sm font-medium">
                  {breathMode ? "Breathe with me" : ""}
                </p>
              </motion.div>
            </div>
          )}
          
          {/* Game over or start screen */}
          {(!gameStarted || gameOver) && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-purple-300 mb-4">
                {gameOver ? "Game Over" : "Stress Bouncer"}
              </h2>
              <p className="text-gray-300 mb-6 max-w-xs text-center">
                {gameOver 
                  ? `Final Score: ${score}. Feel better now?` 
                  : "Bounce away your stress by breaking colorful blocks!"}
              </p>
              <Button onClick={startGame} className="bg-purple-600 hover:bg-purple-700 mb-2">
                {gameOver ? "Play Again" : "Start Game"}
              </Button>
              <p className="text-gray-400 text-xs mt-2">Press SPACE to start/pause</p>
            </div>
          )}
        </div>
      </div>
    )
  }
  
  return (
    <div className="max-w-xl mx-auto p-4 bg-gray-900 rounded-lg shadow-lg text-gray-200">
      <h2 className="text-2xl font-bold text-center mb-4 text-purple-400">Mindfulness Maze: Stress Bouncer</h2>
      
      {/* Game stats */}
      <div className="flex justify-between items-center mb-4 px-4 bg-gray-800 rounded-lg p-2">
        <div className="flex items-center">
          <p className="font-medium text-purple-300">Score: {score}</p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="font-medium text-purple-300">Level: {level}</p>
        </div>
        <div className="flex items-center space-x-1">
          {Array(lives).fill(0).map((_, i) => (
            <Heart key={i} className="w-5 h-5 text-red-400 fill-red-400" />
          ))}
        </div>
      </div>
      
      {/* Game canvas */}
      <div className="flex justify-center mb-4">
        {renderGame()}
      </div>
      
      {/* Controls */}
      <div className="flex justify-center space-x-2 mb-4">
        {gameStarted && !gameOver && (
          <>
            <Button onClick={pauseGame} className="bg-gray-700 hover:bg-gray-600 text-purple-300 border border-purple-500">
              {paused ? "Resume" : "Pause"}
            </Button>
            {paused && !breathMode && (
              <Button onClick={startBreathMode} className="bg-gray-700 hover:bg-gray-600 text-cyan-300 border border-cyan-500">
                Breathing Exercise
              </Button>
            )}
            {breathMode && (
              <Button onClick={stopBreathMode} className="bg-gray-700 hover:bg-gray-600 text-yellow-300 border border-yellow-500">
                Return to Game
              </Button>
            )}
          </>
        )}
        <Button onClick={resetGame} className="bg-gray-700 hover:bg-gray-600 text-gray-300 border border-gray-500">
          Reset
        </Button>
      </div>
      
      {/* Messages */}
      <div className="text-center p-4 bg-gray-800 rounded-lg border border-gray-700">
        <p className="text-purple-300 font-medium">{message}</p>
        <p className="text-sm text-gray-400 mt-2">
          Move with mouse or arrow keys. Break blocks to release stress.
        </p>
      </div>
      
      {/* Mental health tips */}
      <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <h3 className="text-lg font-semibold mb-2 text-cyan-400">Stress Relief Tips:</h3>
        <ul className="list-disc pl-5 text-gray-300 text-sm space-y-1">
          <li>Take deep breaths while playing to maximize relaxation</li>
          <li>Focus on the ball's movement as a mindfulness exercise</li>
          <li>Celebrate small wins - every brick broken is stress released</li>
          <li>Notice how your body feels when you succeed or fail</li>
        </ul>
      </div>
      
      {/* Controls help */}
      <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <h3 className="text-lg font-semibold mb-2 text-yellow-400">Controls:</h3>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>🖱️ <span className="text-gray-400">Mouse:</span> Move left/right to control paddle</li>
          <li>⬅️ ➡️ <span className="text-gray-400">Arrow Keys:</span> Move paddle left/right</li>
          <li>⌨️ <span className="text-gray-400">Space:</span> Start game / Pause game</li>
        </ul>
      </div>
    </div>
  )
}

