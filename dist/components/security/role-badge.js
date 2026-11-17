import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
import { Badge } from "../feedback/badge";
/**
 * Tone of a role by its power: owner and admin carry the most reach → warning;
 * developer/member are ordinary participants → info; read-only/viewer roles are
 * passive → neutral. Unknown roles default to neutral rather than guessing.
 */
export function roleTone(role) {
    switch (role.trim().toLowerCase()) {
        case "owner":
        case "admin":
        case "administrator":
            return "warning";
        case "developer":
        case "dev":
        case "member":
        case "editor":
        case "maintainer":
            return "info";
        case "viewer":
        case "readonly":
        case "read-only":
        case "guest":
            return "neutral";
        default:
            return "neutral";
    }
}
/**
 * RoleBadge — a role chip toned by power (§23 permission matrix context):
 * owner/admin warning, developer/member info, viewer neutral. Override `tone`
 * for a product's custom role, or use `roleTone(role)` for the tone alone.
 */
export function RoleBadge({ role, tone, children, className, ...props }) {
    return (_jsx(Badge, { tone: tone ?? roleTone(role), className: cn(className), ...props, children: children ?? role }));
}
