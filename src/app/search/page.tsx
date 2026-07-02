'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import BottomNav from '@/components/BottomNav'
import { getRecentFiles } from '@/lib/storage'
import { storeFileForViewer } from '@/lib/fileUtils'
import { RecentFile } from '@/types'

export default function SearchPage() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [files, setFiles] = useState<RecentFile[]>([])
  const [results, setResults] = useState<RecentFile[]>([])

  useEffect(() => {
    const all = getRecentFiles()
    setFiles(all)
    setResults(all)
  }, [])

  const handleSearch = (q: string) => {
    setQuery(q)
    if (!q.trim()) {
      setResults(files)
      return
    }
    const lower = q.toLowerCase()
    setResults(
      files.filter(
        (f) =>
          f.name.toLowerCase().includes(lower) ||
          f.content.toLowerCase().includes(lower)
      )
    )
  }

  const handleOpen = (file: RecentFile) => {
    storeFileForViewer(file.name, file.content, file.size)
    router.push('/viewer')
  }

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <header className="px-5 pt-5 pb-3 border-b border-[#1a1a1a] flex-shrink-0">
        <div className="relative">
          <svg
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#444] pointer-events-none"
          >
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search files and content..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            autoFocus
            className="w-full bg-[#0d0d0d] border border-[#2a2a2a] pl-9 pr-4 py-2.5 font-mono text-[13px] text-white placeholder-[#444] focus:outline-none focus:border-[#555] transition-colors"
          />
        </div>
      </header>

      {/* Results */}
      <div className="flex-1 overflow-y-auto">
        {results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="w-10 h-10 text-[#222]">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <p className="font-mono text-[12px] text-[#333] tracking-widest uppercase">
              {query ? 'No results found' : 'No files in history'}
            </p>
          </div>
        ) : (
          results.map((file) => {
            // Find matching excerpt
            let excerpt = ''
            if (query) {
              const lower = file.content.toLowerCase()
              const idx = lower.indexOf(query.toLowerCase())
              if (idx !== -1) {
                excerpt = '...' + file.content.slice(Math.max(0, idx - 30), idx + 80) + '...'
              }
            }

            return (
              <button
                key={file.id}
                onClick={() => handleOpen(file)}
                className="w-full flex items-start gap-3.5 px-5 py-4 border-b border-[#111] hover:bg-[#0d0d0d] transition-colors text-left"
              >
                <div className="relative w-7 h-8 border border-[#2a2a2a] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3 h-3 text-[#555]">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14,2 14,8 20,8" />
                  </svg>
                  <div className="absolute top-0 right-0 w-1.5 h-1.5 border-l border-b border-[#2a2a2a] bg-black" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-[13px] text-white truncate">{file.name}</p>
                  {excerpt && (
                    <p className="font-mono text-[10px] text-[#444] mt-1 line-clamp-2 leading-relaxed">
                      {excerpt}
                    </p>
                  )}
                </div>
              </button>
            )
          })
        )}
      </div>

      <BottomNav />
    </div>
  )
}
