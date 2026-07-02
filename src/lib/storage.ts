import { RecentFile, AppSettings, FontSize } from '@/types'

const RECENT_KEY = 'markvault_recent'
const SETTINGS_KEY = 'markvault_settings'
const MAX_RECENT = 10

// Recent Files

export function getRecentFiles(): RecentFile[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(RECENT_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function addRecentFile(file: Omit<RecentFile, 'id' | 'lastOpened'>): void {
  if (typeof window === 'undefined') return
  const existing = getRecentFiles()
  const id = `${file.name}-${file.size}`

  // Remove duplicate if exists
  const filtered = existing.filter((f) => f.id !== id)

  const newEntry: RecentFile = {
    ...file,
    id,
    lastOpened: Date.now(),
  }

  const updated = [newEntry, ...filtered].slice(0, MAX_RECENT)
  localStorage.setItem(RECENT_KEY, JSON.stringify(updated))
}

export function clearRecentFiles(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(RECENT_KEY)
}

// Settings 

const DEFAULT_SETTINGS: AppSettings = {
  darkMode: true,
  fontSize: 'md',
  showLineNumbers: true,
  showRecentFiles: true,
  autoReload: false,
}

export function getSettings(): AppSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS
  } catch {
    return DEFAULT_SETTINGS
  }
}

export function saveSettings(settings: Partial<AppSettings>): void {
  if (typeof window === 'undefined') return
  const current = getSettings()
  localStorage.setItem(SETTINGS_KEY, JSON.stringify({ ...current, ...settings }))
}

// Helpers 

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function formatRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes} min ago`
  if (hours < 24) return `${hours}h ago`
  if (days === 1) return 'Yesterday'
  if (days < 7) return new Date(timestamp).toLocaleDateString('en', { weekday: 'short' })
  return new Date(timestamp).toLocaleDateString('en', { day: 'numeric', month: 'short' })
}

export function saveFontSize(size: FontSize): void {
  saveSettings({ fontSize: size })
}
