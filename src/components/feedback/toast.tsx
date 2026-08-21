"use client";

import { Toast as BaseToast } from "@base-ui/react/toast";
import { X } from "lucide-react";
import { useCallback, useMemo, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import type { Tone } from "../../lib/types";
import { Button } from "../actions/button";
import { Icon } from "../typography/icon";
import { TONE_ICON, TONE_TEXT } from "./alert";
import { Spinner } from "./spinner";

export interface ToastOptions {
  /** One line: what just happened ("Enlace revocado"). */
  title: ReactNode;
  description?: ReactNode;
  /** Optional semantic tone — adds the tone's fixed icon (§07). */
  tone?: Tone;
  /** A single action rendered as a small secondary button ("Deshacer").
   * Acting on it dismisses the toast. */
  action?: { label: string; onClick: () => void };
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

function toManagerOptions(options: Omit<ToastOptions, "action">) {
  return {
    title: options.title,
    description: options.description,
    type: options.tone,
    timeout: options.duration,
  };
}

function toPromiseMessage(message: ToastPromiseMessage) {
  return typeof message === "string" ? message : toManagerOptions(message);
}

/**
 * useToast — imperative toasts. Must render inside `ToastProvider`.
 *
 * A toast confirms what the user JUST DID and leaves on its own; if the result
 * is already visible on screen (the row appeared in the table), no toast (§17).
 * NEVER use it for errors that require action — those go in an Alert (§11).
 */
export function useToast(): UseToastReturn {
  const manager = BaseToast.useToastManager();

  const toast = useCallback(
    (options: ToastOptions) => {
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
    },
    [manager],
  );

  const undo = useCallback(
    ({ title, description, onUndo, undoLabel = "Undo", duration = 10_000 }: UndoToastOptions) =>
      toast({ title, description, action: { label: undoLabel, onClick: onUndo }, duration }),
    [toast],
  );

  const promise = useCallback(
    <Value,>(value: Promise<Value>, messages: ToastPromiseMessages<Value>) =>
      manager.promise<Value>(value, {
        loading: toPromiseMessage(messages.loading),
        success:
          typeof messages.success === "function"
            ? (result: Value) => toPromiseMessage((messages.success as (v: Value) => ToastPromiseMessage)(result))
            : toPromiseMessage(messages.success),
        error:
          typeof messages.error === "function"
            ? (error: unknown) => toPromiseMessage((messages.error as (e: unknown) => ToastPromiseMessage)(error))
            : toPromiseMessage(messages.error),
      }),
    [manager],
  );

  const dismiss = useCallback((id?: string) => manager.close(id), [manager]);

  return useMemo(() => ({ toast, undo, promise, dismiss }), [toast, undo, promise, dismiss]);
}

/** Base UI promise states map onto the suite's tones (§19 has no "error"). */
const TYPE_TONE: Record<string, Tone> = {
  info: "info",
  success: "success",
  warning: "warning",
  danger: "danger",
  error: "danger",
};

function ToastList({ closeLabel }: { closeLabel: string }) {
  const { toasts } = BaseToast.useToastManager();
  return (
    <>
      {toasts.map((toast) => {
        const tone = toast.type ? TYPE_TONE[toast.type] : undefined;
        return (
          <BaseToast.Root
            key={toast.id}
            toast={toast}
            swipeDirection={["down", "right"]}
            className={cn(
              "pointer-events-auto flex w-full items-start gap-2 rounded-lg border border-border bg-surface-raised p-3 shadow-lg",
              // §06: enter from the bottom (opacity + ≤8px travel); exit opacity-only
              "transition-[opacity,transform] duration-[var(--fdn-dur-base)] ease-[var(--fdn-ease-enter)]",
              "data-[starting-style]:translate-y-2 data-[starting-style]:opacity-0",
              "data-[ending-style]:opacity-0",
              "data-[limited]:hidden",
            )}
          >
            {toast.type === "loading" ? (
              <Spinner size={16} label={null} className="mt-0.5 text-text-muted" />
            ) : (
              tone && <Icon icon={TONE_ICON[tone]} size={16} className={cn("mt-0.5", TONE_TEXT[tone])} />
            )}
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <BaseToast.Title className="text-h5 text-text" />
              <BaseToast.Description className="text-body-sm text-text-secondary" />
              <BaseToast.Action
                render={<Button variant="secondary" size="xs" className="mt-1.5 self-start" />}
              />
            </div>
            <BaseToast.Close
              aria-label={closeLabel}
              className={cn(
                "-mr-1 -mt-1 grid size-6 shrink-0 place-items-center rounded-sm text-text-muted",
                "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)] hover:bg-surface-hover hover:text-text",
              )}
            >
              <Icon icon={X} size={14} />
            </BaseToast.Close>
          </BaseToast.Root>
        );
      })}
    </>
  );
}

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
export function ToastProvider({
  children,
  limit = 3,
  duration = 4000,
  closeLabel = "Dismiss",
}: ToastProviderProps) {
  return (
    <BaseToast.Provider limit={limit} timeout={duration}>
      {children}
      <BaseToast.Portal>
        <BaseToast.Viewport
          className={cn(
            "fixed bottom-4 right-4 fdn-z-toast flex w-80 max-w-[calc(100vw-2rem)] flex-col-reverse gap-2",
          )}
        >
          <ToastList closeLabel={closeLabel} />
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </BaseToast.Provider>
  );
}
