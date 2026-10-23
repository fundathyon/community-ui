import { type HTMLAttributes, type ReactNode } from "react";
export interface TopbarProps extends HTMLAttributes<HTMLElement> {
    /** Product/brand zone on the left. */
    leading?: ReactNode;
    /** Center zone — typically the search trigger ("Buscar ⌘K"). */
    center?: ReactNode;
    /** Actions and user on the right (UserMenu, AppSwitcher). */
    trailing?: ReactNode;
    /**
     * Shadow under the bar. Pass a boolean when the app owns a custom scroll
     * container; when omitted the Topbar watches window scroll itself.
     */
    elevated?: boolean;
    /** Stick to the top of the viewport (default). */
    sticky?: boolean;
}
/**
 * Topbar — the 48px shell header, identical across the suite (§12). Sticky,
 * with a hairline border; it gains a small shadow once the page scrolls so
 * content visibly slides beneath it.
 */
export declare function Topbar({ leading, center, trailing, elevated, sticky, className, children, ...props }: TopbarProps): import("react").JSX.Element;
