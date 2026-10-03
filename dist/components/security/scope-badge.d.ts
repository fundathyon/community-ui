import type { HTMLAttributes, ReactNode } from "react";
import type { ToneOrNeutral } from "../../lib/types";
/**
 * Tone of a scope by its EFFECT (§23): read is info, write is success, delete is
 * danger, admin is warning (broad power). Unknown suffixes stay neutral — a scope
 * we can't classify never borrows a semantic color.
 *
 * The suffix is the segment after the last `:` — `registry:read` → `read`,
 * `config:write` → `write`. A bare `read` also classifies.
 */
export declare function scopeTone(scope: string): ToneOrNeutral;
export interface ScopeBadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
    /** The scope string, e.g. "registry:read". Rendered in mono. */
    scope: string;
    /** Override the auto tone (from `scopeTone`). */
    tone?: ToneOrNeutral;
    /** Override the displayed text (defaults to the scope string). */
    children?: ReactNode;
}
/**
 * ScopeBadge — a permission scope chip colored by its effect (§23): reads are
 * info, writes success, deletes danger, admin warning. Mono, because a scope is
 * verifiable literal data. Use `scopeTone(scope)` directly when you need the
 * tone without the badge.
 */
export declare function ScopeBadge({ scope, tone, children, className, ...props }: ScopeBadgeProps): import("react").JSX.Element;
