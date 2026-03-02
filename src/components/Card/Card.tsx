import * as React from 'react'
import { cn } from '../../lib'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Add a subtle border glow on hover */
  hoverable?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-xl border border-[#2A2A38] bg-[#111118] text-[#F4F4F8]',
        'shadow-sm shadow-black/40',
        hoverable && 'transition-colors duration-150 hover:border-[#3A3A50] hover:bg-[#18181F]',
        className
      )}
      {...props}
    />
  )
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col gap-1.5 p-6 pb-0', className)}
      {...props}
    />
  )
)
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-lg font-semibold leading-tight tracking-tight text-[#F4F4F8]', className)}
      {...props}
    />
  )
)
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-[#A1A1B5]', className)}
      {...props}
    />
  )
)
CardDescription.displayName = 'CardDescription'

const CardBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6', className)} {...props} />
  )
)
CardBody.displayName = 'CardBody'

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center px-6 py-4 pt-0',
        className
      )}
      {...props}
    />
  )
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardBody, CardFooter }
