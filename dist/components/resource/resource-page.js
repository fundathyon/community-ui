import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
/**
 * ResourcePage — the vertical composition wrapper for a resource detail view
 * (§25): header → tabs → content, stacked with consistent spacing. One template
 * serves user, repository, config, API key, role, org and job. Thin by design.
 *
 * Server-component safe.
 */
export function ResourcePage({ className, ...props }) {
    return _jsx("div", { className: cn("flex flex-col gap-6", className), ...props });
}
