"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronRight } from "lucide-react";
import { forwardRef, useState } from "react";
import { cn } from "../../lib/cn";
import { maskSecret } from "../../lib/format";
import { Badge } from "../feedback/badge";
import { Icon } from "../typography/icon";
import { CopyButton } from "./copy-button";
function defaultCountLabel(count, kind) {
    if (kind === "array")
        return `${count} ${count === 1 ? "item" : "items"}`;
    return `${count} ${count === 1 ? "field" : "fields"}`;
}
function maskValue(value) {
    if (value === null || typeof value === "object")
        return "••••••••••••";
    return maskSecret(String(value));
}
/**
 * Serialize for copy. Without secretKeys the raw data is copied verbatim;
 * with secretKeys every matching value is masked in the copied text as well —
 * the DS rule is that secrets never travel in clear (§20).
 */
function serializeJson(data, secretKeys) {
    if (!secretKeys || secretKeys.length === 0)
        return JSON.stringify(data, null, 2) ?? "";
    const secret = new Set(secretKeys.map((k) => k.toLowerCase()));
    return (JSON.stringify(data, function replacer(key, value) {
        if (key && secret.has(key.toLowerCase()))
            return maskValue(value);
        return value;
    }, 2) ?? "");
}
function Key({ name }) {
    return (_jsxs(_Fragment, { children: [_jsx("span", { className: "text-info", children: `"${name}"` }), _jsx("span", { className: "text-text-muted", children: ": " })] }));
}
function Primitive({ value }) {
    if (typeof value === "string")
        return _jsx("span", { className: "text-success", children: `"${value}"` });
    return _jsx("span", { className: "text-accent", children: String(value) });
}
function JsonNode({ name, value, depth, last, defaultExpandDepth, isSecretKey, secretLabel, countLabel, }) {
    const [open, setOpen] = useState(depth < defaultExpandDepth);
    const secret = name !== undefined && isSecretKey(name);
    const composite = !secret && value !== null && typeof value === "object";
    if (!composite) {
        return (_jsxs("div", { className: "flex items-center gap-1 whitespace-pre rounded-sm px-1 py-px pl-5 hover:bg-surface-hover", children: [name !== undefined && _jsx(Key, { name: name }), secret ? (_jsxs("span", { className: "inline-flex items-center gap-1.5", children: [_jsx("span", { className: "text-text-secondary", children: maskValue(value) }), _jsx(Badge, { tone: "warning", children: secretLabel })] })) : (_jsx(Primitive, { value: value })), !last && _jsx("span", { className: "text-text-muted", children: "," })] }));
    }
    const isArray = Array.isArray(value);
    const entries = isArray
        ? value.map((item) => [undefined, item])
        : Object.entries(value);
    const openBracket = isArray ? "[" : "{";
    const closeBracket = isArray ? "]" : "}";
    const count = countLabel(entries.length, isArray ? "array" : "object");
    return (_jsxs("div", { children: [_jsxs("button", { type: "button", "aria-expanded": open, onClick: () => setOpen(!open), className: cn("flex w-full items-center gap-1 whitespace-pre rounded-sm px-1 py-px text-left", "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)] hover:bg-surface-hover"), children: [_jsx(Icon, { icon: ChevronRight, size: 12, className: cn("text-text-muted transition-transform duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]", open && "rotate-90") }), name !== undefined && _jsx(Key, { name: name }), _jsx("span", { className: "text-text-muted", children: open ? openBracket : `${openBracket} ${count} ${closeBracket}${last ? "" : ","}` })] }), open && (_jsxs(_Fragment, { children: [_jsx("div", { className: "ml-2 border-l border-border pl-3", children: entries.map(([key, item], i) => (_jsx(JsonNode, { name: key, value: item, depth: depth + 1, last: i === entries.length - 1, defaultExpandDepth: defaultExpandDepth, isSecretKey: isSecretKey, secretLabel: secretLabel, countLabel: countLabel }, key ?? i))) }), _jsx("div", { className: "px-1 pl-5 text-text-muted", children: `${closeBracket}${last ? "" : ","}` })] }))] }));
}
/**
 * JsonViewer — collapsible JSON tree (§20): in a 200-key object what matters
 * is the SHAPE, so nodes collapse to "{ 4 fields }" / "[ 12 items ]" counts.
 * Keys are info, string literals success, other primitives accent, punctuation
 * muted. Any key listed in `secretKeys` renders masked with a badge even when
 * the payload came in clear — and the copied JSON is masked too.
 *
 * For a flat highlighted dump (no tree) use CodeBlock with `language="json"`.
 */
export const JsonViewer = forwardRef(function JsonViewer({ data, defaultExpandDepth = 1, secretKeys, secretLabel = "Secret", copy = true, copyLabel = "Copy", copiedLabel = "Copied", label, countLabel = defaultCountLabel, className, ...props }, ref) {
    const secretSet = new Set((secretKeys ?? []).map((k) => k.toLowerCase()));
    const isSecretKey = (key) => secretSet.has(key.toLowerCase());
    return (_jsxs("div", { ref: ref, className: cn("relative rounded-lg border border-border bg-bg-subtle p-2 font-mono text-code text-text", className), ...props, children: [label ? (_jsxs("div", { className: "mb-1 flex items-center justify-between gap-2 px-1", children: [_jsx("span", { className: "text-caption text-text-secondary", children: label }), copy && (_jsx(CopyButton, { value: () => serializeJson(data, secretKeys), label: copyLabel, copiedLabel: copiedLabel, size: 14 }))] })) : (copy && (_jsx(CopyButton, { value: () => serializeJson(data, secretKeys), label: copyLabel, copiedLabel: copiedLabel, size: 14, className: "absolute right-1.5 top-1.5 bg-bg-subtle" }))), _jsx(JsonNode, { value: data, depth: 0, last: true, defaultExpandDepth: defaultExpandDepth, isSecretKey: isSecretKey, secretLabel: secretLabel, countLabel: countLabel })] }));
});
