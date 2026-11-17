import type { ReactNode } from "react";
import type { ChartState } from "./types";
/** The accessible data-table alternative rendered visually-hidden inside every
 * tabular chart (§22 "tabla equivalente accesible"). Values are pre-formatted. */
export interface ChartDataTable {
    /** Column headers — first is the x/category axis, rest are series/values. */
    columns: string[];
    /** One row per x value; cells already formatted to strings. */
    rows: Array<Array<string | number>>;
    /** Overridable caption for the hidden table. */
    caption?: string;
}
export interface ChartFrameProps {
    /** Required accessible name — the question the chart answers (§22). */
    label: string;
    /** Trend in words, app-provided; appended to the figure's aria-label (§22). */
    summary?: string;
    /** Chart body height in px (§22 rejilla). Used for the state blocks too. */
    height: number;
    /** Lifecycle. Omit or `"ready"` to render `children`. */
    state?: ChartState;
    /** Copy for the no-data state. @default "No data in this interval" */
    emptyLabel?: string;
    /** Error-state copy + exit. */
    errorTitle?: string;
    errorDescription?: string;
    retryLabel?: string;
    onRetry?: () => void;
    /** Rendered as a note above the chart when the data has gaps (§22 partial). */
    partialNote?: string | null;
    /** The visually-hidden equivalent table (§22 accessibility). */
    table?: ChartDataTable | null;
    /** Visible "Ver datos" affordance — the app decides what it reveals. */
    viewDataLabel?: string;
    onViewData?: () => void;
    /**
     * When true the ready state does NOT force `height` on its box, letting SVG /
     * flex content define its own height (donut list, timeline, heatmap, progress).
     * Cartesian charts leave this false: ResponsiveContainer needs a bounded box.
     */
    autoHeight?: boolean;
    /** Rendered below the plot box in the ready state — the chart's own legend. */
    footer?: ReactNode;
    /** The chart itself (a recharts canvas, an SVG, or a set of bars). */
    children: ReactNode;
    className?: string;
}
/**
 * ChartFrame — the shared shell every chart renders into, so the four §22 states
 * (loading · sin datos · parcial · error), the `<figure>` semantics, the trend
 * summary and the hidden data-table alternative behave identically everywhere.
 * Internal to the charts entry; individual charts own their data → visuals.
 */
export declare function ChartFrame({ label, summary, height, state, emptyLabel, errorTitle, errorDescription, retryLabel, onRetry, partialNote, table, viewDataLabel, onViewData, autoHeight, footer, children, className, }: ChartFrameProps): import("react").JSX.Element;
