"use client";

import { useMemo } from "react";
import { Bar, BarChart as RBarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
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
import { CHART_HEIGHT, type BaseCartesianChartProps } from "./types";

export interface BarChartProps extends BaseCartesianChartProps {
  /** Stack the series instead of grouping them side by side. @default false */
  stacked?: boolean;
  /** Lay bars horizontally (category on the y axis). @default false */
  horizontal?: boolean;
}

type Radius = number | [number, number, number, number];

/**
 * BarChart — discrete categories on the x axis (§22). Bars carry a 2px radius;
 * `horizontal` flips category to the y axis for long labels, `stacked` composes
 * parts of a whole. Same four states, accessibility and single-hue defaulting as
 * the line charts. A lone uncoloured series is the solid accent; a group descends
 * in opacity — never one arbitrary colour per bar (§22).
 *
 * When to use: comparing magnitudes across a small set of categories. For a
 * trend over continuous time use LineChart/AreaChart.
 */
export function BarChart({
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
  stacked = false,
  horizontal = false,
}: BarChartProps) {
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

  // Category axis carries X_KEY; the value axis is the opposite one.
  const categoryAxis = (
    <XAxis
      type={horizontal ? "number" : "category"}
      dataKey={horizontal ? undefined : X_KEY}
      {...AXIS_PROPS}
      tickFormatter={horizontal ? (v: number) => yFmt(Number(v)) : (v: string | number) => xFmt(originals.get(String(v)) ?? v)}
    />
  );
  const valueAxis = (
    <YAxis
      type={horizontal ? "category" : "number"}
      dataKey={horizontal ? X_KEY : undefined}
      width={horizontal ? 80 : 44}
      {...AXIS_PROPS}
      tickFormatter={horizontal ? (v: string | number) => xFmt(originals.get(String(v)) ?? v) : (v: number) => yFmt(Number(v))}
    />
  );

  // Rounded ends point "up" (vertical) or "right" (horizontal); flat when stacked.
  const radius: Radius = stacked ? 0 : horizontal ? [0, 2, 2, 0] : [2, 2, 0, 0];

  const chart = (
    <RBarChart data={rows} layout={horizontal ? "vertical" : "horizontal"} margin={CARTESIAN_MARGIN}>
      <CartesianGrid
        horizontal={!horizontal}
        vertical={horizontal}
        strokeDasharray="3 3"
        stroke="var(--fdn-border)"
      />
      {categoryAxis}
      {valueAxis}
      <Tooltip
        content={makeCartesianTooltip({ colorByName, originals, xFormat: xFmt, yFormat: yFmt })}
        cursor={{ fill: "var(--fdn-surface-hover)" }}
      />
      {series.map((s, i) => (
        <Bar
          key={s.name}
          dataKey={s.name}
          stackId={stacked ? "stack" : undefined}
          fill={colors[i]}
          radius={radius}
          maxBarSize={horizontal ? 28 : 48}
          isAnimationActive={false}
        />
      ))}
    </RBarChart>
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

export interface StackedBarChartProps extends Omit<BarChartProps, "stacked"> {}

/**
 * StackedBarChart — the stacked preset of BarChart (§22 composition). Identical
 * surface minus the `stacked` toggle, which is fixed on. Use it when the bars
 * are parts of a whole; for independent magnitudes use BarChart grouped.
 */
export function StackedBarChart(props: StackedBarChartProps) {
  return <BarChart {...props} stacked />;
}
