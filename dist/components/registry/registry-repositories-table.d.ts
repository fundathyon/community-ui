import type { HTMLAttributes, ReactNode } from "react";
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
export declare function RegistryRepositoriesTable({ repositories, state, getHref, renderLink, emptyAction, formatDate, labels, className, ...props }: RegistryRepositoriesTableProps): import("react").JSX.Element;
