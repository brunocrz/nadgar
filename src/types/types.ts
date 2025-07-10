export interface ChatMessage {
  id: number
  user: string
  message: string
  type: 'me' | 'friend' | 'system'
}

export interface LeaderboardPlayer {
  name: string
  score: number
}

export interface GameScreenProps {
  playerName: string
  isSpectating: boolean
  onBackToMenu: () => void
}
