import { type LucideIcon } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";
import type { Tone } from "../../lib/types";
/** Fixed icon per tone across the whole suite (§07) — never swapped locally. */
export declare const TONE_ICON: Record<Tone, LucideIcon>;
export declare const TONE_TEXT: Record<Tone, string>;
export declare const TONE_WASH: Record<Tone, string>;
interface AlertBaseProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    /** One line. What is true right now. */
    title: ReactNode;
    /** Body — two lines maximum (§11). */
    children?: ReactNode;
    /** A single action (§11). Pass a small Button or Link. */
    action?: ReactNode;
    /** Override the tone's fixed icon — rarely justified (§07). */
    icon?: LucideIcon;
    /** Accessible name of the dismiss button. Overridable product copy. */
    dismissLabel?: string;
}
export type AlertProps = AlertBaseProps & ({
    tone?: Exclude<Tone, "danger">;
    /** Renders a dismiss button. Only non-critical alerts are dismissable —
     * a danger Alert stays until the user resolves the cause (§11). */
    onDismiss?: () => void;
} | {
    tone: "danger";
    onDismiss?: never;
});
/**
 * Alert — persistent and contextual (§11): it lives inside the page it refers
 * to and describes a state that stays true even when not looked at. Feedback
 * sits as close to its cause as possible — session-wide messages go in Banner,
 * confirmations of what the user just did go in Toast (§17).
 *
 * `danger` announces with `role="alert"` and cannot be dismissed; other tones
 * are polite (`role="status"`).
 */
export declare function Alert({ tone, title, children, action, icon, onDismiss, dismissLabel, className, ...props }: AlertProps): import("react").JSX.Element;
export {};
