import * as React from 'react'
import {
  Modal as RNModal,
  View,
  Text,
  Pressable,
  StyleSheet,
  type ViewStyle,
} from 'react-native'
import { colors } from '../../tokens/colors'

export interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children?: React.ReactNode
  /** sm=320 | md=480 | lg=600 | xl=full */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  hideCloseButton?: boolean
  style?: ViewStyle
}

const sizeMaxWidth: Record<NonNullable<ModalProps['size']>, number | '100%'> = {
  sm: 320,
  md: 480,
  lg: 600,
  xl: '100%',
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  description,
  children,
  size = 'md',
  hideCloseButton = false,
  style,
}) => {
  const maxWidth = sizeMaxWidth[size]

  return (
    <RNModal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* Overlay */}
      <Pressable style={styles.overlay} onPress={onClose} accessibilityRole="none">
        {/* Dialog — stop propagation so tap inside doesn't close */}
        <Pressable
          style={[styles.dialog, { maxWidth }, style]}
          onPress={(e) => e.stopPropagation()}
          accessibilityRole="none"
        >
          {/* Header */}
          {(title || !hideCloseButton) && (
            <View style={styles.header}>
              <View style={styles.headerText}>
                {title && <Text style={styles.title}>{title}</Text>}
                {description && <Text style={styles.description}>{description}</Text>}
              </View>

              {!hideCloseButton && (
                <Pressable
                  onPress={onClose}
                  style={({ pressed }) => [styles.closeBtn, pressed && styles.closeBtnPressed]}
                  accessibilityRole="button"
                  accessibilityLabel="Fechar"
                  hitSlop={8}
                >
                  <Text style={styles.closeIcon}>✕</Text>
                </Pressable>
              )}
            </View>
          )}

          {/* Body */}
          <View style={styles.body}>{children}</View>
        </Pressable>
      </Pressable>
    </RNModal>
  )
}

Modal.displayName = 'Modal'

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  dialog: {
    width: '100%',
    borderRadius: 16,
    backgroundColor: colors.surface.base,
    borderWidth: 1,
    borderColor: colors.border.default,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  headerText: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text.primary,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnPressed: {
    backgroundColor: colors.surface.subtle,
  },
  closeIcon: {
    fontSize: 14,
    color: colors.text.muted,
    lineHeight: 16,
  },
  body: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
})
