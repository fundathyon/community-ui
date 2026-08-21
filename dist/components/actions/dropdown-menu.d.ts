import { Menu } from "@base-ui/react/menu";
import { type LucideIcon } from "lucide-react";
import type { ComponentProps } from "react";
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
export declare const DropdownMenu: <Payload>(props: Menu.Root.Props<Payload>) => import("react").JSX.Element;
/** The button that opens the menu. Use `render` to make any Button the trigger. */
export declare const DropdownMenuTrigger: Menu.Trigger;
export interface DropdownMenuContentProps extends ComponentProps<typeof Menu.Popup> {
    /** Preferred side relative to the trigger. Submenus default to `inline-end`. */
    side?: ComponentProps<typeof Menu.Positioner>["side"];
    align?: ComponentProps<typeof Menu.Positioner>["align"];
    sideOffset?: number;
}
/** Portal + Positioner + Popup with the DS surface, elevation and §06 motion. */
export declare function DropdownMenuContent({ side, align, sideOffset, className, children, ...props }: DropdownMenuContentProps): import("react").JSX.Element;
export interface DropdownMenuItemProps extends ComponentProps<typeof Menu.Item> {
    /** Leading 14px icon. Decorative — the item text carries the meaning. */
    icon?: LucideIcon;
    /** Right-aligned keyboard shortcut hint (display only, §12). */
    shortcut?: string;
    /**
     * Destructive action: rendered in danger, placed LAST and separated, and it
     * always opens a confirmation — never executes directly (§12, §17).
     */
    destructive?: boolean;
}
export declare function DropdownMenuItem({ icon, shortcut, destructive, className, children, ...props }: DropdownMenuItemProps): import("react").JSX.Element;
export type DropdownMenuSeparatorProps = ComponentProps<typeof Menu.Separator>;
export declare function DropdownMenuSeparator({ className, ...props }: DropdownMenuSeparatorProps): import("react").JSX.Element;
/** Groups related items; label them with DropdownMenuGroupLabel (§12). */
export declare const DropdownMenuGroup: import("react").ForwardRefExoticComponent<Omit<import("@base-ui/react").ContextMenuGroupProps, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export type DropdownMenuGroupLabelProps = ComponentProps<typeof Menu.GroupLabel>;
/** Overline-styled label announced for its DropdownMenuGroup. */
export declare function DropdownMenuGroupLabel({ className, ...props }: DropdownMenuGroupLabelProps): import("react").JSX.Element;
export interface DropdownMenuCheckboxItemProps extends ComponentProps<typeof Menu.CheckboxItem> {
    /** Right-aligned keyboard shortcut hint (display only, §12). */
    shortcut?: string;
}
/** A toggleable menu item (e.g. column visibility). Stays open on click. */
export declare function DropdownMenuCheckboxItem({ shortcut, className, children, ...props }: DropdownMenuCheckboxItemProps): import("react").JSX.Element;
/** Exclusive selection inside the menu — pairs with DropdownMenuRadioItem. */
export declare const DropdownMenuRadioGroup: import("react").NamedExoticComponent<Omit<import("@base-ui/react").ContextMenuRadioGroupProps, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export type DropdownMenuRadioItemProps = ComponentProps<typeof Menu.RadioItem>;
export declare function DropdownMenuRadioItem({ className, children, ...props }: DropdownMenuRadioItemProps): import("react").JSX.Element;
/**
 * Submenu root — nest inside a DropdownMenuContent:
 * ```tsx
 * <DropdownMenuSubmenu>
 *   <DropdownMenuSubmenuTrigger>Exportar</DropdownMenuSubmenuTrigger>
 *   <DropdownMenuContent>…items…</DropdownMenuContent>
 * </DropdownMenuSubmenu>
 * ```
 */
export declare const DropdownMenuSubmenu: typeof Menu.SubmenuRoot;
export interface DropdownMenuSubmenuTriggerProps extends ComponentProps<typeof Menu.SubmenuTrigger> {
    /** Leading 14px icon. */
    icon?: LucideIcon;
}
export declare function DropdownMenuSubmenuTrigger({ icon, className, children, ...props }: DropdownMenuSubmenuTriggerProps): import("react").JSX.Element;
