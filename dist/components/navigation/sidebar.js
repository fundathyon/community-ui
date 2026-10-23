"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { PanelLeft } from "lucide-react";
import { createContext, useContext, useEffect, useMemo, } from "react";
import { useControllableState } from "../../hooks/use-controllable-state";
import { cn } from "../../lib/cn";
import { Badge } from "../feedback/badge";
import { Tooltip } from "../overlays/tooltip";
import { Icon } from "../typography/icon";
const SidebarContext = createContext(null);
/** Read the sidebar collapse state. Must be used inside `<SidebarProvider>`. */
export function useSidebar() {
    const ctx = useContext(SidebarContext);
    if (!ctx)
        throw new Error("useSidebar must be used within <SidebarProvider>.");
    return ctx;
}
function readStoredCollapsed(storageKey) {
    if (!storageKey || typeof window === "undefined")
        return undefined;
    try {
        const raw = window.localStorage.getItem(storageKey);
        return raw === null ? undefined : raw === "true";
    }
    catch {
        return undefined;
    }
}
/**
 * SidebarProvider — owns the collapse state of the suite shell (§12):
 * controlled or uncontrolled, persisted per user/product via `storageKey`,
 * toggled with ⌘B / Ctrl+B from anywhere (suite-wide shortcut, §17 — a
 * product cannot reassign it).
 */
export function SidebarProvider({ collapsed: collapsedProp, onCollapsedChange, defaultCollapsed = false, storageKey = "fdn-sidebar-collapsed", children, }) {
    const [collapsed, setCollapsedState] = useControllableState({
        value: collapsedProp,
        defaultValue: readStoredCollapsed(storageKey) ?? defaultCollapsed,
        onChange: onCollapsedChange,
    });
    useEffect(() => {
        if (!storageKey)
            return;
        try {
            window.localStorage.setItem(storageKey, String(collapsed));
        }
        catch {
            // Storage unavailable — the preference just isn't remembered.
        }
    }, [collapsed, storageKey]);
    useEffect(() => {
        const onKeyDown = (event) => {
            if ((event.metaKey || event.ctrlKey) && !event.altKey && !event.shiftKey && event.key.toLowerCase() === "b") {
                event.preventDefault();
                setCollapsedState(!collapsed);
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [collapsed, setCollapsedState]);
    const value = useMemo(() => ({ collapsed, setCollapsed: setCollapsedState }), [collapsed, setCollapsedState]);
    return _jsx(SidebarContext.Provider, { value: value, children: children });
}
/**
 * Sidebar — the suite shell's left navigation (§12): 208px, collapsible to
 * 48px icons-only. Identical across products; only the destinations change.
 * Must live inside `<SidebarProvider>`.
 */
export function Sidebar({ className, children, ...props }) {
    const { collapsed } = useSidebar();
    return (_jsx("aside", { "data-collapsed": collapsed || undefined, className: cn("flex h-full shrink-0 flex-col overflow-hidden border-r border-border bg-bg", "transition-[width] duration-[var(--fdn-dur-base)] ease-[var(--fdn-ease-standard)]", collapsed ? "w-sidebar-collapsed" : "w-sidebar", className), ...props, children: children }));
}
/** Slot for the product logo/brand, aligned with the 48px shell header (§12). */
export function SidebarHeader({ className, ...props }) {
    const { collapsed } = useSidebar();
    return (_jsx("div", { className: cn("flex h-header shrink-0 items-center", collapsed ? "justify-center px-0" : "px-4", className), ...props }));
}
/** A group of sidebar items with an optional overline label. */
export function SidebarSection({ label, className, children, ...props }) {
    const { collapsed } = useSidebar();
    return (_jsxs("div", { className: cn("flex flex-col gap-0.5 py-2", className), ...props, children: [label && (_jsx("span", { className: cn("text-overline uppercase text-text-muted", collapsed ? "sr-only" : "px-4 pb-1"), children: label })), children] }));
}
/**
 * SidebarItem — one destination of the shell (§12). States: default, hover,
 * current (accent wash + 2px accent bar + `aria-current="page"`), disabled
 * with its reason in a tooltip. When the sidebar collapses only the icon
 * remains: the label moves to a right-side tooltip and stays for screen
 * readers.
 */
export function SidebarItem({ icon, label, current = false, count, disabled = false, reason, render, className, href, onClick, ...props }) {
    const { collapsed } = useSidebar();
    const children = (_jsxs(_Fragment, { children: [_jsx(Icon, { icon: icon, size: 16 }), _jsx("span", { className: cn(collapsed ? "sr-only" : "truncate"), children: label }), count !== undefined && !collapsed && (_jsx(Badge, { variant: "counter", className: "ml-auto", children: count }))] }));
    const itemProps = {
        // Only emit `href` when it is a real value: a bare `<a>` without href is a
        // correct non-navigational item, and — crucially — a `render` consumer that
        // provides its own href (e.g. Next's <Link>) must not have it clobbered by
        // an `href: undefined` spread.
        ...(href !== undefined && !disabled ? { href } : {}),
        "aria-current": current ? "page" : undefined,
        "aria-disabled": disabled || undefined,
        // Keep disabled items reachable by keyboard so the reason tooltip opens.
        tabIndex: disabled ? 0 : undefined,
        onClick: disabled ? (event) => event.preventDefault() : onClick,
        className: cn("relative mx-2 flex h-8 shrink-0 select-none items-center gap-2 rounded-md px-2 text-body text-text-secondary", "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]", collapsed && "justify-center px-0", !disabled && !current && "hover:bg-surface-hover hover:text-text", current && [
            "bg-accent-bg text-accent",
            // The 2px current bar, pinned to the shell's left edge (§12).
            "before:absolute before:-left-2 before:inset-y-1.5 before:w-0.5 before:rounded-full before:bg-accent-solid before:content-['']",
        ], disabled && "cursor-not-allowed opacity-45", "fdn-touch-target", className),
        ...props,
        children,
    };
    const element = render ? render(itemProps) : _jsx("a", { ...itemProps });
    // Collapsed → the label lives in a tooltip (§12). Disabled → the reason does.
    const tooltip = collapsed ? (reason && disabled ? `${label} — ${reason}` : label) : disabled ? reason : undefined;
    if (tooltip) {
        return (_jsx(Tooltip, { content: tooltip, side: "right", children: element }));
    }
    return element;
}
/** Bottom region of the sidebar (settings, user, collapse trigger). */
export function SidebarFooter({ className, ...props }) {
    return _jsx("div", { className: cn("mt-auto flex flex-col gap-0.5 border-t border-border py-2", className), ...props });
}
/**
 * SidebarTrigger — icon button that toggles the sidebar collapse, mirroring
 * the ⌘B shortcut (§12). Exposes `aria-expanded` and its label in a tooltip.
 */
export function SidebarTrigger({ label = "Toggle sidebar", className, onClick, ...props }) {
    const { collapsed, setCollapsed } = useSidebar();
    return (_jsx(Tooltip, { content: label, children: _jsx("button", { type: "button", "aria-label": label, "aria-expanded": !collapsed, onClick: (event) => {
                setCollapsed(!collapsed);
                onClick?.(event);
            }, className: cn("grid size-7 shrink-0 place-items-center rounded-md text-text-secondary", "transition-colors duration-[var(--fdn-dur-fast)] hover:bg-surface-hover hover:text-text", "fdn-touch-target", className), ...props, children: _jsx(Icon, { icon: PanelLeft, size: 16 }) }) }));
}
