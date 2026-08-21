"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/cn";
import { Icon } from "../typography/icon";
const triggerClasses = cn("inline-flex h-8 select-none items-center gap-1 rounded-md px-3 text-body text-text-secondary", "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]", "hover:bg-surface-hover hover:text-text data-[popup-open]:bg-surface-hover data-[popup-open]:text-text", "fdn-touch-target");
/**
 * NavigationMenu — horizontal nav with hover/click popups, for docs and
 * marketing headers. NOT the app shell: product screens navigate with the
 * Sidebar (§12). Thin wrapper over Base UI; compose with NavigationMenuItem.
 */
export function NavigationMenu({ className, children, ...props }) {
    return (_jsxs(BaseNavigationMenu.Root, { className: cn("min-w-0", className), ...props, children: [_jsx(BaseNavigationMenu.List, { className: "flex items-center gap-1", children: children }), _jsx(BaseNavigationMenu.Portal, { children: _jsx(BaseNavigationMenu.Positioner, { sideOffset: 6, className: "fdn-z-dropdown", children: _jsx(BaseNavigationMenu.Popup, { className: cn("h-[var(--popup-height)] w-[var(--popup-width)] rounded-lg border border-border bg-surface-raised shadow-md", "transition-[opacity,width,height] duration-[var(--fdn-dur-base)] ease-[var(--fdn-ease-standard)]", "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0"), children: _jsx(BaseNavigationMenu.Viewport, { className: "relative h-full w-full overflow-hidden" }) }) }) })] }));
}
/**
 * NavigationMenuItem — one top-level destination: a popup (label + content)
 * or a plain link (label + href). Keyboard and hover behavior come from
 * Base UI.
 */
export function NavigationMenuItem({ label, children, href, render, className }) {
    if (children === undefined) {
        const linkProps = {
            href,
            className: cn(triggerClasses, className),
            children: label,
        };
        return (_jsx(BaseNavigationMenu.Item, { children: render ? (_jsx(BaseNavigationMenu.Link, { render: render(linkProps) })) : (_jsx(BaseNavigationMenu.Link, { href: href, className: cn(triggerClasses, className), children: label })) }));
    }
    return (_jsxs(BaseNavigationMenu.Item, { children: [_jsxs(BaseNavigationMenu.Trigger, { className: cn(triggerClasses, className), children: [label, _jsx(BaseNavigationMenu.Icon, { className: "transition-transform duration-[var(--fdn-dur-fast)] data-[popup-open]:rotate-180", children: _jsx(Icon, { icon: ChevronDown, size: 12 }) })] }), _jsx(BaseNavigationMenu.Content, { className: "p-2", children: children })] }));
}
