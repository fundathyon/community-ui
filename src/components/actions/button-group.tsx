import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** REQUIRED accessible name for the group (`aria-label` on `role="group"`). */
  label: string;
}

/**
 * ButtonGroup — an attached, segmented group of Buttons acting on the same
 * object (e.g. view switchers, paging arrows). Children share borders: only
 * the first/last keep their outer radius and adjacent borders collapse.
 *
 * When to use: 2–4 closely related actions of equal weight, usually
 * `secondary` or `ghost`. Not for a primary + alternatives — that is a
 * SplitButton — and not for exclusive selection, which is a toggle group.
 */
export function ButtonGroup({ label, className, ...props }: ButtonGroupProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "inline-flex items-stretch",
        // attached segments: collapse inner radii and overlap the 1px borders
        "[&>*]:relative [&>*]:rounded-none [&>*:first-child]:rounded-l-md [&>*:last-child]:rounded-r-md",
        "[&>*:not(:first-child)]:-ml-px",
        // keep the focus ring of the focused segment above its siblings
        "[&>*:focus-visible]:z-10",
        className,
      )}
      {...props}
    />
  );
}
