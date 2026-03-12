/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-base':          '#000000',
        'surface':          '#111111',
        'surface-elevated': '#1D1D1F',
        'accent':           '#A4E04B',
        'accent-hover':     '#8cc23e',
        'text-main':        '#F5F5F7',
        'text-muted':       '#86868B',
        'border-subtle':    '#333336',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
