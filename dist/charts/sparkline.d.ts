import { type ChartColor, type ChartCurve, type ChartPoint } from "./types";
export interface SparklineProps {
    /** A single series of points; `y === null` breaks the line (gap). */
    data: ChartPoint[];
    /** Series colour. @default the solid accent (neutral volume, §22). */
    color?: ChartColor;
    /** Fill under the line with a flat low-opacity wash (no gradient, §22). */
    area?: boolean;
    /** Interpolation. @default "monotone". */
    curve?: ChartCurve;
    /** Height in px. @default 32 — tiny, inline (§22). */
    height?: number;
    /** Fixed width in px (table cells / tests). Omitted → fills the container. */
    width?: number;
    /** Only the states a bare inline chart needs. Omit to derive from the data. */
    state?: "loading" | "empty" | "ready";
    /** Accessible name. Omitted → the sparkline is decorative (`aria-hidden`). */
    label?: string;
    /** Placeholder shown when there is nothing to draw. @default "—" */
    emptyLabel?: string;
    className?: string;
}
/**
 * Sparkline — a tiny inline trend for a MetricChart slot or a dense table cell
 * (§22). No axes, no grid, no tooltip, no title chrome — the deliberate inline
 * exception to ChartFrame. It still refuses to fake data: with nothing to draw
 * it shows a muted placeholder, never a flat zero line.
 *
 * When to use: a trend glanced at beside a number. Anything with axes, a legend
 * or hover detail is a LineChart, not a Sparkline.
 */
export declare function Sparkline({ data, color, area, curve, height, width, state, label, emptyLabel, className, }: SparklineProps): import("react").JSX.Element;
