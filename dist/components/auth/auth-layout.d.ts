import type { HTMLAttributes, ReactNode } from "react";
export interface AuthLayoutProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    /**
     * Product brand mark shown above the card — a logo, a wordmark, any node.
     * Always the PRODUCT's mark, never Foundathyon's; the house signs in the
     * footer (§29).
     */
    logo?: ReactNode;
    /** Card title — e.g. "Sign in to {product}". */
    title?: ReactNode;
    /** One line under the title: what you're about to manage, not what the
     * product is (§16, §29). */
    subtitle?: ReactNode;
    /** The card contents — usually one of the auth forms. */
    children: ReactNode;
    /** Muted links BELOW the card ("Back to sign in", "Create account"). */
    footer?: ReactNode;
}
/**
 * AuthLayout — the single centered layout for login, registro, recuperación
 * and verificación (§16): a 320px (`w-80`) card on the page background, the
 * product brand on top, an optional title + subtitle, and a muted footer below
 * the card. Same skeleton for every auth screen — only the card content
 * changes, so the five products feel like the same house (§29).
 *
 * It RESPECTS the user's theme — v1's forced-dark login was a bug (§16). The
 * tokens flip themselves, so this renders light when the system asks for light.
 * Never hard-code a dark surface here.
 *
 * Server-component safe.
 */
export declare function AuthLayout({ logo, title, subtitle, children, footer, className, ...props }: AuthLayoutProps): import("react").JSX.Element;
