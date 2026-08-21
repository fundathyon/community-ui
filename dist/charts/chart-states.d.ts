import type { CSSProperties } from "react";
/**
 * The three non-happy chart states (§22), rendered COMPACT so they fit a strip
 * as small as a sparkline without overflowing. They share the design language of
 * feedback/EmptyState & feedback/ErrorState (tokens, `role`, retry Button) but
 * drop the page-scale padding those carry — a chart body is not a page region.
 *
 * These are internal to the charts entry: ChartFrame and ChartCard both render
 * them, so state behaviour is defined once (anti-duplication).
 */
/** Default copy — English, overridable by the owning chart's props (CONVENTIONS
 * language rule; §22 wording for the no-data case). */
export declare const DEFAULT_EMPTY_LABEL = "Sin datos en este intervalo";
export declare const DEFAULT_ERROR_TITLE = "No se pudo cargar el gr\u00E1fico";
export declare const DEFAULT_RETRY_LABEL = "Reintentar";
/** Loading — a Skeleton block the exact height of the chart (§22). The Skeleton
 * is decorative (`aria-hidden`), so a `role="status"` wrapper announces the wait
 * once (the SkeletonGroup pattern), not the bone itself. */
export declare function ChartLoading({ height, label }: {
    height: number;
    label?: string;
}): import("react").JSX.Element;
/**
 * No data — a plain muted line, CENTERED in the chart box. Never a flat zero
 * line: that would lie about the metric (§22). Not tabular, not a fake series.
 */
export declare function ChartEmpty({ height, label, style, }: {
    height: number;
    label?: string;
    style?: CSSProperties;
}): import("react").JSX.Element;
/**
 * Error — compact, `role="alert"`, always offers the retry exit (§11, §22).
 * The technical detail belongs in the app's ErrorState behind "Copy details";
 * inside a chart body we keep only the human line and the retry.
 */
export declare function ChartError({ height, title, description, retryLabel, onRetry, }: {
    height: number;
    title?: string;
    description?: string;
    retryLabel?: string;
    onRetry?: () => void;
}): import("react").JSX.Element;
