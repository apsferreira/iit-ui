import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Select } from './Select'

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
]

describe('Select', () => {
  it('renders label', () => {
    render(<Select label="Category" options={options} />)
    expect(screen.getByText('Category')).toBeDefined()
  })

  it('renders options', () => {
    render(<Select options={options} />)
    expect(screen.getByText('Option A')).toBeDefined()
  })

  it('shows error', () => {
    render(<Select options={options} error="Required" />)
    expect(screen.getByRole('alert')).toBeDefined()
  })
})
