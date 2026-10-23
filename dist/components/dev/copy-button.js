"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check, Copy } from "lucide-react";
import { forwardRef } from "react";
import { useCopyToClipboard } from "../../hooks/use-copy-to-clipboard";
import { cn } from "../../lib/cn";
import { Icon } from "../typography/icon";
import { Tooltip } from "../overlays/tooltip";
const sizeClass = {
    12: "size-5",
    14: "size-6",
    16: "size-7",
};
/**
 * CopyButton — the standalone copy affordance of the Developer UI (§20). A
 * ghost square button with a Copy→Check swap, tooltip and a polite live
 * announcement. Always visible, never hover-only (touch has no hover).
 *
 * Every truncated or masked value in the suite copies through this: the copy
 * is ALWAYS the full value — never the ellipsis, never the mask.
 */
export const CopyButton = forwardRef(function CopyButton({ value, label = "Copy", copiedLabel = "Copied", size = 14, onCopied, className, onClick, ...props }, ref) {
    const { copied, copy } = useCopyToClipboard();
    return (_jsx(Tooltip, { content: copied ? copiedLabel : label, children: _jsxs("button", { ref: ref, type: "button", "aria-label": label, onClick: (event) => {
                onClick?.(event);
                const text = typeof value === "function" ? value() : value;
                void copy(text).then((ok) => {
                    if (ok)
                        onCopied?.(text);
                });
            }, className: cn("inline-flex shrink-0 select-none items-center justify-center rounded-md text-text-secondary", "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]", "hover:bg-surface-hover hover:text-text active:bg-surface-hover", "disabled:cursor-not-allowed disabled:opacity-45", "fdn-touch-target", sizeClass[size], className), ...props, children: [copied ? (_jsx(Icon, { icon: Check, size: size, className: "text-success" })) : (_jsx(Icon, { icon: Copy, size: size })), _jsx("span", { "aria-live": "polite", className: "sr-only", children: copied ? copiedLabel : "" })] }) }));
});
