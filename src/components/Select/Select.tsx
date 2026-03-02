import * as React from 'react'
import { cn } from '../../lib'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  helperText?: string
  error?: string
  options?: SelectOption[]
  placeholder?: string
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, helperText, error, options, placeholder, id, children, ...props }, ref) => {
    const selectId = id ?? React.useId()
    const hasError = Boolean(error)

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-[#0D1B26]">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            aria-invalid={hasError}
            aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
            className={cn(
              'w-full appearance-none rounded-lg border bg-white px-3 py-2 pr-9 text-sm text-[#0D1B26]',
              'transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-[#0097D6] focus:ring-offset-1 focus:ring-offset-white',
              'disabled:opacity-40 disabled:cursor-not-allowed',
              hasError
                ? 'border-red-500/60 focus:ring-red-500'
                : 'border-[#D0DDE6] focus:border-[#0097D6]',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>
          {/* Chevron icon */}
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#8A9FAF]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
        {error && (
          <p id={`${selectId}-error`} role="alert" className="text-xs text-red-500">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${selectId}-helper`} className="text-xs text-[#8A9FAF]">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
