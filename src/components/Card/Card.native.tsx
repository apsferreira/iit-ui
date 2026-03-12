import * as React from 'react'
import { View, Text, StyleSheet, type ViewStyle, type TextStyle } from 'react-native'
import { colors } from '../../tokens/colors'

// ── Card ─────────────────────────────────────────────────────────────────────

export interface CardProps {
  children?: React.ReactNode
  style?: ViewStyle
}

export const Card: React.FC<CardProps> = ({ children, style }) => (
  <View style={[styles.card, style]}>{children}</View>
)
Card.displayName = 'Card'

// ── CardHeader ───────────────────────────────────────────────────────────────

export interface CardHeaderProps {
  children?: React.ReactNode
  style?: ViewStyle
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, style }) => (
  <View style={[styles.header, style]}>{children}</View>
)
CardHeader.displayName = 'CardHeader'

// ── CardTitle ────────────────────────────────────────────────────────────────

export interface CardTitleProps {
  children?: React.ReactNode
  style?: TextStyle
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, style }) => (
  <Text style={[styles.title, style]}>{children}</Text>
)
CardTitle.displayName = 'CardTitle'

// ── CardDescription ──────────────────────────────────────────────────────────

export interface CardDescriptionProps {
  children?: React.ReactNode
  style?: TextStyle
}

export const CardDescription: React.FC<CardDescriptionProps> = ({ children, style }) => (
  <Text style={[styles.description, style]}>{children}</Text>
)
CardDescription.displayName = 'CardDescription'

// ── CardBody ─────────────────────────────────────────────────────────────────

export interface CardBodyProps {
  children?: React.ReactNode
  style?: ViewStyle
}

export const CardBody: React.FC<CardBodyProps> = ({ children, style }) => (
  <View style={[styles.body, style]}>{children}</View>
)
CardBody.displayName = 'CardBody'

// ── CardFooter ───────────────────────────────────────────────────────────────

export interface CardFooterProps {
  children?: React.ReactNode
  style?: ViewStyle
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, style }) => (
  <View style={[styles.footer, style]}>{children}</View>
)
CardFooter.displayName = 'CardFooter'

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border.default,
    backgroundColor: colors.surface.base,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  } as ViewStyle,
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 0,
    gap: 4,
  } as ViewStyle,
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    lineHeight: 22,
    letterSpacing: -0.2,
  } as TextStyle,
  description: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  } as TextStyle,
  body: {
    padding: 16,
  } as ViewStyle,
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  } as ViewStyle,
})
