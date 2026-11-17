"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check, Copy, TriangleAlert } from "lucide-react";
import {} from "react";
import { useCopyToClipboard } from "../../hooks/use-copy-to-clipboard";
import { cn } from "../../lib/cn";
import { Button } from "../actions/button";
import { Icon } from "../typography/icon";
/**
 * TokenDisplay — the ONE time a secret is shown complete: right after creation
 * (§20). Warning treatment, the full token in mono, and a prominent built-in
 * copy button. After this screen only prefix + suffix survive — render the
 * stored value with Secret from then on.
 */
export function TokenDisplay({ value, warning = "Make sure to copy it now — you won't see it again.", copyLabel = "Copy token", copiedLabel = "Copied", className, ...props }) {
    const { copied, copy } = useCopyToClipboard();
    return (_jsxs("div", { className: cn("rounded-lg border border-warning-border bg-warning-bg p-3", className), ...props, children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("code", { className: "min-w-0 flex-1 break-all font-mono text-code text-text", children: value }), _jsx(Button, { size: "sm", variant: "secondary", onClick: () => void copy(value), leading: copied ? _jsx(Icon, { icon: Check, size: 14, className: "text-success" }) : _jsx(Icon, { icon: Copy, size: 14 }), className: "shrink-0", children: copied ? copiedLabel : copyLabel })] }), warning && (_jsxs("p", { className: "mt-2 flex items-center gap-1.5 text-caption text-warning", children: [_jsx(Icon, { icon: TriangleAlert, size: 12 }), warning] })), _jsx("span", { "aria-live": "polite", className: "sr-only", children: copied ? copiedLabel : "" })] }));
}
