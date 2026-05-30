import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'g-dark':  '#1B3025',
        'g-mid':   '#4E7D57',
        'g-light': '#C1D5BD',
        'g-pale':  '#E3F3E6',
        's1': '#1B3025',
        's2': '#243D2D',
        's3': '#2D4E37',
        's4': '#345E3F',
      },
      fontFamily: {
        sans:    ['Kohinoor', 'system-ui', 'sans-serif'],
        display: ['Quanta', 'system-ui', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee-scroll 28s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}

export default config
