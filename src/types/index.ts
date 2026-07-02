export interface RecentFile {
  id: string
  name: string
  size: number
  lastOpened: number // timestamp
  content: string
}

export type FontSize = 'sm' | 'md' | 'lg'

export interface AppSettings {
  darkMode: boolean
  fontSize: FontSize
  showLineNumbers: boolean
  showRecentFiles: boolean
  autoReload: boolean
}
