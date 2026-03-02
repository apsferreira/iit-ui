import type { Config } from 'tailwindcss'

/**
 * IIT base Tailwind config.
 * Extend this in your app's tailwind.config.ts:
 *
 * import iitConfig from '@iit/ui/tailwind'
 * export default { presets: [iitConfig], content: [...] }
 */
const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        iit: {
          brand: {
            primary: '#0097D6',
            'primary-light': '#33ADE0',
            'primary-dark': '#006FA3',
            secondary: '#00D6A0',
            'secondary-light': '#33DEB3',
            'secondary-dark': '#00A87E',
          },
          surface: {
            base: '#FFFFFF',
            subtle: '#F5F8FA',
            elevated: '#EBF4FB',
          },
          'surface-dark': {
            base: '#0A0F14',
            subtle: '#111820',
            elevated: '#1A2530',
          },
          text: {
            primary: '#0D1B26',
            secondary: '#4A6070',
            muted: '#8A9FAF',
            'on-brand': '#FFFFFF',
          },
          border: {
            default: '#D0DDE6',
            subtle: '#EBF2F7',
            brand: '#0097D6',
          },
          status: {
            success: '#00D6A0',
            'success-bg': '#E6FAF5',
            warning: '#F59E0B',
            'warning-bg': '#FEF3C7',
            error: '#EF4444',
            'error-bg': '#FEE2E2',
            info: '#0097D6',
            'info-bg': '#EBF4FB',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        iit: '0.5rem',
        'iit-sm': '0.375rem',
        'iit-lg': '0.75rem',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.15s ease-out',
      },
    },
  },
  plugins: [],
}

export default config
