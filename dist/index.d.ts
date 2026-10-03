/**
 * @foundathyon/community-ui — Foundathyon Community UI.
 *
 * One design system. Many products. One implementation.
 *
 * Subpath entries (kept out of this barrel so they never weigh on apps that
 * don't use them):
 *   - `@foundathyon/community-ui/charts`
 *   - `@foundathyon/community-ui/docs`
 *   - `@foundathyon/community-ui/email`
 *   - `@foundathyon/community-ui/theme.css` (Tailwind v4) ·
 *     `tokens.css` (tokens only) · `styles.css` (prebuilt, no Tailwind needed) ·
 *     `tailwind-preset` (Tailwind v3)
 */
export * from "./provider";
export * from "./hooks";
export { cn } from "./lib/cn";
export { formatBytes, formatDate, formatDateTime, formatDuration, formatNumber, formatRelativeDate, maskSecret, truncateMiddle, type DateInput, type RelativeDateResult, } from "./lib/format";
export { STATUS, STATUS_KEYS, type StatusKey, type StatusSpec, type StatusTreatment } from "./lib/status";
export type { Density, Product, Size, ThemeChoice, Tone, ToneOrNeutral } from "./lib/types";
export { FOCUS_RING, FOCUS_RING_INSET, FOCUS_RING_INSET_THIN } from "./lib/focus";
export * from "./components/typography";
export * from "./components/layout";
export * from "./components/actions";
export * from "./components/forms";
export * from "./components/feedback";
export * from "./components/overlays";
export * from "./components/navigation";
export * from "./components/data-display";
export * from "./components/data-table";
export * from "./components/dev";
export * from "./components/auth";
export * from "./components/security";
export * from "./components/resource";
