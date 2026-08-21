import { Fragment, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";

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
export function ResourceMeta({ items, separator = "·", className, ...props }: ResourceMetaProps) {
  if (!items || items.length === 0) return null;
  return (
    <p className={cn("text-body-sm text-text-muted", className)} {...props}>
      {items.map((item, index) => (
        <Fragment key={index}>
          {index > 0 ? (
            <span aria-hidden className="mx-1.5 text-text-disabled">
              {separator}
            </span>
          ) : null}
          {item}
        </Fragment>
      ))}
    </p>
  );
}

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
export function ResourceHeader({ breadcrumb, title, status, actions, meta, className, ...props }: ResourceHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)} {...props}>
      {breadcrumb ? <div>{breadcrumb}</div> : null}
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <h1 className="min-w-0 truncate text-h1 text-text">{title}</h1>
          {status ? <span className="shrink-0">{status}</span> : null}
        </div>
        {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
      </div>
      {meta ? <ResourceMeta items={meta} /> : null}
    </div>
  );
}
