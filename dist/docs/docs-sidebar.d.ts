import type { AnchorHTMLAttributes, HTMLAttributes, ReactElement, ReactNode } from "react";
export interface DocsSidebarProps extends HTMLAttributes<HTMLElement> {
    /** Accessible name of the nav landmark. Overridable (Spanish copy). */
    label?: string;
}
/**
 * DocsSidebar — the docs navigation tree (§26). A scrollable `nav` of
 * `DocsSidebarSection`s, `DocsSidebarGroup`s and `DocsSidebarItem`s. It is
 * docs-specific (a link tree, not the app shell's icon rail) but reuses the
 * shell's active treatment: accent text + a 2px left bar (§12).
 */
export declare function DocsSidebar({ label, className, children, ...props }: DocsSidebarProps): import("react").JSX.Element;
export interface DocsSidebarSectionProps extends HTMLAttributes<HTMLDivElement> {
    /** Overline group label ("Getting started", "API reference"). */
    label?: ReactNode;
}
/** A titled, always-open group of sidebar items. For a foldable group use
 * `DocsSidebarGroup`. */
export declare function DocsSidebarSection({ label, className, children, ...props }: DocsSidebarSectionProps): import("react").JSX.Element;
export interface DocsSidebarItemProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
    /** The link text. */
    label: ReactNode;
    href?: string;
    /** Current page: accent text + 2px left bar + `aria-current="page"` (§12). */
    active?: boolean;
    /** Nesting level (0–2) — controls indentation. */
    depth?: 0 | 1 | 2;
    /** Router substitution — spread the wired props onto the framework link:
     * `render={(props) => <RouterLink to="…" {...props} />}`. */
    render?: (props: AnchorHTMLAttributes<HTMLAnchorElement> & {
        children: ReactNode;
    }) => ReactElement;
}
/**
 * DocsSidebarItem — one destination in the docs tree (§26/§12). Active state is
 * accent text with a 2px left bar and `aria-current="page"`. Renders `<a>` by
 * default; pass `render` for a framework router link.
 */
export declare function DocsSidebarItem({ label, href, active, depth, render, className, ...props }: DocsSidebarItemProps): import("react").JSX.Element;
export interface DocsSidebarGroupProps extends HTMLAttributes<HTMLDivElement> {
    /** Group trigger label. */
    label: ReactNode;
    /** Open on first render. */
    defaultOpen?: boolean;
}
/**
 * DocsSidebarGroup — a collapsible group of items with a chevron trigger (§26).
 * Built on Base UI Collapsible so the section folds away; put `DocsSidebarItem`s
 * inside. Use `DocsSidebarSection` when the group should always stay open.
 */
export declare function DocsSidebarGroup({ label, defaultOpen, className, children, ...props }: DocsSidebarGroupProps): import("react").JSX.Element;
