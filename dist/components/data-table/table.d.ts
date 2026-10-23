import type { HTMLAttributes, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";
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
export declare function Table({ stickyHeader, className, children, tableProps, ...props }: TableProps): import("react").JSX.Element;
/**
 * TableHeader — the `<thead>`. Header cells use the overline treatment
 * (uppercase, tracked, muted — §14). Sticks to the top when the parent Table
 * has `stickyHeader` (via the `group-data-[sticky]` marker).
 */
export declare function TableHeader({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>): import("react").JSX.Element;
export declare function TableBody({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>): import("react").JSX.Element;
export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
    /** Hover affordance + pointer cursor — for rows that respond to a click. */
    interactive?: boolean;
    /** Selected treatment (accent wash) + `data-state="selected"`. */
    selected?: boolean;
    /** Terminal-status row: drops to 0.6 opacity (§19/§21). */
    terminal?: boolean;
}
export declare function TableRow({ interactive, selected, terminal, className, ...props }: TableRowProps): import("react").JSX.Element;
export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
    align?: "left" | "right";
}
/** Column header — overline caps, muted (§14 "cabecera en overline"). */
export declare function TableHead({ align, className, ...props }: TableHeadProps): import("react").JSX.Element;
export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
    align?: "left" | "right";
}
export declare function TableCell({ align, className, ...props }: TableCellProps): import("react").JSX.Element;
export declare function TableCaption({ className, ...props }: HTMLAttributes<HTMLTableCaptionElement>): import("react").JSX.Element;
