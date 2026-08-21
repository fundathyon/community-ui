import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface DangerZoneProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  /** Section title — copy from the app (e.g. "Zona peligrosa"). Default "Danger zone". */
  title?: ReactNode;
}

/**
 * DangerZone — the destructive-actions block of a resource (§25). It ALWAYS lives
 * at the END of the summary tab, never in a tab of its own that nobody opens. A
 * danger-bordered card holding one or more DangerZoneAction rows.
 *
 * Server-component safe.
 */
export function DangerZone({ title = "Danger zone", className, children, ...props }: DangerZoneProps) {
  return (
    <section className={cn("rounded-xl border border-danger-border bg-surface", className)} {...props}>
      <div className="px-4 pt-4 text-h5 text-danger">{title}</div>
      <div className="flex flex-col divide-y divide-border px-4 pb-2 pt-1">{children}</div>
    </section>
  );
}

export interface DangerZoneActionProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** What the action does — "Revocar esta clave". */
  title: ReactNode;
  /** The CONSEQUENCE, stated plainly (§25) — "Los pipelines… recibirán 401…". */
  description: ReactNode;
  /** The destructive control — a destructive-subtle/destructive Button + ConfirmDialog. */
  action: ReactNode;
}

/**
 * DangerZoneAction — one destructive row: title and its consequence on the left,
 * the confirming control on the right. The description states what breaks, not
 * just what the button does (§25).
 *
 * Server-component safe.
 */
export function DangerZoneAction({ title, description, action, className, ...props }: DangerZoneActionProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4 py-3", className)} {...props}>
      <div className="min-w-0">
        <div className="text-body font-medium text-text">{title}</div>
        <p className="text-caption text-text-muted">{description}</p>
      </div>
      <div className="shrink-0">{action}</div>
    </div>
  );
}
