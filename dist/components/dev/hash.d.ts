import type { HTMLAttributes } from "react";
export interface HashProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
    /** The full digest — "sha256:4a3ed8…". */
    value: string;
    /** Middle-truncate the display, keeping both ends verifiable. */
    truncate?: boolean;
    /** Characters kept at the start / end when truncating. */
    head?: number;
    tail?: number;
    /** Copies the FULL value — never the ellipsis version (§20 hard rule). */
    copy?: boolean;
    copyLabel?: string;
    copiedLabel?: string;
}
/**
 * Hash — a digest or id display (§20, §21 digest cell): mono, secondary,
 * middle-truncated so both ends stay verifiable, with a copy button that
 * ALWAYS copies the complete value. Everything truncated keeps its full copy.
 */
export declare function Hash({ value, truncate, head, tail, copy, copyLabel, copiedLabel, className, ...props }: HashProps): import("react").JSX.Element;
