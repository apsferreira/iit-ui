/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0097D6',
          primaryLight: '#33ADE0',
          primaryDark: '#006FA3',
          secondary: '#00D6A0',
          secondaryLight: '#33DEB3',
          secondaryDark: '#00A87E',
        },
        surface: {
          base: '#FFFFFF',
          subtle: '#F5F8FA',
          elevated: '#EBF4FB',
        },
        iit: {
          text: '#0D1B26',
          textSecondary: '#4A6070',
          textMuted: '#8A9FAF',
          border: '#D0DDE6',
          borderSubtle: '#EBF2F7',
          dark: '#0A0F14',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
