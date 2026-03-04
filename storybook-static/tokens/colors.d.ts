/**
 * IIT Design System — Color Tokens
 * Identidade visual oficial do Instituto Itinerante.
 * Light mode first com suporte a dark mode via surfaceDark.
 */
export declare const colors: {
    readonly brand: {
        readonly primary: "#0097D6";
        readonly primaryLight: "#33ADE0";
        readonly primaryDark: "#006FA3";
        readonly secondary: "#00D6A0";
        readonly secondaryLight: "#33DEB3";
        readonly secondaryDark: "#00A87E";
    };
    readonly surface: {
        readonly base: "#FFFFFF";
        readonly subtle: "#F5F8FA";
        readonly elevated: "#EBF4FB";
        readonly overlay: "rgba(0,0,0,0.4)";
    };
    readonly surfaceDark: {
        readonly base: "#0A0F14";
        readonly subtle: "#111820";
        readonly elevated: "#1A2530";
        readonly overlay: "rgba(0,0,0,0.6)";
    };
    readonly text: {
        readonly primary: "#0D1B26";
        readonly secondary: "#4A6070";
        readonly muted: "#8A9FAF";
        readonly onBrand: "#FFFFFF";
    };
    readonly border: {
        readonly default: "#D0DDE6";
        readonly subtle: "#EBF2F7";
        readonly brand: "#0097D6";
    };
    readonly status: {
        readonly success: "#00D6A0";
        readonly successBg: "#E6FAF5";
        readonly warning: "#F59E0B";
        readonly warningBg: "#FEF3C7";
        readonly error: "#EF4444";
        readonly errorBg: "#FEE2E2";
        readonly info: "#0097D6";
        readonly infoBg: "#EBF4FB";
    };
};
export type Colors = typeof colors;
