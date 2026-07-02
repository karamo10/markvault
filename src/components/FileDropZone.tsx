'use client'
import { useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { isMarkdownFile, readFileAsText, storeFileForViewer, ACCEPTED_MIME } from '@/lib/fileUtils'
import { addRecentFile } from '@/lib/storage'

export default function FileDropZone() {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFile = useCallback(async (file: File) => {
    setError(null)
    if (!isMarkdownFile(file.name)) {
      setError('Only .md, .mdx, and .markdown files are supported.')
      return
    }
    try {
      const content = await readFileAsText(file)
      storeFileForViewer(file.name, content, file.size)
      addRecentFile({ name: file.name, content, size: file.size })
      router.push('/viewer')
    } catch {
      setError('Could not read the file. Please try again.')
    }
  }, [router])

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <div className="mx-5 my-5">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`relative border flex flex-col items-center gap-3 py-9 px-5 transition-colors ${
          dragging ? 'border-white bg-[#0d0d0d]' : 'border-[#2a2a2a]'
        }`}
      >
        {/* White top accent bar — the signature element */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-white" />

        {/* File icon */}
        <div className="w-10 h-10 border border-[#333] flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 text-white">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14,2 14,8 20,8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10,9 9,9 8,9" />
          </svg>
        </div>

        <p className="font-mono text-[13px] text-white tracking-wide">
          {dragging ? 'Drop to open' : 'Open a Markdown file'}
        </p>
        <p className="font-mono text-[11px] text-[#555] tracking-widest uppercase">
          .md · .mdx · .markdown
        </p>

        <button
          onClick={() => inputRef.current?.click()}
          className="mt-2 bg-white text-black font-mono text-xs font-semibold tracking-widest uppercase px-7 py-2.5 hover:bg-[#e0e0e0] transition-colors"
        >
          Browse Files
        </button>

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_MIME}
          className="hidden"
          onChange={onInputChange}
        />
      </div>

      {error && (
        <p className="mt-2 font-mono text-[11px] text-[#888] tracking-wide px-1">
          ✕ {error}
        </p>
      )}
    </div>
  )
}
