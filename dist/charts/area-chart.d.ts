import { type BaseCartesianChartProps, type ChartCurve } from "./types";
export interface AreaChartProps extends BaseCartesianChartProps {
    /** Stack the series into a cumulative band. @default false */
    stacked?: boolean;
    /** Interpolation. @default "monotone". */
    curve?: ChartCurve;
}
/**
 * AreaChart — a LineChart whose series carry a flat, low-opacity fill to weight
 * volume (§22: flat fills, NEVER gradients). `stacked` composes parts of a whole
 * over time. Same states, gaps and accessibility as LineChart.
 *
 * When to use: emphasise magnitude or composition. For a bare trend prefer
 * LineChart; the fill only earns its place when volume is the point.
 */
export declare function AreaChart({ series, label, summary, height, state, onRetry, errorTitle, errorDescription, retryLabel, xTickFormat, yTickFormat, emptyLabel, partialNote, xLabel, viewDataLabel, onViewData, width, className, stacked, curve, }: AreaChartProps): import("react").JSX.Element;
