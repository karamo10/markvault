'use client'
import { useEffect, useState } from 'react'

export default function SplashScreen() {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Start fade out after 1.5s
    const fadeTimer = setTimeout(() => setFadeOut(true), 1500)
    // Remove from DOM after fade completes
    const removeTimer = setTimeout(() => setVisible(false), 2000)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className={`fixed inset-0 z-50 bg-black flex flex-col items-center justify-center gap-5 transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* # icon */}
      <div className="w-20 h-20 bg-white flex items-center justify-center">
        <span className="font-mono text-5xl font-bold text-black leading-none">#</span>
      </div>

      {/* Wordmark */}
      <div className="flex flex-col items-center gap-0.5">
        <span className="font-mono text-2xl font-bold text-white tracking-[0.08em]">MARK</span>
        <span className="font-mono text-2xl font-light text-[#555] tracking-[0.08em]">VAULT</span>
      </div>

      {/* By line */}
      <span className="font-mono text-[10px] text-[#2a2a2a] tracking-[0.2em] uppercase">
        by Csaydimba
      </span>

      {/* Loading bar */}
      <div className="w-12 h-[1px] bg-[#1a1a1a] overflow-hidden mt-4 relative">
        <div className="absolute top-0 left-0 h-full bg-white animate-[splash-load_1.2s_ease-in-out_forwards]" />
      </div>
    </div>
  )
}
