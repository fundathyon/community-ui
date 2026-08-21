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
export const FONT_SANS =
  "Inter, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";

/** Mono stack for verifiable content: codes, IPs, tokens, URLs (§03). */
export const FONT_MONO =
  "ui-monospace, 'SF Mono', Menlo, Consolas, monospace";

/** Body copy: 14px / 22px. */
export const TYPE_BODY = { fontSize: "14px", lineHeight: "22px" } as const;

/** Small copy (metadata, footer, hints): 12px / 18px. */
export const TYPE_SMALL = { fontSize: "12px", lineHeight: "18px" } as const;

/** Heading: 20px / 28px, weight 600 (never 700 at this size, §03). */
export const TYPE_HEADING = {
  fontSize: "20px",
  lineHeight: "28px",
  fontWeight: 600,
} as const;

export const palette = {
  /* -- Neutrals — light theme, hue 286 ----------------------------------- */
  /** `--fdn-bg` — oklch(0.983 0.002 286). Canvas behind the card. */
  bg: "#f9f9fb",
  /** `--fdn-bg-subtle` — oklch(0.962 0.003 286). Embedded zones (code box). */
  bgSubtle: "#f2f2f4",
  /** `--fdn-surface` — oklch(1 0 0). The card, secondary button fill. */
  surface: "#ffffff",
  /** `--fdn-border` — oklch(0.905 0.004 286). Default contour + dividers. */
  border: "#dfdfe2",
  /** `--fdn-border-strong` — oklch(0.775 0.006 286). 3:1 contours. */
  borderStrong: "#b5b5b9",
  /** `--fdn-text` — oklch(0.21 0.008 286). Primary content, 17.7:1 on surface. */
  text: "#18181c",
  /** `--fdn-text-secondary` — oklch(0.37 0.01 286). Supporting paragraphs. */
  textSecondary: "#3f3f45",
  /** `--fdn-text-muted` — oklch(0.47 0.012 286). Metadata, footer, hints. */
  textMuted: "#5a5a61",

  /* -- Semantic tetrads — light theme; washes flattened over #ffffff ------ */
  success: {
    /** `--fdn-success-text` — oklch(0.47 0.13 150). */
    text: "#006e30",
    /** `--fdn-success-bg` — oklch(0.55 0.14 150 / 11%) over surface. */
    bg: "#e6f2ea",
    /** `--fdn-success-border` — oklch(0.55 0.14 150 / 30%) over surface. */
    border: "#bbdbc6",
  },
  warning: {
    /** `--fdn-warning-text` — oklch(0.49 0.12 82). */
    text: "#7d5a00",
    /** `--fdn-warning-bg` — oklch(0.62 0.13 82 / 13%) over surface. */
    bg: "#f4eede",
    /** `--fdn-warning-border` — oklch(0.62 0.13 82 / 32%) over surface. */
    border: "#e4d5ad",
  },
  danger: {
    /** `--fdn-danger-text` — oklch(0.5 0.18 25). */
    text: "#b32228",
    /** `--fdn-danger-bg` — oklch(0.55 0.19 25 / 10%) over surface. */
    bg: "#faeaeb",
    /** `--fdn-danger-border` — oklch(0.55 0.19 25 / 30%) over surface. */
    border: "#efc1c2",
  },
  info: {
    /** `--fdn-info-text` — oklch(0.47 0.13 245). */
    text: "#005f98",
    /** `--fdn-info-bg` — oklch(0.55 0.13 245 / 10%) over surface. */
    bg: "#e8f1f8",
    /** `--fdn-info-border` — oklch(0.55 0.13 245 / 30%) over surface. */
    border: "#b9d6ea",
  },

  /* -- Per-product accent solids (§02) — `--fdn-accent-solid` compiled ----
   * oklch(accent-l accent-c accent-hue), sRGB gamut-mapped by chroma
   * reduction (what browsers do). All measured ≥4.6:1 against #ffffff, so
   * white button text keeps the §02 contrast contract. */
  accent: {
    /** vault — oklch(0.56 0.17 45) · 4.97:1 on white. */
    vault: "#bd4d00",
    /** dokgistry — oklch(0.55 0.17 62) · 5.04:1 on white. */
    dokgistry: "#a55d00",
    /** accounts — oklch(0.55 0.105 195) · 4.65:1 on white. */
    accounts: "#008282",
    /** cronify — oklch(0.51 0.14 165) · 5.43:1 on white. */
    cronify: "#007956",
    /** mocky — oklch(0.56 0.17 300) · 5.01:1 on white. */
    mocky: "#8557c8",
  },
} as const;
