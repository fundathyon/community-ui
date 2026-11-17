import type { LucideIcon } from "lucide-react";
import type { HTMLAttributes } from "react";
import type { ToneOrNeutral } from "../../lib/types";
export type BadgeVariant = "tonal" | "outline" | "solid" | "counter";
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    /** tonal (live state) · outline (terminal state, no emphasis) · solid
     * (only where the DS allows solid fills) · counter (numeric). */
    variant?: BadgeVariant;
    tone?: ToneOrNeutral;
    /** Status dot before the label. */
    dot?: boolean;
    /** Optional icon — REQUIRED when the state is critical: color never carries
     * the meaning alone (§M-01). */
    icon?: LucideIcon;
    /** Dashed border — reserved for the `unknown` state (§19). */
    dashed?: boolean;
}
/**
 * Badge — a state the SYSTEM decides. Not clickable: if it were, it would be a
 * Tag or a filter (§09). Unifies the v1 `.pill` + `.statusBadge`.
 *
 * For the sixteen canonical resource states use StatusBadge, which fixes
 * tone/icon/treatment per state (§19).
 */
export declare function Badge({ variant, tone, dot, icon, dashed, className, children, ...props }: BadgeProps): import("react").JSX.Element;
