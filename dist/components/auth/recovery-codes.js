"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check, Copy, Download, TriangleAlert } from "lucide-react";
import { useCopyToClipboard } from "../../hooks/use-copy-to-clipboard";
import { cn } from "../../lib/cn";
import { Button } from "../actions/button";
import { Badge } from "../feedback/badge";
import { Card, CardBody, CardFooter } from "../layout/card";
import { Icon } from "../typography/icon";
/**
 * RecoveryCodes — the grid of one-time backup codes shown once at generation
 * (§20, §23). Mono, tabular, two columns inside a Card, with copy-all and an
 * app-provided download. Spent codes (`markUsed`) dim to 60% and get a "used"
 * badge — never a strike-through, which screen readers skip (§M-01).
 */
export function RecoveryCodes({ codes, markUsed, warningSlot = "Store these somewhere safe. Each code works once.", onCopyAll, onDownload, copyAllLabel = "Copy all", copiedLabel = "Copied", downloadLabel = "Download", usedLabel = "used", }) {
    const { copied, copy } = useCopyToClipboard();
    const used = new Set(markUsed ?? []);
    function handleCopyAll() {
        const text = codes.join("\n");
        void copy(text).then((ok) => {
            if (ok)
                onCopyAll?.(text);
        });
    }
    return (_jsxs(Card, { children: [_jsxs(CardBody, { className: "flex flex-col gap-3", children: [warningSlot != null && (_jsxs("p", { className: "flex items-start gap-1.5 text-caption text-warning", children: [_jsx(Icon, { icon: TriangleAlert, size: 12, className: "mt-px" }), _jsx("span", { children: warningSlot })] })), _jsx("ul", { className: "grid grid-cols-2 gap-2", children: codes.map((code) => {
                            const isUsed = used.has(code);
                            return (_jsxs("li", { className: cn("flex items-center justify-between gap-2 rounded-md border border-border bg-bg-subtle px-2.5 py-1.5", isUsed && "opacity-60"), children: [_jsx("span", { className: "font-mono text-code tabular-nums text-text", children: code }), isUsed && _jsx(Badge, { tone: "neutral", children: usedLabel })] }, code));
                        }) })] }), (onDownload != null || codes.length > 0) && (_jsxs(CardFooter, { children: [onDownload != null && (_jsx(Button, { variant: "ghost", size: "sm", onClick: onDownload, leading: _jsx(Icon, { icon: Download, size: 14 }), children: downloadLabel })), _jsx(Button, { variant: "secondary", size: "sm", onClick: handleCopyAll, leading: _jsx(Icon, { icon: copied ? Check : Copy, size: 14, className: copied ? "text-success" : undefined }), children: copied ? copiedLabel : copyAllLabel })] }))] }));
}
