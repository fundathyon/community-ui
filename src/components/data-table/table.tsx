import type {
  HTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";
import { cn } from "../../lib/cn";

/**
 * Table — the PRESENTATION half of the §M-03 split: styled primitives with zero
 * logic (no selection, sorting, filtering or state). Server-component safe.
 * When you need selection/sorting/filters/pagination and the four load states,
 * reach for {@link DataTable} instead — this is the low-level surface it (and
 * simple static tables) are built from.
 *
 * The wrapper owns the rounded border, surface and horizontal scroll; the inner
 * `<table>` carries a `group` + `data-sticky` marker so {@link TableHeader} can
 * opt into a sticky header purely in CSS (no context, stays server-safe).
 */
export interface TableProps extends HTMLAttributes<HTMLDivElement> {
  /** Pin the header to the top of the scroll container (§11). */
  stickyHeader?: boolean;
  /** Props forwarded to the inner `<table>` element. */
  tableProps?: TableHTMLAttributes<HTMLTableElement>;
}

export function Table({ stickyHeader, className, children, tableProps, ...props }: TableProps) {
  return (
    <div
      className={cn("overflow-x-auto rounded-xl border border-border bg-surface", className)}
      {...props}
    >
      <table
        data-sticky={stickyHeader ? "" : undefined}
        {...tableProps}
        className={cn("group w-full border-collapse text-body text-text", tableProps?.className)}
      >
        {children}
      </table>
    </div>
  );
}

/**
 * TableHeader — the `<thead>`. Header cells use the overline-ish treatment
 * (`text-label`, muted, medium). Sticks to the top when the parent Table has
 * `stickyHeader` (via the `group-data-[sticky]` marker).
 */
export function TableHeader({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn(
        "bg-bg-subtle",
        "group-data-[sticky]:sticky group-data-[sticky]:top-0 group-data-[sticky]:fdn-z-sticky group-data-[sticky]:bg-surface group-data-[sticky]:shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

export function TableBody({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn(className)} {...props} />;
}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /** Hover affordance + pointer cursor — for rows that respond to a click. */
  interactive?: boolean;
  /** Selected treatment (accent wash) + `data-state="selected"`. */
  selected?: boolean;
  /** Terminal-status row: drops to 0.6 opacity (§19/§21). */
  terminal?: boolean;
}

export function TableRow({
  interactive,
  selected,
  terminal,
  className,
  ...props
}: TableRowProps) {
  return (
    <tr
      data-state={selected ? "selected" : undefined}
      className={cn(
        "border-b border-border last:border-0",
        interactive && "cursor-pointer hover:bg-surface-hover",
        selected && "bg-accent-bg",
        terminal && "opacity-60",
        className,
      )}
      {...props}
    />
  );
}

export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  align?: "left" | "right";
}

export function TableHead({ align = "left", className, ...props }: TableHeadProps) {
  return (
    <th
      scope="col"
      className={cn(
        "h-9 whitespace-nowrap px-3 text-label font-medium text-text-muted",
        align === "right" ? "text-right" : "text-left",
        className,
      )}
      {...props}
    />
  );
}

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  align?: "left" | "right";
}

export function TableCell({ align = "left", className, ...props }: TableCellProps) {
  return (
    <td
      className={cn(
        "px-3 py-2 align-middle",
        align === "right" ? "text-right" : "text-left",
        className,
      )}
      {...props}
    />
  );
}

export function TableCaption({ className, ...props }: HTMLAttributes<HTMLTableCaptionElement>) {
  return (
    <caption className={cn("px-3 py-2 text-left text-caption text-text-muted", className)} {...props} />
  );
}
