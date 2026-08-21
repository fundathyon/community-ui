import type { ChartState } from "./types";
/** One cell of the matrix. */
export interface HeatmapCell {
    x: string | number;
    y: string | number;
    value: number;
}
export interface HeatmapProps {
    data: HeatmapCell[];
    /** Column headers, left→right. */
    xLabels: Array<string | number>;
    /** Row headers, top→bottom. */
    yLabels: Array<string | number>;
    /** Required accessible name (§22). */
    label: string;
    summary?: string;
    /** Value formatter for tooltips + hidden table. @default grouped integer. */
    valueFormat?: (value: number) => string;
    /** Override the ramp bounds (else derived from the data). */
    min?: number;
    max?: number;
    /** Skeleton height for the loading state. @default 200 */
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
 * Heatmap — a value matrix over two categorical axes (§22), implemented here
 * because recharts has no good one. Intensity is one accent hue across a 5-step
 * opacity ramp — never a multi-hue scale. The visible grid is presentational
 * (`aria-hidden`) with a per-cell `title` for hover; the accessible reading comes
 * from the frame's hidden equivalent table, and a min→max legend decodes the ramp.
 *
 * When to use: density across two dimensions (hour × day, provider × status).
 */
export declare function Heatmap({ data, xLabels, yLabels, label, summary, valueFormat, min, max, height, state, onRetry, errorTitle, errorDescription, retryLabel, emptyLabel, className, }: HeatmapProps): import("react").JSX.Element;
