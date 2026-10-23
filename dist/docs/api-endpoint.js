import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../lib/cn";
import { HttpRequest } from "../components/dev/http-request";
import { DeprecationNotice, VersionBadge } from "./version-badge";
/**
 * ApiEndpoint — the heading block of an API-reference entry (§26). Reuses the
 * dev HttpRequest row for the method chip + monospace path (so the verb tones
 * stay identical to the product, §20), adds an optional description, an
 * optional lifecycle VersionBadge, and — when deprecated — a DeprecationNotice,
 * then renders its parameter/request/response children.
 *
 * §26: the version badge sits by the endpoint heading, and the deprecation
 * notice immediately below it — never at the foot of the page. Server-safe.
 */
export function ApiEndpoint({ method, path, description, status, className, children, ...props }) {
    return (_jsxs("section", { className: cn("my-6", className), ...props, children: [status && (_jsx("div", { className: "mb-2", children: _jsx(VersionBadge, { state: status.kind, version: status.kind === "new" ? status.version : undefined }) })), _jsx(HttpRequest, { method: method, path: path }), status?.kind === "deprecated" && (_jsx(DeprecationNotice, { version: status.version, removedIn: status.removedIn, removedInEta: status.removedInEta, alternative: status.alternative })), description !== undefined && (_jsx("p", { className: "mt-2 text-sm leading-[1.7] text-text-secondary", children: description })), children && _jsx("div", { className: "mt-4 flex flex-col gap-4", children: children })] }));
}
