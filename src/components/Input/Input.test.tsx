import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Input } from './Input'

describe('Input', () => {
  it('renders label', () => {
    render(<Input label="Email" />)
    expect(screen.getByText('Email')).toBeDefined()
  })

  it('shows error message', () => {
    render(<Input error="Required field" />)
    expect(screen.getByRole('alert')).toBeDefined()
    expect(screen.getByText('Required field')).toBeDefined()
  })

  it('marks input as invalid when error exists', () => {
    render(<Input error="Error" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('shows helper text when no error', () => {
    render(<Input helperText="Enter your email" />)
    expect(screen.getByText('Enter your email')).toBeDefined()
  })
})
