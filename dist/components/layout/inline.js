import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
import { gapClasses } from "./gap";
const alignClasses = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    baseline: "items-baseline",
};
const justifyClasses = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
};
/**
 * Inline — horizontal flex row with gap and optional wrap (§15). Controls in
 * a row keep 8px between them (`gap={2}`), icon↔text keeps 6 (`gap={1.5}`).
 *
 * Server-component safe.
 */
export function Inline({ gap = 2, wrap = false, align = "center", justify, className, ...props }) {
    return (_jsx("div", { className: cn("flex", wrap && "flex-wrap", gapClasses[gap], alignClasses[align], justify && justifyClasses[justify], className), ...props }));
}
