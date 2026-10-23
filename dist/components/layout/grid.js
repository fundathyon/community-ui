import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
import { gapClasses } from "./gap";
/**
 * Grid — responsive card grid without media queries (§15): as many columns of
 * at least `min` as fit, stretching to fill. `min(min, 100%)` keeps a single
 * column from overflowing narrow viewports.
 *
 * Server-component safe.
 */
export function Grid({ min = "16rem", gap = 3, className, style, ...props }) {
    return (_jsx("div", { className: cn("grid", gapClasses[gap], className), style: { gridTemplateColumns: `repeat(auto-fit, minmax(min(${min}, 100%), 1fr))`, ...style }, ...props }));
}
