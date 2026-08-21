import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../lib/cn";
import { HttpRequest } from "../components/dev/http-request";
import { Badge } from "../components/feedback/badge";
/**
 * ApiEndpoint — the heading block of an API-reference entry (§26). Reuses the
 * dev HttpRequest row for the method chip + monospace path (so the verb tones
 * stay identical to the product, §20), adds an optional description and a
 * deprecation Badge, then renders its parameter/request/response children.
 *
 * §26: the deprecation Badge sits by the endpoint heading — never at the foot
 * of the page. Server-component safe.
 */
export function ApiEndpoint({ method, path, description, deprecated = false, deprecatedLabel = "Deprecated", className, children, ...props }) {
    return (_jsxs("section", { className: cn("my-6", className), ...props, children: [deprecated && (_jsx("div", { className: "mb-2", children: _jsx(Badge, { variant: "outline", tone: "warning", children: deprecatedLabel }) })), _jsx(HttpRequest, { method: method, path: path }), description !== undefined && (_jsx("p", { className: "mt-2 text-sm leading-[1.7] text-text-secondary", children: description })), children && _jsx("div", { className: "mt-4 flex flex-col gap-4", children: children })] }));
}
