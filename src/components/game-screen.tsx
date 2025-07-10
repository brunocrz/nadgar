'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Trophy, Zap, Target } from 'lucide-react'
import { ChatMessage, LeaderboardPlayer } from '@/types/types'
import BackgroundCanvas from '@/components/background-canvas'
import { GameChat } from '@/components/game-chat'

const DEFAULT_LEADERBOARD: LeaderboardPlayer[] = [
  { name: 'ProGamer', score: 2450 },
  { name: 'SpeedKing', score: 1890 },
  { name: 'Lightning', score: 1650 },
  { name: 'Diamond', score: 1420 },
  { name: 'StarPlayer', score: 1180 },
]

const DEFAULT_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 1,
    user: 'Sistema',
    message: 'Bem-vindo ao Open Agar',
    type: 'system',
  },
  { id: 2, user: 'Jogador1', message: 'Boa sorte pessoal!', type: 'friend' },
]

export default function GameScreen({
  playerName,
  isSpectating,
  onBackToMenu,
}: {
  playerName: string
  isSpectating: boolean
  onBackToMenu: () => void
}) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(
    DEFAULT_CHAT_MESSAGES,
  )
  const [leaderboard] = useState<LeaderboardPlayer[]>(DEFAULT_LEADERBOARD)

  const handleSplit = () => {
    // Game logic for splitting cell
    console.log('Split action')
  }

  const handleFeed = () => {
    // Game logic for feeding
    console.log('Feed action')
  }

  const handleSendMessage = (message: string) => {
    const newMessage: ChatMessage = {
      id: Date.now(),
      user: playerName || 'Anônimo',
      message,
      type: 'me',
    }
    setChatMessages((prev) => [...prev, newMessage])
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundCanvas />
      <GameCanvas playerName={playerName} isSpectating={isSpectating} />

      {/* Game UI Overlay */}
      <div className="pointer-events-none absolute inset-0">
        {/* Back to Menu Button */}
        <div className="pointer-events-auto absolute top-6 left-6">
          <Button
            onClick={onBackToMenu}
            variant="outline"
            className="border-slate-700/50 bg-slate-900/80 text-slate-300 backdrop-blur-md hover:bg-slate-800/80 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Menu
          </Button>
        </div>

        {/* Player Status */}
        <PlayerStatus playerName={playerName} isSpectating={isSpectating} />

        {/* Leaderboard */}
        <div className="pointer-events-auto absolute top-6 right-6">
          <Leaderboard leaderboard={leaderboard} currentPlayer={playerName} />
        </div>

        {/* Chat (Desktop) */}
        <div className="pointer-events-auto absolute bottom-6 left-6 hidden h-64 w-80 lg:block">
          <GameChat
            messages={chatMessages}
            playerName={playerName}
            onSendMessage={handleSendMessage}
          />
        </div>

        {/* Mobile Controls */}
        {!isSpectating && (
          <MobileControls onSplit={handleSplit} onFeed={handleFeed} />
        )}

        {/* Game Instructions (Desktop) */}
        <GameInstructions />
      </div>
    </div>
  )
}

// Subcomponente: Game Canvas
function GameCanvas({
  playerName,
  isSpectating,
}: {
  playerName: string
  isSpectating: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw player cell if not spectating
    if (!isSpectating) {
      ctx.fillStyle = '#3b82f6'
      ctx.beginPath()
      ctx.arc(canvas.width / 2, canvas.height / 2, 30, 0, Math.PI * 2)
      ctx.fill()

      // Player name
      ctx.fillStyle = '#ffffff'
      ctx.font = '14px Inter'
      ctx.textAlign = 'center'
      ctx.fillText(playerName, canvas.width / 2, canvas.height / 2 + 5)
    }
  }, [playerName, isSpectating])

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full cursor-crosshair"
      tabIndex={1}
    />
  )
}

// Subcomponente: Player Status
function PlayerStatus({
  playerName,
  isSpectating,
}: {
  playerName: string
  isSpectating: boolean
}) {
  return (
    <div className="pointer-events-auto absolute top-6 left-1/2 -translate-x-1/2 transform">
      <div className="rounded-xl border border-slate-700/50 bg-slate-900/80 px-4 py-2 backdrop-blur-md">
        {isSpectating ? (
          <div className="text-center text-sm font-medium text-slate-400">
            Modo Espectador
          </div>
        ) : (
          <div className="text-center text-sm font-medium text-slate-200">
            {playerName} - Massa: 100
          </div>
        )}
      </div>
    </div>
  )
}

// Subcomponente: Leaderboard
function Leaderboard({
  leaderboard,
  currentPlayer,
}: {
  leaderboard: LeaderboardPlayer[]
  currentPlayer: string
}) {
  return (
    <div className="min-w-[200px] rounded-xl border border-slate-700/50 bg-slate-900/80 p-4 backdrop-blur-md">
      <div className="mb-3 flex items-center gap-2">
        <Trophy className="h-4 w-4 text-amber-400" />
        <h3 className="text-sm font-medium text-slate-200">Ranking</h3>
      </div>
      <div className="space-y-2">
        {leaderboard.map((player, index) => (
          <div
            key={index}
            className="flex items-center justify-between text-sm"
          >
            <span
              className={`${player.name === currentPlayer ? 'font-medium text-blue-400' : 'text-slate-300'}`}
            >
              {index + 1}. {player.name}
            </span>
            <span className="font-mono text-slate-400">
              {player.score.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Subcomponente: Mobile Controls
function MobileControls({
  onSplit,
  onFeed,
}: {
  onSplit: () => void
  onFeed: () => void
}) {
  return (
    <div className="pointer-events-auto absolute right-6 bottom-6 left-6 flex justify-between lg:hidden">
      <Button
        onClick={onSplit}
        className="h-14 w-14 rounded-full border border-slate-600 bg-slate-800/80 text-slate-300 hover:bg-slate-700/80"
      >
        <Zap className="h-5 w-5" />
      </Button>
      <Button
        onClick={onFeed}
        className="h-14 w-14 rounded-full border border-slate-600 bg-slate-800/80 text-slate-300 hover:bg-slate-700/80"
      >
        <Target className="h-5 w-5" />
      </Button>
    </div>
  )
}

// Subcomponente: Game Instructions
function GameInstructions() {
  return (
    <div className="pointer-events-auto absolute right-6 bottom-6 hidden xl:block">
      <div className="max-w-xs rounded-xl border border-slate-700/50 bg-slate-900/80 p-4 backdrop-blur-md">
        <h4 className="mb-2 text-sm font-medium text-slate-200">Controles</h4>
        <div className="space-y-1 text-xs text-slate-400">
          <div>Mouse: Mover</div>
          <div>Espaço: Dividir</div>
          <div>W: Ejetar massa</div>
        </div>
      </div>
    </div>
  )
}
