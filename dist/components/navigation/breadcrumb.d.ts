import { type AnchorHTMLAttributes, type HTMLAttributes, type ReactElement, type ReactNode } from "react";
export interface BreadcrumbItem {
    label: string;
    href?: string;
    /** Router substitution — receives the wired props to spread on the link:
     * `render: (props) => <RouterLink to="…" {...props} />`. */
    render?: (props: AnchorHTMLAttributes<HTMLAnchorElement> & {
        children: ReactNode;
    }) => ReactElement;
}
export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
    /** The trail, root first. The LAST item is the current page. */
    items: BreadcrumbItem[];
    /** Accessible name of the landmark. Overridable (products ship Spanish copy). */
    label?: string;
}
/**
 * Breadcrumb — the trail of nested views in the shell (§12). The last item is
 * the current page (`aria-current="page"`, plain text); the rest are links.
 * Past 4 items the middle collapses into "…" carrying the full hidden path in
 * its `title`.
 *
 * Server-component safe.
 */
export declare function Breadcrumb({ items, label, className, ...props }: BreadcrumbProps): import("react").JSX.Element;
