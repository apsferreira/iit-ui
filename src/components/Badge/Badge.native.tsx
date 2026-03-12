import * as React from 'react'
import { View, Text, StyleSheet, type ViewStyle, type TextStyle } from 'react-native'
import { colors } from '../../tokens/colors'

type Variant = 'neutral' | 'success' | 'warning' | 'error' | 'info' | 'brand'

const variantStyles: Record<Variant, { container: ViewStyle; text: TextStyle; dot: ViewStyle }> = {
  neutral: {
    container: { backgroundColor: colors.surface.subtle, borderColor: colors.border.default },
    text:      { color: colors.text.secondary },
    dot:       { backgroundColor: '#8A9FAF' },
  },
  success: {
    container: { backgroundColor: colors.status.successBg, borderColor: `${colors.brand.secondary}4D` },
    text:      { color: colors.brand.secondaryDark },
    dot:       { backgroundColor: colors.brand.secondary },
  },
  warning: {
    container: { backgroundColor: colors.status.warningBg, borderColor: '#F59E0B4D' },
    text:      { color: '#92400E' },
    dot:       { backgroundColor: '#F59E0B' },
  },
  error: {
    container: { backgroundColor: colors.status.errorBg, borderColor: '#EF44444D' },
    text:      { color: '#DC2626' },
    dot:       { backgroundColor: '#EF4444' },
  },
  info: {
    container: { backgroundColor: colors.status.infoBg, borderColor: `${colors.brand.primary}4D` },
    text:      { color: colors.brand.primaryDark },
    dot:       { backgroundColor: colors.brand.primary },
  },
  brand: {
    container: { backgroundColor: `${colors.brand.primary}1A`, borderColor: `${colors.brand.primary}4D` },
    text:      { color: colors.brand.primaryDark },
    dot:       { backgroundColor: colors.brand.primary },
  },
}

export interface BadgeProps {
  variant?: Variant
  dot?: boolean
  children: React.ReactNode
  style?: ViewStyle
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'neutral', dot, children, style }) => {
  const v = variantStyles[variant]

  return (
    <View style={[styles.container, v.container, style]}>
      {dot && <View style={[styles.dot, v.dot]} />}
      <Text style={[styles.text, v.text]}>{children}</Text>
    </View>
  )
}

Badge.displayName = 'Badge'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 999,
    borderWidth: 1,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
})
