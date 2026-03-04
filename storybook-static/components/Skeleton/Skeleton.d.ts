import { VariantProps } from 'class-variance-authority';
import * as React from 'react';
declare const skeletonVariants: (props?: ({
    variant?: "text" | "circle" | "block" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonVariants> {
    width?: string | number;
    height?: string | number;
}
export declare const Skeleton: React.ForwardRefExoticComponent<SkeletonProps & React.RefAttributes<HTMLDivElement>>;
export { skeletonVariants };
