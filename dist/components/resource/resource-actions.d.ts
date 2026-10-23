import type { HTMLAttributes, ReactNode } from "react";
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
export declare function ResourceActions({ overflow, className, children, ...props }: ResourceActionsProps): import("react").JSX.Element;
