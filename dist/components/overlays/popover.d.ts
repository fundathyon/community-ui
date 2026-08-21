import { Popover as BasePopover } from "@base-ui/react/popover";
import type { ComponentProps } from "react";
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
export declare const Popover: typeof BasePopover.Root;
export declare const PopoverTrigger: BasePopover.Trigger;
export declare const PopoverClose: import("react").ForwardRefExoticComponent<Omit<import("@base-ui/react").PopoverCloseProps, "ref"> & import("react").RefAttributes<HTMLButtonElement>>;
export type PopoverSide = "top" | "right" | "bottom" | "left";
export type PopoverAlign = "start" | "center" | "end";
export interface PopoverContentProps extends ComponentProps<typeof BasePopover.Popup> {
    /** Preferred side; flips automatically when it does not fit. */
    side?: PopoverSide;
    align?: PopoverAlign;
    /** Gap to the anchor in px. */
    sideOffset?: number;
}
export declare function PopoverContent({ side, align, sideOffset, className, children, ...props }: PopoverContentProps): import("react").JSX.Element;
export declare function PopoverTitle({ className, ...props }: ComponentProps<typeof BasePopover.Title>): import("react").JSX.Element;
