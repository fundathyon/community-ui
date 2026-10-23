"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { LogOut } from "lucide-react";
import { cn } from "../../lib/cn";
import { Icon } from "../typography/icon";
import { menuItemClasses, menuPopupClasses, menuSeparatorClasses } from "./menu-styles";
/** "Marta Ruiz" → "MR". First letter of the first two words. */
function getInitials(name) {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word.charAt(0).toUpperCase())
        .join("");
}
/**
 * UserMenu — the shell's identity menu (§12): avatar-like trigger, identity
 * header, account items, and sign out separated at the bottom. Destructive
 * entries never sit next to safe ones without a separator.
 */
export function UserMenu({ name, email, trigger, items = [], onSignOut, signOutLabel = "Sign out", showHeader = true, }) {
    return (_jsxs(BaseMenu.Root, { children: [_jsx(BaseMenu.Trigger, { "aria-label": name, className: cn("rounded-full", !trigger &&
                    "grid size-7 select-none place-items-center bg-accent-bg text-caption font-medium text-accent", "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]", "fdn-touch-target"), children: trigger ?? _jsx("span", { "aria-hidden": true, children: getInitials(name) }) }), _jsx(BaseMenu.Portal, { children: _jsx(BaseMenu.Positioner, { side: "bottom", align: "end", sideOffset: 6, className: "fdn-z-dropdown", children: _jsxs(BaseMenu.Popup, { className: menuPopupClasses, children: [showHeader && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex flex-col px-2 py-1.5", children: [_jsx("span", { className: "text-body font-medium text-text", children: name }), email && _jsx("span", { className: "text-caption text-text-muted", children: email })] }), _jsx(BaseMenu.Separator, { className: menuSeparatorClasses })] })), items.map((item) => (_jsxs(BaseMenu.Item, { onClick: item.onSelect, className: cn(menuItemClasses, item.destructive && "text-danger data-[highlighted]:bg-danger-bg data-[highlighted]:text-danger"), children: [item.icon && _jsx(Icon, { icon: item.icon, size: 14 }), item.label] }, item.label))), onSignOut && (_jsxs(_Fragment, { children: [(items.length > 0 || showHeader) && _jsx(BaseMenu.Separator, { className: menuSeparatorClasses }), _jsxs(BaseMenu.Item, { onClick: onSignOut, className: menuItemClasses, children: [_jsx(Icon, { icon: LogOut, size: 14 }), signOutLabel] })] }))] }) }) })] }));
}
