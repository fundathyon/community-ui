"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Collapsible } from "@base-ui/react/collapsible";
import { ChevronRight } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "../components/typography/icon";
/**
 * Expandable — a single collapsible disclosure for long, optional detail (§26):
 * the docs "accordion", but deliberately one item, not a set. Built on Base UI
 * Collapsible; the chevron rotates and the panel animates open.
 *
 * For a numbered procedure use `Steps`; for switching between equivalents use
 * `DocsTabs`. Use Expandable when the content is skippable by most readers.
 */
export function Expandable({ title, defaultOpen, open, onOpenChange, children, className }) {
    return (_jsxs(Collapsible.Root, { defaultOpen: defaultOpen, open: open, onOpenChange: onOpenChange ? (next) => onOpenChange(next) : undefined, className: cn("my-4 overflow-hidden rounded-lg border border-border", className), children: [_jsxs(Collapsible.Trigger, { className: cn("group flex w-full select-none items-center gap-2 bg-surface px-3 py-2 text-left text-body font-medium text-text", "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)] hover:bg-surface-hover", "fdn-touch-target"), children: [_jsx(Icon, { icon: ChevronRight, size: 16, className: "text-text-muted transition-transform duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)] group-data-[panel-open]:rotate-90" }), _jsx("span", { className: "min-w-0 flex-1", children: title })] }), _jsx(Collapsible.Panel, { className: cn("overflow-hidden border-t border-border", 
                // §06 height transition using Base UI's collapsible CSS var.
                "h-[var(--collapsible-panel-height)] transition-[height] duration-[var(--fdn-dur-base)] ease-[var(--fdn-ease-standard)]", "data-[starting-style]:h-0 data-[ending-style]:h-0"), children: _jsx("div", { className: "p-3 text-sm leading-[1.7] text-text-secondary [&>*:first-child]:mt-0 [&>*:last-child]:mb-0", children: children }) })] }));
}
