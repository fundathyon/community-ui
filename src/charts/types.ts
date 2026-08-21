/**
 * Public data vocabulary for the charts entry (§22 Dashboard y visualización).
 *
 * These types are the ONLY contract consumers see — recharts is encapsulated
 * behind the chart components and never leaks into this surface (CONVENTIONS:
 * "charts encapsulate recharts; consumers never import recharts types").
 */

/**
 * How a series is coloured. Semantic tokens carry STATE and must be used for
 * success/failure series; the product accent is reserved for the neutral volume
 * series and never encodes a state (§02, §22). `{ categorical: n }` paints the
 * accent hue at a descending opacity step — the single-hue rule for a set of
 * categories without semantic meaning (§22: "mismo hue, opacidad descendente").
 */
export type ChartColor =
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral"
  | { categorical: number };

/** One point of a series. `y === null` marks a gap — the source is missing this
 * sample (partial data), NOT a real zero (§22: a gap is never drawn as zero). */
export interface ChartPoint {
  x: string | number | Date;
  y: number | null;
}

/** A named line/area/bar series. `color` defaults to the categorical accent ramp
 * by position, so a lone series is the solid accent and a set descends in opacity. */
export interface ChartSeries {
  name: string;
  data: ChartPoint[];
  color?: ChartColor;
}

/** Lifecycle a chart can be told to show. `"ready"` (or omitting `state`) draws
 * the data; the other three are the mandatory non-happy states of §22. Empty is
 * also derived automatically when there is no drawable data. */
export type ChartState = "loading" | "empty" | "error" | "ready";

/** Curve interpolation for line/area charts. `monotone` is the default — it never
 * overshoots the data, so it cannot imply values that were not measured. */
export type ChartCurve = "linear" | "monotone";

/** Default fixed heights (§22 rejilla): 200px for a card chart. Sparklines carry
 * their own much smaller default. Charts always fill their container's width. */
export const CHART_HEIGHT = 200;
/** Inline sparkline default height (§22 — tiny, no axes, no chrome). */
export const SPARKLINE_HEIGHT = 32;

/**
 * The config shared by the cartesian charts (Line · Area · Bar). Charts are a
 * data-viz surface and legitimately carry more knobs than the §18 8-prop guide
 * (like DataTable) — every field here is inherent chart config, not scope creep.
 */
export interface BaseCartesianChartProps {
  /** The series to plot. Colours default to the categorical accent ramp (§22). */
  series: ChartSeries[];
  /** Required accessible name — the operational question the chart answers (§22). */
  label: string;
  /** Trend in words for the aria-label (§22). */
  summary?: string;
  /** Plot height in px. @default 200 (§22 rejilla). */
  height?: number;
  /** Force a lifecycle state. Omit to derive `ready`/`empty` from the data. */
  state?: ChartState;
  /** Retry handler for the error state. */
  onRetry?: () => void;
  /** Error-state copy. */
  errorTitle?: string;
  errorDescription?: string;
  retryLabel?: string;
  /** x tick + tooltip-label + hidden-table formatter. */
  xTickFormat?: (value: string | number | Date) => string;
  /** y tick + value formatter (defaults to grouped integer). */
  yTickFormat?: (value: number) => string;
  /** Overridable no-data copy. @default "Sin datos en este intervalo" */
  emptyLabel?: string;
  /** Overridable partial-data note builder. */
  partialNote?: (missing: number, total: number) => string;
  /** Header for the x column of the hidden equivalent table. @default "x" */
  xLabel?: string;
  /** Visible "Ver datos" affordance — app decides what it reveals. */
  viewDataLabel?: string;
  onViewData?: () => void;
  /** Explicit width for tests (jsdom ResponsiveContainer measures 0×0). */
  width?: number;
  className?: string;
}
