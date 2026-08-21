import { type ReactNode } from "react";
import { type ChartColor, type ChartState } from "./types";
/** One slice of a distribution. */
export interface DonutSegment {
    name: string;
    value: number;
    /** Defaults to the categorical accent ramp by position (§22 single hue). */
    color?: ChartColor;
}
export interface DonutChartProps {
    segments: DonutSegment[];
    /** Required accessible name (§22). */
    label: string;
    summary?: string;
    /** Ring size / skeleton height in px. @default 200 */
    height?: number;
    state?: ChartState;
    onRetry?: () => void;
    errorTitle?: string;
    errorDescription?: string;
    retryLabel?: string;
    /**
     * `donut` — thin ring + legend list beside it. `list` — the §22 "Distribución
     * por provider" pattern: horizontal proportion bars, one descending-opacity
     * hue, no ring. @default "donut"
     */
    variant?: "donut" | "list";
    /** Center slot of the ring (a total or custom node). `donut` variant only. */
    centerLabel?: ReactNode;
    /** Value formatter for the legend/table. @default grouped integer. */
    valueFormat?: (value: number) => string;
    emptyLabel?: string;
    /** Header for the category column of the hidden table. @default "Categoría" */
    categoryLabel?: string;
    viewDataLabel?: string;
    onViewData?: () => void;
    /** Explicit width for tests. */
    width?: number;
    className?: string;
}
/**
 * DonutChart — a distribution (§22). Two variants: a thin ring with a legend
 * list, or the flat proportion-bar `list`. Both default to one accent hue at
 * descending opacity — never a rainbow of categories (§22). The centre carries
 * a slot (usually the total), the legend shows name · value · %, and an
 * equivalent table backs it for screen readers.
 *
 * When to use: parts of a single whole. For magnitudes that are not a whole use
 * BarChart; for a trend use LineChart.
 */
export declare function DonutChart({ segments, label, summary, height, state, onRetry, errorTitle, errorDescription, retryLabel, variant, centerLabel, valueFormat, emptyLabel, categoryLabel, viewDataLabel, onViewData, width, className, }: DonutChartProps): import("react").JSX.Element;
