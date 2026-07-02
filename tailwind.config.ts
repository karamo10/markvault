import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'mv-black': '#000000',
        'mv-white': '#ffffff',
        'mv-gray-90': '#0f0f0f',
        'mv-gray-80': '#1a1a1a',
        'mv-gray-70': '#2a2a2a',
        'mv-gray-50': '#4a4a4a',
        'mv-gray-30': '#888888',
        'mv-gray-10': '#d4d4d4',
      },
      fontFamily: {
        mono: ['IBM Plex Mono', 'monospace'],
        sans: ['IBM Plex Sans', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0px',
        none: '0px',
      },
    },
  },
  plugins: [],
}

export default config
