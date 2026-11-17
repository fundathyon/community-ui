import type { HTMLAttributes, ReactNode } from "react";
import { type StatusKey } from "../../lib/status";
export interface StatusBadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
    /** One of the sixteen canonical states (§19). A product never invents one locally. */
    status: StatusKey;
    /** Product copy for the state. Defaults to the canonical English label. */
    children?: ReactNode;
}
/**
 * StatusBadge — the badge treatment of the state taxonomy (§19). Tone, icon
 * and treatment are FIXED per state across the whole suite; only the copy is
 * yours. Terminal states render as gray outline (place them in rows at 0.6
 * opacity); `unknown` is the only dashed badge. Never `line-through` (§M-01).
 *
 * For dense lists use StatusIndicator (dot + text); for narrow columns use it
 * in icon-only mode with a tooltip. Same color in every treatment.
 */
export declare function StatusBadge({ status, children, className, ...props }: StatusBadgeProps): import("react").JSX.Element;
