/**
 * Email theming — one theme object per product, distributed to primitives
 * through React context (safe under `renderToStaticMarkup`; the email layer
 * never uses state or effects).
 */
import { createContext } from "react";
import { palette } from "./palette";
/**
 * Per-product accent presets, compiled from `data-fdn-product` in
 * `src/styles/tokens.css`. Spread one into your `EmailTheme`.
 */
export const emailThemes = {
    vault: { product: "vault", accent: palette.accent.vault },
    dokgistry: { product: "dokgistry", accent: palette.accent.dokgistry },
    accounts: { product: "accounts", accent: palette.accent.accounts },
    cronify: { product: "cronify", accent: palette.accent.cronify },
    mocky: { product: "mocky", accent: palette.accent.mocky },
};
/** Fallback for primitives rendered outside `EmailLayout` (suite brand). */
export const DEFAULT_EMAIL_THEME = {
    productName: "Foundathyon",
    accent: palette.accent.vault,
    accentContrast: "#ffffff",
};
/**
 * Theme context set by `EmailLayout` and consumed by `EmailButton`,
 * `EmailHeader`, `EmailFooter`, etc. Exported so custom primitives can read
 * the active theme; templates never need it directly.
 */
export const EmailThemeContext = createContext(DEFAULT_EMAIL_THEME);
