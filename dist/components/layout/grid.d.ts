import type { HTMLAttributes } from "react";
import { type GapScale } from "./gap";
export interface GridProps extends HTMLAttributes<HTMLDivElement> {
    /** Minimum column width (any CSS length, e.g. `"16rem"`). Columns are created
     * with `auto-fit, minmax(min(min, 100%), 1fr)` — no media queries (§15). */
    min?: string;
    /** Gap on the 4px scale. Card grids use 3 (12px, §04). */
    gap?: GapScale;
}
/**
 * Grid — responsive card grid without media queries (§15): as many columns of
 * at least `min` as fit, stretching to fill. `min(min, 100%)` keeps a single
 * column from overflowing narrow viewports.
 *
 * Server-component safe.
 */
export declare function Grid({ min, gap, className, style, ...props }: GridProps): import("react").JSX.Element;
