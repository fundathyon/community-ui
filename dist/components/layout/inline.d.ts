import type { HTMLAttributes } from "react";
import { type GapScale } from "./gap";
export type InlineAlign = "start" | "center" | "end" | "baseline";
export type InlineJustify = "start" | "center" | "end" | "between";
export interface InlineProps extends HTMLAttributes<HTMLDivElement> {
    /** Gap on the 4px scale: 1=4 · 1.5=6 · 2=8 · 3=12 · 4=16 · 6=24 · 8=32 · 10=40. */
    gap?: GapScale;
    /** Allow items to wrap to the next line. */
    wrap?: boolean;
    /** Cross-axis alignment — defaults to center so controls of different
     * heights align by their optical middle (§15). */
    align?: InlineAlign;
    justify?: InlineJustify;
}
/**
 * Inline — horizontal flex row with gap and optional wrap (§15). Controls in
 * a row keep 8px between them (`gap={2}`), icon↔text keeps 6 (`gap={1.5}`).
 *
 * Server-component safe.
 */
export declare function Inline({ gap, wrap, align, justify, className, ...props }: InlineProps): import("react").JSX.Element;
