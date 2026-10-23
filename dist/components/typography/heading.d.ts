import type { HTMLAttributes } from "react";
/** Semantic heading levels — the suite never uses `h6`. */
export type HeadingLevel = 1 | 2 | 3 | 4 | 5;
/** Visual sizes of the type scale a heading may adopt (§03). */
export type HeadingVisual = "display" | "h1" | "h2" | "h3" | "h4" | "h5";
export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
    /** Semantic level — renders `h1`…`h5` and defaults the visual size to match. */
    level: HeadingLevel;
    /** Decouple size from semantics: an `h2` can look like `h4` when the outline
     * demands one thing and the layout another. */
    visual?: HeadingVisual;
}
/**
 * Heading — the level-named type scale applied to real heading elements (§03).
 * `level` carries document semantics; `visual` overrides the size when they
 * must diverge. Max 3 heading levels per screen; only display/h1/h2 scale
 * down responsively — the rest are fixed.
 *
 * Server-component safe.
 */
export declare function Heading({ level, visual, className, ...props }: HeadingProps): import("react").JSX.Element;
