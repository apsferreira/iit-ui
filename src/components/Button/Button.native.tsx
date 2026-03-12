import * as React from 'react'
import {
  Pressable,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  type PressableProps,
  type ViewStyle,
  type TextStyle,
} from 'react-native'
import { colors } from '../../tokens/colors'

// ── Variantes ────────────────────────────────────────────────────────────────

type Variant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'destructive'
type Size = 'sm' | 'md' | 'lg'

const containerStyles: Record<Variant, ViewStyle> = {
  primary:     { backgroundColor: colors.brand.primary },
  secondary:   { backgroundColor: colors.surface.subtle, borderWidth: 1, borderColor: colors.border.default },
  accent:      { backgroundColor: colors.brand.secondary },
  ghost:       { backgroundColor: 'transparent' },
  destructive: { backgroundColor: '#FEE2E2', borderWidth: 1, borderColor: '#FECACA' },
}

const pressedStyles: Record<Variant, ViewStyle> = {
  primary:     { backgroundColor: colors.brand.primaryDark },
  secondary:   { backgroundColor: colors.surface.elevated, borderColor: colors.brand.primary },
  accent:      { backgroundColor: colors.brand.secondaryDark },
  ghost:       { backgroundColor: colors.surface.subtle },
  destructive: { backgroundColor: '#FECACA' },
}

const textStyles: Record<Variant, TextStyle> = {
  primary:     { color: colors.text.onBrand },
  secondary:   { color: colors.text.primary },
  accent:      { color: colors.text.onBrand },
  ghost:       { color: colors.text.secondary },
  destructive: { color: '#DC2626' },
}

const sizeContainerStyles: Record<Size, ViewStyle> = {
  sm: { height: 32, paddingHorizontal: 12, borderRadius: 8 },
  md: { height: 40, paddingHorizontal: 16, borderRadius: 10 },
  lg: { height: 48, paddingHorizontal: 24, borderRadius: 12 },
}

const sizeTextStyles: Record<Size, TextStyle> = {
  sm: { fontSize: 12, lineHeight: 16 },
  md: { fontSize: 14, lineHeight: 20 },
  lg: { fontSize: 16, lineHeight: 24 },
}

// ── Props ─────────────────────────────────────────────────────────────────────

export interface ButtonProps extends Omit<PressableProps, 'style'> {
  variant?: Variant
  size?: Size
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  children: React.ReactNode
  style?: ViewStyle
}

// ── Component ─────────────────────────────────────────────────────────────────

export const Button = React.forwardRef<View, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      style,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading

    return (
      <Pressable
        ref={ref}
        disabled={isDisabled}
        accessibilityRole="button"
        accessibilityState={{ disabled: isDisabled, busy: isLoading }}
        style={({ pressed }) => [
          styles.base,
          containerStyles[variant],
          sizeContainerStyles[size],
          pressed && !isDisabled && pressedStyles[variant],
          isDisabled && styles.disabled,
          style,
        ]}
        {...props}
      >
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color={variant === 'secondary' || variant === 'ghost' ? colors.brand.primary : colors.text.onBrand}
          />
        ) : (
          <>
            {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
            <Text style={[styles.text, textStyles[variant], sizeTextStyles[size]]}>
              {children}
            </Text>
            {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
          </>
        )}
      </Pressable>
    )
  },
)

Button.displayName = 'Button'

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  text: {
    fontWeight: '600',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.4,
  },
})
