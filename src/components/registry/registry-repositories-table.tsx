import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { formatBytes, formatDateTime, formatNumber } from "../../lib/format";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../data-table/table";
import { EmptyState } from "../feedback/empty-state";
import { ErrorState } from "../feedback/error-state";
import { Skeleton } from "../feedback/skeleton";

/** One repository of an OCI registry. Dates are ISO strings. */
export interface RegistryRepository {
  /** Full name, `namespace/repo`. */
  name: string;
  /** Image (manifest) count. */
  images?: number;
  sizeBytes?: number;
  lastPushedAt?: string | null;
  lastPushedBy?: string;
}

/** Every string the repositories table draws. */
export interface RegistryRepositoriesTableLabels {
  repository: string;
  images: string;
  size: string;
  lastPush: string;
  emptyTitle: string;
  emptyDescription: ReactNode;
  errorTitle: string;
  errorDescription: string;
}

const DEFAULT_LABELS: RegistryRepositoriesTableLabels = {
  repository: "Repository",
  images: "Images",
  size: "Size",
  lastPush: "Last push",
  emptyTitle: "No images yet",
  emptyDescription: (
    <>
      Push to <code className="font-mono text-code">&lt;namespace&gt;/&lt;repo&gt;</code> to create the first one.
    </>
  ),
  errorTitle: "Repositories could not be loaded",
  errorDescription: "The registry did not answer. Try again in a moment.",
};

/** What `renderLink` receives to draw a repository link with a framework router. */
export interface RegistryRepositoryLinkProps {
  href: string;
  className: string;
  children: ReactNode;
}

export interface RegistryRepositoriesTableProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  repositories: RegistryRepository[];
  /** @default "ready" */
  state?: "ready" | "loading" | "error";
  /** Detail page of a repository. Without it names are plain text. */
  getHref?: (repository: RegistryRepository) => string;
  /** Router substitution for the default `<a>` (e.g. Next's Link). */
  renderLink?: (props: RegistryRepositoryLinkProps) => ReactNode;
  /** Exit of the empty state (§11), e.g. "Copy push command". */
  emptyAction?: ReactNode;
  /** Last-push date. Defaults to the absolute date-time (SSR-safe); pass a relative one if you like. */
  formatDate?: (iso: string) => string;
  /** Copy overrides (i18n). Defaults are English. */
  labels?: Partial<RegistryRepositoriesTableLabels>;
}

/**
 * RegistryRepositoriesTable — the repositories of an org's OCI registry: name,
 * image count, size and last push (when and by whom). Presentational: the
 * consumer loads and paginates; names link to the detail page through
 * `getHref` (and `renderLink` for a framework router).
 *
 * Server-component safe.
 */
export function RegistryRepositoriesTable({
  repositories,
  state = "ready",
  getHref,
  renderLink,
  emptyAction,
  formatDate = (iso) => formatDateTime(iso),
  labels,
  className,
  ...props
}: RegistryRepositoriesTableProps) {
  const t = { ...DEFAULT_LABELS, ...labels };

  if (state === "error") {
    return <ErrorState title={t.errorTitle} description={t.errorDescription} className={className} {...props} />;
  }
  if (state === "loading") {
    return (
      <div aria-busy="true" className={cn("flex flex-col gap-2", className)} {...props}>
        {Array.from({ length: 3 }, (_, i) => (
          <Skeleton key={i} className="h-10 w-full rounded-md" />
        ))}
      </div>
    );
  }
  if (repositories.length === 0) {
    return (
      <EmptyState
        title={t.emptyTitle}
        description={t.emptyDescription}
        action={emptyAction}
        className={className}
        {...props}
      />
    );
  }

  const nameClass = "font-mono text-code font-medium text-text";
  const linkClass = cn(nameClass, "hover:underline");

  return (
    <div className={className} {...props}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t.repository}</TableHead>
            <TableHead align="right">{t.images}</TableHead>
            <TableHead align="right">{t.size}</TableHead>
            <TableHead>{t.lastPush}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {repositories.map((r) => {
            const href = getHref?.(r);
            return (
              <TableRow key={r.name} data-repository={r.name}>
                <TableCell>
                  {href ? (
                    renderLink ? (
                      renderLink({ href, className: linkClass, children: r.name })
                    ) : (
                      <a href={href} className={linkClass}>
                        {r.name}
                      </a>
                    )
                  ) : (
                    <span className={nameClass}>{r.name}</span>
                  )}
                </TableCell>
                <TableCell align="right" className="tabular-nums">
                  {formatNumber(r.images ?? 0)}
                </TableCell>
                <TableCell align="right" className="tabular-nums">
                  {r.sizeBytes === undefined ? "—" : formatBytes(r.sizeBytes)}
                </TableCell>
                <TableCell className="text-text-muted">
                  {r.lastPushedAt ? formatDate(r.lastPushedAt) : "—"}
                  {r.lastPushedBy ? ` · ${r.lastPushedBy}` : ""}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
