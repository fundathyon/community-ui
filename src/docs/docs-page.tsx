// Documentation reading-density inversion (§26).
//
// Docs are part of the product and share its tokens, but invert ONE decision:
// panel density is traded for READING density. Concretely (§26):
//   - max measure 72ch   → `max-w-[72ch]`
//   - line-height 1.7     → `leading-[1.7]`
//   - body 14px (not 13)  → `text-sm` (0.875rem; kept by both the Tailwind v3
//                           preset and v4 theme alongside our named scale)
// The two arbitrary values (`max-w-[72ch]`, `leading-[1.7]`) are SANCTIONED here
// and only here by §26 — they encode the documentation-specific inversion.
// Everything else (color, radii, code blocks, headings) stays identical to the app.

import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";
import { Heading } from "../components/typography/heading";

/**
 * The reading-density prose recipe (§26). Sets the 72ch measure, 1.7 line-height
 * and 14px body, plus sensible descendant styles so raw MDX prose (paragraphs,
 * lists, links, inline emphasis) reads correctly without a typography plugin.
 */
export const DOCS_PROSE_CLASS = cn(
  // §26 inversion — the sanctioned arbitraries live here.
  "max-w-[72ch] text-sm leading-[1.7] text-text",
  // Raw-prose descendants (MDX). Explicit components override these as needed.
  "[&_p]:my-4",
  "[&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1",
  "[&_a]:text-accent [&_a]:underline-offset-2 hover:[&_a]:underline",
  "[&_strong]:font-semibold [&_strong]:text-text",
  "[&_hr]:my-8 [&_hr]:border-border",
  "[&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:mt-6 [&_h3]:mb-2 [&_h4]:mt-4 [&_h4]:mb-2",
);

export interface DocsProseProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * DocsProse — the reading-density wrapper (§26): 72ch measure, 1.7 line-height,
 * 14px body. Wrap any long-form documentation content in it (MDX output, a
 * hand-written article). For a full page with title + pagination use DocsPage,
 * which already applies these styles. Server-component safe.
 */
export function DocsProse({ className, ...props }: DocsProseProps) {
  return <div className={cn(DOCS_PROSE_CLASS, className)} {...props} />;
}

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
export function DocsPage({ title, description, pagination, className, children, ...props }: DocsPageProps) {
  return (
    <article className={cn(DOCS_PROSE_CLASS, "pb-16", className)} {...props}>
      {title !== undefined && (
        <Heading level={1} className="mb-2">
          {title}
        </Heading>
      )}
      {description !== undefined && (
        // Lead inherits the 14px measure; secondary tone marks it as summary.
        <p className="mb-8 mt-0 text-text-secondary">{description}</p>
      )}
      {children}
      {pagination}
    </article>
  );
}
