import { type HTMLAttributes } from "react";
import type { Size } from "../../lib/types";
export interface SecretFieldProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children" | "prefix"> {
    /** The full sensitive value. Copy always writes THIS, never the masked form (§20). */
    value: string;
    /** Matches Input's size scale. Defaults to the density's size. */
    size?: Size;
    /** Uncontrolled initial reveal state. Ignored when `revealed` is provided. */
    defaultRevealed?: boolean;
    /** Controlled reveal state — pair with onRevealChange. */
    revealed?: boolean;
    onRevealChange?: (revealed: boolean) => void;
    /** Hide the eye toggle when the value must always stay masked. */
    hideReveal?: boolean;
    /** Hide the copy button. */
    hideCopy?: boolean;
    /** Characters kept visible at the start / end of the mask. */
    prefix?: number;
    suffix?: number;
    /** Non-interactive, faded. */
    disabled?: boolean;
    revealLabel?: string;
    hideLabel?: string;
    copyLabel?: string;
    copiedLabel?: string;
    /** Extra classes on the outer field wrapper. */
    className?: string;
}
/**
 * SecretField — the field-shaped variant of Secret (§10, §20). Same visual box
 * as Input (border, radius, height per density) so a token / JWT / API key
 * reads as a control the user can copy, not as inline prose. The value is
 * monospace, masked by default (`sk_live_de96••••••••••••j87TzX`), and
 * truncates with ellipsis when the revealed value overflows — long JWTs never
 * grow the container or displace the trailing actions.
 *
 * Composition:
 * ```tsx
 * <FormField label="Access Token (JWT)">
 *   <SecretField value={token} revealLabel="Mostrar" copyLabel="Copiar" />
 * </FormField>
 * ```
 *
 * Prefer Secret (inline span) for values that sit inside prose or a table
 * cell; use SecretField whenever the value would naturally live in a form
 * field slot.
 */
export declare function SecretField({ value, size, defaultRevealed, revealed: revealedProp, onRevealChange, hideReveal, hideCopy, prefix, suffix, disabled, revealLabel, hideLabel, copyLabel, copiedLabel, className, ...props }: SecretFieldProps): import("react").JSX.Element;
