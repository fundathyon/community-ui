import type { HTMLAttributes, ReactNode } from "react";
import type { ToneOrNeutral } from "../../lib/types";
/**
 * Tone of a role by its power: owner and admin carry the most reach → warning;
 * developer/member are ordinary participants → info; read-only/viewer roles are
 * passive → neutral. Unknown roles default to neutral rather than guessing.
 */
export declare function roleTone(role: string): ToneOrNeutral;
export interface RoleBadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
    /** The role name, e.g. "admin". */
    role: string;
    /** Override the auto tone (from `roleTone`). */
    tone?: ToneOrNeutral;
    /** Override the displayed text (defaults to the role string). */
    children?: ReactNode;
}
/**
 * RoleBadge — a role chip toned by power (§23 permission matrix context):
 * owner/admin warning, developer/member info, viewer neutral. Override `tone`
 * for a product's custom role, or use `roleTone(role)` for the tone alone.
 */
export declare function RoleBadge({ role, tone, children, className, ...props }: RoleBadgeProps): import("react").JSX.Element;
