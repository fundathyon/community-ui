import { type ReactElement, type ReactNode } from "react";
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
export declare function ConfirmDialog({ open, onOpenChange, trigger, title, description, verb, tone, confirmText, confirmPrompt, onConfirm, cancelLabel, }: ConfirmDialogProps): import("react").JSX.Element;
