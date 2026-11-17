import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { type ComponentProps } from "react";
/**
 * ContextMenu (§12, §13) — the Dropdown Menu opened by right click / long
 * press on an area (a table row, a card). Same rules as any menu: max 7 items
 * before grouping with separators, destructive items last and separated —
 * always opening a confirmation — and shortcuts right-aligned. Full keyboard
 * navigation is provided by Base UI (arrows, Home/End, typeahead).
 *
 * ```tsx
 * <ContextMenu>
 *   <ContextMenuTrigger>…row…</ContextMenuTrigger>
 *   <ContextMenuContent>
 *     <ContextMenuItem shortcut="⌘C">Copiar comando pull</ContextMenuItem>
 *     <ContextMenuItem shortcut="⌘T">Ver tags</ContextMenuItem>
 *     <ContextMenuSeparator />
 *     <ContextMenuItem destructive>Eliminar repositorio</ContextMenuItem>
 *   </ContextMenuContent>
 * </ContextMenu>
 * ```
 */
export declare const ContextMenu: typeof BaseContextMenu.Root;
export declare const ContextMenuTrigger: import("react").ForwardRefExoticComponent<Omit<import("@base-ui/react").ContextMenuTriggerProps, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export declare const ContextMenuGroup: import("react").ForwardRefExoticComponent<Omit<import("@base-ui/react").ContextMenuGroupProps, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export interface ContextMenuContentProps extends ComponentProps<typeof BaseContextMenu.Popup> {
}
export declare function ContextMenuContent({ className, children, ...props }: ContextMenuContentProps): import("react").JSX.Element;
export interface ContextMenuItemProps extends ComponentProps<typeof BaseContextMenu.Item> {
    /** Destructive item: `text-danger`, goes LAST and separated, and its action always opens a confirmation (§12). */
    destructive?: boolean;
    /** Keyboard shortcut hint, right-aligned (§12). Purely visual — register the handler where it applies. */
    shortcut?: string;
}
export declare const ContextMenuItem: import("react").ForwardRefExoticComponent<Omit<ContextMenuItemProps, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export declare function ContextMenuSeparator({ className, ...props }: ComponentProps<typeof BaseContextMenu.Separator>): import("react").JSX.Element;
export declare function ContextMenuGroupLabel({ className, ...props }: ComponentProps<typeof BaseContextMenu.GroupLabel>): import("react").JSX.Element;
