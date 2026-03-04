import { StoryObj } from '@storybook/react';

declare const meta: {
    title: string;
    component: import('../../../node_modules/react').ForwardRefExoticComponent<import('./Skeleton').SkeletonProps & import('../../../node_modules/react').RefAttributes<HTMLDivElement>>;
    tags: string[];
    argTypes: {
        variant: {
            control: "select";
            options: string[];
            description: string;
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        width: {
            control: "text";
            description: string;
        };
        height: {
            control: "text";
            description: string;
        };
    };
    args: {
        variant: "block";
        width: number;
        height: number;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Block: Story;
export declare const Text: Story;
export declare const Circle: Story;
export declare const CardSkeleton: Story;
export declare const ListSkeleton: Story;
