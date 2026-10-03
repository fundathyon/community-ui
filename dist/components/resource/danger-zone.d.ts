import type { HTMLAttributes, ReactNode } from "react";
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
export declare function DangerZone({ title, className, children, ...props }: DangerZoneProps): import("react").JSX.Element;
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
export declare function DangerZoneAction({ title, description, action, className, ...props }: DangerZoneActionProps): import("react").JSX.Element;
