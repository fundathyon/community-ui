import type { HTMLAttributes, ReactNode } from "react";
export interface DocsLayoutProps extends HTMLAttributes<HTMLDivElement> {
    /** Left navigation — a `DocsSidebar`. On mobile it moves into a Drawer. */
    sidebar?: ReactNode;
    /** Right rail — a `TableOfContents`. Hidden below `xl`. */
    toc?: ReactNode;
    /** Sticky top bar — a `DocsHeader`. Spans the full width above everything. */
    header?: ReactNode;
}
export interface DocsSidebarTriggerProps {
    /** Accessible name of the mobile menu button. Overridable (Spanish copy). */
    label?: string;
    className?: string;
}
/**
 * DocsSidebarTrigger — the mobile hamburger that opens the sidebar Drawer.
 * Place it in `DocsHeader`'s `menu` slot; `DocsLayout` provides the Drawer it
 * controls, so it only works inside a `DocsLayout` that has a `sidebar` (much
 * like `SidebarTrigger` needs `SidebarProvider`). Shown below `lg`.
 */
export declare function DocsSidebarTrigger({ label, className }: DocsSidebarTriggerProps): import("react").JSX.Element;
/**
 * DocsLayout — the three-column documentation frame (§26): a fixed 240px sidebar
 * on the left (sticky, its own scroll), the reading column in the center
 * (min-w-0, capped at the 72ch prose measure by `DocsPage`), and a 200px table
 * of contents on the right (sticky, hidden below `xl`). The sticky `header`
 * spans the full width above all three.
 *
 * Below `lg` the sidebar collapses into a Drawer (reusing the overlays Drawer),
 * opened by a `DocsSidebarTrigger` in the header. Server-component safe — the
 * interactive Drawer parts come from the overlays domain.
 */
export declare function DocsLayout({ sidebar, toc, header, className, children, ...props }: DocsLayoutProps): import("react").JSX.Element;
