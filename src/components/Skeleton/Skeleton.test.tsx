import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Skeleton } from './Skeleton'

describe('Skeleton', () => {
  it('renders with aria-hidden', () => {
    const { container } = render(<Skeleton />)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute('aria-hidden')).toBe('true')
  })

  it('applies circle variant', () => {
    const { container } = render(<Skeleton variant="circle" width={40} height={40} />)
    const el = container.firstChild as HTMLElement
    expect(el.className).toContain('rounded-full')
  })

  it('applies custom dimensions', () => {
    const { container } = render(<Skeleton width={200} height={100} />)
    const el = container.firstChild as HTMLElement
    expect(el.style.width).toBe('200px')
    expect(el.style.height).toBe('100px')
  })
})
