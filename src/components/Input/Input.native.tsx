import * as React from 'react'
import {
  View,
  Text,
  TextInput as RNTextInput,
  StyleSheet,
  type TextInputProps as RNTextInputProps,
  type ViewStyle,
} from 'react-native'
import { colors } from '../../tokens/colors'

export interface InputProps extends RNTextInputProps {
  label?: string
  helperText?: string
  error?: string
  leftElement?: React.ReactNode
  rightElement?: React.ReactNode
  containerStyle?: ViewStyle
}

export const Input = React.forwardRef<RNTextInput, InputProps>(
  (
    { label, helperText, error, leftElement, rightElement, containerStyle, style, ...props },
    ref,
  ) => {
    const [focused, setFocused] = React.useState(false)
    const hasError = Boolean(error)

    return (
      <View style={[styles.wrapper, containerStyle]}>
        {label && <Text style={styles.label}>{label}</Text>}

        <View
          style={[
            styles.inputContainer,
            focused && styles.inputFocused,
            hasError && styles.inputError,
          ]}
        >
          {leftElement && <View style={styles.sideElement}>{leftElement}</View>}

          <RNTextInput
            ref={ref}
            style={[
              styles.input,
              leftElement ? styles.inputWithLeft : undefined,
              rightElement ? styles.inputWithRight : undefined,
              style,
            ]}
            placeholderTextColor={colors.text.muted}
            onFocus={(e) => {
              setFocused(true)
              props.onFocus?.(e)
            }}
            onBlur={(e) => {
              setFocused(false)
              props.onBlur?.(e)
            }}
            accessibilityLabel={label}
            accessibilityHint={helperText}
            {...props}
          />

          {rightElement && <View style={styles.sideElement}>{rightElement}</View>}
        </View>

        {hasError && (
          <Text style={styles.errorText} accessibilityRole="alert">
            {error}
          </Text>
        )}
        {!hasError && helperText && (
          <Text style={styles.helperText}>{helperText}</Text>
        )}
      </View>
    )
  },
)

Input.displayName = 'Input'

const styles = StyleSheet.create({
  wrapper: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: 10,
    backgroundColor: colors.surface.base,
    minHeight: 44,
    paddingHorizontal: 12,
  },
  inputFocused: {
    borderColor: colors.brand.primary,
    shadowColor: colors.brand.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  inputError: {
    borderColor: colors.status.error,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.text.primary,
    paddingVertical: 10,
  },
  inputWithLeft: {
    paddingLeft: 8,
  },
  inputWithRight: {
    paddingRight: 8,
  },
  sideElement: {
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.text.muted,
  },
  errorText: {
    fontSize: 12,
    color: colors.status.error,
  },
  helperText: {
    fontSize: 12,
    color: colors.text.muted,
  },
})
