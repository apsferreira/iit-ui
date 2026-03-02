import * as React from 'react'
import { cn } from '../../lib'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  helperText?: string
  error?: string
  showCount?: boolean
  maxLength?: number
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, helperText, error, showCount, maxLength, id, value, defaultValue, onChange, ...props }, ref) => {
    const textareaId = id ?? React.useId()
    const hasError = Boolean(error)
    const [count, setCount] = React.useState(() => {
      const initial = value ?? defaultValue ?? ''
      return String(initial).length
    })

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCount(e.target.value.length)
      onChange?.(e)
    }

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-[#0D1B26]">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          aria-invalid={hasError}
          aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          className={cn(
            'w-full rounded-lg border bg-white px-3 py-2 text-sm text-[#0D1B26]',
            'placeholder:text-[#8A9FAF] resize-y min-h-[80px]',
            'transition-colors duration-150',
            'focus:outline-none focus:ring-2 focus:ring-[#0097D6] focus:ring-offset-1 focus:ring-offset-white',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            hasError
              ? 'border-red-500/60 focus:ring-red-500'
              : 'border-[#D0DDE6] focus:border-[#0097D6]',
            className
          )}
          {...props}
        />
        <div className="flex items-start justify-between gap-2">
          <div>
            {error && (
              <p id={`${textareaId}-error`} role="alert" className="text-xs text-red-500">
                {error}
              </p>
            )}
            {!error && helperText && (
              <p id={`${textareaId}-helper`} className="text-xs text-[#8A9FAF]">
                {helperText}
              </p>
            )}
          </div>
          {showCount && (
            <p className={cn('text-xs ml-auto shrink-0', maxLength && count >= maxLength ? 'text-red-500' : 'text-[#8A9FAF]')}>
              {count}{maxLength ? `/${maxLength}` : ''}
            </p>
          )}
        </div>
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
