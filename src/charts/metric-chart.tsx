import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

export interface MetricChartProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** The metric's name (muted overline-ish caption). */
  label: ReactNode;
  /** The headline value — large, `tabular-nums` (§03 data numbers). */
  value: ReactNode;
  /** Secondary line: a delta ("+12 % vs ayer") or a target ("objetivo < 200 ms"). */
  context?: ReactNode;
  /** The chart shown beneath the header — typically a 200px card chart or a
   * Sparkline. Layout only; the child owns its own states. */
  children?: ReactNode;
}

/**
 * MetricChart — a KPI header (label · value · context) stacked over its chart
 * (§22 grid: KPIs on top, the number you read without scrolling). Pure layout —
 * it deliberately does NOT import the parallel data-display StatCard; it just
 * arranges a value and a chart child.
 *
 * When to use: a headline number paired with its trend. For the number alone use
 * a StatCard from data-display; for the trend alone use a chart directly.
 *
 * Server-component safe.
 */
export function MetricChart({ label, value, context, children, className, ...props }: MetricChartProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)} {...props}>
      <div className="flex flex-col gap-0.5">
        <span className="text-caption text-text-muted">{label}</span>
        <span className="text-h2 tabular-nums text-text">{value}</span>
        {context !== undefined && <span className="text-caption text-text-secondary">{context}</span>}
      </div>
      {children}
    </div>
  );
}
