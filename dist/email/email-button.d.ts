/**
 * Bulletproof CTA — a table-wrapped `<a>` with padded cell and solid
 * background, never a `<button>` (§27). Accent comes from the theme context.
 */
import { type ReactNode } from "react";
export interface EmailButtonProps {
    /** Absolute destination URL. */
    href: string;
    /** `primary` = accent fill (the one CTA); `secondary` = accent border + text. */
    variant?: "primary" | "secondary";
    align?: "left" | "center" | "right";
    children?: ReactNode;
}
/**
 * The call to action of an email. One clear primary CTA per message — if a
 * second action exists it is `secondary` (or a plain link). Label follows
 * §17 voice: verb + object ("Reset password"), never "OK". The 22px line in
 * an 11px-padded cell yields a 44px touch target.
 */
export declare function EmailButton({ href, variant, align, children, }: EmailButtonProps): import("react").JSX.Element;
