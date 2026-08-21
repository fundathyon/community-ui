"use client";

import { Menu } from "@base-ui/react/menu";
import { Check, ChevronRight, type LucideIcon } from "lucide-react";
import type { ComponentProps } from "react";
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

export interface DropdownMenuContentProps extends ComponentProps<typeof Menu.Popup> {
  /** Preferred side relative to the trigger. Submenus default to `inline-end`. */
  side?: ComponentProps<typeof Menu.Positioner>["side"];
  align?: ComponentProps<typeof Menu.Positioner>["align"];
  sideOffset?: number;
}

/** Portal + Positioner + Popup with the DS surface, elevation and §06 motion. */
export function DropdownMenuContent({
  side,
  align,
  sideOffset = 4,
  className,
  children,
  ...props
}: DropdownMenuContentProps) {
  return (
    <Menu.Portal>
      <Menu.Positioner side={side} align={align} sideOffset={sideOffset} className="fdn-z-dropdown">
        <Menu.Popup
          className={cn(
            "min-w-44 rounded-lg border border-border bg-surface-raised p-1 shadow-md",
            // §06: enter = opacity + ≤8px travel; exit = opacity only
            "transition-[opacity,transform] duration-[var(--fdn-dur-base)] ease-[var(--fdn-ease-enter)]",
            "data-[starting-style]:-translate-y-1 data-[starting-style]:opacity-0",
            "data-[ending-style]:opacity-0",
            className,
          )}
          {...props}
        >
          {children}
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  );
}

const itemClasses = cn(
  "flex cursor-default select-none items-center gap-1.5 rounded-md px-2 py-1.5 text-body text-text outline-none",
  "data-[highlighted]:bg-surface-hover",
  "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-45",
);

const destructiveItemClasses = "text-danger data-[highlighted]:bg-danger-bg";

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

export function DropdownMenuItem({
  icon,
  shortcut,
  destructive = false,
  className,
  children,
  ...props
}: DropdownMenuItemProps) {
  return (
    <Menu.Item
      data-destructive={destructive || undefined}
      className={cn(itemClasses, destructive && destructiveItemClasses, className)}
      {...props}
    >
      {icon && <Icon icon={icon} size={14} className={destructive ? undefined : "text-text-muted"} />}
      <span className="flex-1 truncate">{children}</span>
      {shortcut && <span className="ml-auto pl-4 text-caption text-text-muted">{shortcut}</span>}
    </Menu.Item>
  );
}

export type DropdownMenuSeparatorProps = ComponentProps<typeof Menu.Separator>;

export function DropdownMenuSeparator({ className, ...props }: DropdownMenuSeparatorProps) {
  return <Menu.Separator className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />;
}

/** Groups related items; label them with DropdownMenuGroupLabel (§12). */
export const DropdownMenuGroup = Menu.Group;

export type DropdownMenuGroupLabelProps = ComponentProps<typeof Menu.GroupLabel>;

/** Overline-styled label announced for its DropdownMenuGroup. */
export function DropdownMenuGroupLabel({ className, ...props }: DropdownMenuGroupLabelProps) {
  return (
    <Menu.GroupLabel
      className={cn("px-2 pb-1 pt-1.5 text-overline uppercase text-text-muted", className)}
      {...props}
    />
  );
}

export interface DropdownMenuCheckboxItemProps extends ComponentProps<typeof Menu.CheckboxItem> {
  /** Right-aligned keyboard shortcut hint (display only, §12). */
  shortcut?: string;
}

/** A toggleable menu item (e.g. column visibility). Stays open on click. */
export function DropdownMenuCheckboxItem({
  shortcut,
  className,
  children,
  ...props
}: DropdownMenuCheckboxItemProps) {
  return (
    <Menu.CheckboxItem className={cn(itemClasses, className)} {...props}>
      <span className="grid size-3.5 shrink-0 place-items-center">
        <Menu.CheckboxItemIndicator>
          <Icon icon={Check} size={12} />
        </Menu.CheckboxItemIndicator>
      </span>
      <span className="flex-1 truncate">{children}</span>
      {shortcut && <span className="ml-auto pl-4 text-caption text-text-muted">{shortcut}</span>}
    </Menu.CheckboxItem>
  );
}

/** Exclusive selection inside the menu — pairs with DropdownMenuRadioItem. */
export const DropdownMenuRadioGroup = Menu.RadioGroup;

export type DropdownMenuRadioItemProps = ComponentProps<typeof Menu.RadioItem>;

export function DropdownMenuRadioItem({ className, children, ...props }: DropdownMenuRadioItemProps) {
  return (
    <Menu.RadioItem className={cn(itemClasses, className)} {...props}>
      <span className="grid size-3.5 shrink-0 place-items-center">
        <Menu.RadioItemIndicator>
          <span aria-hidden className="block size-1.5 rounded-full bg-current" />
        </Menu.RadioItemIndicator>
      </span>
      <span className="flex-1 truncate">{children}</span>
    </Menu.RadioItem>
  );
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

export interface DropdownMenuSubmenuTriggerProps extends ComponentProps<typeof Menu.SubmenuTrigger> {
  /** Leading 14px icon. */
  icon?: LucideIcon;
}

export function DropdownMenuSubmenuTrigger({
  icon,
  className,
  children,
  ...props
}: DropdownMenuSubmenuTriggerProps) {
  return (
    <Menu.SubmenuTrigger
      className={cn(itemClasses, "data-[popup-open]:bg-surface-hover", className)}
      {...props}
    >
      {icon && <Icon icon={icon} size={14} className="text-text-muted" />}
      <span className="flex-1 truncate">{children}</span>
      <Icon icon={ChevronRight} size={14} className="ml-auto text-text-muted" />
    </Menu.SubmenuTrigger>
  );
}
