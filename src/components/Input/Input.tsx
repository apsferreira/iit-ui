import * as React from 'react'
import { cn } from '../../lib'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: string
  leftElement?: React.ReactNode
  rightElement?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, helperText, error, leftElement, rightElement, id, ...props }, ref) => {
    const inputId = id ?? React.useId()
    const hasError = Boolean(error)

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[#0D1B26]"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftElement && (
            <div className="absolute left-3 text-[#8A9FAF] pointer-events-none">
              {leftElement}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            className={cn(
              'w-full rounded-lg border bg-white px-3 py-2 text-sm text-[#0D1B26]',
              'placeholder:text-[#8A9FAF]',
              'transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-[#0097D6] focus:ring-offset-1 focus:ring-offset-white',
              'disabled:opacity-40 disabled:cursor-not-allowed',
              hasError
                ? 'border-red-500/60 focus:ring-red-500'
                : 'border-[#D0DDE6] focus:border-[#0097D6]',
              leftElement && 'pl-9',
              rightElement && 'pr-9',
              className
            )}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3 text-[#8A9FAF]">
              {rightElement}
            </div>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} role="alert" className="text-xs text-red-500">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${inputId}-helper`} className="text-xs text-[#8A9FAF]">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
