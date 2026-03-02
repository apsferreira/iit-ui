import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>Active</Badge>)
    expect(screen.getByText('Active')).toBeDefined()
  })

  it('applies success variant classes', () => {
    render(<Badge variant="success">OK</Badge>)
    expect(screen.getByText('OK').className).toContain('text-emerald-400')
  })

  it('renders dot indicator', () => {
    const { container } = render(<Badge dot>Online</Badge>)
    const dot = container.querySelector('[aria-hidden="true"]')
    expect(dot).toBeDefined()
  })
})
