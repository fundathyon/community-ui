"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import { useId, useRef, useState } from "react";
import { useControllableState } from "../../hooks/use-controllable-state";
import { cn } from "../../lib/cn";
import { Button } from "../actions/button";
import { Input } from "../forms/input";
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
export function ConfirmDialog({ open, onOpenChange, trigger, title, description, verb, tone = "danger", confirmText, confirmPrompt, onConfirm, cancelLabel = "Cancel", }) {
    const [isOpen, setOpenState] = useControllableState({ value: open, defaultValue: false, onChange: onOpenChange });
    const [pending, setPending] = useState(false);
    const [typed, setTyped] = useState("");
    const cancelRef = useRef(null);
    const promptId = useId();
    const setOpen = (next) => {
        setOpenState(next);
        if (!next)
            setTyped("");
    };
    const handleOpenChange = (next) => {
        // While the confirm action is in flight the dialog cannot be dismissed.
        if (!next && pending)
            return;
        setOpen(next);
    };
    const confirmBlocked = confirmText !== undefined && typed.trim() !== confirmText;
    const handleConfirm = () => {
        const result = onConfirm();
        if (result instanceof Promise) {
            setPending(true);
            result.then(() => {
                setPending(false);
                setOpen(false);
            }, () => {
                // The product surfaces its own error (§17 Errores); we only keep the
                // dialog open so the user can retry or cancel.
                setPending(false);
            });
        }
        else {
            setOpen(false);
        }
    };
    return (_jsxs(BaseAlertDialog.Root, { open: isOpen, onOpenChange: handleOpenChange, children: [trigger && _jsx(BaseAlertDialog.Trigger, { render: trigger }), _jsxs(BaseAlertDialog.Portal, { children: [_jsx(BaseAlertDialog.Backdrop, { className: cn("fixed inset-0 fdn-z-modal bg-black/60", "transition-opacity duration-[var(--fdn-dur-base)] ease-[var(--fdn-ease-standard)]", "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0") }), _jsxs(BaseAlertDialog.Popup, { initialFocus: cancelRef, className: cn("fixed fdn-z-modal flex flex-col gap-3 border border-border bg-surface-raised p-4 shadow-lg", 
                        // centered on ≥sm; bottom sheet on mobile, like Dialog (§08)
                        "inset-x-0 bottom-0 max-h-[92dvh] w-full rounded-t-xl", "sm:inset-0 sm:bottom-auto sm:m-auto sm:h-fit sm:max-h-[85dvh] sm:max-w-modal-sm sm:rounded-xl", 
                        // §06 enter/exit: opacity + ≤8px travel; exit is opacity-only
                        "transition-[opacity,transform] duration-[var(--fdn-dur-slow)] ease-[var(--fdn-ease-enter)]", "data-[starting-style]:translate-y-1 data-[starting-style]:opacity-0", "data-[ending-style]:opacity-0"), children: [_jsxs("div", { className: "flex flex-col gap-1", children: [_jsx(BaseAlertDialog.Title, { className: "text-h4 text-text", children: title }), _jsx(BaseAlertDialog.Description, { className: "text-body text-text-secondary", children: description })] }), confirmText !== undefined && (_jsxs("div", { className: "flex flex-col gap-1.5", children: [_jsx("p", { id: promptId, className: "text-label text-text-secondary", children: confirmPrompt ?? (_jsxs(_Fragment, { children: ["Type ", _jsx("span", { className: "font-mono text-code text-text", children: confirmText }), " to confirm"] })) }), _jsx(Input, { "aria-labelledby": promptId, value: typed, onChange: (event) => setTyped(event.target.value), disabled: pending, autoComplete: "off", autoCorrect: "off", autoCapitalize: "off", spellCheck: false })] })), _jsxs("div", { className: "flex items-center justify-end gap-2 pt-1", children: [_jsx(Button, { ref: cancelRef, variant: "ghost", disabled: pending, onClick: () => handleOpenChange(false), children: cancelLabel }), _jsx(Button, { variant: tone === "danger" ? "destructive" : "primary", disabled: confirmBlocked, loading: pending, onClick: handleConfirm, children: verb })] })] })] })] }));
}
