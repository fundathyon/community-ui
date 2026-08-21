import { cn } from "../lib/cn";

/** One row of the tooltip: a series and its value at the hovered x. */
export interface ChartTooltipItem {
  name: string;
  /** Already-formatted value string (values are `tabular-nums`, right-aligned). */
  value: string;
  /** Resolved CSS colour of the series dot. */
  color: string;
}

export interface ChartTooltipProps {
  /** The hovered x, already formatted. */
  label?: string;
  items: ChartTooltipItem[];
  className?: string;
}

/**
 * ChartTooltip — the suite's own tooltip content for every recharts wrapper
 * (§22 typography rule): surface-raised card, border, shadow-md, rounded-md,
 * caption type, a colour dot per series and values in `tabular-nums`, right
 * aligned. recharts' default tooltip is never shown; this replaces it.
 *
 * Presentational and recharts-free, so it is also usable in custom compositions.
 */
export function ChartTooltip({ label, items, className }: ChartTooltipProps) {
  return (
    <div
      className={cn(
        "min-w-32 rounded-md border border-border bg-surface-raised px-2.5 py-2 shadow-md",
        className,
      )}
    >
      {label && <div className="mb-1 text-caption text-text-muted">{label}</div>}
      <ul className="flex flex-col gap-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-caption">
            <span
              aria-hidden="true"
              className="size-2 shrink-0 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="min-w-0 flex-1 truncate text-text-secondary">{item.name}</span>
            <span className="ml-auto tabular-nums text-text">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
