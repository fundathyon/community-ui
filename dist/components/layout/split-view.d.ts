import { type HTMLAttributes, type ReactNode } from "react";
export interface SplitViewProps extends HTMLAttributes<HTMLDivElement> {
    /** The list panel (left). */
    list: ReactNode;
    /** The detail panel (right). */
    detail: ReactNode;
    /** Initial list-panel width, percent of the container (default 40). */
    defaultSize?: number;
    /** Minimum width of EACH panel, percent (default 25, §15). */
    minSize?: number;
    /** Persist the ratio in localStorage under this key. */
    storageKey?: string;
    /**
     * Below `xl` there is no side-by-side (§08): when this controlled prop is
     * provided, `true` shows the detail and `false` the list; when omitted,
     * the panels simply stack.
     */
    detailOpen?: boolean;
    /** Accessible name of the resize handle. Overridable (products ship Spanish copy). */
    resizeLabel?: string;
}
/**
 * SplitView — list + detail side by side at ≥ xl, resizable via a keyboard-
 * operable separator, with the ratio persisted per user (§15, §08). Below xl
 * the detail panel stops sharing the row: it stacks, or — with `detailOpen`
 * controlled — replaces the list (the app decides, e.g. from the route).
 */
export declare function SplitView({ list, detail, defaultSize, minSize, storageKey, detailOpen, resizeLabel, className, ...props }: SplitViewProps): import("react").JSX.Element;
