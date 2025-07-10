'use client'

import { MessageSquare } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ChatMessage } from '@/types/types'
import { useState } from 'react'

interface GameChatProps {
  messages: ChatMessage[]
  playerName: string
  onSendMessage: (message: string) => void
}

export function GameChat({ messages, onSendMessage }: GameChatProps) {
  const [chatInput, setChatInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (chatInput.trim()) {
      onSendMessage(chatInput)
      setChatInput('')
    }
  }

  return (
    <div className="pointer-events-auto h-64 w-80">
      <div className="flex h-full flex-col rounded-xl border border-slate-700/50 bg-slate-900/80 backdrop-blur-md">
        <div className="flex items-center gap-2 border-b border-slate-700/50 p-3">
          <MessageSquare className="h-4 w-4 text-blue-400" />
          <h4 className="text-sm font-medium text-slate-200">Chat</h4>
          <div className="ml-auto text-xs text-slate-500">
            {messages.length}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <div className="space-y-1">
            {messages.map((msg) => (
              <div key={msg.id} className="text-sm">
                {msg.type === 'system' ? (
                  <div className="text-slate-500 italic">{msg.message}</div>
                ) : (
                  <div>
                    <span
                      className={
                        msg.type === 'me' ? 'text-blue-400' : 'text-green-400'
                      }
                    >
                      {msg.user}:
                    </span>{' '}
                    <span className="text-slate-300">{msg.message}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="border-t border-slate-700/50 p-3"
        >
          <Input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Digite sua mensagem..."
            maxLength={35}
            className="h-8 border-slate-600 bg-slate-800/50 text-sm text-slate-200 placeholder-slate-500 focus:border-blue-500"
          />
        </form>
      </div>
    </div>
  )
}
