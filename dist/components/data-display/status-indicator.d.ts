import type { ReactNode } from "react";
import { type StatusKey } from "../../lib/status";
/** dot + text (dense lists) · icon only + Tooltip (narrow columns). */
export type StatusIndicatorTreatment = "dot" | "icon";
export interface StatusIndicatorProps {
    /** One of the sixteen canonical states (§19). */
    status: StatusKey;
    /** dot + text, or icon-only with a required tooltip (§19). */
    treatment: StatusIndicatorTreatment;
    /** Product copy for the state. Defaults to the canonical English label. */
    label?: ReactNode;
    className?: string;
}
/**
 * StatusIndicator — the two non-badge treatments of the state taxonomy (§19):
 * `dot` (a tonal dot plus text, for dense lists) and `icon` (the state's icon
 * alone, wrapped in a Tooltip, for narrow columns). Tone and icon are the SAME
 * as the badge in every treatment — a state never changes color between them.
 * For a full labelled badge in tables and headers use StatusBadge.
 */
export declare function StatusIndicator({ status, treatment, label, className }: StatusIndicatorProps): import("react").JSX.Element;
