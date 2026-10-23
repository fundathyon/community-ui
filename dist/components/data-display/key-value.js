import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
/**
 * KeyValue — a single term/value pair: a muted caption label above the value.
 * Use `mono` for literal, copy-and-compare data. For a set of pairs laid out on
 * a grid, use DescriptionList.
 *
 * Server-component safe.
 */
export function KeyValue({ label, mono = false, className, children, ...props }) {
    return (_jsxs("div", { className: cn("flex flex-col gap-0.5", className), ...props, children: [_jsx("span", { className: "text-caption text-text-muted", children: label }), _jsx("span", { className: cn("text-body text-text", mono && "font-mono text-code tabular-nums"), children: children })] }));
}
