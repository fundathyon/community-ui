"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { Check, LayoutGrid } from "lucide-react";
import { cn } from "../../lib/cn";
import { Icon } from "../typography/icon";
import { menuItemClasses, menuPopupClasses } from "./menu-styles";
/**
 * AppSwitcher — the suite's product switcher in the Topbar (§12). A grid of
 * products, each with its own accent dot (the accent IS the product, §02),
 * the current one marked. Products with `href` render as links.
 */
export function AppSwitcher({ products, label = "Switch product" }) {
    return (_jsxs(BaseMenu.Root, { children: [_jsx(BaseMenu.Trigger, { "aria-label": label, className: cn("grid size-7 select-none place-items-center rounded-md text-text-secondary", "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]", "hover:bg-surface-hover hover:text-text data-[popup-open]:bg-surface-hover data-[popup-open]:text-text", "fdn-touch-target"), children: _jsx(Icon, { icon: LayoutGrid, size: 16 }) }), _jsx(BaseMenu.Portal, { children: _jsx(BaseMenu.Positioner, { side: "bottom", align: "end", sideOffset: 6, className: "fdn-z-dropdown", children: _jsx(BaseMenu.Popup, { className: cn(menuPopupClasses, "grid min-w-64 grid-cols-2 gap-1 p-2"), children: products.map((product) => {
                            const content = (_jsxs(_Fragment, { children: [_jsx("span", { "aria-hidden": true, className: "size-2 shrink-0 rounded-full bg-accent-solid" }), _jsx("span", { className: "truncate", children: product.name }), product.current && _jsx(Icon, { icon: Check, size: 14, className: "ml-auto text-accent" })] }));
                            const itemClassName = cn(menuItemClasses, "h-9", product.current && "bg-accent-bg text-accent data-[highlighted]:bg-accent-bg data-[highlighted]:text-accent");
                            return product.href !== undefined ? (_jsx(BaseMenu.LinkItem, { href: product.href, closeOnClick: true, "data-fdn-product": product.id, "aria-current": product.current ? "true" : undefined, className: itemClassName, children: content }, product.id)) : (_jsx(BaseMenu.Item, { onClick: product.onSelect, "data-fdn-product": product.id, "aria-current": product.current ? "true" : undefined, className: itemClassName, children: content }, product.id));
                        }) }) }) })] }));
}
