import type { ReactElement, ReactNode } from "react";
export type TooltipSide = "top" | "right" | "bottom" | "left";
export interface TooltipProps {
    /** Text only, one line, no actions or links inside (§09). If the user NEEDS
     * it to complete the task, it must be visible text, not a tooltip (§17). */
    content: ReactNode;
    /** The trigger element (button, icon button, truncated cell…). */
    children: ReactElement;
    side?: TooltipSide;
    /** Hover open delay in ms; keyboard focus opens immediately (§09). */
    delay?: number;
    disabled?: boolean;
    className?: string;
}
/**
 * Tooltip — names icon-only controls and adds dispensable detail. Appears
 * after 400ms of hover and immediately on keyboard focus. Popover is the
 * component that admits interactive content; Tooltip never does.
 */
export declare function Tooltip({ content, children, side, delay, disabled, className }: TooltipProps): import("react").JSX.Element;
/** Optional group provider: once one tooltip opened, adjacent ones open instantly. */
export declare const TooltipProvider: import("react").FC<import("@base-ui/react").TooltipProviderProps>;
