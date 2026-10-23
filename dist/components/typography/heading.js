import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
const visualClasses = {
    display: "text-display",
    h1: "text-h1",
    h2: "text-h2",
    h3: "text-h3",
    h4: "text-h4",
    h5: "text-h5",
};
/**
 * Heading — the level-named type scale applied to real heading elements (§03).
 * `level` carries document semantics; `visual` overrides the size when they
 * must diverge. Max 3 heading levels per screen; only display/h1/h2 scale
 * down responsively — the rest are fixed.
 *
 * Server-component safe.
 */
export function Heading({ level, visual, className, ...props }) {
    const Tag = `h${level}`;
    return _jsx(Tag, { className: cn(visualClasses[visual ?? `h${level}`], "text-text", className), ...props });
}
