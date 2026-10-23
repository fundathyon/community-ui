import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
/**
 * ResourceContent — the content region under the tabs of a resource detail (§25):
 * a padded vertical stack for the sections of a single tab. The summary tab ends
 * with a DangerZone; a settings section ends with a SaveBar.
 *
 * Server-component safe.
 */
export function ResourceContent({ className, ...props }) {
    return _jsx("div", { className: cn("flex flex-col gap-6 py-2", className), ...props });
}
