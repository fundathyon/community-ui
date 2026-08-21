import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

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
export function DescriptionItem({ label, mono = false, className, children, ...props }: DescriptionItemProps) {
  return (
    <div className={cn("flex flex-col gap-0.5", className)} {...props}>
      <dt className="text-caption text-text-muted">{label}</dt>
      <dd className={cn("text-body text-text", mono && "font-mono text-code tabular-nums")}>{children}</dd>
    </div>
  );
}

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
export function DescriptionList({ items, columns = 1, className, children, ...props }: DescriptionListProps) {
  return (
    <dl
      className={cn(
        "grid gap-x-8 gap-y-3",
        columns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1",
        className,
      )}
      {...props}
    >
      {items
        ? items.map((item, index) => (
            <DescriptionItem key={index} label={item.label} mono={item.mono}>
              {item.value}
            </DescriptionItem>
          ))
        : children}
    </dl>
  );
}
