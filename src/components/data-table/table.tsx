"use client";

import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type TableHTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
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
 * opt into a sticky header purely in CSS (no context).
 *
 * When the table is wider than its wrapper, the wrapper becomes a keyboard
 * stop (`tabIndex=0`) so it can be scrolled with the arrow keys (WCAG 2.1.1,
 * axe `scrollable-region-focusable`), and a named `region` when `label` or the
 * table's `aria-label` gives it a name. A table that fits adds no tab stop.
 */
export interface TableProps extends HTMLAttributes<HTMLDivElement> {
  /** Pin the header to the top of the scroll container (§11). */
  stickyHeader?: boolean;
  /** Props forwarded to the inner `<table>` element. */
  tableProps?: TableHTMLAttributes<HTMLTableElement>;
  /**
   * Accessible name of the scroll region, used only while the table overflows.
   * Falls back to `tableProps["aria-label"]`.
   */
  label?: string;
}

/** True while the element's content is wider than the element itself. */
function useHorizontalOverflow<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [overflows, setOverflows] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => setOverflows(el.scrollWidth > el.clientWidth + 1);
    check();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(check);
    observer.observe(el);
    if (el.firstElementChild) observer.observe(el.firstElementChild);
    return () => observer.disconnect();
  }, []);
  return [ref, overflows] as const;
}

export function Table({ stickyHeader, className, children, tableProps, label, ...props }: TableProps) {
  const [ref, overflows] = useHorizontalOverflow<HTMLDivElement>();
  const name = label ?? tableProps?.["aria-label"];
  return (
    <div
      ref={ref}
      tabIndex={overflows ? 0 : undefined}
      role={overflows && name ? "region" : undefined}
      aria-label={overflows && name ? name : undefined}
      className={cn(
        "overflow-x-auto rounded-xl border border-border bg-surface",
        "focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus",
        className,
      )}
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
 * TableHeader — the `<thead>`. Header cells use the overline treatment
 * (uppercase, tracked, muted — §14). Sticks to the top when the parent Table
 * has `stickyHeader` (via the `group-data-[sticky]` marker).
 */
export function TableHeader({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn(
        "bg-surface",
        "group-data-[sticky]:sticky group-data-[sticky]:top-0 group-data-[sticky]:fdn-z-sticky group-data-[sticky]:shadow-sm",
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
        "group/row border-b border-border last:border-0",
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

/** Column header — overline caps, muted (§14 "cabecera en overline"). */
export function TableHead({ align = "left", className, ...props }: TableHeadProps) {
  return (
    <th
      scope="col"
      className={cn(
        "h-10 whitespace-nowrap px-3 text-overline uppercase text-text-muted",
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
