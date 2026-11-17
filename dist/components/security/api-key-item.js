import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { enUS } from "date-fns/locale";
import { cn } from "../../lib/cn";
import { formatRelativeDate } from "../../lib/format";
import { STATUS } from "../../lib/status";
import { Secret } from "../dev/secret";
import { StatusBadge } from "../feedback/status-badge";
import { ScopeBadge } from "./scope-badge";
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
/**
 * ApiKeyItem — one API key row (§20, §25): name + masked value, created / last
 * used / expiry metadata as running text, scope chips, and an actions slot. The
 * expiry state is computed — a key expiring within 7 days shows an `expiring`
 * badge with the concrete deadline (§19); an expired key shows `expired`.
 *
 * A key in a terminal state (revoked/expired) should sit at 0.6 opacity in the
 * list — pass that via `className` on the row when you know its state.
 */
export function ApiKeyItem({ name, maskedValue, revealable = false, createdAt, lastUsed, expiresAt, status, scopes, locale = enUS, actions, createdLabel = "created", lastUsedLabel = "last used", expiresLabel = "expires", neverUsedLabel = "never used", className, ...props }) {
    let resolved = status;
    if (resolved == null && expiresAt != null) {
        const diff = new Date(expiresAt).getTime() - Date.now();
        if (!Number.isNaN(diff)) {
            if (diff <= 0)
                resolved = "expired";
            else if (diff < SEVEN_DAYS_MS)
                resolved = "expiring";
        }
    }
    const badge = resolved === "expiring" && expiresAt != null ? (_jsx(StatusBadge, { status: "expiring", children: `${expiresLabel} ${formatRelativeDate(expiresAt, locale).display}` })) : resolved != null ? (_jsx(StatusBadge, { status: resolved })) : null;
    const terminal = resolved != null && STATUS[resolved].terminal;
    return (_jsxs("div", { className: cn("flex flex-col gap-2 py-3", terminal && "opacity-60", className), ...props, children: [_jsxs("div", { className: "flex items-start justify-between gap-3", children: [_jsxs("div", { className: "flex min-w-0 flex-col gap-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "truncate text-label text-text", children: name }), badge] }), _jsx(Secret, { value: maskedValue, revealable: revealable, label: "" })] }), actions != null && _jsx("div", { className: "flex shrink-0 items-center gap-2", children: actions })] }), (createdAt != null || lastUsed != null || (expiresAt != null && resolved !== "expiring")) && (_jsxs("div", { className: "flex flex-wrap items-center gap-x-1.5 text-caption text-text-muted", children: [createdAt != null && (_jsxs("span", { children: [createdLabel, " ", formatRelativeDate(createdAt, locale).display] })), (createdAt != null && (lastUsed != null || expiresAt != null)) && _jsx("span", { "aria-hidden": true, children: "\u00B7" }), lastUsed != null ? (_jsxs("span", { children: [lastUsedLabel, " ", formatRelativeDate(lastUsed, locale).display] })) : (_jsx("span", { children: neverUsedLabel })), expiresAt != null && resolved !== "expiring" && (_jsxs(_Fragment, { children: [_jsx("span", { "aria-hidden": true, children: "\u00B7" }), _jsxs("span", { children: [expiresLabel, " ", formatRelativeDate(expiresAt, locale).display] })] }))] })), scopes != null && scopes.length > 0 && (_jsx("div", { className: "flex flex-wrap items-center gap-1", children: scopes.map((scope) => (_jsx(ScopeBadge, { scope: scope }, scope))) }))] }));
}
/** ApiKeyList — stacks ApiKeyItems with divider rules between them. */
export function ApiKeyList({ children, className, ...props }) {
    return (_jsx("div", { className: cn("divide-y divide-border", className), ...props, children: children }));
}
