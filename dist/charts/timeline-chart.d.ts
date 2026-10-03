import { type ReactNode } from "react";
import { type DateInput } from "../lib/format";
import type { ChartState } from "./types";
/** Status of a slice of the timeline (§19 taxonomy → §22 uptime strip). */
export type TimelineStatus = "up" | "degraded" | "down" | "unknown";
/** One contiguous slice with a status. */
export interface TimelineSegment {
    start: DateInput;
    end: DateInput;
    status: TimelineStatus;
}
export interface TimelineChartProps {
    segments: TimelineSegment[];
    /** Required accessible name (§22). */
    label: string;
    summary?: string;
    /** Left caption under the strip. @default "hace 90 d" */
    startCaption?: string;
    /** Right caption under the strip. @default "hoy" */
    endCaption?: string;
    /** Availability slot shown top-right (e.g. "99,98 %"). */
    availabilityLabel?: ReactNode;
    /** Override the status → readable-name mapping (i18n). */
    statusLabels?: Partial<Record<TimelineStatus, string>>;
    /** Skeleton height for the loading state. @default 56 */
    height?: number;
    state?: ChartState;
    onRetry?: () => void;
    errorTitle?: string;
    errorDescription?: string;
    retryLabel?: string;
    emptyLabel?: string;
    className?: string;
}
/**
 * TimelineChart — the availability / status strip (§22 "hace 90 d … hoy"): one
 * horizontal band whose slices are weighted by duration and coloured by status.
 * Unknown reads neutral, not danger. Each slice carries a `title` tooltip; the
 * strip itself is presentational, with the frame's hidden table giving the
 * accessible reading and an availability slot for the headline number.
 *
 * When to use: uptime, incident history, a status-over-time band. For a numeric
 * metric over time use LineChart.
 */
export declare function TimelineChart({ segments, label, summary, startCaption, endCaption, availabilityLabel, statusLabels, height, state, onRetry, errorTitle, errorDescription, retryLabel, emptyLabel, className, }: TimelineChartProps): import("react").JSX.Element;
