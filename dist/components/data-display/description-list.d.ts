import type { HTMLAttributes, ReactNode } from "react";
export interface DescriptionListEntry {
    label: ReactNode;
    value: ReactNode;
    /** Render the value in mono for verifiable data (§03). */
    mono?: boolean;
}
export interface DescriptionItemProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    label: ReactNode;
    children: ReactNode;
    mono?: boolean;
}
/**
 * DescriptionItem — one `<dt>`/`<dd>` row inside a DescriptionList. Use `mono`
 * for literal, copy-and-compare values (digests, IDs, paths).
 *
 * Server-component safe.
 */
export declare function DescriptionItem({ label, mono, className, children, ...props }: DescriptionItemProps): import("react").JSX.Element;
export interface DescriptionListProps extends HTMLAttributes<HTMLDListElement> {
    /** Data-driven rows. Alternatively pass DescriptionItem children. */
    items?: DescriptionListEntry[];
    /** 1 (default) or 2 responsive columns. */
    columns?: 1 | 2;
}
/**
 * DescriptionList — a `<dl>` grid of term/value rows for the stable facts of a
 * resource. Feed it `items` or compose DescriptionItem children. For the
 * running-text metadata under a resource title use ResourceMeta instead (§25):
 * a key-value table there would steal height from the content.
 *
 * Server-component safe.
 */
export declare function DescriptionList({ items, columns, className, children, ...props }: DescriptionListProps): import("react").JSX.Element;
