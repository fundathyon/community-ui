import type { Locale } from "date-fns";
export type DateInput = Date | string | number;
/** "142 MB", "44.5 GB" — readable byte units, one decimal above MB. */
export declare function formatBytes(bytes: number): string;
/** "1 m 42 s", "14 s", "2 h 05 m" — durations in readable units (§21). */
export declare function formatDuration(ms: number): string;
/** Grouped integer for tabular columns — "2 481" (narrow spaces, es-ES). */
export declare function formatNumber(value: number, locale?: string): string;
/** Absolute date — "7 ago 2026". */
export declare function formatDate(input: DateInput, locale?: Locale): string;
/** Absolute date-time — "21 ago 2026, 09:14". */
export declare function formatDateTime(input: DateInput, locale?: Locale): string;
export interface RelativeDateResult {
    /** What to render: relative under 7 days ("hace 2 h"), absolute after. */
    display: string;
    /** Always the absolute form — put it in the tooltip (§17). */
    absolute: string;
    relative: boolean;
}
/** Relative up to 7 days, absolute afterwards; absolute always available for
 * the tooltip. This is the `relative-date` cell of the catalog (§21). */
export declare function formatRelativeDate(input: DateInput, locale?: Locale): RelativeDateResult;
/** "sha256:4a3ed8…9f21" — truncated middle keeping both ends verifiable.
 * The full value must remain the one that gets copied — never the ellipsis. */
export declare function truncateMiddle(value: string, head?: number, tail?: number): string;
/** Mask a secret: keep a short prefix/suffix, fixed-width mask in between —
 * "sk_live_de96••••••••••••j87TzX" (§20 sensitive values). */
export declare function maskSecret(value: string, prefix?: number, suffix?: number): string;
