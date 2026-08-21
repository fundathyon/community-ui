import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export type SkeletonVariant = "text" | "rect" | "circle";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  /** Text variant only: number of lines; the last line is shortened. */
  lines?: number;
}

/**
 * Skeleton — a shape mirror of the REAL content: same number of columns, same
 * row height (§11). Show it only when the shape is known and the wait exceeds
 * 300ms — under that, show nothing (that timing lives in the app/DataTable).
 * Size it with `className` (width/height utilities). Pulses via `.fdn-skeleton`
 * (reduced-motion safe). Announce the busy region with SkeletonGroup.
 */
export function Skeleton({ variant = "rect", lines, className, ...props }: SkeletonProps) {
  if (variant === "text" && lines && lines > 1) {
    return (
      <div aria-hidden="true" className={cn("flex w-full flex-col gap-2", className)} {...props}>
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={cn("fdn-skeleton h-3 rounded-sm", i === lines - 1 ? "w-3/5" : "w-full")}
          />
        ))}
      </div>
    );
  }
  return (
    <div
      aria-hidden="true"
      className={cn(
        "fdn-skeleton",
        variant === "text" && "h-3 w-full rounded-sm",
        variant === "rect" && "rounded-md",
        variant === "circle" && "aspect-square rounded-full",
        className,
      )}
      {...props}
    />
  );
}

export interface SkeletonGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Screen-reader-only description of what is loading. Overridable copy. */
  label?: string;
  /** Flip to false when the real content replaces the skeletons. @default true */
  busy?: boolean;
}

/**
 * SkeletonGroup — the busy region around Skeletons: sets `aria-busy` and a
 * polite live region so the load is announced once, not per bone (§11).
 */
export function SkeletonGroup({ label, busy = true, className, children, ...props }: SkeletonGroupProps) {
  return (
    <div aria-busy={busy || undefined} aria-live="polite" className={className} {...props}>
      {label && <span className="sr-only">{label}</span>}
      {children}
    </div>
  );
}
