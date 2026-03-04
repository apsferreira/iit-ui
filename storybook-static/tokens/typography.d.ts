/**
 * IIT Design System — Typography Tokens
 * Fonte primária: Inter (headings e body)
 * Fonte mono: JetBrains Mono (código)
 *
 * Para uso web, adicione ao seu CSS global:
 * @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
 */
export declare const typography: {
    readonly fontFamily: {
        readonly sans: readonly ["Inter", "system-ui", "-apple-system", "sans-serif"];
        readonly mono: readonly ["JetBrains Mono", "Fira Code", "Consolas", "monospace"];
    };
    readonly fontSize: {
        readonly xs: "0.75rem";
        readonly sm: "0.875rem";
        readonly base: "1rem";
        readonly lg: "1.125rem";
        readonly xl: "1.25rem";
        readonly '2xl': "1.5rem";
        readonly '3xl': "1.875rem";
        readonly '4xl': "2.25rem";
    };
    readonly fontWeight: {
        readonly normal: "400";
        readonly medium: "500";
        readonly semibold: "600";
        readonly bold: "700";
    };
    readonly lineHeight: {
        readonly tight: "1.25";
        readonly snug: "1.375";
        readonly normal: "1.5";
        readonly relaxed: "1.625";
    };
    readonly letterSpacing: {
        readonly tight: "-0.025em";
        readonly normal: "0em";
        readonly wide: "0.025em";
    };
};
export type Typography = typeof typography;
