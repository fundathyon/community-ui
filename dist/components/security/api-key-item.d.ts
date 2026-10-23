import type { Locale } from "date-fns";
import type { HTMLAttributes, ReactNode } from "react";
import { type DateInput } from "../../lib/format";
import { type StatusKey } from "../../lib/status";
export interface ApiKeyItemProps extends HTMLAttributes<HTMLDivElement> {
    /** Key name — "ci-deploy". */
    name: ReactNode;
    /**
     * The key value, rendered through the dev Secret (masked to prefix + suffix).
     * Keys are shown in full only once, at creation (§20), so `revealable` is off
     * by default here.
     */
    maskedValue: string;
    /** Let the row reveal the value. Off by default (§20). */
    revealable?: boolean;
    createdAt?: DateInput;
    lastUsed?: DateInput;
    /** When set and within 7 days, an `expiring` StatusBadge is computed WITH the
     * deadline (§19). Past → `expired`. */
    expiresAt?: DateInput;
    /** Force a specific state; otherwise it's derived from `expiresAt`. */
    status?: StatusKey;
    scopes?: string[];
    locale?: Locale;
    /** Rotate / Revoke controls — the app passes Buttons or a menu (§25). */
    actions?: ReactNode;
    createdLabel?: string;
    lastUsedLabel?: string;
    expiresLabel?: string;
    neverUsedLabel?: string;
}
/**
 * ApiKeyItem — one API key row (§20, §25): name + masked value, created / last
 * used / expiry metadata as running text, scope chips, and an actions slot. The
 * expiry state is computed — a key expiring within 7 days shows an `expiring`
 * badge with the concrete deadline (§19); an expired key shows `expired`.
 *
 * A key in a terminal state (revoked/expired) should sit at 0.6 opacity in the
 * list — pass that via `className` on the row when you know its state.
 */
export declare function ApiKeyItem({ name, maskedValue, revealable, createdAt, lastUsed, expiresAt, status, scopes, locale, actions, createdLabel, lastUsedLabel, expiresLabel, neverUsedLabel, className, ...props }: ApiKeyItemProps): import("react").JSX.Element;
export interface ApiKeyListProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
/** ApiKeyList — stacks ApiKeyItems with divider rules between them. */
export declare function ApiKeyList({ children, className, ...props }: ApiKeyListProps): import("react").JSX.Element;
