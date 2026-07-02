export const ACCEPTED_EXTENSIONS = ['.md', '.mdx', '.markdown']
export const ACCEPTED_MIME = 'text/markdown,text/x-markdown,.md,.mdx,.markdown'

export function isMarkdownFile(name: string): boolean {
  return ACCEPTED_EXTENSIONS.some((ext) => name.toLowerCase().endsWith(ext))
}

export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target?.result as string)
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsText(file)
  })
}

// Store file content temporarily in sessionStorage for viewer page
export function storeFileForViewer(name: string, content: string, size: number): void {
  if (typeof window === 'undefined') return
  sessionStorage.setItem(
    'mv_current_file',
    JSON.stringify({ name, content, size })
  )
}

export function getStoredFile(): { name: string; content: string; size: number } | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem('mv_current_file')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}
