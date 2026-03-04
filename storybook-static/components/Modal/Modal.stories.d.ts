import { StoryObj } from '@storybook/react';

declare const meta: {
    title: string;
    component: import('../../../node_modules/react').FC<import('./Modal').ModalProps>;
    tags: string[];
    argTypes: {
        open: {
            control: "boolean";
            description: string;
        };
        title: {
            control: "text";
            description: string;
        };
        description: {
            control: "text";
            description: string;
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
        hideCloseButton: {
            control: "boolean";
            description: string;
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
    };
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Small: Story;
export declare const Medium: Story;
export declare const Large: Story;
export declare const XLarge: Story;
