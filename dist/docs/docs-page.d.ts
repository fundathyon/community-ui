import type { HTMLAttributes, ReactNode } from "react";
/**
 * The reading-density prose recipe (§26). Sets the 72ch measure, 1.7 line-height
 * and 14px body, plus sensible descendant styles so raw MDX prose (paragraphs,
 * lists, links, inline emphasis) reads correctly without a typography plugin.
 */
export declare const DOCS_PROSE_CLASS: string;
export interface DocsProseProps extends HTMLAttributes<HTMLDivElement> {
}
/**
 * DocsProse — the reading-density wrapper (§26): 72ch measure, 1.7 line-height,
 * 14px body. Wrap any long-form documentation content in it (MDX output, a
 * hand-written article). For a full page with title + pagination use DocsPage,
 * which already applies these styles. Server-component safe.
 */
export declare function DocsProse({ className, ...props }: DocsProseProps): import("react").JSX.Element;
export interface DocsPageProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    /** Page title — rendered as the single `h1` of the document. */
    title?: ReactNode;
    /** Lead paragraph under the title: the one-line summary of the page. */
    description?: ReactNode;
    /** Prev/next navigation, rendered after the content — pass `<DocsPagination>`. */
    pagination?: ReactNode;
}
/**
 * DocsPage — the content column of a docs route (§26). Applies the reading-density
 * prose recipe, renders the `h1` title and lead description, the body, and a
 * pagination slot at the bottom. Drop it inside `DocsLayout` as the `children`.
 *
 * The title stays a real `h1`; section headings inside the page are `h2`/`h3`
 * via `DocsSection`. Server-component safe.
 */
export declare function DocsPage({ title, description, pagination, className, children, ...props }: DocsPageProps): import("react").JSX.Element;
