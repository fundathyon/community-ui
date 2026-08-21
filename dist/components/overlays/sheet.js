"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
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
export function SheetContent({ hideHandle = false, className, children, ...props }) {
    return (_jsxs(BaseDrawer.Portal, { children: [_jsx(BaseDrawer.Backdrop, { className: cn("fixed inset-0 fdn-z-modal bg-black/60", "transition-opacity duration-[var(--fdn-dur-base)] ease-[var(--fdn-ease-standard)]", "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0") }), _jsx(BaseDrawer.Viewport, { className: "fixed inset-0 fdn-z-modal flex flex-col justify-end", children: _jsxs(BaseDrawer.Popup, { className: cn("relative mx-auto flex w-full flex-col rounded-t-xl border-t border-border bg-surface-raised shadow-lg", "max-h-[92dvh] sm:max-w-modal-md", 
                    // slides from the bottom edge (§06 drawer recipe); swipe tracks the finger
                    "[translate:var(--drawer-swipe-movement-x,0px)_var(--drawer-swipe-movement-y,0px)]", "transition-[translate] duration-[var(--fdn-dur-slow)] ease-[var(--fdn-ease-enter)]", "data-[ending-style]:duration-[var(--fdn-dur-base)] data-[ending-style]:ease-[var(--fdn-ease-exit)]", "data-[swiping]:transition-none", "data-[starting-style]:[translate:0_100%] data-[ending-style]:[translate:0_100%]", className), ...props, children: [!hideHandle && (_jsx("div", { "aria-hidden": true, className: "grid shrink-0 place-items-center pb-1 pt-2", children: _jsx("div", { className: "h-1 w-9 rounded-full bg-border-strong" }) })), children] }) })] }));
}
export function SheetHeader({ className, ...props }) {
    return _jsx("div", { className: cn("flex flex-col gap-1 px-4 pb-3 pt-1", className), ...props });
}
export function SheetTitle({ className, ...props }) {
    return _jsx(BaseDrawer.Title, { className: cn("text-h4 text-text", className), ...props });
}
export function SheetDescription({ className, ...props }) {
    return _jsx(BaseDrawer.Description, { className: cn("text-body text-text-secondary", className), ...props });
}
/** Scrollable middle region — Base UI's drawer content, so swipe and inner scroll cooperate. */
export function SheetBody({ className, ...props }) {
    return _jsx(BaseDrawer.Content, { className: cn("flex-1 overflow-y-auto px-4 pb-4", className), ...props });
}
export function SheetFooter({ className, ...props }) {
    return (_jsx("div", { className: cn("flex items-center justify-end gap-2 border-t border-border p-4", className), ...props }));
}
