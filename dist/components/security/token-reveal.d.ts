import { type ReactNode } from "react";
export interface TokenRevealProps {
    /** The full token — shown complete this one time (§20). */
    value: string;
    /** Warning line inside the token box. Pass `null` to omit. */
    warning?: ReactNode;
    /** Extra note under the token (e.g. "Expires in 90 days"). */
    expiryNote?: ReactNode;
    /** Label of the "I've stored it" gate checkbox. */
    confirmLabel?: ReactNode;
    /** Fired with the checkbox state so the app can enable/disable its Continue. */
    onConfirmed?: (confirmed: boolean) => void;
    copyLabel?: string;
    copiedLabel?: string;
}
/**
 * TokenReveal — the one-time reveal of a freshly created token (§20), composed
 * from the dev TokenDisplay plus an "I've stored it safely" checkbox that gates
 * the app's Continue. After this screen the token is only ever shown masked
 * (render the stored value with Secret from then on).
 */
export declare function TokenReveal({ value, warning, expiryNote, confirmLabel, onConfirmed, copyLabel, copiedLabel, }: TokenRevealProps): import("react").JSX.Element;
