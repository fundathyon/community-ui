import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
import { formatBytes, formatDateTime, formatNumber } from "../../lib/format";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../data-table/table";
import { EmptyState } from "../feedback/empty-state";
import { ErrorState } from "../feedback/error-state";
import { Skeleton } from "../feedback/skeleton";
const DEFAULT_LABELS = {
    repository: "Repository",
    images: "Images",
    size: "Size",
    lastPush: "Last push",
    emptyTitle: "No images yet",
    emptyDescription: (_jsxs(_Fragment, { children: ["Push to ", _jsx("code", { className: "font-mono text-code", children: "<namespace>/<repo>" }), " to create the first one."] })),
    errorTitle: "Repositories could not be loaded",
    errorDescription: "The registry did not answer. Try again in a moment.",
};
/**
 * RegistryRepositoriesTable — the repositories of an org's OCI registry: name,
 * image count, size and last push (when and by whom). Presentational: the
 * consumer loads and paginates; names link to the detail page through
 * `getHref` (and `renderLink` for a framework router).
 *
 * Server-component safe.
 */
export function RegistryRepositoriesTable({ repositories, state = "ready", getHref, renderLink, emptyAction, formatDate = (iso) => formatDateTime(iso), labels, className, ...props }) {
    const t = { ...DEFAULT_LABELS, ...labels };
    if (state === "error") {
        return _jsx(ErrorState, { title: t.errorTitle, description: t.errorDescription, className: className, ...props });
    }
    if (state === "loading") {
        return (_jsx("div", { "aria-busy": "true", className: cn("flex flex-col gap-2", className), ...props, children: Array.from({ length: 3 }, (_, i) => (_jsx(Skeleton, { className: "h-10 w-full rounded-md" }, i))) }));
    }
    if (repositories.length === 0) {
        return (_jsx(EmptyState, { title: t.emptyTitle, description: t.emptyDescription, action: emptyAction, className: className, ...props }));
    }
    const nameClass = "font-mono text-code font-medium text-text";
    const linkClass = cn(nameClass, "hover:underline");
    return (_jsx("div", { className: className, ...props, children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: t.repository }), _jsx(TableHead, { align: "right", children: t.images }), _jsx(TableHead, { align: "right", children: t.size }), _jsx(TableHead, { children: t.lastPush })] }) }), _jsx(TableBody, { children: repositories.map((r) => {
                        const href = getHref?.(r);
                        return (_jsxs(TableRow, { "data-repository": r.name, children: [_jsx(TableCell, { children: href ? (renderLink ? (renderLink({ href, className: linkClass, children: r.name })) : (_jsx("a", { href: href, className: linkClass, children: r.name }))) : (_jsx("span", { className: nameClass, children: r.name })) }), _jsx(TableCell, { align: "right", className: "tabular-nums", children: formatNumber(r.images ?? 0) }), _jsx(TableCell, { align: "right", className: "tabular-nums", children: r.sizeBytes === undefined ? "—" : formatBytes(r.sizeBytes) }), _jsxs(TableCell, { className: "text-text-muted", children: [r.lastPushedAt ? formatDate(r.lastPushedAt) : "—", r.lastPushedBy ? ` · ${r.lastPushedBy}` : ""] })] }, r.name));
                    }) })] }) }));
}
