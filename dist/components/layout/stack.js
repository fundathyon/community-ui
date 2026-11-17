import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
import { gapClasses } from "./gap";
const alignClasses = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
};
/**
 * Stack — vertical flex column with a gap from the scale. 80% of layouts (§15).
 * Nobody writes a loose `margin`: the container owns the spacing with `gap`.
 *
 * Server-component safe.
 */
export function Stack({ gap = 4, align, className, ...props }) {
    return (_jsx("div", { className: cn("flex flex-col", gapClasses[gap], align && alignClasses[align], className), ...props }));
}
