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
    return (_jsxs(BaseDialog.Portal, { children: [_jsx(BaseDialog.Backdrop, { className: cn("fixed inset-0 fdn-z-modal bg-black/60", "transition-opacity duration-[var(--fdn-dur-base)] ease-[var(--fdn-ease-standard)]", "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0") }), _jsxs(BaseDialog.Popup, { className: cn("fixed fdn-z-modal flex flex-col gap-3 border border-border bg-surface-raised p-4 shadow-lg", 
                // centered on ≥sm; bottom sheet with drag-free full width on mobile (§08)
                "inset-x-0 bottom-0 max-h-[92dvh] w-full rounded-t-xl", "sm:inset-0 sm:bottom-auto sm:m-auto sm:h-fit sm:max-h-[85dvh] sm:rounded-xl", sizeClasses[size], 
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
/** Scrollable middle region for dialogs whose content may exceed the viewport. */
export function DialogBody({ className, ...props }) {
    return _jsx("div", { className: cn("-mx-1 flex-1 overflow-y-auto px-1 py-0.5", className), ...props });
}
export function DialogFooter({ leading, className, children, ...props }) {
    return (_jsxs("div", { className: cn("flex items-center justify-end gap-2 pt-1", className), ...props, children: [leading && _jsx("div", { className: "mr-auto text-caption text-text-muted", children: leading }), children] }));
}
