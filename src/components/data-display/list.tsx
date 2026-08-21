import type { HTMLAttributes, LiHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface ListProps extends HTMLAttributes<HTMLUListElement> {}

/**
 * List — a simple stacked list with hairline dividers between rows. For tabular
 * data with columns, selection, or sorting use DataTable instead; this is for
 * plain vertical sequences (members, files, options).
 *
 * Server-component safe.
 */
export function List({ className, ...props }: ListProps) {
  return <ul className={cn("divide-y divide-border", className)} {...props} />;
}

export interface ListItemProps extends LiHTMLAttributes<HTMLLIElement> {
  /** Leading slot — an icon, avatar or status marker. */
  leading?: ReactNode;
  /** Trailing slot — a value, badge or action, aligned right. */
  trailing?: ReactNode;
  /** Adds surface hover feedback for rows that respond to the pointer. */
  interactive?: boolean;
}

/**
 * ListItem — one row: optional leading and trailing slots around the content,
 * 10px vertical padding. `interactive` adds hover feedback; wire the actual
 * click/keyboard onto a real control inside, not the `<li>`.
 *
 * Server-component safe.
 */
export function ListItem({ leading, trailing, interactive = false, className, children, ...props }: ListItemProps) {
  return (
    <li
      className={cn(
        "flex items-center gap-3 py-2.5",
        interactive &&
          "cursor-pointer transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)] hover:bg-surface-hover",
        className,
      )}
      {...props}
    >
      {leading ? <span className="flex shrink-0 items-center">{leading}</span> : null}
      <span className="min-w-0 flex-1">{children}</span>
      {trailing ? <span className="flex shrink-0 items-center">{trailing}</span> : null}
    </li>
  );
}
