import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
import { maskSecret } from "../../lib/format";
import { Badge } from "../feedback/badge";
import { CopyButton } from "./copy-button";
/**
 * EnvironmentVariable — one KEY=value row (§20): name in mono medium, value in
 * mono secondary. A `secret` variable renders masked with a badge, but its
 * copy still produces the complete `NAME=value` line — the mask is for eyes,
 * not for clipboards.
 */
export function EnvironmentVariable({ name, value, secret = false, secretLabel = "Secret", copy = true, copyLabel = "Copy", copiedLabel = "Copied", className, ...props }) {
    return (_jsxs("div", { className: cn("grid grid-cols-[minmax(8rem,auto)_minmax(0,1fr)_auto] items-center gap-x-3 rounded-sm px-2 py-1 font-mono text-code", "hover:bg-surface-hover", className), ...props, children: [_jsx("span", { className: "font-medium text-text", children: name }), _jsxs("span", { className: "inline-flex min-w-0 items-center gap-1.5 text-text-secondary", children: [_jsx("span", { className: "truncate", children: secret ? maskSecret(value) : value }), secret && _jsx(Badge, { tone: "warning", children: secretLabel })] }), copy ? (_jsx(CopyButton, { value: `${name}=${value}`, label: copyLabel, copiedLabel: copiedLabel, size: 12 })) : (_jsx("span", {}))] }));
}
/**
 * EnvironmentVariables — the framed list of EnvironmentVariable rows (§20),
 * with the "production/.env · 3 variables · 1 secret" style header via
 * `title`/`meta`. Secret rows mask on screen but copy complete.
 */
export function EnvironmentVariables({ variables, title, meta, secretLabel = "Secret", copy = true, copyLabel = "Copy", copiedLabel = "Copied", className, ...props }) {
    return (_jsxs("div", { className: cn("overflow-hidden rounded-lg border border-border bg-bg-subtle", className), ...props, children: [(title || meta) && (_jsxs("div", { className: "flex items-center justify-between gap-2 border-b border-border px-3 py-1.5", children: [_jsx("span", { className: "font-mono text-caption text-text-secondary", children: title }), meta && _jsx("span", { className: "text-caption text-text-muted", children: meta })] })), _jsx("div", { className: "p-1", children: variables.map((variable) => (_jsx(EnvironmentVariable, { name: variable.name, value: variable.value, secret: variable.secret, secretLabel: secretLabel, copy: copy, copyLabel: copyLabel, copiedLabel: copiedLabel }, variable.name))) })] }));
}
