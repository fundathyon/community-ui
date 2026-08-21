import { type LucideIcon } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";
import type { Tone } from "../../lib/types";
export interface BannerProps extends HTMLAttributes<HTMLDivElement> {
    tone?: Tone;
    /** One line of copy — e.g. "Tu plan Community caduca en 5 días." */
    children: ReactNode;
    /** A single inline action (small Button or Link). */
    action?: ReactNode;
    /** Renders a dismiss button. Omit when the user must resolve the cause. */
    onDismiss?: () => void;
    /** Override the tone's fixed icon — rarely justified (§07). */
    icon?: LucideIcon;
    /** Accessible name of the dismiss button. Overridable product copy. */
    dismissLabel?: string;
}
/**
 * Banner — for what affects the WHOLE account or session (§11): plan expiry,
 * global degradation, maintenance. It sticks directly under the header,
 * full-width, no rounding — and there is ONLY ONE at a time. Anything scoped
 * to a page belongs in an Alert; confirmations belong in a Toast (§17).
 */
export declare function Banner({ tone, children, action, onDismiss, icon, dismissLabel, className, ...props }: BannerProps): import("react").JSX.Element;
