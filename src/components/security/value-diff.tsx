import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface ValueDiffProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** The previous value. */
  from: string | number;
  /** The new value. */
  to: string | number;
  /** Field name shown before the values, e.g. "replicas". */
  label?: ReactNode;
}

/**
 * ValueDiff — the scalar case of the §24 before/after diff: the old value
 * struck through, an arrow, then the new value, inline. For an object or a
 * multi-field change, collapse instead and open the §20 `DiffViewer` — this
 * is its lightweight sibling for a single value, never a replacement for it.
 *
 * The strikethrough is never the only signal (§M-01 — line-through alone
 * isn't read by screen readers and doesn't survive to colorblind/low-vision
 * users): the old value also gets a distinct danger tone and a fixed
 * before-the-arrow position, and an sr-only sentence carries the change
 * independently of the strikethrough.
 */
export function ValueDiff({ from, to, label, className, ...props }: ValueDiffProps) {
  const numeric = typeof from === "number" && typeof to === "number";
  return (
    <span className={cn("inline-flex flex-wrap items-baseline gap-1.5", className)} {...props}>
      {label != null && <span className="text-text-muted">{label}</span>}
      <span className="sr-only">{`changed from ${from} to ${to}`}</span>
      <span aria-hidden="true" className="inline-flex items-baseline gap-1.5">
        <del className={cn("text-danger no-underline line-through", numeric && "tabular-nums")}>{from}</del>
        <span className="text-text-muted">→</span>
        <ins className={cn("text-success no-underline", numeric && "tabular-nums")}>{to}</ins>
      </span>
    </span>
  );
}
