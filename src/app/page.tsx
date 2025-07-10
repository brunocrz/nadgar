'use client'

import { useGameState } from '@/hooks/useGameState'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Play, Eye } from 'lucide-react'
import GameScreen from '@/components/game-screen'
import BackgroundCanvas from '@/components/background-canvas'
import WalletStatus from '@/components/wallet-status'

export default function Home() {
  const {
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
  } = useGameState()

  if (gameStarted) {
    return (
      <GameScreen
        playerName={playerName}
        isSpectating={isSpectating}
        onBackToMenu={handleBackToMenu}
      />
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundCanvas />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="mx-4 max-h-[90vh] w-full max-w-md overflow-y-auto">
          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/80 p-6 backdrop-blur-md">
            <h2 className="mb-6 text-xl font-semibold text-slate-200">
              Nadgar
            </h2>

            <div className="mb-4">
              <label className="mb-2 block text-sm text-slate-400">Nome</label>
              <Input
                type="text"
                placeholder="Digite um nome para entrar"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                maxLength={25}
                className="h-12 border-slate-600 bg-slate-800/50 text-slate-200 placeholder-slate-500 focus:border-blue-500"
                autoFocus
              />
              {playerName && !/^[a-zA-Z0-9]+$/.test(playerName) && (
                <p className="mt-1 text-xs text-red-400">
                  Apenas caracteres alfanuméricos são permitidos
                </p>
              )}
            </div>

            <div className="space-y-3">
              <WalletStatus
                walletConnected={walletConnected}
                feePaid={feePaid}
                isConnecting={isConnecting}
                isPaying={isPaying}
                onConnect={handleConnectWallet}
                onPay={handlePayFee}
              />

              {feePaid && (
                <Button
                  onClick={() => handleStartGame(playerName)}
                  className="h-12 w-full bg-green-600 font-medium text-white hover:bg-green-700"
                  disabled={
                    !playerName.trim() || !/^[a-zA-Z0-9]+$/.test(playerName)
                  }
                >
                  <Play className="mr-2 h-4 w-4" />
                  Iniciar Jogo
                </Button>
              )}

              <Button
                onClick={handleSpectate}
                variant="outline"
                className="h-12 w-full border-slate-600 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white"
              >
                <Eye className="mr-2 h-4 w-4" />
                Assistir
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
