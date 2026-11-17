import { type HTMLAttributes, type ReactNode } from "react";
export interface TokenDisplayProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    /** The full token — visible here and never again (§20). */
    value: string;
    /** Warning line under the token. Pass `null` to omit. */
    warning?: ReactNode;
    copyLabel?: string;
    copiedLabel?: string;
}
/**
 * TokenDisplay — the ONE time a secret is shown complete: right after creation
 * (§20). Warning treatment, the full token in mono, and a prominent built-in
 * copy button. After this screen only prefix + suffix survive — render the
 * stored value with Secret from then on.
 */
export declare function TokenDisplay({ value, warning, copyLabel, copiedLabel, className, ...props }: TokenDisplayProps): import("react").JSX.Element;
