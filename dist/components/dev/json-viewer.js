"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Check, ChevronRight, ChevronsDownUp, ChevronsUpDown, Copy, Link2 } from "lucide-react";
import { forwardRef, useCallback, useMemo, useState } from "react";
import { useCopyToClipboard } from "../../hooks/use-copy-to-clipboard";
import { cn } from "../../lib/cn";
import { maskSecret } from "../../lib/format";
import { Badge } from "../feedback/badge";
import { Tooltip } from "../overlays/tooltip";
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
/** Compose a JSON path like `users[0].email` — safe for use in copy/scroll. */
function composePath(base, name, isArrayIndex, index) {
    if (isArrayIndex)
        return `${base}[${index}]`;
    if (name === undefined)
        return base;
    if (/^[A-Za-z_$][\w$]*$/.test(name))
        return base ? `${base}.${name}` : name;
    // Quoted-key form for non-identifier keys — `body["x-header"]`.
    return `${base || ""}["${name.replace(/"/g, '\\"')}"]`;
}
function Key({ name }) {
    return (_jsxs(_Fragment, { children: [_jsx("span", { className: "text-info", children: `"${name}"` }), _jsx("span", { className: "text-text-muted", children: ": " })] }));
}
function Primitive({ value }) {
    if (typeof value === "string")
        return _jsx("span", { className: "text-success", children: `"${value}"` });
    return _jsx("span", { className: "text-accent", children: String(value) });
}
/** Tiny inline action used for hover-reveal copy affordances on each node. */
function NodeActionButton({ label, onClick, icon, copiedIcon = Check, copied, }) {
    return (_jsx(Tooltip, { content: copied ? "Copied" : label, children: _jsx("button", { type: "button", onClick: (e) => {
                e.stopPropagation();
                onClick();
            }, "aria-label": label, className: cn("inline-flex size-5 items-center justify-center rounded-sm text-text-muted", "opacity-0 transition-opacity duration-[var(--fdn-dur-fast)] group-hover:opacity-100 focus-visible:opacity-100", "hover:bg-surface-hover hover:text-text", "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"), children: _jsx(Icon, { icon: copied ? copiedIcon : icon, size: 12 }) }) }));
}
function useShortlivedCopy() {
    const { copy } = useCopyToClipboard();
    const [flag, setFlag] = useState(null);
    const trigger = useCallback((id, value) => {
        copy(value);
        setFlag(id);
        window.setTimeout(() => setFlag((current) => (current === id ? null : current)), 1600);
    }, [copy]);
    return { flag, trigger };
}
function JsonNode({ name, value, depth, last, path, isArrayIndex, arrayIndex, forceState, defaultExpandDepth, isSecretKey, secretLabel, countLabel, copyValue, copyPath, copyValueLabel, copyPathLabel, secretKeys, renderValue, }) {
    const initialOpen = depth < defaultExpandDepth;
    const [localOpen, setLocalOpen] = useState(initialOpen);
    const open = forceState === "expanded" ? true : forceState === "collapsed" ? false : localOpen;
    const secret = name !== undefined && isSecretKey(name);
    const composite = !secret && value !== null && typeof value === "object";
    const { flag, trigger } = useShortlivedCopy();
    const currentPath = composePath(path, name, isArrayIndex, arrayIndex);
    const nodeActions = (_jsxs("span", { className: "ml-1 inline-flex items-center gap-0.5", children: [copyValue && (_jsx(NodeActionButton, { label: copyValueLabel, icon: Copy, copied: flag === "value", onClick: () => trigger("value", typeof value === "string" ? value : serializeJson(secret ? maskValue(value) : value, secretKeys)) })), copyPath && currentPath !== "" && (_jsx(NodeActionButton, { label: copyPathLabel, icon: Link2, copied: flag === "path", onClick: () => trigger("path", currentPath) }))] }));
    if (!composite) {
        const custom = renderValue?.({ key: name, value, path: currentPath, depth });
        return (_jsxs("div", { className: "group flex items-center gap-1 whitespace-pre rounded-sm px-1 py-px pl-5 hover:bg-surface-hover", children: [name !== undefined && _jsx(Key, { name: name }), secret ? (_jsxs("span", { className: "inline-flex items-center gap-1.5", children: [_jsx("span", { className: "text-text-secondary", children: maskValue(value) }), _jsx(Badge, { tone: "warning", children: secretLabel })] })) : custom !== undefined && custom !== null ? (custom) : (_jsx(Primitive, { value: value })), !last && _jsx("span", { className: "text-text-muted", children: "," }), (copyValue || copyPath) && nodeActions] }));
    }
    const isArray = Array.isArray(value);
    const entries = isArray
        ? value.map((item) => [undefined, item])
        : Object.entries(value);
    const openBracket = isArray ? "[" : "{";
    const closeBracket = isArray ? "]" : "}";
    const count = countLabel(entries.length, isArray ? "array" : "object");
    return (_jsxs("div", { className: "group", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsxs("button", { type: "button", "aria-expanded": open, onClick: () => setLocalOpen(!open), className: cn("flex flex-1 items-center gap-1 whitespace-pre rounded-sm px-1 py-px text-left", "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)] hover:bg-surface-hover"), children: [_jsx(Icon, { icon: ChevronRight, size: 12, className: cn("text-text-muted transition-transform duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]", open && "rotate-90") }), name !== undefined && _jsx(Key, { name: name }), _jsx("span", { className: "text-text-muted", children: open ? openBracket : `${openBracket} ${count} ${closeBracket}${last ? "" : ","}` })] }), (copyValue || copyPath) && nodeActions] }), open && (_jsxs(_Fragment, { children: [_jsx("div", { className: "ml-2 border-l border-border pl-3", children: entries.map(([key, item], i) => (_jsx(JsonNode, { name: key, value: item, depth: depth + 1, last: i === entries.length - 1, path: currentPath, isArrayIndex: isArray, arrayIndex: i, forceState: forceState, defaultExpandDepth: defaultExpandDepth, isSecretKey: isSecretKey, secretLabel: secretLabel, countLabel: countLabel, copyValue: copyValue, copyPath: copyPath, copyValueLabel: copyValueLabel, copyPathLabel: copyPathLabel, secretKeys: secretKeys, renderValue: renderValue }, key ?? i))) }), _jsx("div", { className: "px-1 pl-5 text-text-muted", children: `${closeBracket}${last ? "" : ","}` })] }))] }));
}
/**
 * JsonViewer — collapsible JSON tree (§20): in a 200-key object what matters
 * is the SHAPE, so nodes collapse to "{ 4 fields }" / "[ 12 items ]" counts.
 * Keys are info, string literals success, other primitives accent, punctuation
 * muted. Any key listed in `secretKeys` renders masked with a badge even when
 * the payload came in clear — and the copied JSON is masked too.
 *
 * For a flat highlighted dump (no tree) use CodeBlock with `language="json"`.
 * For an editable variant use JsonEditor.
 */
export const JsonViewer = forwardRef(function JsonViewer({ data, defaultExpandDepth = 1, secretKeys, secretLabel = "Secret", copy = true, copyLabel = "Copy", copiedLabel = "Copied", label, expandable = false, expandAllLabel = "Expand all", collapseAllLabel = "Collapse all", copyValue = false, copyPath = false, copyValueLabel = "Copy value", copyPathLabel = "Copy path", countLabel = useMemoCountLabel, renderValue, className, ...props }, ref) {
    const secretSet = useMemo(() => new Set((secretKeys ?? []).map((k) => k.toLowerCase())), [secretKeys]);
    const isSecretKey = useCallback((key) => secretSet.has(key.toLowerCase()), [secretSet]);
    const [forceState, setForceState] = useState(null);
    const hasHeader = Boolean(label) || (expandable && (copy || label));
    return (_jsxs("div", { ref: ref, className: cn("relative rounded-lg border border-border bg-bg-subtle p-2 font-mono text-code text-text", className), ...props, children: [hasHeader ? (_jsxs("div", { className: "mb-1 flex items-center justify-between gap-2 px-1", children: [_jsx("span", { className: "text-caption text-text-secondary", children: label }), _jsxs("div", { className: "flex items-center gap-1.5", children: [expandable && (_jsxs(_Fragment, { children: [_jsx(Tooltip, { content: expandAllLabel, children: _jsx("button", { type: "button", "aria-label": expandAllLabel, onClick: () => setForceState("expanded"), className: "inline-flex size-5 items-center justify-center rounded-sm text-text-muted hover:bg-surface-hover hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus", children: _jsx(Icon, { icon: ChevronsUpDown, size: 12 }) }) }), _jsx(Tooltip, { content: collapseAllLabel, children: _jsx("button", { type: "button", "aria-label": collapseAllLabel, onClick: () => setForceState("collapsed"), className: "inline-flex size-5 items-center justify-center rounded-sm text-text-muted hover:bg-surface-hover hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus", children: _jsx(Icon, { icon: ChevronsDownUp, size: 12 }) }) })] })), copy && (_jsx(CopyButton, { value: () => serializeJson(data, secretKeys), label: copyLabel, copiedLabel: copiedLabel, size: 14 }))] })] })) : (_jsxs(_Fragment, { children: [expandable && (_jsxs("div", { className: "absolute right-9 top-1.5 z-10 flex items-center gap-1.5", children: [_jsx(Tooltip, { content: expandAllLabel, children: _jsx("button", { type: "button", "aria-label": expandAllLabel, onClick: () => setForceState("expanded"), className: "inline-flex size-5 items-center justify-center rounded-sm bg-bg-subtle text-text-muted hover:bg-surface-hover hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus", children: _jsx(Icon, { icon: ChevronsUpDown, size: 12 }) }) }), _jsx(Tooltip, { content: collapseAllLabel, children: _jsx("button", { type: "button", "aria-label": collapseAllLabel, onClick: () => setForceState("collapsed"), className: "inline-flex size-5 items-center justify-center rounded-sm bg-bg-subtle text-text-muted hover:bg-surface-hover hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus", children: _jsx(Icon, { icon: ChevronsDownUp, size: 12 }) }) })] })), copy && (_jsx(CopyButton, { value: () => serializeJson(data, secretKeys), label: copyLabel, copiedLabel: copiedLabel, size: 14, className: "absolute right-1.5 top-1.5 z-10 bg-bg-subtle" }))] })), _jsx(JsonNode, { value: data, depth: 0, last: true, path: "", isArrayIndex: false, arrayIndex: 0, forceState: forceState, defaultExpandDepth: defaultExpandDepth, isSecretKey: isSecretKey, secretLabel: secretLabel, countLabel: countLabel, copyValue: copyValue, copyPath: copyPath, copyValueLabel: copyValueLabel, copyPathLabel: copyPathLabel, secretKeys: secretKeys, renderValue: renderValue })] }));
});
// Kept as a stable identifier so callers can `import { defaultCountLabel }`
// without pulling the whole JsonViewer surface.
function useMemoCountLabel(count, kind) {
    return defaultCountLabel(count, kind);
}
