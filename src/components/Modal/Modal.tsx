import * as React from 'react'
import { cn } from '../../lib'

export interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children?: React.ReactNode
  className?: string
  /** Size of the modal dialog */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Hide the default close button */
  hideCloseButton?: boolean
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  description,
  children,
  className,
  size = 'md',
  hideCloseButton = false,
}) => {
  const dialogRef = React.useRef<HTMLDivElement>(null)
  const titleId = React.useId()
  const descId = React.useId()

  // Focus trap
  React.useEffect(() => {
    if (!open) return

    const dialog = dialogRef.current
    if (!dialog) return

    const focusableSelectors = [
      'button:not([disabled])',
      'a[href]',
      'input:not([disabled])',
      'textarea:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ')

    const focusableElements = dialog.querySelectorAll<HTMLElement>(focusableSelectors)
    const first = focusableElements[0]
    const last = focusableElements[focusableElements.length - 1]

    first?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      if (focusableElements.length === 0) {
        e.preventDefault()
        return
      }

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  // Lock body scroll
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descId : undefined}
        className={cn(
          'relative z-10 w-full rounded-xl border border-[#D0DDE6] bg-white',
          'shadow-2xl shadow-black/10',
          'animate-[fadeIn_0.15s_ease-out]',
          sizeClasses[size],
          className
        )}
        style={{
          animation: 'iit-fadeIn 0.15s ease-out',
        }}
      >
        {(title || !hideCloseButton) && (
          <div className="flex items-start justify-between gap-4 p-6 pb-4">
            <div>
              {title && (
                <h2 id={titleId} className="text-lg font-semibold text-[#0D1B26]">
                  {title}
                </h2>
              )}
              {description && (
                <p id={descId} className="mt-1 text-sm text-[#4A6070]">
                  {description}
                </p>
              )}
            </div>
            {!hideCloseButton && (
              <button
                onClick={onClose}
                aria-label="Close dialog"
                className={cn(
                  'shrink-0 rounded-lg p-1.5 text-[#8A9FAF]',
                  'hover:bg-[#F5F8FA] hover:text-[#0D1B26]',
                  'transition-colors duration-150',
                  'focus:outline-none focus:ring-2 focus:ring-[#0097D6]'
                )}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        )}
        <div className="px-6 pb-6">{children}</div>
      </div>
    </div>
  )
}

Modal.displayName = 'Modal'
