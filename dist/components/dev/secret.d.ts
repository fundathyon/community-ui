import { type HTMLAttributes } from "react";
export interface SecretProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children" | "prefix"> {
    /** The full secret value. */
    value: string;
    /** Adds an eye toggle (aria-pressed) that reveals the full value. */
    revealable?: boolean;
    /** Characters kept visible at the start / end of the mask. */
    prefix?: number;
    suffix?: number;
    /** Copies the FULL value, masked or not (§20). */
    copy?: boolean;
    /** Badge marker text; empty string hides the badge. */
    label?: string;
    revealLabel?: string;
    copyLabel?: string;
    copiedLabel?: string;
}
/**
 * Secret — a masked sensitive value (§20): a secret is shown complete only
 * ONCE, at creation (see TokenDisplay); everywhere else only prefix + suffix
 * survive — "sk_live_de96••••••••••••j87TzX". The mask travels with a badge
 * marker, the copy button still copies the full value, and it never belongs
 * in logs or URLs.
 */
export declare function Secret({ value, revealable, prefix, suffix, copy, label, revealLabel, copyLabel, copiedLabel, className, ...props }: SecretProps): import("react").JSX.Element;
