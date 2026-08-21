"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check, CircleX, Copy } from "lucide-react";
import { useCopyToClipboard } from "../../hooks/use-copy-to-clipboard";
import { cn } from "../../lib/cn";
import { Button } from "../actions/button";
import { Icon } from "../typography/icon";
function detailString({ status, requestId, traceId, timestamp }) {
    return [
        status !== undefined ? String(status) : null,
        requestId ? `req ${requestId}` : null,
        traceId ? `trace ${traceId}` : null,
        timestamp ?? null,
    ]
        .filter(Boolean)
        .join(" · ");
}
/**
 * ErrorState (§11) — what happened, whose fault it is and what to do now.
 * The headline is human language; the technical detail (status, request id,
 * trace id, timestamp) goes in mono behind "Copy details", never in the title
 * (§25). Announces with `role="alert"` and always offers an exit.
 */
export function ErrorState({ title, description, retry, details, copyLabel = "Copy details", copiedLabel = "Copied", className, ...props }) {
    const { copied, copy } = useCopyToClipboard();
    const detail = details ? detailString(details) : "";
    return (_jsxs("div", { role: "alert", className: cn("flex flex-col items-center justify-center px-6 py-12 text-center", className), ...props, children: [_jsx("span", { className: "mb-3 grid size-10 place-items-center rounded-full bg-danger-bg text-danger", children: _jsx(Icon, { icon: CircleX, size: 20 }) }), _jsx("h3", { className: "text-h4 text-text", children: title }), description && (_jsx("p", { className: "mt-1 max-w-96 text-body text-text-secondary", children: description })), detail && (_jsx("p", { className: "mt-2 font-mono text-caption text-text-muted tabular-nums", children: detail })), (retry || detail) && (_jsxs("div", { className: "mt-4 flex items-center gap-2", children: [retry && (_jsx(Button, { variant: "secondary", onClick: retry.onClick, children: retry.label })), detail && (_jsx(Button, { variant: "ghost", onClick: () => void copy(detail), leading: _jsx(Icon, { icon: copied ? Check : Copy, size: 14 }), children: copied ? copiedLabel : copyLabel }))] }))] }));
}
