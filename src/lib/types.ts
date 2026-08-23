/**
 * Shared prop vocabulary (§18 of the design system).
 *
 * - `variant` — meaning: primary · secondary · ghost · destructive.
 * - `size`    — always `xs · sm · md · lg`, in every component.
 * - `tone`    — semantics of the content: info · success · warning · danger.
 *
 * Booleans are positive and present-tense (`disabled`, `loading`, `invalid`,
 * `selected`). Slots are named by position (`leading`, `trailing`, `footer`).
 * Handlers are `on{Event}`; controlled values are always `value`/`onChange`.
 *
 * Hard limit: past 8 props or 4 variants, split the component in two.
 */

/** Control sizes (§04): xs 24 · sm 28 (compact default) · md 32 · lg 44. */
export type Size = "xs" | "sm" | "md" | "lg";

/** Semantic tone — state semantics only. NEVER use the product accent for state. */
export type Tone = "info" | "success" | "warning" | "danger";

/** Tone extended with neutral, for components that also render non-semantic content. */
export type ToneOrNeutral = Tone | "neutral";

/** Density (§08): compact (28px controls) for fine pointers — the suite default —
 * or comfortable (44px) for touch/onboarding contexts. */
export type Density = "compact" | "comfortable";

/** Theme choice — `system` follows `prefers-color-scheme`. Dark is design-first. */
export type ThemeChoice = "dark" | "light" | "system";

/** The five Community products. The accent is the product (§02). */
export type Product = "vault" | "dokgistry" | "accounts" | "cronify" | "mocky";
