import type { HTMLAttributes, ReactNode } from "react";
/** The three endpoint lifecycle states shown by an API heading (§26: "Nuevo
 * en 2.4 · Deprecado · Beta"). */
export type VersionBadgeState = "new" | "beta" | "deprecated";
export interface VersionBadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
    state: VersionBadgeState;
    /** Version the endpoint shipped in, e.g. "2.4" → "New in 2.4". Only read
     * when `state="new"`. */
    version?: string;
    /** Overrides the computed label entirely. Overridable (products ship
     * Spanish copy: "Nuevo en 2.4", "Beta", "Deprecado"). */
    label?: string;
}
/**
 * VersionBadge — the small "New in 2.4 / Beta / Deprecated" chip that sits by
 * an API endpoint's heading (§26). A thin preset over the product Badge, not
 * a new visual — reach for it instead of hand-rolling a Badge each time an
 * endpoint needs a lifecycle marker. Server-component safe.
 */
export declare function VersionBadge({ state, version, label, className, ...props }: VersionBadgeProps): import("react").JSX.Element;
/**
 * The data a deprecation notice needs. §26: "Una deprecación sin fecha de
 * retirada y sin alternativa no se publica" — a deprecation without a
 * removal version AND an alternative isn't published, so both `removedIn`
 * and `alternative` are required fields, not optional ones: a half-filled
 * deprecation simply doesn't compile.
 */
export interface DeprecationInfo {
    /** Version this was deprecated in, e.g. "2.4". */
    version: string;
    /** Version it's removed in, e.g. "3.0". Required — see above. */
    removedIn: string;
    /** Optional target date/quarter for the removal, e.g. "Q1 2027". */
    removedInEta?: string;
    /** What to use instead. Required — see above. */
    alternative: ReactNode;
}
export interface DeprecationNoticeProps extends DeprecationInfo, Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    /** Callout heading. Overridable (products ship Spanish copy). */
    title?: ReactNode;
}
/**
 * DeprecationNotice — the explanatory block under a deprecated endpoint's
 * heading (§26): what's deprecated, since which version, when it's removed,
 * and the alternative. §26 places this "immediately below" the heading,
 * never at the page's end — compose it right after the endpoint's method/path
 * row (see ApiEndpoint), never as a page footer.
 *
 * Reuses the warning-toned Admonition for its visuals (2px bar, wash, icon)
 * rather than a bespoke callout (§26 reuse-over-duplication). One of these
 * renders per deprecated endpoint, so — unlike a prose admonition — it does
 * NOT count against the docs "max two admonitions per page" budget: that
 * rule is about prose asides, this is a structured API-reference block.
 * Pass `children` to fully replace the generated sentence with custom copy.
 */
export declare function DeprecationNotice({ version, removedIn, removedInEta, alternative, title, className, children, ...props }: DeprecationNoticeProps): import("react").JSX.Element;
