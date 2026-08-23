"use client";

import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import type { ComponentProps, HTMLAttributes, ReactNode } from "react";
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

export type DialogSize = "sm" | "md" | "lg";

const sizeClasses: Record<DialogSize, string> = {
  sm: "sm:max-w-modal-sm",
  md: "sm:max-w-modal-md",
  lg: "sm:max-w-modal-lg",
};

export interface DialogContentProps extends ComponentProps<typeof BaseDialog.Popup> {
  /** sm 400 · md 560 · lg 760 (§04). */
  size?: DialogSize;
  /** Hide the corner close button (e.g. destructive confirmations that force a choice). */
  hideClose?: boolean;
}

export function DialogContent({ size = "md", hideClose = false, className, children, ...props }: DialogContentProps) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop
        className={cn(
          "fixed inset-0 fdn-z-modal bg-black/60 backdrop-blur-sm",
          "transition-opacity duration-[var(--fdn-dur-base)] ease-[var(--fdn-ease-standard)]",
          "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
        )}
      />
      <BaseDialog.Popup
        className={cn(
          "fixed fdn-z-modal flex flex-col gap-3 border border-border bg-surface-raised p-4 shadow-lg",
          // centered on ≥sm; bottom sheet with drag-free full width on mobile (§08)
          "inset-x-0 bottom-0 max-h-[92dvh] w-full rounded-t-xl",
          "sm:inset-0 sm:bottom-auto sm:m-auto sm:h-fit sm:max-h-[85dvh] sm:rounded-xl",
          sizeClasses[size],
          // §06 enter/exit: opacity + ≤8px travel; exit is opacity-only
          "transition-[opacity,transform] duration-[var(--fdn-dur-slow)] ease-[var(--fdn-ease-enter)]",
          "data-[starting-style]:translate-y-1 data-[starting-style]:opacity-0",
          "data-[ending-style]:opacity-0",
          className,
        )}
        {...props}
      >
        {children}
        {!hideClose && (
          <BaseDialog.Close
            aria-label="Close"
            className={cn(
              "absolute right-3 top-3 grid size-6 place-items-center rounded-sm text-text-muted",
              "transition-colors duration-[var(--fdn-dur-fast)] hover:bg-surface-hover hover:text-text",
              "fdn-touch-target",
            )}
          >
            <Icon icon={X} size={14} />
          </BaseDialog.Close>
        )}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  );
}

export function DialogHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1 pr-6", className)} {...props} />;
}

export function DialogTitle({ className, ...props }: ComponentProps<typeof BaseDialog.Title>) {
  return <BaseDialog.Title className={cn("text-h4 text-text", className)} {...props} />;
}

export function DialogDescription({ className, ...props }: ComponentProps<typeof BaseDialog.Description>) {
  return <BaseDialog.Description className={cn("text-body text-text-secondary", className)} {...props} />;
}

/** Scrollable middle region for dialogs whose content may exceed the viewport. */
export function DialogBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("-mx-1 flex-1 overflow-y-auto px-1 py-0.5", className)} {...props} />;
}

export interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** Content pinned to the left edge (e.g. a hint), actions stay right. */
  leading?: ReactNode;
}

export function DialogFooter({ leading, className, children, ...props }: DialogFooterProps) {
  return (
    <div className={cn("flex items-center justify-end gap-2 pt-1", className)} {...props}>
      {leading && <div className="mr-auto text-caption text-text-muted">{leading}</div>}
      {children}
    </div>
  );
}
