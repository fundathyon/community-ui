"use client";

import { Popover as BasePopover } from "@base-ui/react/popover";
import type { ComponentProps } from "react";
import { cn } from "../../lib/cn";

/**
 * Popover (§13) — anchored panel that ADMITS controls and focus, unlike
 * Tooltip (text only). It does NOT trap focus: tabbing out of it closes it.
 * Anchors to its trigger and repositions itself when it does not fit. For a
 * short blocking decision use Dialog; for lateral work use Drawer.
 *
 * ```tsx
 * <Popover>
 *   <PopoverTrigger render={<Button variant="ghost">Filtrar por estado</Button>} />
 *   <PopoverContent>
 *     <PopoverTitle>Filtrar por estado</PopoverTitle>
 *     …checkboxes…
 *   </PopoverContent>
 * </Popover>
 * ```
 */
export const Popover = BasePopover.Root;
export const PopoverTrigger = BasePopover.Trigger;
export const PopoverClose = BasePopover.Close;

export type PopoverSide = "top" | "right" | "bottom" | "left";
export type PopoverAlign = "start" | "center" | "end";

export interface PopoverContentProps extends ComponentProps<typeof BasePopover.Popup> {
  /** Preferred side; flips automatically when it does not fit. */
  side?: PopoverSide;
  align?: PopoverAlign;
  /** Gap to the anchor in px. */
  sideOffset?: number;
}

export function PopoverContent({
  side = "bottom",
  align = "center",
  sideOffset = 6,
  className,
  children,
  ...props
}: PopoverContentProps) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner side={side} align={align} sideOffset={sideOffset} className="fdn-z-dropdown">
        <BasePopover.Popup
          className={cn(
            "min-w-40 max-w-80 rounded-lg border border-border bg-surface-raised p-3 shadow-md",
            // §06: popover enters at dur-base with ≤8px travel; exit is opacity-only
            "transition-[opacity,transform] duration-[var(--fdn-dur-base)] ease-[var(--fdn-ease-enter)]",
            "data-[starting-style]:translate-y-1 data-[starting-style]:opacity-0",
            "data-[ending-style]:opacity-0",
            className,
          )}
          {...props}
        >
          {children}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
}

export function PopoverTitle({ className, ...props }: ComponentProps<typeof BasePopover.Title>) {
  return <BasePopover.Title className={cn("mb-2 text-h5 text-text", className)} {...props} />;
}
