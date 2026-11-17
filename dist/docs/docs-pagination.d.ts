import type { AnchorHTMLAttributes, HTMLAttributes, ReactElement, ReactNode } from "react";
export interface DocsPaginationLink {
    /** The destination page title. */
    label: ReactNode;
    href?: string;
    /** Router substitution — receives the wired anchor props to spread:
     * `render: (props) => <RouterLink to="…" {...props} />`. */
    render?: (props: AnchorHTMLAttributes<HTMLAnchorElement> & {
        children: ReactNode;
    }) => ReactElement;
}
export interface DocsPaginationProps extends HTMLAttributes<HTMLElement> {
    /** The previous page in reading order. */
    prev?: DocsPaginationLink;
    /** The next page in reading order. */
    next?: DocsPaginationLink;
    /** Overline over the prev card. Overridable (products ship Spanish copy). */
    previousLabel?: string;
    /** Overline over the next card. */
    nextLabel?: string;
    /** Accessible name of the nav landmark. */
    label?: string;
}
/**
 * DocsPagination — prev/next page links at the bottom of a docs page (§26). Two
 * cards spanning the measure: the previous page on the left, the next on the
 * right, each with a direction overline, the page title and a chevron. Renders
 * `<a>` by default; pass `render` per link for a framework router.
 *
 * Server-component safe.
 */
export declare function DocsPagination({ prev, next, previousLabel, nextLabel, label, className, ...props }: DocsPaginationProps): import("react").JSX.Element;
