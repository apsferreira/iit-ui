import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Modal } from './Modal'

describe('Modal', () => {
  it('does not render when closed', () => {
    render(<Modal open={false} onClose={() => {}}>Content</Modal>)
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('renders when open', () => {
    render(<Modal open={true} onClose={() => {}}>Content</Modal>)
    expect(screen.getByRole('dialog')).toBeDefined()
    expect(screen.getByText('Content')).toBeDefined()
  })

  it('calls onClose when close button clicked', () => {
    const onClose = vi.fn()
    render(<Modal open={true} onClose={onClose} title="Test">Content</Modal>)
    fireEvent.click(screen.getByLabelText('Close dialog'))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onClose when overlay clicked', () => {
    const onClose = vi.fn()
    render(<Modal open={true} onClose={onClose}>Content</Modal>)
    const overlay = document.querySelector('[aria-hidden="true"]') as HTMLElement
    fireEvent.click(overlay)
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('renders title and description', () => {
    render(
      <Modal open={true} onClose={() => {}} title="Hello" description="World">
        Content
      </Modal>
    )
    expect(screen.getByText('Hello')).toBeDefined()
    expect(screen.getByText('World')).toBeDefined()
  })
})
