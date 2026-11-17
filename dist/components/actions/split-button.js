"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/cn";
import { Icon } from "../typography/icon";
import { Button } from "./button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "./dropdown-menu";
/**
 * SplitButton — one main action plus attached secondary variants of it behind
 * a chevron menu (e.g. "Sincronizar" / "Sincronizar sólo tags"). The chevron
 * trigger has its own accessible name.
 *
 * When to use: variants of the SAME verb. Unrelated actions belong in a
 * DropdownMenu; a single alternative of equal weight is just two Buttons.
 */
export function SplitButton({ children, onClick, items, variant = "secondary", size, loading = false, disabled = false, menuLabel = "More actions", className, ...props }) {
    const safe = items.filter((item) => !item.destructive);
    const destructive = items.filter((item) => item.destructive);
    const renderItem = (item) => (_jsx(DropdownMenuItem, { destructive: item.destructive, disabled: item.disabled, onClick: item.onClick, children: item.label }, item.label));
    return (_jsxs("div", { className: cn("inline-flex items-stretch", className), role: "group", ...props, children: [_jsx(Button, { variant: variant, size: size, loading: loading, disabled: disabled, onClick: onClick, className: "rounded-r-none", children: children }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { render: _jsx(Button, { "aria-label": menuLabel, variant: variant, size: size, disabled: disabled || loading, className: cn("rounded-l-none px-1", 
                            // shared edge: overlap the 1px borders; primary has no border,
                            // so a darker accent hairline separates the segments instead.
                            variant === "secondary" && "-ml-px", variant === "primary" && "border-l border-accent-solid-active shadow-none") }), children: _jsx(Icon, { icon: ChevronDown, size: 14 }) }), _jsxs(DropdownMenuContent, { align: "end", children: [safe.map(renderItem), destructive.length > 0 && safe.length > 0 && _jsx(DropdownMenuSeparator, {}), destructive.map(renderItem)] })] })] }));
}
