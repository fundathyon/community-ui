"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Menu } from "@base-ui/react/menu";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "../../lib/cn";
import { Icon } from "../typography/icon";
/**
 * DropdownMenu (§12) — secondary actions behind a trigger. Max 7 items before
 * grouping with separators. Destructive items go LAST, separated, and always
 * open a confirmation dialog — the menu item never executes the destruction.
 * Keyboard: arrows, Home/End and first-letter typeahead (Base UI native).
 *
 * Composition:
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuTrigger render={<IconButton icon={Ellipsis} label="Acciones" />} />
 *   <DropdownMenuContent>
 *     <DropdownMenuItem icon={Copy} shortcut="⌘C" onClick={…}>Copiar comando pull</DropdownMenuItem>
 *     <DropdownMenuItem>Proteger</DropdownMenuItem>
 *     <DropdownMenuSeparator />
 *     <DropdownMenuItem destructive onClick={openConfirm}>Eliminar repositorio</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 */
export const DropdownMenu = Menu.Root;
/** The button that opens the menu. Use `render` to make any Button the trigger. */
export const DropdownMenuTrigger = Menu.Trigger;
/** Portal + Positioner + Popup with the DS surface, elevation and §06 motion. */
export function DropdownMenuContent({ side, align, sideOffset = 4, className, children, ...props }) {
    return (_jsx(Menu.Portal, { children: _jsx(Menu.Positioner, { side: side, align: align, sideOffset: sideOffset, className: "fdn-z-dropdown", children: _jsx(Menu.Popup, { className: cn("min-w-44 rounded-lg border border-border bg-surface-raised p-1 shadow-md", 
                // §06: enter = opacity + ≤8px travel; exit = opacity only
                "transition-[opacity,transform] duration-[var(--fdn-dur-base)] ease-[var(--fdn-ease-enter)]", "data-[starting-style]:-translate-y-1 data-[starting-style]:opacity-0", "data-[ending-style]:opacity-0", className), ...props, children: children }) }) }));
}
const itemClasses = cn("flex cursor-default select-none items-center gap-1.5 rounded-md px-2 py-1.5 text-body text-text outline-none", "data-[highlighted]:bg-surface-hover", "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-45");
const destructiveItemClasses = "text-danger data-[highlighted]:bg-danger-bg";
export function DropdownMenuItem({ icon, shortcut, destructive = false, className, children, ...props }) {
    return (_jsxs(Menu.Item, { "data-destructive": destructive || undefined, className: cn(itemClasses, destructive && destructiveItemClasses, className), ...props, children: [icon && _jsx(Icon, { icon: icon, size: 14, className: destructive ? undefined : "text-text-muted" }), _jsx("span", { className: "flex-1 truncate", children: children }), shortcut && _jsx("span", { className: "ml-auto pl-4 text-caption text-text-muted", children: shortcut })] }));
}
export function DropdownMenuSeparator({ className, ...props }) {
    return _jsx(Menu.Separator, { className: cn("-mx-1 my-1 h-px bg-border", className), ...props });
}
/** Groups related items; label them with DropdownMenuGroupLabel (§12). */
export const DropdownMenuGroup = Menu.Group;
/** Overline-styled label announced for its DropdownMenuGroup. */
export function DropdownMenuGroupLabel({ className, ...props }) {
    return (_jsx(Menu.GroupLabel, { className: cn("px-2 pb-1 pt-1.5 text-overline uppercase text-text-muted", className), ...props }));
}
/** A toggleable menu item (e.g. column visibility). Stays open on click. */
export function DropdownMenuCheckboxItem({ shortcut, className, children, ...props }) {
    return (_jsxs(Menu.CheckboxItem, { className: cn(itemClasses, className), ...props, children: [_jsx("span", { className: "grid size-3.5 shrink-0 place-items-center", children: _jsx(Menu.CheckboxItemIndicator, { children: _jsx(Icon, { icon: Check, size: 12 }) }) }), _jsx("span", { className: "flex-1 truncate", children: children }), shortcut && _jsx("span", { className: "ml-auto pl-4 text-caption text-text-muted", children: shortcut })] }));
}
/** Exclusive selection inside the menu — pairs with DropdownMenuRadioItem. */
export const DropdownMenuRadioGroup = Menu.RadioGroup;
export function DropdownMenuRadioItem({ className, children, ...props }) {
    return (_jsxs(Menu.RadioItem, { className: cn(itemClasses, className), ...props, children: [_jsx("span", { className: "grid size-3.5 shrink-0 place-items-center", children: _jsx(Menu.RadioItemIndicator, { children: _jsx("span", { "aria-hidden": true, className: "block size-1.5 rounded-full bg-current" }) }) }), _jsx("span", { className: "flex-1 truncate", children: children })] }));
}
/**
 * Submenu root — nest inside a DropdownMenuContent:
 * ```tsx
 * <DropdownMenuSubmenu>
 *   <DropdownMenuSubmenuTrigger>Exportar</DropdownMenuSubmenuTrigger>
 *   <DropdownMenuContent>…items…</DropdownMenuContent>
 * </DropdownMenuSubmenu>
 * ```
 */
export const DropdownMenuSubmenu = Menu.SubmenuRoot;
export function DropdownMenuSubmenuTrigger({ icon, className, children, ...props }) {
    return (_jsxs(Menu.SubmenuTrigger, { className: cn(itemClasses, "data-[popup-open]:bg-surface-hover", className), ...props, children: [icon && _jsx(Icon, { icon: icon, size: 14, className: "text-text-muted" }), _jsx("span", { className: "flex-1 truncate", children: children }), _jsx(Icon, { icon: ChevronRight, size: 14, className: "ml-auto text-text-muted" })] }));
}
