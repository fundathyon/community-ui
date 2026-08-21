"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { cn } from "../../lib/cn";
/**
 * Tooltip — names icon-only controls and adds dispensable detail. Appears
 * after 400ms of hover and immediately on keyboard focus. Popover is the
 * component that admits interactive content; Tooltip never does.
 */
export function Tooltip({ content, children, side = "top", delay = 400, disabled = false, className }) {
    return (_jsxs(BaseTooltip.Root, { disabled: disabled, children: [_jsx(BaseTooltip.Trigger, { delay: delay, render: children }), _jsx(BaseTooltip.Portal, { children: _jsx(BaseTooltip.Positioner, { side: side, sideOffset: 6, className: "fdn-z-dropdown", children: _jsx(BaseTooltip.Popup, { className: cn("max-w-64 whitespace-nowrap rounded-md border border-border bg-surface-raised px-2 py-1 text-caption text-text shadow-md", "transition-opacity duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]", "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0", className), children: content }) }) })] }));
}
/** Optional group provider: once one tooltip opened, adjacent ones open instantly. */
export const TooltipProvider = BaseTooltip.Provider;
