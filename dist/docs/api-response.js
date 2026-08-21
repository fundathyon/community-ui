import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../lib/cn";
import { statusTone } from "../components/dev/http-response";
import { Badge } from "../components/feedback/badge";
/**
 * ApiResponse — the response-example block of an endpoint (§26). A titled
 * section headed by a status chip whose tone follows the effect rule (2xx
 * success · 3xx info · 4xx warning · 5xx danger) via the reused dev `statusTone`,
 * then the body (a JsonViewer or CodeBlock from the dev domain).
 *
 * Server-component safe.
 */
export function ApiResponse({ status, statusText, title = "Response", children, className, ...props }) {
    return (_jsxs("section", { className: cn("flex flex-col gap-2", className), ...props, children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-label font-medium text-text", children: title }), _jsxs(Badge, { variant: "tonal", tone: statusTone(status), className: "font-mono tabular-nums", children: [status, statusText ? ` ${statusText}` : ""] })] }), children] }));
}
