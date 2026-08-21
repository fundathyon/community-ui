"use client";

import { useMemo } from "react";
import { Area, AreaChart as RAreaChart, Line, LineChart as RLineChart, XAxis, YAxis } from "recharts";
import { cn } from "../lib/cn";
import { Skeleton } from "../components/feedback/skeleton";
import { resolveSeriesColor } from "./color";
import { ChartCanvas } from "./chart-canvas";
import { SPARKLINE_HEIGHT, type ChartColor, type ChartCurve, type ChartPoint } from "./types";

export interface SparklineProps {
  /** A single series of points; `y === null` breaks the line (gap). */
  data: ChartPoint[];
  /** Series colour. @default the solid accent (neutral volume, §22). */
  color?: ChartColor;
  /** Fill under the line with a flat low-opacity wash (no gradient, §22). */
  area?: boolean;
  /** Interpolation. @default "monotone". */
  curve?: ChartCurve;
  /** Height in px. @default 32 — tiny, inline (§22). */
  height?: number;
  /** Fixed width in px (table cells / tests). Omitted → fills the container. */
  width?: number;
  /** Only the states a bare inline chart needs. Omit to derive from the data. */
  state?: "loading" | "empty" | "ready";
  /** Accessible name. Omitted → the sparkline is decorative (`aria-hidden`). */
  label?: string;
  /** Placeholder shown when there is nothing to draw. @default "—" */
  emptyLabel?: string;
  className?: string;
}

/**
 * Sparkline — a tiny inline trend for a MetricChart slot or a dense table cell
 * (§22). No axes, no grid, no tooltip, no title chrome — the deliberate inline
 * exception to ChartFrame. It still refuses to fake data: with nothing to draw
 * it shows a muted placeholder, never a flat zero line.
 *
 * When to use: a trend glanced at beside a number. Anything with axes, a legend
 * or hover detail is a LineChart, not a Sparkline.
 */
export function Sparkline({
  data,
  color = "accent",
  area = false,
  curve = "monotone",
  height = SPARKLINE_HEIGHT,
  width,
  state,
  label,
  emptyLabel = "—",
  className,
}: SparklineProps) {
  const rows = useMemo(() => data.map((p, i) => ({ x: i, y: p.y })), [data]);
  const stroke = resolveSeriesColor(color);
  const hasData = data.some((p) => p.y !== null);
  const resolved = state ?? (hasData ? "ready" : "empty");

  const wrapperProps = label
    ? { role: "img" as const, "aria-label": label }
    : { "aria-hidden": true as const };

  if (resolved === "loading") {
    return <Skeleton className={cn("w-full", className)} style={{ height, width }} />;
  }

  if (resolved === "empty") {
    return (
      <span
        {...wrapperProps}
        className={cn("inline-flex items-center justify-center text-caption text-text-muted", className)}
        style={{ height, width }}
      >
        {emptyLabel}
      </span>
    );
  }

  const chart = area ? (
    <RAreaChart data={rows} margin={{ top: 2, right: 0, bottom: 2, left: 0 }}>
      <XAxis hide dataKey="x" />
      <YAxis hide domain={["dataMin", "dataMax"]} />
      <Area
        type={curve}
        dataKey="y"
        stroke={stroke}
        strokeWidth={1.5}
        fill={stroke}
        fillOpacity={0.16}
        dot={false}
        activeDot={false}
        connectNulls={false}
        isAnimationActive={false}
      />
    </RAreaChart>
  ) : (
    <RLineChart data={rows} margin={{ top: 2, right: 0, bottom: 2, left: 0 }}>
      <XAxis hide dataKey="x" />
      <YAxis hide domain={["dataMin", "dataMax"]} />
      <Line
        type={curve}
        dataKey="y"
        stroke={stroke}
        strokeWidth={1.5}
        dot={false}
        activeDot={false}
        connectNulls={false}
        isAnimationActive={false}
      />
    </RLineChart>
  );

  return (
    <span {...wrapperProps} className={cn("block", className)} style={{ height, width }}>
      <ChartCanvas width={width} height={height}>
        {chart}
      </ChartCanvas>
    </span>
  );
}
