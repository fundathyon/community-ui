import type { HTMLAttributes, ReactNode } from "react";
export interface ChartToolbarProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    /** Section title on the left (text-h5). */
    title?: ReactNode;
    /** Freshness / meta text shown muted before the controls ("Actualizado hace 30 s"). */
    meta?: ReactNode;
    /** Controls on the right — typically a TimeRangePicker, a refresh button. */
    children?: ReactNode;
}
/**
 * ChartToolbar — the header row of a dashboard section (§22 "Vista general"):
 * title on the left, controls (range picker, refresh meta) on the right. Pure
 * layout; wraps to a stack on narrow widths.
 *
 * Server-component safe.
 */
export declare function ChartToolbar({ title, meta, children, className, ...props }: ChartToolbarProps): import("react").JSX.Element;
