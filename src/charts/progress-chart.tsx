"use client";

import { cn } from "../lib/cn";
import type { Tone } from "../lib/types";
import { resolveSeriesColor } from "./color";
import { ChartFrame } from "./chart-frame";
import { defaultYFormat } from "./internal";
import type { ChartColor, ChartState } from "./types";

/** A marker on the quota track — a target or limit, coloured by its meaning. */
export interface ProgressThreshold {
  value: number;
  /** Semantic tone of the marker (§02 — state, never the accent). */
  tone: Tone;
  /** Optional short caption shown under the marker. */
  label?: string;
}

export interface ProgressChartProps {
  value: number;
  max: number;
  /** Required accessible name (§22). */
  label: string;
  summary?: string;
  /** Target / limit markers on the track (§22 KPI quota). */
  thresholds?: ProgressThreshold[];
  /** Fill colour. @default accent — the neutral volume of a quota (§02). */
  fill?: ChartColor;
  /** Value/max formatter. @default grouped integer. */
  valueFormat?: (value: number) => string;
  /** Show the "value / max" readout above the bar. @default true */
  showValue?: boolean;
  /** Skeleton height for the loading state. @default 48 */
  height?: number;
  state?: ChartState;
  onRetry?: () => void;
  errorTitle?: string;
  errorDescription?: string;
  retryLabel?: string;
  emptyLabel?: string;
  className?: string;
}

const TONE_MARKER: Record<Tone, string> = {
  info: "bg-info-solid",
  success: "bg-success-solid",
  warning: "bg-warning-solid",
  danger: "bg-danger-solid",
};

// Full class strings (never interpolated) so Tailwind's scan keeps them (§ badge).
const TONE_TEXT: Record<Tone, string> = {
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};

const clampPct = (n: number) => Math.max(0, Math.min(100, n));

/**
 * ProgressChart — a single value against a maximum, with optional target /
 * threshold markers (§22 KPI quota). Horizontal track, flat accent fill, markers
 * in semantic tones. Announced as a `progressbar`; the frame adds the figure and
 * the four states.
 *
 * When to use: "X of Y used", quotas, a value approaching a limit. For a trend
 * over time use LineChart; for parts of a whole use DonutChart.
 */
export function ProgressChart({
  value,
  max,
  label,
  summary,
  thresholds = [],
  fill = "accent",
  valueFormat,
  showValue = true,
  height = 48,
  state,
  onRetry,
  errorTitle,
  errorDescription,
  retryLabel,
  emptyLabel,
  className,
}: ProgressChartProps) {
  const valueFmt = valueFormat ?? defaultYFormat;
  const derivedState = state ?? (max > 0 ? "ready" : "empty");
  const pct = clampPct(max > 0 ? (value / max) * 100 : 0);
  const fillColor = resolveSeriesColor(fill);

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
      className={className}
      autoHeight
    >
      <div className="flex w-full flex-col gap-1.5">
        {showValue && (
          <div className="flex items-baseline justify-between gap-2 text-caption">
            <span className="tabular-nums text-text">{valueFmt(value)}</span>
            <span className="tabular-nums text-text-muted">{valueFmt(max)}</span>
          </div>
        )}
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={`${valueFmt(value)} / ${valueFmt(max)}`}
          className="relative h-2 w-full overflow-visible rounded-full bg-surface-hover"
        >
          <div
            className="h-full rounded-full"
            style={{ width: `${pct}%`, backgroundColor: fillColor }}
          />
          {thresholds.map((t, i) => {
            const left = clampPct(max > 0 ? (t.value / max) * 100 : 0);
            return (
              <span
                key={i}
                aria-hidden="true"
                title={t.label}
                className={cn("absolute top-[-2px] h-[calc(100%+4px)] w-0.5 rounded-full", TONE_MARKER[t.tone])}
                style={{ left: `${left}%` }}
              />
            );
          })}
        </div>
        {thresholds.some((t) => t.label) && (
          <div className="flex flex-wrap gap-x-3 gap-y-0.5">
            {thresholds.map((t, i) =>
              t.label ? (
                <span key={i} className={cn("flex items-center gap-1 text-caption", TONE_TEXT[t.tone])}>
                  <span aria-hidden="true" className={cn("size-1.5 rounded-full", TONE_MARKER[t.tone])} />
                  {t.label}
                </span>
              ) : null,
            )}
          </div>
        )}
      </div>
    </ChartFrame>
  );
}
