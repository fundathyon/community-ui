"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { cn } from "../../lib/cn";
import { Icon } from "../typography/icon";
/**
 * Dialog (§13) — a short decision that blocks the flow: confirm, create a
 * resource with 1–4 fields. Max 560px (`md`). More than 6 fields or its own
 * scroll → it stops being an overlay and becomes a page. Never open a modal
 * from another modal.
 *
 * Accessibility contract (handled by Base UI + these styles): role=dialog +
 * aria-modal, focus trapped, Esc closes, focus returns to the trigger, the
 * background is inert and does not scroll. On mobile it becomes a bottom sheet.
 *
 * Composition:
 * ```tsx
 * <Dialog>
 *   <DialogTrigger render={<Button>Nuevo recurso</Button>} />
 *   <DialogContent size="sm">
 *     <DialogHeader>
 *       <DialogTitle>Nuevo enlace compartido</DialogTitle>
 *       <DialogDescription>Cualquiera con el enlace podrá leer esta config.</DialogDescription>
 *     </DialogHeader>
 *     …fields…
 *     <DialogFooter>
 *       <DialogClose render={<Button variant="ghost">Cancelar</Button>} />
 *       <Button variant="primary">Generar enlace</Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 * ```
 */
export const Dialog = BaseDialog.Root;
export const DialogTrigger = BaseDialog.Trigger;
export const DialogClose = BaseDialog.Close;
const sizeClasses = {
    sm: "sm:max-w-modal-sm",
    md: "sm:max-w-modal-md",
    lg: "sm:max-w-modal-lg",
};
export function DialogContent({ size = "md", hideClose = false, className, children, ...props }) {
    return (_jsxs(BaseDialog.Portal, { children: [_jsx(BaseDialog.Backdrop, { className: cn("fixed inset-0 fdn-z-modal bg-black/60 backdrop-blur-sm", "transition-opacity duration-[var(--fdn-dur-base)] ease-[var(--fdn-ease-standard)]", "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0") }), _jsxs(BaseDialog.Popup, { className: cn("fixed fdn-z-modal flex flex-col gap-3 border border-border bg-surface-raised p-4 shadow-lg", 
                // Clip children at the popup's rounded frame so borders, focus rings,
                // row hovers, secret-field outlines, etc. can never pixel-spill past
                // the popup's edge. Every popover-like UI (Tooltip, DropdownMenu,
                // Combobox, Select, Toast) is rendered through its own Portal, so
                // this does NOT trap them inside — they float on top of the modal
                // layer as intended. Composes cleanly with a consumer's own
                // `overflow-y-auto` (Tailwind cascade → `overflow-x: hidden,
                // overflow-y: auto`), which is what unbreaks the horizontal-scroll
                // regression the spec would otherwise trigger (`overflow-x: visible`
                // is computed to `auto` whenever `overflow-y` is not visible).
                "overflow-hidden", 
                // Mobile: bottom sheet — top:auto, bottom:0, full width, rounded top corners (§08).
                "inset-x-0 bottom-0 max-h-[92dvh] w-full rounded-t-xl", 
                // ≥sm: centered dialog. `inset-0` pins all four sides to 0, `m-auto` then
                // distributes the remaining space around a fit-content box, which centers
                // both axes. Do NOT reintroduce `sm:bottom-auto` — it undoes the vertical
                // half of that centering and the dialog snaps to the top of the viewport.
                "sm:inset-0 sm:m-auto sm:h-fit sm:max-h-[85dvh] sm:rounded-xl", sizeClasses[size], 
                // §06 enter/exit: opacity + ≤8px travel; exit is opacity-only
                "transition-[opacity,transform] duration-[var(--fdn-dur-slow)] ease-[var(--fdn-ease-enter)]", "data-[starting-style]:translate-y-1 data-[starting-style]:opacity-0", "data-[ending-style]:opacity-0", className), ...props, children: [children, !hideClose && (_jsx(BaseDialog.Close, { "aria-label": "Close", className: cn("absolute right-3 top-3 grid size-6 place-items-center rounded-sm text-text-muted", "transition-colors duration-[var(--fdn-dur-fast)] hover:bg-surface-hover hover:text-text", "fdn-touch-target"), children: _jsx(Icon, { icon: X, size: 14 }) }))] })] }));
}
export function DialogHeader({ className, ...props }) {
    return _jsx("div", { className: cn("flex flex-col gap-1 pr-6", className), ...props });
}
export function DialogTitle({ className, ...props }) {
    return _jsx(BaseDialog.Title, { className: cn("text-h4 text-text", className), ...props });
}
export function DialogDescription({ className, ...props }) {
    return _jsx(BaseDialog.Description, { className: cn("text-body text-text-secondary", className), ...props });
}
/**
 * Scrollable middle region for dialogs whose content may exceed the viewport.
 *
 * `min-w-0` lets flex children shrink correctly (min-content default would
 * otherwise let a long unbroken word or a `w-full` child with padding push the
 * dialog wider). `overflow-x-hidden` is explicit even though the parent Popup
 * already sets `overflow-hidden`: without it, when a vertical scrollbar
 * appears here, the CSS spec computes `overflow-x` to `auto` (since `visible`
 * on one axis becomes `auto` when the other axis is not visible), which would
 * revive the same pixel-spill / horizontal-scroll surprises the base clip is
 * designed to prevent.
 */
export function DialogBody({ className, ...props }) {
    return (_jsx("div", { className: cn("-mx-1 flex-1 min-w-0 overflow-y-auto overflow-x-hidden px-1 py-0.5", className), ...props }));
}
export function DialogFooter({ leading, className, children, ...props }) {
    return (_jsxs("div", { className: cn("flex items-center justify-end gap-2 pt-1", className), ...props, children: [leading && _jsx("div", { className: "mr-auto text-caption text-text-muted", children: leading }), children] }));
}
