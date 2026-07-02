'use client'
import { useEffect } from 'react'
import { getSettings } from '@/lib/storage'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Apply saved settings on every app load
    const settings = getSettings()

    // Dark mode — toggle class on <html>
    if (settings.darkMode) {
      document.documentElement.classList.add('dark')
      document.documentElement.style.background = '#000'
      document.body.style.background = '#000'
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.style.background = '#ffffff'
      document.body.style.background = '#ffffff'
      document.body.style.color = '#000000'
    }

    // Font size — set CSS variable on <html>
    const fontSizeMap = { sm: '13px', md: '15px', lg: '17px' }
    document.documentElement.style.setProperty(
      '--mv-font-size',
      fontSizeMap[settings.fontSize]
    )
  }, [])

  return <>{children}</>
}
