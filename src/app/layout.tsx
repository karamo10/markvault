import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'
import SplashScreen from '@/components/SplashScreen'
import ThemeProvider from '@/components/ThemeProvider'
import './globals.css'

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'MarkVault',
  description: 'A minimal Markdown reader PWA for Android by Csaydimba',
  authors: [{ name: 'Csaydimba', url: 'https://csaydimba.com' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'MarkVault',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body
        className={`${ibmPlexMono.variable} ${ibmPlexSans.variable} bg-black text-white antialiased`}
      >
        <ThemeProvider>
          <SplashScreen />
          <div className="mx-auto max-w-[430px] min-h-screen flex flex-col relative overflow-x-hidden">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
