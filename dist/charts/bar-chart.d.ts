import { type BaseCartesianChartProps } from "./types";
export interface BarChartProps extends BaseCartesianChartProps {
    /** Stack the series instead of grouping them side by side. @default false */
    stacked?: boolean;
    /** Lay bars horizontally (category on the y axis). @default false */
    horizontal?: boolean;
}
/**
 * BarChart — discrete categories on the x axis (§22). Bars carry a 2px radius;
 * `horizontal` flips category to the y axis for long labels, `stacked` composes
 * parts of a whole. Same four states, accessibility and single-hue defaulting as
 * the line charts. A lone uncoloured series is the solid accent; a group descends
 * in opacity — never one arbitrary colour per bar (§22).
 *
 * When to use: comparing magnitudes across a small set of categories. For a
 * trend over continuous time use LineChart/AreaChart.
 */
export declare function BarChart({ series, label, summary, height, state, onRetry, errorTitle, errorDescription, retryLabel, xTickFormat, yTickFormat, emptyLabel, partialNote, xLabel, viewDataLabel, onViewData, width, className, stacked, horizontal, }: BarChartProps): import("react").JSX.Element;
export interface StackedBarChartProps extends Omit<BarChartProps, "stacked"> {
}
/**
 * StackedBarChart — the stacked preset of BarChart (§22 composition). Identical
 * surface minus the `stacked` toggle, which is fixed on. Use it when the bars
 * are parts of a whole; for independent magnitudes use BarChart grouped.
 */
export declare function StackedBarChart(props: StackedBarChartProps): import("react").JSX.Element;
