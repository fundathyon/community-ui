import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import type { ComponentProps, HTMLAttributes } from "react";
/**
 * Sheet (§08, §13) — the drawer on mobile: slides from the bottom with a drag
 * handle. Use it when the design explicitly calls for the bottom-sheet
 * pattern; Drawer and Dialog already degrade to one below `sm` on their own.
 *
 * Built on Base UI Drawer with `swipeDirection: "down"` (its default), so the
 * handle is a real affordance: dragging down dismisses. Shares the overlay
 * contract (§13): focus trap, Esc closes, focus returns to the trigger,
 * background inert and scroll-locked.
 *
 * ```tsx
 * <Sheet>
 *   <SheetTrigger render={<Button variant="ghost">Filtrar</Button>} />
 *   <SheetContent>
 *     <SheetHeader>
 *       <SheetTitle>Filtros</SheetTitle>
 *     </SheetHeader>
 *     …
 *     <SheetFooter>
 *       <Button variant="primary">Aplicar</Button>
 *     </SheetFooter>
 *   </SheetContent>
 * </Sheet>
 * ```
 */
export declare const Sheet: typeof BaseDrawer.Root;
export declare const SheetTrigger: BaseDrawer.Trigger;
export declare const SheetClose: BaseDrawer.Close;
export interface SheetContentProps extends ComponentProps<typeof BaseDrawer.Popup> {
    /** Hide the drag-handle bar (e.g. when the sheet hosts a form that should not be swipe-dismissed by accident). */
    hideHandle?: boolean;
}
export declare function SheetContent({ hideHandle, className, children, ...props }: SheetContentProps): import("react").JSX.Element;
export declare function SheetHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>): import("react").JSX.Element;
export declare function SheetTitle({ className, ...props }: ComponentProps<typeof BaseDrawer.Title>): import("react").JSX.Element;
export declare function SheetDescription({ className, ...props }: ComponentProps<typeof BaseDrawer.Description>): import("react").JSX.Element;
/** Scrollable middle region — Base UI's drawer content, so swipe and inner scroll cooperate. */
export declare function SheetBody({ className, ...props }: ComponentProps<typeof BaseDrawer.Content>): import("react").JSX.Element;
export declare function SheetFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>): import("react").JSX.Element;
