import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
import { Skeleton, SkeletonGroup } from "./skeleton";
/**
 * LoadingState (§11, §28) — the page/section busy region, parallel to
 * EmptyState/ErrorState: `role="status"` + `aria-busy="true"` around a
 * Skeleton shape that mirrors the real content. Pass `children` to describe
 * that shape yourself (a table's rows, a card grid…); without it, renders
 * `rows` generic text lines. Mount it only once the wait exceeds 300ms —
 * under that, show nothing (that timing is the caller's, e.g. DataTable).
 *
 * For a single inline placeholder, use Skeleton/SkeletonGroup directly —
 * this component is the describable, page-level composition of the two.
 */
export function LoadingState({ label = "Loading", rows = 3, children, className, ...props }) {
    return (_jsx(SkeletonGroup, { role: "status", label: label, className: cn("flex flex-col gap-2", className), ...props, children: children ?? _jsx(Skeleton, { variant: "text", lines: rows }) }));
}
