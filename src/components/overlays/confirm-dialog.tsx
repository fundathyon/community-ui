"use client";

import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import { useId, useRef, useState, type ReactElement, type ReactNode } from "react";
import { useControllableState } from "../../hooks/use-controllable-state";
import { cn } from "../../lib/cn";
import { Button } from "../actions/button";
import { Input } from "../forms/input";

export type ConfirmDialogTone = "danger" | "neutral";

export interface ConfirmDialogProps {
  /** Controlled open state. Omit it (with `trigger`) for uncontrolled usage. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Trigger composition: the element that opens the dialog (e.g. a destructive-subtle Button). */
  trigger?: ReactElement;
  title: ReactNode;
  /** Names the OBJECT and its consequence: "library/nginx and its 12 tags will be deleted. This cannot be undone." */
  description: ReactNode;
  /**
   * The confirm button says the verb — "Eliminar repositorio", never "Sí" (§17).
   */
  verb: string;
  /** `danger` (default) renders a destructive confirm button; `neutral` a primary one. */
  tone?: ConfirmDialogTone;
  /**
   * For irreversible actions affecting others' data (§17): the user must type
   * this exact text to enable the confirm button.
   */
  confirmText?: string;
  /** Overrides the type-to-confirm copy. Default: `Type "{confirmText}" to confirm`. */
  confirmPrompt?: ReactNode;
  /**
   * Runs on confirm. Return a promise to get a loading state on the confirm
   * button while it is pending; the dialog closes when it resolves and stays
   * open if it rejects.
   */
  onConfirm: () => void | Promise<void>;
  /** Label of the safe action. Default "Cancel" — always overridable. */
  cancelLabel?: string;
}

/**
 * ConfirmDialog — destructive confirmation (§17). Reversible actions do NOT
 * use it (execute directly + toast with undo); irreversible ones get this
 * dialog naming the object and its consequence, with type-to-confirm when the
 * action affects others' data. The SAFE action (cancel) receives initial
 * focus, there is no corner close, and clicking the backdrop never dismisses:
 * the user must choose (§13).
 *
 * ```tsx
 * <ConfirmDialog
 *   trigger={<Button variant="destructive-subtle">Eliminar</Button>}
 *   title="Eliminar repositorio"
 *   description="library/nginx y sus 12 tags se eliminarán. No se puede deshacer."
 *   verb="Eliminar repositorio"
 *   confirmText="library/nginx"
 *   onConfirm={deleteRepository}
 *   cancelLabel="Cancelar"
 *   confirmPrompt={<>Escribe <b>library/nginx</b> para confirmar</>}
 * />
 * ```
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  verb,
  tone = "danger",
  confirmText,
  confirmPrompt,
  onConfirm,
  cancelLabel = "Cancel",
}: ConfirmDialogProps) {
  const [isOpen, setOpenState] = useControllableState({ value: open, defaultValue: false, onChange: onOpenChange });
  const [pending, setPending] = useState(false);
  const [typed, setTyped] = useState("");
  const cancelRef = useRef<HTMLButtonElement>(null);
  const promptId = useId();

  const setOpen = (next: boolean) => {
    setOpenState(next);
    if (!next) setTyped("");
  };

  const handleOpenChange = (next: boolean) => {
    // While the confirm action is in flight the dialog cannot be dismissed.
    if (!next && pending) return;
    setOpen(next);
  };

  const confirmBlocked = confirmText !== undefined && typed.trim() !== confirmText;

  const handleConfirm = () => {
    const result: unknown = onConfirm();
    if (result instanceof Promise) {
      setPending(true);
      result.then(
        () => {
          setPending(false);
          setOpen(false);
        },
        () => {
          // The product surfaces its own error (§17 Errores); we only keep the
          // dialog open so the user can retry or cancel.
          setPending(false);
        },
      );
    } else {
      setOpen(false);
    }
  };

  return (
    <BaseAlertDialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      {trigger && <BaseAlertDialog.Trigger render={trigger} />}
      <BaseAlertDialog.Portal>
        <BaseAlertDialog.Backdrop
          className={cn(
            "fixed inset-0 fdn-z-modal bg-black/60 backdrop-blur-sm",
            "transition-opacity duration-[var(--fdn-dur-base)] ease-[var(--fdn-ease-standard)]",
            "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
          )}
        />
        <BaseAlertDialog.Popup
          initialFocus={cancelRef}
          className={cn(
            "fixed fdn-z-modal flex flex-col gap-3 border border-border bg-surface-raised p-4 shadow-lg",
            // centered on ≥sm; bottom sheet on mobile, like Dialog (§08)
            "inset-x-0 bottom-0 max-h-[92dvh] w-full rounded-t-xl",
            "sm:inset-0 sm:bottom-auto sm:m-auto sm:h-fit sm:max-h-[85dvh] sm:max-w-modal-sm sm:rounded-xl",
            // §06 enter/exit: opacity + ≤8px travel; exit is opacity-only
            "transition-[opacity,transform] duration-[var(--fdn-dur-slow)] ease-[var(--fdn-ease-enter)]",
            "data-[starting-style]:translate-y-1 data-[starting-style]:opacity-0",
            "data-[ending-style]:opacity-0",
          )}
        >
          <div className="flex flex-col gap-1">
            <BaseAlertDialog.Title className="text-h4 text-text">{title}</BaseAlertDialog.Title>
            <BaseAlertDialog.Description className="text-body text-text-secondary">
              {description}
            </BaseAlertDialog.Description>
          </div>
          {confirmText !== undefined && (
            <div className="flex flex-col gap-1.5">
              <p id={promptId} className="text-label text-text-secondary">
                {confirmPrompt ?? (
                  <>
                    Type <span className="font-mono text-code text-text">{confirmText}</span> to confirm
                  </>
                )}
              </p>
              <Input
                aria-labelledby={promptId}
                value={typed}
                onChange={(event) => setTyped(event.target.value)}
                disabled={pending}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
              />
            </div>
          )}
          <div className="flex items-center justify-end gap-2 pt-1">
            <Button ref={cancelRef} variant="ghost" size="lg" disabled={pending} onClick={() => handleOpenChange(false)}>
              {cancelLabel}
            </Button>
            <Button
              variant={tone === "danger" ? "destructive" : "primary"}
              size="lg"
              disabled={confirmBlocked}
              loading={pending}
              onClick={handleConfirm}
            >
              {verb}
            </Button>
          </div>
        </BaseAlertDialog.Popup>
      </BaseAlertDialog.Portal>
    </BaseAlertDialog.Root>
  );
}
