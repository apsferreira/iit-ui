import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib'

const skeletonVariants = cva(
  'animate-pulse bg-[#1E1E28]',
  {
    variants: {
      variant: {
        block: 'rounded-lg',
        text: 'rounded h-4',
        circle: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'block',
    },
  }
)

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  width?: string | number
  height?: string | number
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, width, height, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(skeletonVariants({ variant }), className)}
        style={{
          width: width !== undefined ? (typeof width === 'number' ? `${width}px` : width) : undefined,
          height: height !== undefined ? (typeof height === 'number' ? `${height}px` : height) : undefined,
          ...style,
        }}
        {...props}
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'
export { skeletonVariants }
