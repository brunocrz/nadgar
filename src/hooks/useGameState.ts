import { useState } from 'react'

export function useGameState() {
  const [gameStarted, setGameStarted] = useState(false)
  const [playerName, setPlayerName] = useState('')
  const [isSpectating, setIsSpectating] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [feePaid, setFeePaid] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isPaying, setIsPaying] = useState(false)

  const handleStartGame = (name: string) => {
    setPlayerName(name)
    setGameStarted(true)
    setIsSpectating(false)
  }

  const handleSpectate = () => {
    setGameStarted(true)
    setIsSpectating(true)
  }

  const handleBackToMenu = () => {
    setGameStarted(false)
    setIsSpectating(false)
  }

  const handleConnectWallet = async () => {
    setIsConnecting(true)
    setTimeout(() => {
      setWalletConnected(true)
      setIsConnecting(false)
    }, 2000)
  }

  const handlePayFee = async () => {
    setIsPaying(true)
    setTimeout(() => {
      setFeePaid(true)
      setIsPaying(false)
    }, 3000)
  }

  return {
    gameStarted,
    playerName,
    isSpectating,
    walletConnected,
    feePaid,
    isConnecting,
    isPaying,
    setPlayerName,
    handleStartGame,
    handleSpectate,
    handleBackToMenu,
    handleConnectWallet,
    handlePayFee,
  }
}
