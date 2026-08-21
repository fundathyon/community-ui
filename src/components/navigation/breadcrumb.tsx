import { ChevronRight } from "lucide-react";
import { Fragment, type AnchorHTMLAttributes, type HTMLAttributes, type ReactElement, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../typography/icon";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  /** Router substitution — receives the wired props to spread on the link:
   * `render: (props) => <RouterLink to="…" {...props} />`. */
  render?: (props: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) => ReactElement;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  /** The trail, root first. The LAST item is the current page. */
  items: BreadcrumbItem[];
  /** Accessible name of the landmark. Overridable (products ship Spanish copy). */
  label?: string;
}

const linkClasses =
  "rounded-sm text-text-muted transition-colors duration-[var(--fdn-dur-fast)] hover:text-text";

function renderLink(item: BreadcrumbItem) {
  const props: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode } = {
    href: item.href,
    className: linkClasses,
    children: item.label,
  };
  return item.render ? item.render(props) : <a {...props} />;
}

/**
 * Breadcrumb — the trail of nested views in the shell (§12). The last item is
 * the current page (`aria-current="page"`, plain text); the rest are links.
 * Past 4 items the middle collapses into "…" carrying the full hidden path in
 * its `title`.
 *
 * Server-component safe.
 */
export function Breadcrumb({ items, label = "Breadcrumb", className, ...props }: BreadcrumbProps) {
  type Entry = { kind: "item"; item: BreadcrumbItem } | { kind: "ellipsis"; hidden: BreadcrumbItem[] };

  const first = items[0];
  const entries: Entry[] =
    items.length > 4 && first !== undefined
      ? [
          { kind: "item", item: first },
          { kind: "ellipsis", hidden: items.slice(1, -2) },
          ...items.slice(-2).map((item): Entry => ({ kind: "item", item })),
        ]
      : items.map((item): Entry => ({ kind: "item", item }));

  return (
    <nav aria-label={label} className={cn("min-w-0", className)} {...props}>
      <ol className="flex min-w-0 flex-wrap items-center gap-1 text-body">
        {entries.map((entry, index) => {
          const last = index === entries.length - 1;
          return (
            <Fragment key={entry.kind === "item" ? `${entry.item.label}-${index}` : "ellipsis"}>
              <li className="flex min-w-0 items-center">
                {entry.kind === "ellipsis" ? (
                  <span
                    className="text-text-muted"
                    title={entry.hidden.map((item) => item.label).join(" / ")}
                  >
                    …
                  </span>
                ) : last ? (
                  <span aria-current="page" className="truncate text-text">
                    {entry.item.label}
                  </span>
                ) : (
                  renderLink(entry.item)
                )}
              </li>
              {!last && (
                <li aria-hidden className="flex items-center text-text-muted">
                  <Icon icon={ChevronRight} size={12} />
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
