'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import BottomNav from '@/components/BottomNav'
import { getStoredFile } from '@/lib/fileUtils'
import { getSettings } from '@/lib/storage'
import { FontSize } from '@/types'

export default function ViewerPage() {
  const router = useRouter()
  const [file, setFile] = useState<{ name: string; content: string } | null>(null)
  const [fontSize, setFontSize] = useState<FontSize>('md')

  useEffect(() => {
    const stored = getStoredFile()
    if (!stored) {
      router.replace('/')
      return
    }
    setFile(stored)
    const settings = getSettings()
    setFontSize(settings.fontSize)
  }, [router])

  const handleShare = async () => {
    if (!file) return
    if (navigator.share) {
      try {
        await navigator.share({ title: file.name, text: file.content })
      } catch { /* user cancelled */ }
    }
  }

  if (!file) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <span className="font-mono text-[12px] text-[#444] tracking-widest">LOADING...</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-black relative">
      {/* Viewer header */}
      <header className="flex items-center gap-3 px-5 py-4 border-b border-[#1a1a1a] flex-shrink-0">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 border border-[#2a2a2a] flex items-center justify-center flex-shrink-0 hover:border-[#444] transition-colors"
          aria-label="Go back"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-white">
            <polyline points="15,18 9,12 15,6" />
          </svg>
        </button>

        <span className="flex-1 font-mono text-[13px] text-white truncate">{file.name}</span>

        <div className="flex gap-2">
          {/* Share */}
          <button
            onClick={handleShare}
            className="w-8 h-8 border border-[#2a2a2a] flex items-center justify-center hover:border-[#444] transition-colors"
            aria-label="Share"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-[#888]">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>

          <button
            className="w-8 h-8 border border-[#2a2a2a] flex items-center justify-center hover:border-[#444] transition-colors"
            aria-label="More options"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-[#888]">
              <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
            </svg>
          </button>
        </div>
      </header>

      {/* Markdown content */}
      <MarkdownRenderer content={file.content} fontSize={fontSize} />

      {/* FAB - future edit mode */}
      <button
        className="absolute bottom-20 right-5 w-11 h-11 bg-white flex items-center justify-center shadow-lg hover:bg-[#e0e0e0] transition-colors"
        aria-label="Edit file"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-black">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </button>

      <BottomNav />
    </div>
  )
}
