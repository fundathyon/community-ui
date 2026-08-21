/**
 * Typographic helpers for email bodies — the only three text levels emails
 * use (§27): heading 20/28·600, body 14/22, small 12/18. Inline styles only.
 */
import type { ReactNode } from "react";
type EmailAlign = "left" | "center" | "right";
export interface EmailTextProps {
    /** `body` 14/22 (default) or `small` 12/18. */
    size?: "body" | "small";
    /** Hex override; defaults to the primary text color. */
    color?: string;
    align?: EmailAlign;
    children?: ReactNode;
}
/**
 * Body paragraph for email content. Use for every sentence of copy; never
 * emit a bare `<p>` (clients strip un-styled defaults). One idea per paragraph.
 */
export declare function EmailText({ size, color, align, children, }: EmailTextProps): import("react").JSX.Element;
export interface EmailHeadingProps {
    align?: EmailAlign;
    children?: ReactNode;
}
/**
 * The single heading of an email — one per message, right under the header.
 * 20/28 at weight 600 (§03 forbids 700 below 15px; 600 everywhere here).
 */
export declare function EmailHeading({ align, children }: EmailHeadingProps): import("react").JSX.Element;
export interface EmailMutedProps {
    align?: EmailAlign;
    children?: ReactNode;
}
/**
 * Muted small text — security notes, expiry hints, request metadata.
 * 12/18 in `--fdn-text-muted`; still AA on the surface.
 */
export declare function EmailMuted({ align, children }: EmailMutedProps): import("react").JSX.Element;
export {};
