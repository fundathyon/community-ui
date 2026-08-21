import { type BaseCartesianChartProps, type ChartCurve } from "./types";
export interface LineChartProps extends BaseCartesianChartProps {
    /** Draw a dot at each sample. @default false — clean lines by default (§22). */
    showDots?: boolean;
    /** Interpolation. @default "monotone" (never overshoots measured values). */
    curve?: ChartCurve;
}
/**
 * LineChart — a metric over time (§22). Multiple series read by label + colour;
 * gaps break the line rather than dropping to zero (partial data), and the four
 * states are handled by ChartFrame. Grid is horizontal-only dashed; axes are
 * quiet (no lines, muted caption ticks). Success/failure series must pass a
 * semantic `color`; the accent stays for the neutral volume series.
 *
 * When to use: continuous trends. For discrete categories use BarChart; for a
 * tiny inline trend use Sparkline.
 */
export declare function LineChart({ series, label, summary, height, state, onRetry, errorTitle, errorDescription, retryLabel, xTickFormat, yTickFormat, emptyLabel, partialNote, xLabel, viewDataLabel, onViewData, width, className, showDots, curve, }: LineChartProps): import("react").JSX.Element;
