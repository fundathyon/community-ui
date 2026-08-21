import { ChevronLeft, ChevronRight } from "lucide-react";
import type { AnchorHTMLAttributes, HTMLAttributes, ReactElement, ReactNode } from "react";
import { cn } from "../lib/cn";
import { Icon } from "../components/typography/icon";

export interface DocsPaginationLink {
  /** The destination page title. */
  label: ReactNode;
  href?: string;
  /** Router substitution — receives the wired anchor props to spread:
   * `render: (props) => <RouterLink to="…" {...props} />`. */
  render?: (props: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) => ReactElement;
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

function PageCard({
  link,
  direction,
  overline,
}: {
  link: DocsPaginationLink;
  direction: "prev" | "next";
  overline: string;
}) {
  const isNext = direction === "next";
  const inner = (
    <>
      <span
        className={cn(
          "flex items-center gap-1 text-overline uppercase text-text-muted",
          isNext && "justify-end",
        )}
      >
        {!isNext && <Icon icon={ChevronLeft} size={12} />}
        {overline}
        {isNext && <Icon icon={ChevronRight} size={12} />}
      </span>
      <span className={cn("truncate text-body font-medium text-text", isNext && "text-right")}>{link.label}</span>
    </>
  );

  const props: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode } = {
    href: link.href,
    className: cn(
      "group flex min-w-0 flex-col gap-1 rounded-lg border border-border p-3",
      "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)] hover:bg-surface-hover",
      isNext ? "items-end text-right" : "items-start",
    ),
    children: inner,
  };
  return link.render ? link.render(props) : <a {...props} />;
}

/**
 * DocsPagination — prev/next page links at the bottom of a docs page (§26). Two
 * cards spanning the measure: the previous page on the left, the next on the
 * right, each with a direction overline, the page title and a chevron. Renders
 * `<a>` by default; pass `render` per link for a framework router.
 *
 * Server-component safe.
 */
export function DocsPagination({
  prev,
  next,
  previousLabel = "Previous",
  nextLabel = "Next",
  label = "Pagination",
  className,
  ...props
}: DocsPaginationProps) {
  return (
    <nav
      aria-label={label}
      className={cn("mt-12 grid gap-3 sm:grid-cols-2", className)}
      {...props}
    >
      {prev ? <PageCard link={prev} direction="prev" overline={previousLabel} /> : <span aria-hidden />}
      {next ? <PageCard link={next} direction="next" overline={nextLabel} /> : <span aria-hidden />}
    </nav>
  );
}
