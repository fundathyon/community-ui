/**
 * Email theming — one theme object per product, distributed to primitives
 * through React context (safe under `renderToStaticMarkup`; the email layer
 * never uses state or effects).
 */
import { createContext } from "react";
import { palette } from "./palette";

/** A labelled link — footer rows, "getting started" lists. */
export interface EmailLink {
  label: string;
  href: string;
}

/**
 * Product theme consumed by every email primitive and template (§27).
 * Spread an `emailThemes` preset and add the product-facing fields:
 * `{ ...emailThemes.accounts, productName: "Accounts", address: "…" }`.
 */
export interface EmailTheme {
  /** Product id, e.g. `"vault"`. Informational; presets fill it in. */
  product?: string;
  /** Name shown in the header when no `logoUrl` is given, and in defaults. */
  productName: string;
  /** Accent solid hex for CTAs and links (compiled `--fdn-accent-solid`). */
  accent: string;
  /** Text color on the accent. Defaults to `#ffffff` (§02 ≥5:1 contract). */
  accentContrast?: string;
  /** Absolute logo URL. Emails must survive blocked images — `productName` is the alt. */
  logoUrl?: string;
  /** Product base URL, for callers composing absolute links. */
  baseUrl?: string;
  /** Footer link row (privacy, security, docs). */
  footerLinks?: EmailLink[];
  /** Postal/legal address line in the footer. */
  address?: string;
}

/** The five Community products with a reserved accent hue (§02). */
export type EmailProduct =
  | "vault"
  | "dokgistry"
  | "accounts"
  | "cronify"
  | "mocky";

/** What a preset provides — the product only adds name, logo and footer. */
export type EmailThemePreset = Pick<EmailTheme, "accent" | "product">;

/**
 * Per-product accent presets, compiled from `data-fdn-product` in
 * `src/styles/tokens.css`. Spread one into your `EmailTheme`.
 */
export const emailThemes: Record<EmailProduct, EmailThemePreset> = {
  vault: { product: "vault", accent: palette.accent.vault },
  dokgistry: { product: "dokgistry", accent: palette.accent.dokgistry },
  accounts: { product: "accounts", accent: palette.accent.accounts },
  cronify: { product: "cronify", accent: palette.accent.cronify },
  mocky: { product: "mocky", accent: palette.accent.mocky },
};

/** Fallback for primitives rendered outside `EmailLayout` (suite brand). */
export const DEFAULT_EMAIL_THEME: EmailTheme = {
  productName: "Foundathyon",
  accent: palette.accent.vault,
  accentContrast: "#ffffff",
};

/**
 * Theme context set by `EmailLayout` and consumed by `EmailButton`,
 * `EmailHeader`, `EmailFooter`, etc. Exported so custom primitives can read
 * the active theme; templates never need it directly.
 */
export const EmailThemeContext = createContext<EmailTheme>(DEFAULT_EMAIL_THEME);
