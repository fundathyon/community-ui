"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Toast as BaseToast } from "@base-ui/react/toast";
import { X } from "lucide-react";
import { useCallback, useMemo } from "react";
import { cn } from "../../lib/cn";
import { Button } from "../actions/button";
import { Icon } from "../typography/icon";
import { TONE_ICON, TONE_TEXT } from "./alert";
import { Spinner } from "./spinner";
function toManagerOptions(options) {
    return {
        title: options.title,
        description: options.description,
        type: options.tone,
        timeout: options.duration,
    };
}
function toPromiseMessage(message) {
    return typeof message === "string" ? message : toManagerOptions(message);
}
/**
 * useToast — imperative toasts. Must render inside `ToastProvider`.
 *
 * A toast confirms what the user JUST DID and leaves on its own; if the result
 * is already visible on screen (the row appeared in the table), no toast (§17).
 * NEVER use it for errors that require action — those go in an Alert (§11).
 */
export function useToast() {
    const manager = BaseToast.useToastManager();
    const toast = useCallback((options) => {
        const { action, ...rest } = options;
        if (!action) {
            return manager.add(toManagerOptions(rest));
        }
        // Base UI's Toast.Action does not close on its own — acting IS resolving
        // the toast, so we dismiss it right after the handler runs.
        let id = "";
        id = manager.add({
            ...toManagerOptions(rest),
            actionProps: {
                children: action.label,
                onClick: () => {
                    action.onClick();
                    manager.close(id);
                },
            },
        });
        return id;
    }, [manager]);
    const undo = useCallback(({ title, description, onUndo, undoLabel = "Undo", duration = 10_000 }) => toast({ title, description, action: { label: undoLabel, onClick: onUndo }, duration }), [toast]);
    const promise = useCallback((value, messages) => manager.promise(value, {
        loading: toPromiseMessage(messages.loading),
        success: typeof messages.success === "function"
            ? (result) => toPromiseMessage(messages.success(result))
            : toPromiseMessage(messages.success),
        error: typeof messages.error === "function"
            ? (error) => toPromiseMessage(messages.error(error))
            : toPromiseMessage(messages.error),
    }), [manager]);
    const dismiss = useCallback((id) => manager.close(id), [manager]);
    return useMemo(() => ({ toast, undo, promise, dismiss }), [toast, undo, promise, dismiss]);
}
/** Base UI promise states map onto the suite's tones (§19 has no "error"). */
const TYPE_TONE = {
    info: "info",
    success: "success",
    warning: "warning",
    danger: "danger",
    error: "danger",
};
function ToastList({ closeLabel }) {
    const { toasts } = BaseToast.useToastManager();
    return (_jsx(_Fragment, { children: toasts.map((toast) => {
            const tone = toast.type ? TYPE_TONE[toast.type] : undefined;
            return (_jsxs(BaseToast.Root, { toast: toast, swipeDirection: ["down", "right"], className: cn("pointer-events-auto flex w-full items-start gap-2 rounded-lg border border-border bg-surface-raised p-3 shadow-lg", 
                // §06: enter from the bottom (opacity + ≤8px travel); exit opacity-only
                "transition-[opacity,transform] duration-[var(--fdn-dur-base)] ease-[var(--fdn-ease-enter)]", "data-[starting-style]:translate-y-2 data-[starting-style]:opacity-0", "data-[ending-style]:opacity-0", "data-[limited]:hidden"), children: [toast.type === "loading" ? (_jsx(Spinner, { size: 16, label: null, className: "mt-0.5 text-text-muted" })) : (tone && _jsx(Icon, { icon: TONE_ICON[tone], size: 16, className: cn("mt-0.5", TONE_TEXT[tone]) })), _jsxs("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [_jsx(BaseToast.Title, { className: "text-h5 text-text" }), _jsx(BaseToast.Description, { className: "text-body-sm text-text-secondary" }), _jsx(BaseToast.Action, { render: _jsx(Button, { variant: "secondary", size: "xs", className: "mt-1.5 self-start" }) })] }), _jsx(BaseToast.Close, { "aria-label": closeLabel, className: cn("-mr-1 -mt-1 grid size-6 shrink-0 place-items-center rounded-sm text-text-muted", "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)] hover:bg-surface-hover hover:text-text"), children: _jsx(Icon, { icon: X, size: 14 }) })] }, toast.id));
        }) }));
}
/**
 * ToastProvider — mounts the Base UI toast manager plus the suite's viewport:
 * bottom-right corner, max 3 stacked, above every overlay (`fdn-z-toast`).
 * Mount it once, near the root; fire toasts with `useToast()`.
 */
export function ToastProvider({ children, limit = 3, duration = 4000, closeLabel = "Dismiss", }) {
    return (_jsxs(BaseToast.Provider, { limit: limit, timeout: duration, children: [children, _jsx(BaseToast.Portal, { children: _jsx(BaseToast.Viewport, { className: cn("fixed bottom-4 right-4 fdn-z-toast flex w-80 max-w-[calc(100vw-2rem)] flex-col-reverse gap-2"), children: _jsx(ToastList, { closeLabel: closeLabel }) }) })] }));
}
