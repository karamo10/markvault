'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getRecentFiles, clearRecentFiles, formatFileSize, formatRelativeTime } from '@/lib/storage'
import { storeFileForViewer } from '@/lib/fileUtils'
import { RecentFile } from '@/types'

export default function RecentFiles() {
  const router = useRouter()
  const [files, setFiles] = useState<RecentFile[]>([])

  useEffect(() => {
    setFiles(getRecentFiles())
  }, [])

  const handleOpen = (file: RecentFile) => {
    storeFileForViewer(file.name, file.content, file.size)
    router.push('/viewer')
  }

  const handleClear = () => {
    clearRecentFiles()
    setFiles([])
  }

  if (files.length === 0) return null

  return (
    <div className="flex flex-col flex-1">

      <div className="flex justify-between items-center px-5 pb-2.5">
        <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#555]">
          Recent
        </span>
        <button
          onClick={handleClear}
          className="font-mono text-[10px] text-[#444] tracking-wide hover:text-[#888] transition-colors"
        >
          Clear
        </button>
      </div>

      {/* File list */}
      <div className="flex flex-col">
        {files.map((file) => (
          <button
            key={file.id}
            onClick={() => handleOpen(file)}
            className="flex items-center gap-3.5 px-5 py-3.5 border-b border-[#111] hover:bg-[#0d0d0d] transition-colors text-left"
          >
            {/* File icon */}
            <div className="relative w-8 h-9 border border-[#2a2a2a] flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3.5 h-3.5 text-[#555]">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
              </svg>
              {/* Dog-ear */}
              <div className="absolute top-0 right-0 w-2 h-2 border-l border-b border-[#2a2a2a] bg-black" />
            </div>

            {/* File info */}
            <div className="flex-1 min-w-0">
              <p className="font-mono text-[13px] text-white truncate">{file.name}</p>
              <p className="font-mono text-[10px] text-[#444] mt-0.5 tracking-wide">
                {formatFileSize(file.size)} · {formatRelativeTime(file.lastOpened)}
              </p>
            </div>

            <span className="text-[#333] text-sm flex-shrink-0">›</span>
          </button>
        ))}
      </div>
    </div>
  )
}
