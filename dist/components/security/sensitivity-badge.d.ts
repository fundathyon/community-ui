import type { HTMLAttributes, ReactNode } from "react";
import type { ToneOrNeutral } from "../../lib/types";
import type { SensitivityLevel } from "../data-table/types";
export type { SensitivityLevel };
/**
 * Runtime guard for the four §20 levels — the one place that knows the set,
 * so a caller fed unvalidated data (e.g. a table cell) can fall back safely
 * instead of guessing.
 */
export declare function isSensitivityLevel(value: unknown): value is SensitivityLevel;
/**
 * Tone of a sensitivity level by its exposure (§20): public is neutral,
 * private (org members only) is info, sensitive (explicit permission,
 * audit-logged) is warning, secret (masked, never logged or in a URL) is
 * danger. Fixed per level — a system token, not a per-screen decision.
 */
export declare function sensitivityTone(level: SensitivityLevel): ToneOrNeutral;
export interface SensitivityBadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
    /** One of the four §20 sensitivity levels. */
    level: SensitivityLevel;
    /** Override the auto tone (from `sensitivityTone`). */
    tone?: ToneOrNeutral;
    /** Show the level's fixed icon — color never carries the meaning alone
     * (§M-01). Off by default so dense contexts (table cells) stay compact. */
    showIcon?: boolean;
    /** Override the displayed text (defaults to the English level label). */
    children?: ReactNode;
}
/**
 * SensitivityBadge — the §20 sensitivity-level chip: público (neutral),
 * privado (info, org members only), sensible (warning, explicit permission +
 * audit-logged) and secreto (danger, masked by default, never logged or in a
 * URL). The four levels are "un token del sistema, no una decisión por
 * pantalla" — use this anywhere a resource's sensitivity is surfaced (a
 * resource detail header, a form), not only inside DataTable's `sensitivity`
 * cell, which composes this same badge. Use `sensitivityTone(level)` alone
 * when you need the tone without the badge.
 */
export declare function SensitivityBadge({ level, tone, showIcon, children, className, ...props }: SensitivityBadgeProps): import("react").JSX.Element;
