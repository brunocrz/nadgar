'use client'

import { useRef, useEffect } from 'react'

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      if (ctx) {
        // Create subtle grid pattern background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        gradient.addColorStop(0, '#0f172a')
        gradient.addColorStop(0.5, '#1e293b')
        gradient.addColorStop(1, '#0f172a')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw subtle grid
        ctx.strokeStyle = '#334155'
        ctx.lineWidth = 0.5
        ctx.globalAlpha = 0.3

        for (let x = 0; x < canvas.width; x += 50) {
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, canvas.height)
          ctx.stroke()
        }

        for (let y = 0; y < canvas.height; y += 50) {
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(canvas.width, y)
          ctx.stroke()
        }

        ctx.globalAlpha = 1
      }
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 h-full w-full" 
    />
  )
}