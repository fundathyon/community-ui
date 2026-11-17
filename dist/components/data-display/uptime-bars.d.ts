import type { HTMLAttributes } from "react";
/** Status of one day on the strip. `nodata` = the day had no checks. */
export type UptimeDayStatus = "up" | "degraded" | "down" | "nodata";
/** One day on the strip: a UTC date plus that day's summary. */
export interface UptimeDay {
    /** UTC calendar day, `YYYY-MM-DD`. */
    day: string;
    status: UptimeDayStatus;
    /** Availability that day, 0–100. `null`/omitted when there were no checks. */
    uptime?: number | null;
    /** Failed checks that day. */
    down?: number;
}
export interface UptimeBarsProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    /** Days from oldest to newest; the last one is today. */
    days: UptimeDay[];
    /** Required accessible summary of the whole strip (§22), e.g. "99.98% uptime over 90 days". */
    label: string;
    /** Native tooltip of each bar (i18n). Defaults to "Oct 22, 2026 · 99.9% uptime · 2 failed checks". */
    dayTitle?: (day: UptimeDay) => string;
    /** Left caption (i18n). @default (n) => `${n} days ago` */
    daysAgoLabel?: (count: number) => string;
    /** Right caption (i18n). @default "Today" */
    todayLabel?: string;
    /** Bars kept below the `sm` breakpoint; older ones hide. @default 30 */
    mobileDays?: number;
}
/**
 * UptimeBars — the status-page strip: one bar per day, coloured by that day's
 * worst state, with the day's summary as a native tooltip (§22). Use it for
 * daily availability history (status pages, service cards). For arbitrary
 * time slices with chart states (loading, error, retry), use TimelineChart
 * from `/charts` instead.
 *
 * Server-component safe: no hooks, no recharts.
 */
export declare function UptimeBars({ days, label, dayTitle, daysAgoLabel, todayLabel, mobileDays, className, ...props }: UptimeBarsProps): import("react").JSX.Element;
