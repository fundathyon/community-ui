import { differenceInDays, format as formatDateFns, formatDistanceToNowStrict } from "date-fns";
import { es } from "date-fns/locale";
import type { Locale } from "date-fns";

/**
 * Data formatters shared across the suite (§21 cell catalog, §17 copy rules).
 * Dates: relative up to 7 days ("hace 2 h"), absolute afterwards, with the
 * absolute value available for tooltips. Durations in readable units, never
 * raw milliseconds. Numbers always meant for `tabular-nums` columns.
 */

const DEFAULT_LOCALE = es;

export type DateInput = Date | string | number;

function toDate(input: DateInput): Date {
  return input instanceof Date ? input : new Date(input);
}

/** "142 MB", "44.5 GB" — readable byte units, one decimal above MB. */
export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "—";
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** i;
  const rounded = i >= 3 ? value.toFixed(1) : Math.round(value).toString();
  return `${rounded.replace(/\.0$/, "")} ${units[i]}`;
}

/** "1 m 42 s", "14 s", "2 h 05 m" — durations in readable units (§21). */
export function formatDuration(ms: number): string {
  if (!Number.isFinite(ms) || ms < 0) return "—";
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s} s`;
  const m = Math.floor(s / 60);
  const rs = s % 60;
  if (m < 60) return rs > 0 ? `${m} m ${String(rs).padStart(2, "0")} s` : `${m} m`;
  const h = Math.floor(m / 60);
  const rm = m % 60;
  return rm > 0 ? `${h} h ${String(rm).padStart(2, "0")} m` : `${h} h`;
}

/** Grouped integer for tabular columns — "2 481" (narrow spaces, es-ES). */
export function formatNumber(value: number, locale = "es-ES"): string {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat(locale).format(value);
}

/** Absolute date — "7 ago 2026". */
export function formatDate(input: DateInput, locale: Locale = DEFAULT_LOCALE): string {
  return formatDateFns(toDate(input), "d MMM yyyy", { locale });
}

/** Absolute date-time — "21 ago 2026, 09:14". */
export function formatDateTime(input: DateInput, locale: Locale = DEFAULT_LOCALE): string {
  return formatDateFns(toDate(input), "d MMM yyyy, HH:mm", { locale });
}

export interface RelativeDateResult {
  /** What to render: relative under 7 days ("hace 2 h"), absolute after. */
  display: string;
  /** Always the absolute form — put it in the tooltip (§17). */
  absolute: string;
  relative: boolean;
}

/** Relative up to 7 days, absolute afterwards; absolute always available for
 * the tooltip. This is the `relative-date` cell of the catalog (§21). */
export function formatRelativeDate(input: DateInput, locale: Locale = DEFAULT_LOCALE): RelativeDateResult {
  const date = toDate(input);
  const absolute = formatDateTime(date, locale);
  if (Math.abs(differenceInDays(new Date(), date)) < 7) {
    const distance = formatDistanceToNowStrict(date, { locale, addSuffix: true });
    return { display: distance, absolute, relative: true };
  }
  return { display: formatDate(date, locale), absolute, relative: false };
}

/** "sha256:4a3ed8…9f21" — truncated middle keeping both ends verifiable.
 * The full value must remain the one that gets copied — never the ellipsis. */
export function truncateMiddle(value: string, head = 6, tail = 4): string {
  if (value.length <= head + tail + 1) return value;
  return `${value.slice(0, head)}…${value.slice(-tail)}`;
}

/** Mask a secret: keep a short prefix/suffix, fixed-width mask in between —
 * "sk_live_de96••••••••••••j87TzX" (§20 sensitive values). */
export function maskSecret(value: string, prefix = 8, suffix = 6): string {
  if (value.length <= prefix + suffix) return "•".repeat(Math.max(value.length, 4));
  return `${value.slice(0, prefix)}${"•".repeat(12)}${value.slice(-suffix)}`;
}
