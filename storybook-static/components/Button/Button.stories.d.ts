import { StoryObj } from '@storybook/react';

declare const meta: {
    title: string;
    component: import('../../../node_modules/react').ForwardRefExoticComponent<import('./Button').ButtonProps & import('../../../node_modules/react').RefAttributes<HTMLButtonElement>>;
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
        size: {
            control: "select";
            options: string[];
            description: string;
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        isLoading: {
            control: "boolean";
            description: string;
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        disabled: {
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
        variant: "primary";
        size: "md";
        isLoading: false;
        disabled: false;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Primary: Story;
export declare const Secondary: Story;
export declare const Ghost: Story;
export declare const Destructive: Story;
export declare const Accent: Story;
export declare const Small: Story;
export declare const Medium: Story;
export declare const Large: Story;
export declare const WithLeftIcon: Story;
export declare const WithRightIcon: Story;
export declare const Loading: Story;
export declare const Disabled: Story;
export declare const AllVariants: Story;
