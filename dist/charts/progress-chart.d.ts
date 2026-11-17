import type { Tone } from "../lib/types";
import type { ChartColor, ChartState } from "./types";
/** A marker on the quota track — a target or limit, coloured by its meaning. */
export interface ProgressThreshold {
    value: number;
    /** Semantic tone of the marker (§02 — state, never the accent). */
    tone: Tone;
    /** Optional short caption shown under the marker. */
    label?: string;
}
export interface ProgressChartProps {
    value: number;
    max: number;
    /** Required accessible name (§22). */
    label: string;
    summary?: string;
    /** Target / limit markers on the track (§22 KPI quota). */
    thresholds?: ProgressThreshold[];
    /** Fill colour. @default accent — the neutral volume of a quota (§02). */
    fill?: ChartColor;
    /** Value/max formatter. @default grouped integer. */
    valueFormat?: (value: number) => string;
    /** Show the "value / max" readout above the bar. @default true */
    showValue?: boolean;
    /** Skeleton height for the loading state. @default 48 */
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
 * ProgressChart — a single value against a maximum, with optional target /
 * threshold markers (§22 KPI quota). Horizontal track, flat accent fill, markers
 * in semantic tones. Announced as a `progressbar`; the frame adds the figure and
 * the four states.
 *
 * When to use: "X of Y used", quotas, a value approaching a limit. For a trend
 * over time use LineChart; for parts of a whole use DonutChart.
 */
export declare function ProgressChart({ value, max, label, summary, thresholds, fill, valueFormat, showValue, height, state, onRetry, errorTitle, errorDescription, retryLabel, emptyLabel, className, }: ProgressChartProps): import("react").JSX.Element;
