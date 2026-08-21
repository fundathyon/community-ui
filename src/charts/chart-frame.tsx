"use client";

import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Button } from "../components/actions/button";
import { ChartEmpty, ChartError, ChartLoading } from "./chart-states";
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
export function ChartFrame({
  label,
  summary,
  height,
  state = "ready",
  emptyLabel,
  errorTitle,
  errorDescription,
  retryLabel,
  onRetry,
  partialNote,
  table,
  viewDataLabel,
  onViewData,
  autoHeight = false,
  footer,
  children,
  className,
}: ChartFrameProps) {
  const ariaLabel = summary ? `${label}. ${summary}` : label;

  return (
    <figure aria-label={ariaLabel} className={cn("flex flex-col gap-1.5", className)}>
      {/* Trend summary, exposed to assistive tech as the caption. */}
      {summary && <figcaption className="sr-only">{summary}</figcaption>}

      {/* Partial-data note — the chart still renders below it (§22). */}
      {state === "ready" && partialNote && (
        <p className="text-caption text-warning" role="status">
          {partialNote}
        </p>
      )}

      <div className="relative w-full" style={autoHeight && state === "ready" ? undefined : { height }}>
        {state === "loading" && <ChartLoading height={height} />}
        {state === "empty" && <ChartEmpty height={height} label={emptyLabel} />}
        {state === "error" && (
          <ChartError
            height={height}
            title={errorTitle}
            description={errorDescription}
            retryLabel={retryLabel}
            onRetry={onRetry}
          />
        )}
        {state === "ready" && children}
      </div>

      {/* Chart-owned legend, kept out of the fixed-height plot box. */}
      {state === "ready" && footer}

      {/* Visually-hidden equivalent table (§22). Cheap, large a11y win. */}
      {state === "ready" && table && (
        <table className="sr-only">
          <caption>{table.caption ?? label}</caption>
          <thead>
            <tr>
              {table.columns.map((c) => (
                <th key={c} scope="col">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) =>
                  ci === 0 ? (
                    <th key={ci} scope="row">
                      {cell}
                    </th>
                  ) : (
                    <td key={ci}>{cell}</td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Optional visible affordance so the app can surface the table on demand. */}
      {state === "ready" && viewDataLabel && onViewData && (
        <div className="flex justify-end">
          <Button variant="ghost" size="xs" onClick={onViewData}>
            {viewDataLabel}
          </Button>
        </div>
      )}
    </figure>
  );
}
