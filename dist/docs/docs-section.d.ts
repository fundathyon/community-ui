import type { HTMLAttributes, ReactNode } from "react";
export interface DocsSectionProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    /** Anchor id — the section's `#hash` target and copy-link destination. */
    id: string;
    /** Section heading text. */
    heading: ReactNode;
    /** Heading level: 2 for a top section, 3 for a sub-section. Default 2. */
    level?: 2 | 3;
    /** Accessible name of the copy-link button. Overridable (Spanish copy). */
    copyLinkLabel?: string;
    /** Announced/tooltip label after copying. Overridable. */
    copiedLabel?: string;
    children?: ReactNode;
}
/**
 * DocsSection — an anchored content section (§26). Renders an `h2`/`h3` with a
 * stable `id`, and a copy-link affordance that appears on hover/focus and copies
 * the section's absolute `#anchor` URL. Section spacing follows the reading
 * rhythm; headings share the anchor offset so they clear the sticky header.
 */
export declare function DocsSection({ id, heading, level, copyLinkLabel, copiedLabel, className, children, ...props }: DocsSectionProps): import("react").JSX.Element;
