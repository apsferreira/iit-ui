import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset',
  {
    variants: {
      variant: {
        neutral: 'bg-[#F5F8FA] text-[#4A6070] ring-[#D0DDE6]',
        success: 'bg-[#E6FAF5] text-[#00A87E] ring-[#00D6A0]/30',
        warning: 'bg-[#FEF3C7] text-amber-700 ring-amber-500/30',
        error:   'bg-[#FEE2E2] text-red-600 ring-red-500/30',
        info:    'bg-[#EBF4FB] text-[#006FA3] ring-[#0097D6]/30',
        brand:   'bg-[#0097D6]/10 text-[#006FA3] ring-[#0097D6]/30',
      },
    },
    defaultVariants: {
      variant: 'neutral',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, dot, children, ...props }, ref) => {
    const dotColors: Record<string, string> = {
      neutral: 'bg-[#8A9FAF]',
      success: 'bg-[#00D6A0]',
      warning: 'bg-amber-400',
      error: 'bg-red-400',
      info: 'bg-[#0097D6]',
      brand: 'bg-[#0097D6]',
    }

    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      >
        {dot && (
          <span
            className={cn('h-1.5 w-1.5 rounded-full', dotColors[variant ?? 'neutral'])}
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'
export { badgeVariants }
