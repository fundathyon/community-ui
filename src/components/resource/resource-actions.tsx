import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface ResourceActionsProps extends HTMLAttributes<HTMLDivElement> {
  /** Overflow slot — a DropdownMenu trigger for the secondary actions (§25). */
  overflow?: ReactNode;
}

/**
 * ResourceActions — the right-aligned action cluster for a resource header (§25):
 * the visible primary/secondary actions as children, plus an `overflow` slot for
 * the rest behind a DropdownMenu. Keep one primary action; everything else is
 * secondary, ghost, or lives in the overflow menu.
 *
 * Server-component safe.
 */
export function ResourceActions({ overflow, className, children, ...props }: ResourceActionsProps) {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      {children}
      {overflow}
    </div>
  );
}
