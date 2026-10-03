import { type SkeletonGroupProps } from "./skeleton";
export interface LoadingStateProps extends Omit<SkeletonGroupProps, "busy" | "role"> {
    /** Accessible name for the busy region — what is loading. Overridable
     * product copy. @default "Loading" */
    label?: string;
    /** Text-line skeleton rows rendered when `children` is omitted — the
     * "shape unknown" case. Ignored once `children` is passed. @default 3 */
    rows?: number;
}
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
export declare function LoadingState({ label, rows, children, className, ...props }: LoadingStateProps): import("react").JSX.Element;
