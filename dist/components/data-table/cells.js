"use client";
import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "../../hooks/use-copy-to-clipboard";
import { cn } from "../../lib/cn";
import { formatBytes, formatDate, formatDuration, formatNumber, formatRelativeDate, truncateMiddle, } from "../../lib/format";
import { STATUS } from "../../lib/status";
import { Badge } from "../feedback/badge";
import { StatusBadge } from "../feedback/status-badge";
import { Tag } from "../feedback/tag";
import { Tooltip } from "../overlays/tooltip";
import { isSensitivityLevel, SensitivityBadge } from "../security/sensitivity-badge";
import { Icon } from "../typography/icon";
/** Every empty value renders this, never a blank cell (§21). */
export const EMPTY = "—";
/** Right-aligned cell types (§21: numbers and everything comparable go right). */
const RIGHT_TYPES = new Set([
    "number",
    "percentage",
    "bytes",
    "duration",
    "date",
    "version",
]);
/** Default alignment for a column, from its `type` (§21) unless overridden. */
export function columnAlign(column) {
    if (column.align)
        return column.align;
    return column.type && RIGHT_TYPES.has(column.type) ? "right" : "left";
}
function isEmpty(value) {
    return (value === null ||
        value === undefined ||
        value === "" ||
        (Array.isArray(value) && value.length === 0));
}
function asNumber(value) {
    return typeof value === "number" ? value : Number(value);
}
/** First one or two initials for the self-contained user avatar. */
function initialsOf(source) {
    const cleaned = source.trim();
    if (!cleaned)
        return "?";
    const words = cleaned.split(/\s+/).filter(Boolean);
    if (words.length >= 2) {
        const a = words[0]?.[0] ?? "";
        const b = words[1]?.[0] ?? "";
        return (a + b).toUpperCase();
    }
    const base = cleaned.includes("@") ? (cleaned.split("@")[0] ?? cleaned) : cleaned;
    return (base[0] ?? "?").toUpperCase();
}
/**
 * `user` cell (§21 Accounts spec): technical identifier (id, else email) in
 * mono ON TOP; human identity (name, else email) in bold BELOW — the inverse
 * of the usual order, because support searches by id. The avatar is a
 * self-contained initials circle for now (Avatar lands with `data-display`).
 */
function UserCell({ value }) {
    const { id, name, email } = value;
    const top = id ?? email;
    const bottom = name ?? (id ? email : undefined);
    const initials = initialsOf(name ?? email ?? id ?? "");
    if (!top && !bottom)
        return _jsx(_Fragment, { children: EMPTY });
    return (_jsxs("div", { className: "flex items-center gap-2 text-left", children: [_jsx("span", { "aria-hidden": true, className: "grid size-7 shrink-0 place-items-center rounded-full bg-surface-hover text-caption font-medium text-text-secondary", children: initials }), _jsxs("span", { className: "flex min-w-0 flex-col leading-tight", children: [top && _jsx("span", { className: "truncate font-mono text-caption text-text-muted", children: top }), bottom && _jsx("span", { className: "truncate text-label font-semibold text-text", children: bottom })] })] }));
}
/** `digest` cell: mono, middle-truncated; a click copies the FULL value (§20). */
function DigestCell({ value, copyLabel }) {
    const { copied, copy } = useCopyToClipboard();
    return (_jsxs("button", { type: "button", title: value, "aria-label": `${copyLabel}: ${value}`, onClick: (event) => {
            event.stopPropagation();
            void copy(value);
        }, className: cn("group/digest inline-flex items-center gap-1.5 rounded-md font-mono text-caption text-text-secondary", 
        // No `outline-none`: see status-indicator.tsx for why it would poison
        // the `--tw-outline-style` this focus-visible rule depends on.
        "hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"), children: [_jsx("span", { children: truncateMiddle(value) }), _jsx(Icon, { icon: copied ? Check : Copy, size: 12, className: cn("text-text-muted transition-opacity duration-[var(--fdn-dur-fast)]", copied ? "opacity-100" : "opacity-0 group-hover/digest:opacity-100 group-focus-visible/digest:opacity-100") })] }));
}
/** `percentage` cell: right-aligned value with an optional tiny neutral bar. */
function PercentageCell({ value }) {
    const clamped = Math.max(0, Math.min(100, value));
    const inRange = value >= 0 && value <= 100;
    return (_jsxs("span", { className: "inline-flex items-center justify-end gap-2 tabular-nums", children: [inRange && (_jsx("span", { className: "h-1 w-10 overflow-hidden rounded-full bg-surface-hover", "aria-hidden": true, children: _jsx("span", { className: "block h-full rounded-full bg-accent-solid", style: { width: `${clamped}%` } }) })), _jsxs("span", { children: [formatNumber(value), "%"] })] }));
}
/**
 * The catalog dispatcher (§21). A custom `cell` renderer always wins; otherwise
 * the column `type` selects a formatter. All formatting comes from `lib/format`.
 */
export function CellRenderer({ column, row, labels }) {
    if (column.cell)
        return column.cell(row);
    const value = column.accessor?.(row);
    const type = column.type ?? "text";
    // `boolean` is the one type where an empty/false value is not a dash-fallback.
    if (type === "boolean") {
        return value ? (_jsx(Icon, { icon: Check, size: 14, label: "Yes", className: "text-success" })) : (_jsx("span", { className: "text-text-muted", children: EMPTY }));
    }
    if (isEmpty(value))
        return _jsx("span", { className: "text-text-muted", children: EMPTY });
    switch (type) {
        case "number":
            return _jsx("span", { className: "tabular-nums", children: formatNumber(asNumber(value)) });
        case "percentage":
            return _jsx(PercentageCell, { value: asNumber(value) });
        case "bytes":
            return _jsx("span", { className: "tabular-nums", children: formatBytes(asNumber(value)) });
        case "duration":
            return _jsx("span", { className: "tabular-nums", children: formatDuration(asNumber(value)) });
        case "date":
            return _jsx("span", { className: "tabular-nums", children: formatDate(value) });
        case "relative-date": {
            const { display, absolute } = formatRelativeDate(value);
            return (_jsx(Tooltip, { content: absolute, children: _jsx("span", { className: "cursor-default", children: display }) }));
        }
        case "status": {
            const key = value;
            if (!(key in STATUS))
                return _jsx("span", { className: "text-text-muted", children: EMPTY });
            return _jsx(StatusBadge, { status: key });
        }
        case "user":
            return _jsx(UserCell, { value: value });
        case "digest":
            return _jsx(DigestCell, { value: String(value), copyLabel: "Copy" });
        case "version":
            return _jsx("span", { className: "font-mono text-caption tabular-nums", children: String(value) });
        case "tags": {
            // §09: user-editable data (image tags, project labels) is Tag, never
            // Badge — Badge is reserved for system-decided state. The "+N" overflow
            // count IS a system-computed summary, so it stays a counter Badge.
            const tags = value;
            const shown = tags.slice(0, 3);
            const extra = tags.length - shown.length;
            return (_jsxs("div", { className: "flex flex-wrap items-center gap-1", children: [shown.map((tag) => (_jsx(Tag, { children: tag }, tag))), extra > 0 && _jsx(Badge, { variant: "counter", children: `+${extra}` })] }));
        }
        case "cron": {
            const expr = String(value);
            const description = column.describe?.(expr);
            const content = _jsx("span", { className: "font-mono text-caption", children: expr });
            return description ? (_jsx(Tooltip, { content: description, children: _jsx("span", { className: "cursor-default", children: content }) })) : (content);
        }
        case "sensitivity": {
            if (!isSensitivityLevel(value))
                return _jsx("span", { className: "text-text-muted", children: EMPTY });
            return _jsx(SensitivityBadge, { level: value, children: labels.sensitivity?.[value] });
        }
        case "text":
        default:
            return (_jsx("span", { className: "block truncate", title: String(value), children: String(value) }));
    }
}
