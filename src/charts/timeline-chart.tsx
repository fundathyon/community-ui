"use client";

import { useMemo, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { formatDateTime, type DateInput } from "../lib/format";
import { ChartFrame } from "./chart-frame";
import type { ChartState } from "./types";

/** Status of a slice of the timeline (§19 taxonomy → §22 uptime strip). */
export type TimelineStatus = "up" | "degraded" | "down" | "unknown";

/** One contiguous slice with a status. */
export interface TimelineSegment {
  start: DateInput;
  end: DateInput;
  status: TimelineStatus;
}

export interface TimelineChartProps {
  segments: TimelineSegment[];
  /** Required accessible name (§22). */
  label: string;
  summary?: string;
  /** Left caption under the strip. @default "hace 90 d" */
  startCaption?: string;
  /** Right caption under the strip. @default "hoy" */
  endCaption?: string;
  /** Availability slot shown top-right (e.g. "99,98 %"). */
  availabilityLabel?: ReactNode;
  /** Override the status → readable-name mapping (i18n). */
  statusLabels?: Partial<Record<TimelineStatus, string>>;
  /** Skeleton height for the loading state. @default 56 */
  height?: number;
  state?: ChartState;
  onRetry?: () => void;
  errorTitle?: string;
  errorDescription?: string;
  retryLabel?: string;
  emptyLabel?: string;
  className?: string;
}

/** Status → solid semantic fill (§02 — state colours, never the accent). Unknown
 * is the neutral border, not danger: absence of data is not a failure (§22/§23). */
const STATUS_FILL: Record<TimelineStatus, string> = {
  up: "bg-success-solid",
  degraded: "bg-warning-solid",
  down: "bg-danger-solid",
  unknown: "bg-border",
};

const DEFAULT_STATUS_LABEL: Record<TimelineStatus, string> = {
  up: "Operativo",
  degraded: "Degradado",
  down: "Caído",
  unknown: "Sin datos",
};

function toMs(x: DateInput): number {
  return x instanceof Date ? x.getTime() : new Date(x).getTime();
}

/**
 * TimelineChart — the availability / status strip (§22 "hace 90 d … hoy"): one
 * horizontal band whose slices are weighted by duration and coloured by status.
 * Unknown reads neutral, not danger. Each slice carries a `title` tooltip; the
 * strip itself is presentational, with the frame's hidden table giving the
 * accessible reading and an availability slot for the headline number.
 *
 * When to use: uptime, incident history, a status-over-time band. For a numeric
 * metric over time use LineChart.
 */
export function TimelineChart({
  segments,
  label,
  summary,
  startCaption = "hace 90 d",
  endCaption = "hoy",
  availabilityLabel,
  statusLabels,
  height = 56,
  state,
  onRetry,
  errorTitle,
  errorDescription,
  retryLabel,
  emptyLabel,
  className,
}: TimelineChartProps) {
  const statusLabel = (s: TimelineStatus) => statusLabels?.[s] ?? DEFAULT_STATUS_LABEL[s];

  const { prepared, table } = useMemo(() => {
    const withDur = segments.map((s) => {
      const start = toMs(s.start);
      const end = toMs(s.end);
      return { ...s, start, end, dur: Math.max(end - start, 0) };
    });
    const rows = segments.map((s) => [
      formatDateTime(s.start),
      formatDateTime(s.end),
      statusLabels?.[s.status] ?? DEFAULT_STATUS_LABEL[s.status],
    ]) as Array<Array<string | number>>;
    return {
      prepared: withDur,
      table: { columns: ["Inicio", "Fin", "Estado"], rows },
    };
  }, [segments, statusLabels]);

  const derivedState = state ?? (segments.length > 0 ? "ready" : "empty");

  return (
    <ChartFrame
      label={label}
      summary={summary}
      height={height}
      state={derivedState}
      onRetry={onRetry}
      errorTitle={errorTitle}
      errorDescription={errorDescription}
      retryLabel={retryLabel}
      emptyLabel={emptyLabel}
      table={table}
      className={className}
      autoHeight
    >
      <div className="flex w-full flex-col gap-1.5">
        {availabilityLabel !== undefined && (
          <div className="flex justify-end text-caption tabular-nums text-text">{availabilityLabel}</div>
        )}
        <div
          aria-hidden="true"
          className="flex h-8 w-full gap-px overflow-hidden rounded-md bg-surface"
        >
          {prepared.map((seg, i) => (
            <span
              key={i}
              className={cn("h-full first:rounded-l-md last:rounded-r-md", STATUS_FILL[seg.status])}
              style={{ flexGrow: seg.dur || 1, flexBasis: 0 }}
              title={`${statusLabel(seg.status)} · ${formatDateTime(seg.start)} – ${formatDateTime(seg.end)}`}
            />
          ))}
        </div>
        <div className="flex justify-between text-caption text-text-muted">
          <span>{startCaption}</span>
          <span>{endCaption}</span>
        </div>
      </div>
    </ChartFrame>
  );
}
