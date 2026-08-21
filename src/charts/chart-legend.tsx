import { cn } from "../lib/cn";

/** One legend entry: a series and its colour, optionally with a value. */
export interface ChartLegendItem {
  name: string;
  /** Resolved CSS colour of the series dot. */
  color: string;
  /** Optional trailing value (e.g. a total or a percentage), `tabular-nums`. */
  value?: string;
}

export interface ChartLegendProps {
  items: ChartLegendItem[];
  className?: string;
}

/**
 * ChartLegend — the suite's legend: a horizontal run of colour dots + names
 * below the chart (§22). Not decorative — it is shown only when more than one
 * series needs to be told apart, and the series are ALSO distinguishable by
 * label and position, never colour alone (§22 accessibility).
 *
 * Presentational; exported for custom compositions and used internally.
 */
export function ChartLegend({ items, className }: ChartLegendProps) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-4 gap-y-1", className)}>
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-1.5 text-caption text-text-secondary">
          <span
            aria-hidden="true"
            className="size-2 shrink-0 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="truncate">{item.name}</span>
          {item.value !== undefined && (
            <span className="ml-1 tabular-nums text-text-muted">{item.value}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
