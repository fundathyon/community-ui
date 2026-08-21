"use client";

import { cloneElement, type ReactElement } from "react";
import { ResponsiveContainer } from "recharts";
import { ChartTooltip } from "./chart-tooltip";

/**
 * The two pieces every recharts wrapper shares — kept here so recharts imports
 * stay confined and the wrappers read as pure data → props.
 */

/** Default plot margin. Tight: axes carry their own tick spacing (§22 grid). */
export const CARTESIAN_MARGIN = { top: 6, right: 8, bottom: 0, left: 0 } as const;

/** Axis tick text: caption size, muted (§22 typography). */
export const AXIS_TICK = { fontSize: 11, fill: "var(--fdn-text-muted)" } as const;

/** Shared props for a bare, quiet axis (no line, small tick gap). */
export const AXIS_PROPS = {
  tick: AXIS_TICK,
  tickLine: false,
  axisLine: false,
  tickMargin: 8,
  stroke: "var(--fdn-border)",
} as const;

/**
 * Size a recharts chart element. With an explicit `width` the chart renders at a
 * fixed size (used by tests, since jsdom's ResponsiveContainer measures 0×0);
 * otherwise it fills its container's width at the given height (§22 responsive).
 */
export function ChartCanvas({
  width,
  height,
  children,
}: {
  width?: number;
  height: number;
  children: ReactElement;
}) {
  if (width != null) {
    return cloneElement(children as ReactElement<{ width?: number; height?: number }>, {
      width,
      height,
    });
  }
  return (
    <ResponsiveContainer width="100%" height={height}>
      {children}
    </ResponsiveContainer>
  );
}

/** The subset of recharts' tooltip render props we read — declared locally (and
 * deliberately loose: `readonly`, `unknown` fields) so recharts' own
 * `TooltipContentProps` is assignable to it without any recharts type leaking. */
interface TooltipRenderProps {
  active?: boolean;
  label?: unknown;
  payload?: ReadonlyArray<{ name?: unknown; value?: unknown; dataKey?: unknown }>;
}

/**
 * Build the `content` function recharts calls for its tooltip, wired to render
 * our own {@link ChartTooltip}. Colours come from a name→colour map we control
 * (not recharts payload), and the x label is formatted from the original x.
 */
export function makeCartesianTooltip(opts: {
  colorByName: Record<string, string>;
  originals: Map<string, string | number | Date>;
  xFormat: (x: string | number | Date) => string;
  yFormat: (y: number) => string;
}) {
  return function CartesianTooltipContent(props: TooltipRenderProps) {
    if (!props.active || !props.payload || props.payload.length === 0) return null;
    const key = props.label;
    const original = key !== undefined ? opts.originals.get(String(key)) : undefined;
    const label = opts.xFormat(original ?? (key as string | number | Date));
    const items = props.payload
      .filter((p) => p.value != null)
      .map((p) => ({
        name: String(p.name ?? ""),
        value: opts.yFormat(Number(p.value)),
        color: opts.colorByName[String(p.name ?? "")] ?? "var(--fdn-text-muted)",
      }));
    if (items.length === 0) return null;
    return <ChartTooltip label={label} items={items} />;
  };
}

/** Tooltip `content` for a single-value chart (donut/pie): one row, the hovered
 * segment. Colours come from our name→colour map, not recharts payload. */
export function makePieTooltip(opts: { colorByName: Record<string, string>; valueFormat: (v: number) => string }) {
  return function PieTooltipContent(props: TooltipRenderProps) {
    const entry = props.active && props.payload && props.payload[0];
    if (!entry || entry.value == null) return null;
    const name = String(entry.name ?? "");
    return (
      <ChartTooltip
        items={[{ name, value: opts.valueFormat(Number(entry.value)), color: opts.colorByName[name] ?? "var(--fdn-accent-solid)" }]}
      />
    );
  };
}
