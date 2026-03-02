/**
 * IIT Design System — Color Tokens
 * Identidade visual oficial do Instituto Itinerante.
 * Light mode first com suporte a dark mode via surfaceDark.
 */

export const colors = {
  brand: {
    primary: '#0097D6',        // IIT Blue — uso principal
    primaryLight: '#33ADE0',   // hover states light mode
    primaryDark: '#006FA3',    // hover states dark mode
    secondary: '#00D6A0',      // Teal — CTAs secundários, destaques
    secondaryLight: '#33DEB3', // hover states light mode
    secondaryDark: '#00A87E',  // hover states dark mode
  },
  surface: {
    base: '#FFFFFF',
    subtle: '#F5F8FA',
    elevated: '#EBF4FB',       // leve tint do brand primary
    overlay: 'rgba(0,0,0,0.4)',
  },
  surfaceDark: {
    base: '#0A0F14',           // preto azulado (família do #0097D6)
    subtle: '#111820',
    elevated: '#1A2530',
    overlay: 'rgba(0,0,0,0.6)',
  },
  text: {
    primary: '#0D1B26',        // quase-preto azulado
    secondary: '#4A6070',
    muted: '#8A9FAF',
    onBrand: '#FFFFFF',        // texto sobre brand.primary
  },
  border: {
    default: '#D0DDE6',
    subtle: '#EBF2F7',
    brand: '#0097D6',
  },
  status: {
    success: '#00D6A0',        // reutiliza brand.secondary
    successBg: '#E6FAF5',
    warning: '#F59E0B',
    warningBg: '#FEF3C7',
    error: '#EF4444',
    errorBg: '#FEE2E2',
    info: '#0097D6',           // reutiliza brand.primary
    infoBg: '#EBF4FB',
  },
} as const

export type Colors = typeof colors
