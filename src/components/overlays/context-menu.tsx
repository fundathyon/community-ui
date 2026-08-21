"use client";

import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { forwardRef, type ComponentProps } from "react";
import { cn } from "../../lib/cn";

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
export const ContextMenu = BaseContextMenu.Root;
export const ContextMenuTrigger = BaseContextMenu.Trigger;
export const ContextMenuGroup = BaseContextMenu.Group;

export interface ContextMenuContentProps extends ComponentProps<typeof BaseContextMenu.Popup> {}

export function ContextMenuContent({ className, children, ...props }: ContextMenuContentProps) {
  return (
    <BaseContextMenu.Portal>
      <BaseContextMenu.Positioner className="fdn-z-dropdown">
        <BaseContextMenu.Popup
          className={cn(
            "min-w-[180px] rounded-lg border border-border bg-surface-raised p-1 shadow-md",
            // §06: menu enters at dur-base with ≤8px travel; exit is opacity-only
            "transition-[opacity,transform] duration-[var(--fdn-dur-base)] ease-[var(--fdn-ease-enter)]",
            "data-[starting-style]:translate-y-1 data-[starting-style]:opacity-0",
            "data-[ending-style]:opacity-0",
            className,
          )}
          {...props}
        >
          {children}
        </BaseContextMenu.Popup>
      </BaseContextMenu.Positioner>
    </BaseContextMenu.Portal>
  );
}

export interface ContextMenuItemProps extends ComponentProps<typeof BaseContextMenu.Item> {
  /** Destructive item: `text-danger`, goes LAST and separated, and its action always opens a confirmation (§12). */
  destructive?: boolean;
  /** Keyboard shortcut hint, right-aligned (§12). Purely visual — register the handler where it applies. */
  shortcut?: string;
}

export const ContextMenuItem = forwardRef<HTMLDivElement, ContextMenuItemProps>(function ContextMenuItem(
  { destructive = false, shortcut, className, children, ...props },
  ref,
) {
  return (
    <BaseContextMenu.Item
      ref={ref}
      className={cn(
        "flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-body outline-none",
        "transition-colors duration-[var(--fdn-dur-fast)]",
        destructive ? "text-danger data-[highlighted]:bg-danger-bg" : "text-text data-[highlighted]:bg-surface-hover",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-45",
        className,
      )}
      {...props}
    >
      {children}
      {shortcut && (
        // presentational: symbols like "⌘T" read poorly, so keep them out of the accessible name
        <span aria-hidden className="ml-auto pl-4 text-caption text-text-muted">
          {shortcut}
        </span>
      )}
    </BaseContextMenu.Item>
  );
});

export function ContextMenuSeparator({ className, ...props }: ComponentProps<typeof BaseContextMenu.Separator>) {
  return <BaseContextMenu.Separator className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />;
}

export function ContextMenuGroupLabel({ className, ...props }: ComponentProps<typeof BaseContextMenu.GroupLabel>) {
  return <BaseContextMenu.GroupLabel className={cn("px-2 py-1 text-overline text-text-muted", className)} {...props} />;
}
