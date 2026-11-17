import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../lib/cn";
function SubSlot({ label, children }) {
    return (_jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("div", { className: "text-overline uppercase text-text-muted", children: label }), children] }));
}
/**
 * ApiRequest — the request-example block of an endpoint (§26). A titled section
 * wrapping the example (a CodeBlock/CurlBlock from the dev domain, which owns
 * code rendering — never ad-hoc `<pre>`), with optional structured headers/body
 * slots above it. Server-component safe.
 */
export function ApiRequest({ title = "Request", headers, body, children, headersLabel = "Headers", bodyLabel = "Body", className, ...props }) {
    return (_jsxs("section", { className: cn("flex flex-col gap-2", className), ...props, children: [_jsx("div", { className: "text-label font-medium text-text", children: title }), headers && _jsx(SubSlot, { label: headersLabel, children: headers }), body && _jsx(SubSlot, { label: bodyLabel, children: body }), children] }));
}
