'use client'

import { Button } from '@/components/ui/button'

interface WalletStatusProps {
  walletConnected: boolean
  feePaid: boolean
  isConnecting: boolean
  isPaying: boolean
  onConnect: () => void
  onPay: () => void
}

export default function WalletStatus({
  walletConnected,
  feePaid,
  isConnecting,
  isPaying,
  onConnect,
  onPay,
}: WalletStatusProps) {
  if (!walletConnected) {
    return (
      <Button
        onClick={onConnect}
        disabled={isConnecting}
        className="h-12 w-full bg-slate-600 font-medium text-white hover:bg-slate-700 disabled:opacity-50"
      >
        {isConnecting ? (
          <>
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
            Conectando...
          </>
        ) : (
          'Conectar Carteira'
        )}
      </Button>
    )
  }

  if (!feePaid) {
    return (
      <Button
        onClick={onPay}
        disabled={isPaying}
        className="h-12 w-full bg-blue-600 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isPaying ? (
          <>
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
            Processando Pagamento...
          </>
        ) : (
          <>
            Pagar Taxa para Jogar
            <span className="ml-2 text-xs opacity-75">(0.001 ETH)</span>
          </>
        )}
      </Button>
    )
  }

  return (
    <div className="mb-6 rounded-lg bg-slate-800/30 p-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-slate-200">
            Carteira Conectada
          </div>
          <div className="text-xs text-slate-500">0x1234...5678</div>
        </div>
        <div className="h-2 w-2 rounded-full bg-green-400"></div>
      </div>
      <div className="mt-2 text-xs text-green-400">
        ✓ Taxa de entrada paga (0.001 ETH)
      </div>
    </div>
  )
}
