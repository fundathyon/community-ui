import type { HTMLAttributes, LiHTMLAttributes, ReactNode } from "react";
export interface ListProps extends HTMLAttributes<HTMLUListElement> {
}
/**
 * List — a simple stacked list with hairline dividers between rows. For tabular
 * data with columns, selection, or sorting use DataTable instead; this is for
 * plain vertical sequences (members, files, options).
 *
 * Server-component safe.
 */
export declare function List({ className, ...props }: ListProps): import("react").JSX.Element;
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
export declare function ListItem({ leading, trailing, interactive, className, children, ...props }: ListItemProps): import("react").JSX.Element;
