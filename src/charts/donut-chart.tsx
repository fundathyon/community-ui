"use client";

import { useMemo, type ReactNode } from "react";
import { Cell, Pie, PieChart as RPieChart, Tooltip } from "recharts";
import { resolveSeriesColor } from "./color";
import { ChartCanvas, makePieTooltip } from "./chart-canvas";
import { ChartFrame } from "./chart-frame";
import { defaultYFormat, percent } from "./internal";
import { CHART_HEIGHT, type ChartColor, type ChartState } from "./types";

/** One slice of a distribution. */
export interface DonutSegment {
  name: string;
  value: number;
  /** Defaults to the categorical accent ramp by position (§22 single hue). */
  color?: ChartColor;
}

export interface DonutChartProps {
  segments: DonutSegment[];
  /** Required accessible name (§22). */
  label: string;
  summary?: string;
  /** Ring size / skeleton height in px. @default 200 */
  height?: number;
  state?: ChartState;
  onRetry?: () => void;
  errorTitle?: string;
  errorDescription?: string;
  retryLabel?: string;
  /**
   * `donut` — thin ring + legend list beside it. `list` — the §22 "Distribución
   * por provider" pattern: horizontal proportion bars, one descending-opacity
   * hue, no ring. @default "donut"
   */
  variant?: "donut" | "list";
  /** Center slot of the ring (a total or custom node). `donut` variant only. */
  centerLabel?: ReactNode;
  /** Value formatter for the legend/table. @default grouped integer. */
  valueFormat?: (value: number) => string;
  emptyLabel?: string;
  /** Header for the category column of the hidden table. @default "Category" */
  categoryLabel?: string;
  viewDataLabel?: string;
  onViewData?: () => void;
  /** Explicit width for tests. */
  width?: number;
  className?: string;
}

/**
 * DonutChart — a distribution (§22). Two variants: a thin ring with a legend
 * list, or the flat proportion-bar `list`. Both default to one accent hue at
 * descending opacity — never a rainbow of categories (§22). The centre carries
 * a slot (usually the total), the legend shows name · value · %, and an
 * equivalent table backs it for screen readers.
 *
 * When to use: parts of a single whole. For magnitudes that are not a whole use
 * BarChart; for a trend use LineChart.
 */
export function DonutChart({
  segments,
  label,
  summary,
  height = CHART_HEIGHT,
  state,
  onRetry,
  errorTitle,
  errorDescription,
  retryLabel,
  variant = "donut",
  centerLabel,
  valueFormat,
  emptyLabel,
  categoryLabel = "Category",
  viewDataLabel,
  onViewData,
  width,
  className,
}: DonutChartProps) {
  const valueFmt = valueFormat ?? defaultYFormat;

  const { colors, colorByName, total, table, hasData } = useMemo(() => {
    const resolved = segments.map((s, i) => resolveSeriesColor(s.color ?? { categorical: i }));
    const byName: Record<string, string> = {};
    segments.forEach((s, i) => (byName[s.name] = resolved[i] ?? "var(--fdn-accent-solid)"));
    const sum = segments.reduce((acc, s) => acc + (s.value > 0 ? s.value : 0), 0);
    return {
      colors: resolved,
      colorByName: byName,
      total: sum,
      table: {
        columns: [categoryLabel, "Valor", "%"],
        rows: segments.map((s) => [s.name, valueFmt(s.value), `${percent(s.value, sum).toFixed(1)} %`] as Array<string | number>),
      },
      hasData: sum > 0,
    };
  }, [segments, valueFmt, categoryLabel]);

  const derivedState = state ?? (hasData ? "ready" : "empty");
  const pct = (v: number) => `${percent(v, total).toFixed(1)} %`;

  const body =
    variant === "list" ? (
      <ul className="flex w-full flex-col justify-center gap-2.5">
        {segments.map((s, i) => (
          <li key={s.name} className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between gap-2 text-caption">
              <span className="flex min-w-0 items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="size-2 shrink-0 rounded-full"
                  style={{ backgroundColor: colors[i] }}
                />
                <span className="truncate text-text-secondary">{s.name}</span>
              </span>
              <span className="shrink-0 tabular-nums text-text">
                {valueFmt(s.value)} <span className="text-text-muted">· {pct(s.value)}</span>
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-hover">
              <div
                className="h-full rounded-full"
                style={{ width: `${percent(s.value, total)}%`, backgroundColor: colors[i] }}
              />
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <div className="flex h-full w-full items-center gap-4">
        <div className="relative shrink-0" style={{ width: height, height }}>
          <ChartCanvas width={width} height={height}>
            <RPieChart>
              <Pie
                data={segments}
                dataKey="value"
                nameKey="name"
                innerRadius="68%"
                outerRadius="92%"
                paddingAngle={segments.length > 1 ? 2 : 0}
                stroke="none"
                isAnimationActive={false}
              >
                {segments.map((s, i) => (
                  <Cell key={s.name} fill={colors[i]} />
                ))}
              </Pie>
              <Tooltip content={makePieTooltip({ colorByName, valueFormat: valueFmt })} />
            </RPieChart>
          </ChartCanvas>
          {centerLabel && (
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
              {centerLabel}
            </div>
          )}
        </div>
        <ul className="flex min-w-0 flex-1 flex-col gap-1.5">
          {segments.map((s, i) => (
            <li key={s.name} className="flex items-baseline justify-between gap-2 text-caption">
              <span className="flex min-w-0 items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="size-2 shrink-0 rounded-full"
                  style={{ backgroundColor: colors[i] }}
                />
                <span className="truncate text-text-secondary">{s.name}</span>
              </span>
              <span className="shrink-0 tabular-nums text-text">
                {valueFmt(s.value)} <span className="text-text-muted">· {pct(s.value)}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    );

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
      viewDataLabel={viewDataLabel}
      onViewData={onViewData}
      className={className}
      autoHeight={variant === "list"}
    >
      {body}
    </ChartFrame>
  );
}
