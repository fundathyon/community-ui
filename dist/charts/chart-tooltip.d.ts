/** One row of the tooltip: a series and its value at the hovered x. */
export interface ChartTooltipItem {
    name: string;
    /** Already-formatted value string (values are `tabular-nums`, right-aligned). */
    value: string;
    /** Resolved CSS colour of the series dot. */
    color: string;
}
export interface ChartTooltipProps {
    /** The hovered x, already formatted. */
    label?: string;
    items: ChartTooltipItem[];
    className?: string;
}
/**
 * ChartTooltip — the suite's own tooltip content for every recharts wrapper
 * (§22 typography rule): surface-raised card, border, shadow-md, rounded-md,
 * caption type, a colour dot per series and values in `tabular-nums`, right
 * aligned. recharts' default tooltip is never shown; this replaces it.
 *
 * Presentational and recharts-free, so it is also usable in custom compositions.
 */
export declare function ChartTooltip({ label, items, className }: ChartTooltipProps): import("react").JSX.Element;
