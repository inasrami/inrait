/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-base':   '#000000',
        'surface':   '#0a0a0a',
        'surface-2': '#111111',
        'surface-3': '#1a1a1a',
        'accent':    '#A4E04B',
        'text-main': '#F5F5F7',
        'text-muted':'#888888',
        'border':    'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        sans:    ['DM Sans', 'sans-serif'],
        display: ['Bebas Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
}