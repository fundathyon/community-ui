/**
 * Email palette — compiled hex snapshots of the design tokens (§02, §27).
 *
 * Email clients cannot read CSS custom properties or `oklch()`, so this file
 * is the ONE sanctioned hardcode exception in the package: every hex below is
 * the sRGB compilation of a `--fdn-*` token from `src/styles/tokens.css`,
 * light theme (email is always light, §27 — client dark modes invert colors
 * unpredictably). Alpha washes are flattened over `--fdn-surface` (#ffffff)
 * because email needs opaque colors.
 *
 * INTERNAL — not exported from the email barrel. Regenerate when tokens.css
 * changes; never tweak a hex by hand.
 */
/** Interface font stack — Inter with safe email fallbacks. */
export declare const FONT_SANS = "Inter, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";
/** Mono stack for verifiable content: codes, IPs, tokens, URLs (§03). */
export declare const FONT_MONO = "ui-monospace, 'SF Mono', Menlo, Consolas, monospace";
/** Body copy: 14px / 22px. */
export declare const TYPE_BODY: {
    readonly fontSize: "14px";
    readonly lineHeight: "22px";
};
/** Small copy (metadata, footer, hints): 12px / 18px. */
export declare const TYPE_SMALL: {
    readonly fontSize: "12px";
    readonly lineHeight: "18px";
};
/** Heading: 20px / 28px, weight 600 (never 700 at this size, §03). */
export declare const TYPE_HEADING: {
    readonly fontSize: "20px";
    readonly lineHeight: "28px";
    readonly fontWeight: 600;
};
export declare const palette: {
    /** `--fdn-bg` — oklch(0.983 0.002 286). Canvas behind the card. */
    readonly bg: "#f9f9fb";
    /** `--fdn-bg-subtle` — oklch(0.962 0.003 286). Embedded zones (code box). */
    readonly bgSubtle: "#f2f2f4";
    /** `--fdn-surface` — oklch(1 0 0). The card, secondary button fill. */
    readonly surface: "#ffffff";
    /** `--fdn-border` — oklch(0.905 0.004 286). Default contour + dividers. */
    readonly border: "#dfdfe2";
    /** `--fdn-border-strong` — oklch(0.775 0.006 286). 3:1 contours. */
    readonly borderStrong: "#b5b5b9";
    /** `--fdn-text` — oklch(0.21 0.008 286). Primary content, 17.7:1 on surface. */
    readonly text: "#18181c";
    /** `--fdn-text-secondary` — oklch(0.37 0.01 286). Supporting paragraphs. */
    readonly textSecondary: "#3f3f45";
    /** `--fdn-text-muted` — oklch(0.47 0.012 286). Metadata, footer, hints. */
    readonly textMuted: "#5a5a61";
    readonly success: {
        /** `--fdn-success-text` — oklch(0.47 0.13 150). */
        readonly text: "#006e30";
        /** `--fdn-success-bg` — oklch(0.55 0.14 150 / 11%) over surface. */
        readonly bg: "#e6f2ea";
        /** `--fdn-success-border` — oklch(0.55 0.14 150 / 30%) over surface. */
        readonly border: "#bbdbc6";
    };
    readonly warning: {
        /** `--fdn-warning-text` — oklch(0.49 0.12 82). */
        readonly text: "#7d5a00";
        /** `--fdn-warning-bg` — oklch(0.62 0.13 82 / 13%) over surface. */
        readonly bg: "#f4eede";
        /** `--fdn-warning-border` — oklch(0.62 0.13 82 / 32%) over surface. */
        readonly border: "#e4d5ad";
    };
    readonly danger: {
        /** `--fdn-danger-text` — oklch(0.5 0.18 25). */
        readonly text: "#b32228";
        /** `--fdn-danger-bg` — oklch(0.55 0.19 25 / 10%) over surface. */
        readonly bg: "#faeaeb";
        /** `--fdn-danger-border` — oklch(0.55 0.19 25 / 30%) over surface. */
        readonly border: "#efc1c2";
    };
    readonly info: {
        /** `--fdn-info-text` — oklch(0.47 0.13 245). */
        readonly text: "#005f98";
        /** `--fdn-info-bg` — oklch(0.55 0.13 245 / 10%) over surface. */
        readonly bg: "#e8f1f8";
        /** `--fdn-info-border` — oklch(0.55 0.13 245 / 30%) over surface. */
        readonly border: "#b9d6ea";
    };
    readonly accent: {
        /** vault — oklch(0.56 0.17 45) · 4.97:1 on white. */
        readonly vault: "#bd4d00";
        /** dokgistry — oklch(0.55 0.17 62) · 5.04:1 on white. */
        readonly dokgistry: "#a55d00";
        /** accounts — oklch(0.55 0.105 195) · 4.65:1 on white. */
        readonly accounts: "#008282";
        /** cronify — oklch(0.51 0.14 165) · 5.43:1 on white. */
        readonly cronify: "#007956";
        /** mocky — oklch(0.56 0.17 300) · 5.01:1 on white. */
        readonly mocky: "#8557c8";
    };
};
