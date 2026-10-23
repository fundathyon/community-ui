import { type HTMLAttributes } from "react";
export interface TocItem {
    /** Target heading id (matches a `DocsSection` id). */
    id: string;
    label: string;
    /** 2 for a section, 3 for a sub-section — controls indentation. */
    depth: 2 | 3;
}
export interface TableOfContentsProps extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
    items: TocItem[];
    /** Controlled active id — highlights that entry. Overrides scroll-spy. */
    activeId?: string;
    /** When true, observe the sections and highlight the current one on scroll.
     * "use client" only — pass `activeId` instead for controlled highlighting. */
    followScroll?: boolean;
    /** Heading of the rail. Overridable (products ship Spanish "En esta página"). */
    label?: string;
}
/**
 * TableOfContents — the right-rail "On this page" index (§26). Anchor links to
 * the page's `DocsSection`s; the active entry gets accent text and a left rule.
 *
 * Highlight it either controlled (`activeId`) or with the built-in scroll-spy
 * (`followScroll`), which tracks the topmost visible section via
 * IntersectionObserver and cleans the observer up on unmount. Hidden below `xl`
 * by the layout.
 */
export declare function TableOfContents({ items, activeId, followScroll, label, className, ...props }: TableOfContentsProps): import("react").JSX.Element;
