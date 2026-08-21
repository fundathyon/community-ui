import { jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
/**
 * ResourceActions — the right-aligned action cluster for a resource header (§25):
 * the visible primary/secondary actions as children, plus an `overflow` slot for
 * the rest behind a DropdownMenu. Keep one primary action; everything else is
 * secondary, ghost, or lives in the overflow menu.
 *
 * Server-component safe.
 */
export function ResourceActions({ overflow, className, children, ...props }) {
    return (_jsxs("div", { className: cn("flex items-center gap-2", className), ...props, children: [children, overflow] }));
}
