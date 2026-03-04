import * as React from 'react';
export interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children?: React.ReactNode;
    className?: string;
    /** Size of the modal dialog */
    size?: 'sm' | 'md' | 'lg' | 'xl';
    /** Hide the default close button */
    hideCloseButton?: boolean;
}
export declare const Modal: React.FC<ModalProps>;
