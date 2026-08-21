import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import type { ComponentProps, HTMLAttributes, ReactNode } from "react";
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
export declare const Dialog: typeof BaseDialog.Root;
export declare const DialogTrigger: BaseDialog.Trigger;
export declare const DialogClose: import("react").ForwardRefExoticComponent<Omit<import("@base-ui/react").AlertDialogCloseProps, "ref"> & import("react").RefAttributes<HTMLButtonElement>>;
export type DialogSize = "sm" | "md" | "lg";
export interface DialogContentProps extends ComponentProps<typeof BaseDialog.Popup> {
    /** sm 400 · md 560 · lg 760 (§04). */
    size?: DialogSize;
    /** Hide the corner close button (e.g. destructive confirmations that force a choice). */
    hideClose?: boolean;
}
export declare function DialogContent({ size, hideClose, className, children, ...props }: DialogContentProps): import("react").JSX.Element;
export declare function DialogHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>): import("react").JSX.Element;
export declare function DialogTitle({ className, ...props }: ComponentProps<typeof BaseDialog.Title>): import("react").JSX.Element;
export declare function DialogDescription({ className, ...props }: ComponentProps<typeof BaseDialog.Description>): import("react").JSX.Element;
/** Scrollable middle region for dialogs whose content may exceed the viewport. */
export declare function DialogBody({ className, ...props }: HTMLAttributes<HTMLDivElement>): import("react").JSX.Element;
export interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {
    /** Content pinned to the left edge (e.g. a hint), actions stay right. */
    leading?: ReactNode;
}
export declare function DialogFooter({ leading, className, children, ...props }: DialogFooterProps): import("react").JSX.Element;
