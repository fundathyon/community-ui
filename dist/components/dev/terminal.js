import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Children, isValidElement } from "react";
import { cn } from "../../lib/cn";
import { CopyButton } from "./copy-button";
const kindClass = {
    input: "text-text",
    output: "text-text-secondary",
    comment: "text-text-muted",
};
/**
 * TerminalLine — one line inside a Terminal. Input lines render their prompt
 * as a non-selectable span so a manual text selection never drags a "$" along.
 */
export function TerminalLine({ kind = "input", prompt = "$", className, children, ...props }) {
    return (_jsxs("div", { className: cn("flex", kindClass[kind], className), ...props, children: [kind === "input" && (_jsx("span", { "aria-hidden": true, className: "select-none pr-2 text-text-muted", children: prompt })), _jsx("span", { className: "whitespace-pre", children: children })] }));
}
function collectInputLines(children) {
    const lines = [];
    Children.forEach(children, (child) => {
        if (!isValidElement(child) || child.type !== TerminalLine)
            return;
        const { kind = "input", children: content } = child.props;
        if (kind !== "input")
            return;
        if (typeof content === "string" || typeof content === "number")
            lines.push(String(content));
    });
    return lines.join("\n");
}
/**
 * Terminal — a session frame (§20): three muted dots, a mono title and a
 * darker body of TerminalLine children. Use it to show an interaction —
 * commands AND their output. For a copy-pasteable command on its own, use
 * CommandBlock. The copy button reproduces only what the user would type.
 */
export function Terminal({ title, copy = true, copyLabel = "Copy commands", copiedLabel = "Copied", className, children, ...props }) {
    const input = collectInputLines(children);
    return (_jsxs("div", { className: cn("overflow-hidden rounded-lg border border-border bg-bg", className), ...props, children: [_jsxs("div", { className: "flex min-h-7 items-center gap-2 border-b border-border bg-bg-subtle px-3 py-1", children: [_jsxs("span", { "aria-hidden": true, className: "flex gap-1.5", children: [_jsx("span", { className: "size-2 rounded-full bg-border-strong" }), _jsx("span", { className: "size-2 rounded-full bg-border-strong" }), _jsx("span", { className: "size-2 rounded-full bg-border-strong" })] }), title && _jsx("span", { className: "font-mono text-caption text-text-muted", children: title }), copy && input && (_jsx(CopyButton, { value: input, label: copyLabel, copiedLabel: copiedLabel, size: 14, className: "ml-auto" }))] }), _jsx("div", { className: "overflow-x-auto p-3 font-mono text-code", children: _jsx("div", { className: "w-max min-w-full", children: children }) })] }));
}
