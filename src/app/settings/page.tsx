'use client'
import { useEffect, useState } from 'react'
import BottomNav from '@/components/BottomNav'
import { getSettings, saveSettings, clearRecentFiles, getRecentFiles } from '@/lib/storage'
import { AppSettings, FontSize } from '@/types'

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      role="switch"
      aria-checked={on}
      className={`w-10 h-[22px] border relative flex-shrink-0 transition-colors ${
        on ? 'bg-white border-white' : 'bg-[#1a1a1a] border-[#2a2a2a]'
      }`}
    >
      <span
        className={`absolute top-[3px] w-3.5 h-3.5 transition-all ${
          on ? 'bg-black left-[19px]' : 'bg-[#333] left-[3px]'
        }`}
      />
    </button>
  )
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<AppSettings>({
    darkMode: true,
    fontSize: 'md',
    showLineNumbers: true,
    showRecentFiles: true,
    autoReload: false,
  })
  const [recentCount, setRecentCount] = useState(0)
  const [cleared, setCleared] = useState(false)

  useEffect(() => {
    setSettings(getSettings())
    setRecentCount(getRecentFiles().length)
  }, [])

  const update = (key: keyof AppSettings, value: AppSettings[keyof AppSettings]) => {
    const updated = { ...settings, [key]: value }
    setSettings(updated)
    saveSettings(updated)

    // Apply dark mode immediately
    if (key === 'darkMode') {
      if (value) {
        document.documentElement.style.background = '#000'
        document.body.style.background = '#000'
        document.body.style.color = '#fff'
      } else {
        document.documentElement.style.background = '#fff'
        document.body.style.background = '#fff'
        document.body.style.color = '#000'
      }
    }

    // Apply font size immediately
    if (key === 'fontSize') {
      const fontSizeMap = { sm: '13px', md: '15px', lg: '17px' }
      document.documentElement.style.setProperty(
        '--mv-font-size',
        fontSizeMap[value as FontSize]
      )
    }
  }

  const handleClear = () => {
    clearRecentFiles()
    setRecentCount(0)
    setCleared(true)
    setTimeout(() => setCleared(false), 2000)
  }

  return (
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{ background: settings.darkMode ? '#000' : '#fff' }}
    >
      {/* Header */}
      <header className="px-5 pt-5 pb-4 border-b border-[#1a1a1a] flex-shrink-0">
        <h1
          className="font-mono text-[18px] font-semibold tracking-[0.06em]"
          style={{ color: settings.darkMode ? '#fff' : '#000' }}
        >
          Settings
        </h1>
        <p className="font-mono text-[10px] text-[#444] mt-1 tracking-widest uppercase">
          MARKVAULT v0.1.0 · Csaydimba
        </p>
      </header>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">

        {/* Display group */}
        <div>
          <p className="font-mono text-[9px] tracking-[0.16em] uppercase text-[#3a3a3a] px-5 pt-4 pb-2">
            Display
          </p>

          <div className="flex items-center px-5 py-[15px] border-b border-[#0f0f0f] gap-3">
            <div className="flex-1">
              <p className="font-sans text-[14px] text-white">Dark Mode</p>
              <p className="font-mono text-[10px] text-[#444] mt-0.5">Pure black background</p>
            </div>
            <Toggle on={settings.darkMode} onToggle={() => update('darkMode', !settings.darkMode)} />
          </div>

          <div className="flex items-center px-5 py-[15px] border-b border-[#0f0f0f] gap-3">
            <div className="flex-1">
              <p className="font-sans text-[14px] text-white">Font Size</p>
              <p className="font-mono text-[10px] text-[#444] mt-0.5">
                Current: {settings.fontSize === 'sm' ? 'Small' : settings.fontSize === 'md' ? 'Medium' : 'Large'}
              </p>
            </div>
            <div className="flex border border-[#2a2a2a] flex-shrink-0">
              {(['sm', 'md', 'lg'] as FontSize[]).map((size, i) => (
                <button
                  key={size}
                  onClick={() => update('fontSize', size)}
                  className={`px-2.5 py-1.5 font-mono text-[10px] transition-colors ${
                    i < 2 ? 'border-r border-[#2a2a2a]' : ''
                  } ${
                    settings.fontSize === size
                      ? 'bg-white text-black'
                      : 'text-[#555]'
                  }`}
                >
                  {size.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center px-5 py-[15px] border-b border-[#0f0f0f] gap-3">
            <div className="flex-1">
              <p className="font-sans text-[14px] text-white">Line Numbers</p>
              <p className="font-mono text-[10px] text-[#444] mt-0.5">Show in code blocks</p>
            </div>
            <Toggle
              on={settings.showLineNumbers}
              onToggle={() => update('showLineNumbers', !settings.showLineNumbers)}
            />
          </div>
        </div>

        {/* Files group */}
        <div>
          <p className="font-mono text-[9px] tracking-[0.16em] uppercase text-[#3a3a3a] px-5 pt-4 pb-2">
            Files
          </p>

          <div className="flex items-center px-5 py-[15px] border-b border-[#0f0f0f] gap-3">
            <div className="flex-1">
              <p className="font-sans text-[14px] text-white">Show Recent Files</p>
              <p className="font-mono text-[10px] text-[#444] mt-0.5">On home screen</p>
            </div>
            <Toggle
              on={settings.showRecentFiles}
              onToggle={() => update('showRecentFiles', !settings.showRecentFiles)}
            />
          </div>

          <div className="flex items-center px-5 py-[15px] border-b border-[#0f0f0f] gap-3">
            <div className="flex-1">
              <p className="font-sans text-[14px] text-white">Auto-reload</p>
              <p className="font-mono text-[10px] text-[#444] mt-0.5">Detect file changes</p>
            </div>
            <Toggle
              on={settings.autoReload}
              onToggle={() => update('autoReload', !settings.autoReload)}
            />
          </div>
        </div>

        {/* Clear history */}
        <button
          onClick={handleClear}
          className="mx-5 mt-5 border border-[#1e1e1e] p-4 flex items-center justify-between w-[calc(100%-40px)] hover:border-[#333] transition-colors"
        >
          <div>
            <p className="font-mono text-[12px] text-[#888] tracking-wide text-left">
              {cleared ? '✓ History cleared' : 'Clear File History'}
            </p>
            <p className="font-mono text-[10px] text-[#333] mt-0.5 text-left">
              {recentCount} {recentCount === 1 ? 'file' : 'files'} stored
            </p>
          </div>
          <svg viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth={2} className="w-3.5 h-3.5 flex-shrink-0">
            <polyline points="9,18 15,12 9,6" />
          </svg>
        </button>

        {/* Version footer */}
        <p className="px-5 py-6 font-mono text-[10px] text-[#2a2a2a] tracking-widest">
          MARKVAULT · PWA · BUILT WITH NEXT.JS · © 2025 CSAYDIMBA
        </p>
      </div>

      <BottomNav />
    </div>
  )
}
