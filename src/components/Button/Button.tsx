import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium',
    'transition-all duration-150 focus-visible:outline-none',
    'focus-visible:ring-2 focus-visible:ring-[#0097D6] focus-visible:ring-offset-2 focus-visible:ring-offset-white',
    'disabled:pointer-events-none disabled:opacity-40',
    'select-none',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-[#0097D6] text-white',
          'hover:bg-[#006FA3] active:bg-[#005A8A]',
          'shadow-sm shadow-[#0097D6]/30',
        ],
        secondary: [
          'bg-[#F5F8FA] text-[#0D1B26] border border-[#D0DDE6]',
          'hover:bg-[#EBF4FB] hover:border-[#0097D6] active:bg-[#D0DDE6]',
        ],
        accent: [
          'bg-[#00D6A0] text-white',
          'hover:bg-[#00A87E] active:bg-[#008A68]',
          'shadow-sm shadow-[#00D6A0]/30',
        ],
        ghost: [
          'text-[#4A6070]',
          'hover:bg-[#F5F8FA] hover:text-[#0D1B26] active:bg-[#EBF4FB]',
        ],
        destructive: [
          'bg-red-500/10 text-red-600 border border-red-500/20',
          'hover:bg-red-500/20 hover:border-red-500/40 active:bg-red-500/30',
        ],
      },
      size: {
        sm: 'h-7 px-3 text-xs',
        md: 'h-9 px-4 text-sm',
        lg: 'h-11 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : leftIcon}
        {children}
        {!isLoading && rightIcon}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { buttonVariants }
