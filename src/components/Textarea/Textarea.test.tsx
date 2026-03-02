import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Textarea } from './Textarea'

describe('Textarea', () => {
  it('renders label', () => {
    render(<Textarea label="Notes" />)
    expect(screen.getByText('Notes')).toBeDefined()
  })

  it('shows error', () => {
    render(<Textarea error="Too short" />)
    expect(screen.getByRole('alert')).toBeDefined()
  })

  it('shows character count', () => {
    render(<Textarea showCount maxLength={100} defaultValue="hello" />)
    expect(screen.getByText('5/100')).toBeDefined()
  })

  it('updates count on input', () => {
    render(<Textarea showCount />)
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'hi there' } })
    expect(screen.getByText('8')).toBeDefined()
  })
})
