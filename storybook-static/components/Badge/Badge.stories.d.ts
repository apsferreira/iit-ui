import { StoryObj } from '@storybook/react';

declare const meta: {
    title: string;
    component: import('../../../node_modules/react').ForwardRefExoticComponent<import('./Badge').BadgeProps & import('../../../node_modules/react').RefAttributes<HTMLSpanElement>>;
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
        dot: {
            control: "boolean";
            description: string;
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        children: {
            control: "text";
            description: string;
        };
    };
    args: {
        children: string;
        variant: "neutral";
        dot: false;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Neutral: Story;
export declare const Success: Story;
export declare const Warning: Story;
export declare const Error: Story;
export declare const Info: Story;
export declare const Brand: Story;
export declare const WithDot: Story;
export declare const AllVariants: Story;
