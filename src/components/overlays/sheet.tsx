"use client";

import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import type { ComponentProps, HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

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
export const Sheet = BaseDrawer.Root;
export const SheetTrigger = BaseDrawer.Trigger;
export const SheetClose = BaseDrawer.Close;

export interface SheetContentProps extends ComponentProps<typeof BaseDrawer.Popup> {
  /** Hide the drag-handle bar (e.g. when the sheet hosts a form that should not be swipe-dismissed by accident). */
  hideHandle?: boolean;
}

export function SheetContent({ hideHandle = false, className, children, ...props }: SheetContentProps) {
  return (
    <BaseDrawer.Portal>
      <BaseDrawer.Backdrop
        className={cn(
          "fixed inset-0 fdn-z-modal bg-black/60",
          "transition-opacity duration-[var(--fdn-dur-base)] ease-[var(--fdn-ease-standard)]",
          "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
        )}
      />
      <BaseDrawer.Viewport className="fixed inset-0 fdn-z-modal flex flex-col justify-end">
        <BaseDrawer.Popup
          className={cn(
            "relative mx-auto flex w-full flex-col rounded-t-xl border-t border-border bg-surface-raised shadow-lg",
            "max-h-[92dvh] sm:max-w-modal-md",
            // slides from the bottom edge (§06 drawer recipe); swipe tracks the finger
            "[translate:var(--drawer-swipe-movement-x,0px)_var(--drawer-swipe-movement-y,0px)]",
            "transition-[translate] duration-[var(--fdn-dur-slow)] ease-[var(--fdn-ease-enter)]",
            "data-[ending-style]:duration-[var(--fdn-dur-base)] data-[ending-style]:ease-[var(--fdn-ease-exit)]",
            "data-[swiping]:transition-none",
            "data-[starting-style]:[translate:0_100%] data-[ending-style]:[translate:0_100%]",
            className,
          )}
          {...props}
        >
          {!hideHandle && (
            <div aria-hidden className="grid shrink-0 place-items-center pb-1 pt-2">
              <div className="h-1 w-9 rounded-full bg-border-strong" />
            </div>
          )}
          {children}
        </BaseDrawer.Popup>
      </BaseDrawer.Viewport>
    </BaseDrawer.Portal>
  );
}

export function SheetHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1 px-4 pb-3 pt-1", className)} {...props} />;
}

export function SheetTitle({ className, ...props }: ComponentProps<typeof BaseDrawer.Title>) {
  return <BaseDrawer.Title className={cn("text-h4 text-text", className)} {...props} />;
}

export function SheetDescription({ className, ...props }: ComponentProps<typeof BaseDrawer.Description>) {
  return <BaseDrawer.Description className={cn("text-body text-text-secondary", className)} {...props} />;
}

/** Scrollable middle region — Base UI's drawer content, so swipe and inner scroll cooperate. */
export function SheetBody({ className, ...props }: ComponentProps<typeof BaseDrawer.Content>) {
  return <BaseDrawer.Content className={cn("flex-1 overflow-y-auto px-4 pb-4", className)} {...props} />;
}

export function SheetFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center justify-end gap-2 border-t border-border p-4", className)} {...props} />
  );
}
