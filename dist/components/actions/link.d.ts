import { type AnchorHTMLAttributes, type ReactElement } from "react";
export type LinkVariant = "accent" | "neutral";
export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    /**
     * `accent` — in prose, accent color, underline on hover.
     * `neutral` — inside data (tables, metadata), text color with a permanent
     * subtle underline so accent color doesn't create noise (§09).
     */
    variant?: LinkVariant;
    /** Opens in a new tab: `target="_blank" rel="noreferrer"` + 12px external icon. */
    external?: boolean;
    /**
     * Replace the rendered `<a>` with a framework router link. The element you
     * pass receives the computed `className`, the children and every anchor
     * attribute, so it must spread its props onto an anchor:
     * `<Link render={<NextLink href="/docs" />}>Docs</Link>`.
     */
    render?: ReactElement<AnchorHTMLAttributes<HTMLAnchorElement>>;
}
/**
 * Link — navigates to another route or document. If it executes an action it
 * is a Button, even if it looks like a link (§09). Renders an `<a>` by default;
 * pass `render` to substitute a framework router link.
 *
 * Two types only: `accent` in prose, underlined `neutral` inside data. Color
 * alone never indicates a link — the underline appears on hover (§09).
 */
export declare const Link: import("react").ForwardRefExoticComponent<LinkProps & import("react").RefAttributes<HTMLAnchorElement>>;
