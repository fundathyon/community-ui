import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface FormActionsProps extends HTMLAttributes<HTMLDivElement> {
  /** Info pinned to the left — e.g. "2 cambios sin guardar" (§16). */
  leading?: ReactNode;
  /** Pins the row to the bottom of the scroll container (drawer edits, long
   * forms) so Save never scrolls out of reach (§16 CRUD). */
  sticky?: boolean;
  /** The buttons, right-aligned. Cancel goes ghost, before the primary. */
  children: ReactNode;
}

/**
 * FormActions — the action row of a form: buttons right-aligned, optional
 * leading info slot. Never disable Save until everything is valid — submit
 * and focus the first invalid field instead (§10). One primary per screen.
 *
 * Server-component safe.
 */
export function FormActions({ leading, sticky = false, className, children, ...props }: FormActionsProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-2",
        sticky && "sticky bottom-0 fdn-z-sticky border-t border-border bg-surface py-3",
        className,
      )}
      {...props}
    >
      {leading && <div className="mr-auto min-w-0 text-body-sm text-text-secondary">{leading}</div>}
      {children}
    </div>
  );
}
