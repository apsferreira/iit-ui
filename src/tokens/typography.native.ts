/**
 * IIT Design System — Typography Tokens (React Native)
 * Valores numéricos (px) em vez de rem para uso com StyleSheet.
 * Mesma escala semântica que typography.ts (web).
 */

export const typography = {
  fontFamily: {
    sans: 'System',  // system-ui do dispositivo
    mono: 'Courier', // monospace nativo
  },
  fontSize: {
    xs:   12,
    sm:   14,
    base: 16,
    lg:   18,
    xl:   20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  fontWeight: {
    normal:   '400' as const,
    medium:   '500' as const,
    semibold: '600' as const,
    bold:     '700' as const,
  },
  lineHeight: {
    tight:   1.25,
    snug:    1.375,
    normal:  1.5,
    relaxed: 1.625,
  },
  letterSpacing: {
    tight:  -0.4,
    normal:  0,
    wide:    0.4,
  },
} as const

export type Typography = typeof typography
