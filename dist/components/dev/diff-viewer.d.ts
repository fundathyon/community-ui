import { type HTMLAttributes } from "react";
export interface DiffViewerProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    /** A unified diff ("-/+/@@" lines). Takes precedence over before/after. */
    diff?: string;
    /** Compute the diff from two versions instead (line-level LCS). */
    before?: string;
    after?: string;
    /** Header — "config.yaml". */
    filename?: string;
    /** Header versions — "v12 → v13". */
    versionFrom?: string;
    versionTo?: string;
    /** Old/new line-number gutters. */
    lineNumbers?: boolean;
}
/**
 * DiffViewer — what changed between two versions (§20, §24): removed lines on
 * danger-bg with a "−" gutter, added on success-bg with "+", context plain.
 * Color never carries the meaning alone — the gutter sign and an sr-only
 * prefix say it too (§M-01). Accepts a unified diff or before/after strings.
 * Line-level only: the DS needs shape, not word-level noise.
 */
export declare const DiffViewer: import("react").ForwardRefExoticComponent<DiffViewerProps & import("react").RefAttributes<HTMLDivElement>>;
