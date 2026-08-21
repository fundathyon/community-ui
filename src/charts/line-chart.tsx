"use client";

import { useMemo } from "react";
import { CartesianGrid, Line, LineChart as RLineChart, Tooltip, XAxis, YAxis } from "recharts";
import { resolveSeriesColors } from "./color";
import { AXIS_PROPS, CARTESIAN_MARGIN, ChartCanvas, makeCartesianTooltip } from "./chart-canvas";
import { ChartFrame } from "./chart-frame";
import { ChartLegend } from "./chart-legend";
import {
  buildCartesianData,
  buildCartesianTable,
  countGaps,
  defaultPartialNote,
  defaultXFormat,
  defaultYFormat,
  hasDrawableData,
  X_KEY,
} from "./internal";
import { CHART_HEIGHT, type BaseCartesianChartProps, type ChartCurve } from "./types";

export interface LineChartProps extends BaseCartesianChartProps {
  /** Draw a dot at each sample. @default false — clean lines by default (§22). */
  showDots?: boolean;
  /** Interpolation. @default "monotone" (never overshoots measured values). */
  curve?: ChartCurve;
}

/**
 * LineChart — a metric over time (§22). Multiple series read by label + colour;
 * gaps break the line rather than dropping to zero (partial data), and the four
 * states are handled by ChartFrame. Grid is horizontal-only dashed; axes are
 * quiet (no lines, muted caption ticks). Success/failure series must pass a
 * semantic `color`; the accent stays for the neutral volume series.
 *
 * When to use: continuous trends. For discrete categories use BarChart; for a
 * tiny inline trend use Sparkline.
 */
export function LineChart({
  series,
  label,
  summary,
  height = CHART_HEIGHT,
  state,
  onRetry,
  errorTitle,
  errorDescription,
  retryLabel,
  xTickFormat,
  yTickFormat,
  emptyLabel,
  partialNote,
  xLabel = "x",
  viewDataLabel,
  onViewData,
  width,
  className,
  showDots = false,
  curve = "monotone",
}: LineChartProps) {
  const xFmt = xTickFormat ?? defaultXFormat;
  const yFmt = yTickFormat ?? defaultYFormat;

  const { rows, originals, colors, colorByName, table, note } = useMemo(() => {
    const cart = buildCartesianData(series);
    const resolved = resolveSeriesColors(series);
    const byName: Record<string, string> = {};
    series.forEach((s, i) => (byName[s.name] = resolved[i] ?? "var(--fdn-accent-solid)"));
    const gaps = countGaps(series);
    const partial =
      gaps.missing > 0 ? (partialNote ? partialNote(gaps.missing, gaps.total) : defaultPartialNote(gaps.missing, gaps.total)) : null;
    return {
      rows: cart.rows,
      originals: cart.originals,
      colors: resolved,
      colorByName: byName,
      table: buildCartesianTable(series, cart, xFmt, yFmt, xLabel),
      note: partial,
    };
  }, [series, partialNote, xFmt, yFmt, xLabel]);

  const derivedState = state ?? (hasDrawableData(series) ? "ready" : "empty");

  const chart = (
    <RLineChart data={rows} margin={CARTESIAN_MARGIN}>
      <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--fdn-border)" />
      <XAxis dataKey={X_KEY} {...AXIS_PROPS} tickFormatter={(v: string | number) => xFmt(originals.get(String(v)) ?? v)} />
      <YAxis width={44} {...AXIS_PROPS} tickFormatter={(v: number) => yFmt(Number(v))} />
      <Tooltip
        content={makeCartesianTooltip({ colorByName, originals, xFormat: xFmt, yFormat: yFmt })}
        cursor={{ stroke: "var(--fdn-border-strong)", strokeWidth: 1 }}
      />
      {series.map((s, i) => (
        <Line
          key={s.name}
          type={curve}
          dataKey={s.name}
          stroke={colors[i]}
          strokeWidth={2}
          dot={showDots ? { r: 2, strokeWidth: 0, fill: colors[i] } : false}
          activeDot={{ r: 3, strokeWidth: 0 }}
          connectNulls={false}
          isAnimationActive={false}
        />
      ))}
    </RLineChart>
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
      partialNote={note}
      table={table}
      viewDataLabel={viewDataLabel}
      onViewData={onViewData}
      className={className}
      footer={
        series.length > 1 ? (
          <ChartLegend items={series.map((s, i) => ({ name: s.name, color: colors[i] ?? "var(--fdn-accent-solid)" }))} />
        ) : undefined
      }
    >
      <ChartCanvas width={width} height={height}>
        {chart}
      </ChartCanvas>
    </ChartFrame>
  );
}
