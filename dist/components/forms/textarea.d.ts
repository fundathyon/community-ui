import { type TextareaHTMLAttributes } from "react";
import type { Size } from "../../lib/types";
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    /** Follows the Input horizontal metrics (§04). Defaults to the density's size. */
    size?: Size;
    /**
     * Soft character limit: shows a live "31 / 280" counter bottom-right and turns
     * it (and the field) to danger when over. It does NOT truncate the value — the
     * user keeps control and the form validates on submit (§10).
     */
    maxLength?: number;
    /** Marks invalid when used standalone. Inside a FormField the field state drives this. */
    invalid?: boolean;
    /** Minimum visible rows. */
    rows?: number;
    className?: string;
}
/**
 * Textarea — multi-line text entry, e.g. a revocation reason (§10). Always
 * place it inside a FormField, which owns the label and messages. Read-only
 * stays selectable and copyable.
 *
 * With `maxLength` it renders a live counter ("31 / 280"); the limit is soft —
 * over-limit turns the counter and border to danger instead of eating input.
 */
export declare const Textarea: import("react").ForwardRefExoticComponent<TextareaProps & import("react").RefAttributes<HTMLTextAreaElement>>;
