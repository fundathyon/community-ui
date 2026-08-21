import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
/**
 * ValueDiff — the scalar case of the §24 before/after diff: the old value
 * struck through, an arrow, then the new value, inline. For an object or a
 * multi-field change, collapse instead and open the §20 `DiffViewer` — this
 * is its lightweight sibling for a single value, never a replacement for it.
 *
 * The strikethrough is never the only signal (§M-01 — line-through alone
 * isn't read by screen readers and doesn't survive to colorblind/low-vision
 * users): the old value also gets a distinct danger tone and a fixed
 * before-the-arrow position, and an sr-only sentence carries the change
 * independently of the strikethrough.
 */
export function ValueDiff({ from, to, label, className, ...props }) {
    const numeric = typeof from === "number" && typeof to === "number";
    return (_jsxs("span", { className: cn("inline-flex flex-wrap items-baseline gap-1.5", className), ...props, children: [label != null && _jsx("span", { className: "text-text-muted", children: label }), _jsx("span", { className: "sr-only", children: `changed from ${from} to ${to}` }), _jsxs("span", { "aria-hidden": "true", className: "inline-flex items-baseline gap-1.5", children: [_jsx("del", { className: cn("text-danger no-underline line-through", numeric && "tabular-nums"), children: from }), _jsx("span", { className: "text-text-muted", children: "\u2192" }), _jsx("ins", { className: cn("text-success no-underline", numeric && "tabular-nums"), children: to })] })] }));
}
