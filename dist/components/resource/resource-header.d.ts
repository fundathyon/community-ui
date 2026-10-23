import { type HTMLAttributes, type ReactNode } from "react";
export interface ResourceMetaProps extends Omit<HTMLAttributes<HTMLParagraphElement>, "children"> {
    /** Metadata fragments, joined with " · " as running text (§25). */
    items?: ReactNode[];
    /** Separator between fragments. Default a middot. */
    separator?: ReactNode;
}
/**
 * ResourceMeta — the resource's metadata as a single line of running text, the
 * fragments joined by "·" (§25). NOT a key-value table: prose reads at a glance
 * and does not steal height from the content. Used by ResourceHeader and
 * exported for standalone use.
 *
 * Server-component safe.
 */
export declare function ResourceMeta({ items, separator, className, ...props }: ResourceMetaProps): import("react").JSX.Element | null;
export interface ResourceHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    /** Breadcrumb slot, rendered above the title. */
    breadcrumb?: ReactNode;
    /** The resource title (`text-h1`). */
    title: ReactNode;
    /** Status slot beside the title — typically a StatusBadge (§25). */
    status?: ReactNode;
    /** Action cluster on the right — typically ResourceActions (§25). */
    actions?: ReactNode;
    /** Metadata fragments joined as running text under the title (§25). */
    meta?: ReactNode[];
}
/**
 * ResourceHeader — the top of a resource detail (§25): breadcrumb, then a title
 * row with the title, a status badge and the primary actions, then a running-text
 * meta line. The fixed order (breadcrumb → title → status → actions → metadata)
 * is the same across every product so operators never relearn it.
 *
 * Server-component safe.
 */
export declare function ResourceHeader({ breadcrumb, title, status, actions, meta, className, ...props }: ResourceHeaderProps): import("react").JSX.Element;
