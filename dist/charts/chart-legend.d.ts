/** One legend entry: a series and its colour, optionally with a value. */
export interface ChartLegendItem {
    name: string;
    /** Resolved CSS colour of the series dot. */
    color: string;
    /** Optional trailing value (e.g. a total or a percentage), `tabular-nums`. */
    value?: string;
}
export interface ChartLegendProps {
    items: ChartLegendItem[];
    className?: string;
}
/**
 * ChartLegend — the suite's legend: a horizontal run of colour dots + names
 * below the chart (§22). Not decorative — it is shown only when more than one
 * series needs to be told apart, and the series are ALSO distinguishable by
 * label and position, never colour alone (§22 accessibility).
 *
 * Presentational; exported for custom compositions and used internally.
 */
export declare function ChartLegend({ items, className }: ChartLegendProps): import("react").JSX.Element;
