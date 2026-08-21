import { type ReactNode } from "react";
import type { Tone } from "../../lib/types";
export interface ToastOptions {
    /** One line: what just happened ("Enlace revocado"). */
    title: ReactNode;
    description?: ReactNode;
    /** Optional semantic tone — adds the tone's fixed icon (§07). */
    tone?: Tone;
    /** A single action rendered as a small secondary button ("Deshacer").
     * Acting on it dismisses the toast. */
    action?: {
        label: string;
        onClick: () => void;
    };
    /** Auto-dismiss delay in ms; `0` keeps the toast until closed. @default 4000 */
    duration?: number;
}
export interface UndoToastOptions {
    title: ReactNode;
    description?: ReactNode;
    /** Reverts the action the toast confirms. */
    onUndo: () => void;
    /** Action label — overridable product copy ("Deshacer"). @default "Undo" */
    undoLabel?: string;
    /** §17: reversible destructive actions get a 10s undo window. @default 10000 */
    duration?: number;
}
export type ToastPromiseMessage = string | Omit<ToastOptions, "action">;
export interface ToastPromiseMessages<Value> {
    loading: ToastPromiseMessage;
    success: ToastPromiseMessage | ((value: Value) => ToastPromiseMessage);
    error: ToastPromiseMessage | ((error: unknown) => ToastPromiseMessage);
}
export interface UseToastReturn {
    /** Show a toast. Returns its id (reuse the id to update in place). */
    toast: (options: ToastOptions) => string;
    /**
     * §17 reversible destructive pattern: execute the action immediately, then
     * confirm with a 10s undo window ("Enlace revocado" + "Deshacer").
     */
    undo: (options: UndoToastOptions) => string;
    /** Track a promise: loading → success/error toast, tones applied per state. */
    promise: <Value>(promise: Promise<Value>, messages: ToastPromiseMessages<Value>) => Promise<Value>;
    /** Close one toast by id, or every toast when omitted. */
    dismiss: (id?: string) => void;
}
/**
 * useToast — imperative toasts. Must render inside `ToastProvider`.
 *
 * A toast confirms what the user JUST DID and leaves on its own; if the result
 * is already visible on screen (the row appeared in the table), no toast (§17).
 * NEVER use it for errors that require action — those go in an Alert (§11).
 */
export declare function useToast(): UseToastReturn;
export interface ToastProviderProps {
    children: ReactNode;
    /** Visible toasts before the oldest are hidden (§11: max 3 stacked). @default 3 */
    limit?: number;
    /** Default auto-dismiss delay in ms for every toast. @default 4000 */
    duration?: number;
    /** Accessible name of each toast's close button. Overridable product copy. */
    closeLabel?: string;
}
/**
 * ToastProvider — mounts the Base UI toast manager plus the suite's viewport:
 * bottom-right corner, max 3 stacked, above every overlay (`fdn-z-toast`).
 * Mount it once, near the root; fire toasts with `useToast()`.
 */
export declare function ToastProvider({ children, limit, duration, closeLabel, }: ToastProviderProps): import("react").JSX.Element;
