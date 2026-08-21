import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

export interface ChartToolbarProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Section title on the left (text-h5). */
  title?: ReactNode;
  /** Freshness / meta text shown muted before the controls ("Actualizado hace 30 s"). */
  meta?: ReactNode;
  /** Controls on the right — typically a TimeRangePicker, a refresh button. */
  children?: ReactNode;
}

/**
 * ChartToolbar — the header row of a dashboard section (§22 "Vista general"):
 * title on the left, controls (range picker, refresh meta) on the right. Pure
 * layout; wraps to a stack on narrow widths.
 *
 * Server-component safe.
 */
export function ChartToolbar({ title, meta, children, className, ...props }: ChartToolbarProps) {
  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-2", className)} {...props}>
      {title !== undefined && <div className="min-w-0 text-h5 text-text">{title}</div>}
      {(meta !== undefined || children !== undefined) && (
        <div className="flex items-center gap-2">
          {meta !== undefined && <span className="text-caption text-text-muted">{meta}</span>}
          {children}
        </div>
      )}
    </div>
  );
}
