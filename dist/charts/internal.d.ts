import type { ChartSeries } from "./types";
/**
 * Pure data helpers shared by the cartesian charts. No recharts, no JSX — just
 * the reshaping every line/area/bar wrapper needs, kept in one place.
 */
/** Internal row key holding the (stringified) x value for the category axis. */
export declare const X_KEY = "__x";
type XValue = string | number | Date;
export interface CartesianData {
    /** Row objects keyed by series name, `X_KEY` holds the x identity. */
    rows: Array<Record<string, number | null | string>>;
    /** Map from x identity back to the caller's original x (for formatters). */
    originals: Map<string, XValue>;
}
/**
 * Merge N series (each its own x/y list) into recharts' row-per-x shape, keyed
 * by series name, sorted by x when x is numeric/temporal (category order is
 * preserved for string x). Gaps (`y === null`) are kept so lines can break.
 */
export declare function buildCartesianData(series: ChartSeries[]): CartesianData;
/** Count gap samples (`y === null`) and total samples across all series (§22). */
export declare function countGaps(series: ChartSeries[]): {
    missing: number;
    total: number;
};
/** True when at least one real (non-null) value exists to draw. */
export declare function hasDrawableData(series: ChartSeries[]): boolean;
/** §22 partial-data note. Overridable by the chart's `partialNote` prop. */
export declare function defaultPartialNote(missing: number, total: number): string;
/** Default x tick/label formatter: dates → "d MMM", everything else → String. */
export declare function defaultXFormat(x: XValue): string;
/** Default y tick/value formatter: grouped integer (`tabular-nums` columns). */
export declare function defaultYFormat(y: number): string;
/**
 * Build the visually-hidden equivalent table (§22) from the merged cartesian
 * rows: header is [x label, ...series names], one row per x, gaps shown as "—".
 */
export declare function buildCartesianTable(series: ChartSeries[], cart: CartesianData, xFormat: (x: XValue) => string, yFormat: (y: number) => string, xLabel: string): {
    columns: string[];
    rows: Array<Array<string | number>>;
};
/** Values used to size a hidden table row for a single {name,value} distribution. */
export declare function percent(value: number, total: number): number;
export {};
