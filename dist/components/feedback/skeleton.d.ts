import type { HTMLAttributes } from "react";
export type SkeletonVariant = "text" | "rect" | "circle";
export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    variant?: SkeletonVariant;
    /** Text variant only: number of lines; the last line is shortened. */
    lines?: number;
}
/**
 * Skeleton — a shape mirror of the REAL content: same number of columns, same
 * row height (§11). Show it only when the shape is known and the wait exceeds
 * 300ms — under that, show nothing (that timing lives in the app/DataTable).
 * Size it with `className` (width/height utilities). Pulses via `.fdn-skeleton`
 * (reduced-motion safe). Announce the busy region with SkeletonGroup.
 */
export declare function Skeleton({ variant, lines, className, ...props }: SkeletonProps): import("react").JSX.Element;
export interface SkeletonGroupProps extends HTMLAttributes<HTMLDivElement> {
    /** Screen-reader-only description of what is loading. Overridable copy. */
    label?: string;
    /** Flip to false when the real content replaces the skeletons. @default true */
    busy?: boolean;
}
/**
 * SkeletonGroup — the busy region around Skeletons: sets `aria-busy` and a
 * polite live region so the load is announced once, not per bone (§11).
 */
export declare function SkeletonGroup({ label, busy, className, children, ...props }: SkeletonGroupProps): import("react").JSX.Element;
