import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../lib/cn";
import { Tab, Tabs, TabsList, TabsPanel } from "../components/navigation/tabs";
/**
 * Example — a framed demonstration block (§26). Neutral by design: it is NOT a
 * callout, so it carries no tone or color — reserve those for admonitions.
 *
 * - preview only  → the demo on `bg-subtle`.
 * - code only     → just the source.
 * - both          → Preview/Code tabs over the same example.
 *
 * Server-component safe.
 */
export function Example({ label = "Example", title, children, code, previewLabel = "Preview", codeLabel = "Code", className, ...props }) {
    const hasPreview = children !== undefined && children !== null;
    const hasCode = code !== undefined && code !== null;
    const preview = _jsx("div", { className: "bg-bg-subtle p-4 text-sm leading-[1.7]", children: children });
    return (_jsxs("figure", { className: cn("my-6 overflow-hidden rounded-xl border border-border", className), ...props, children: [_jsxs("figcaption", { className: "flex items-center gap-2 border-b border-border bg-surface px-3 py-2", children: [_jsx("span", { className: "text-overline uppercase text-text-muted", children: label }), title !== undefined && _jsx("span", { className: "text-body-sm text-text-secondary", children: title })] }), hasPreview && hasCode ? (_jsxs(Tabs, { defaultValue: "preview", className: "gap-0", children: [_jsxs(TabsList, { "aria-label": typeof label === "string" ? label : "Example", className: "px-3 pt-2", children: [_jsx(Tab, { value: "preview", children: previewLabel }), _jsx(Tab, { value: "code", children: codeLabel })] }), _jsx(TabsPanel, { value: "preview", children: preview }), _jsx(TabsPanel, { value: "code", className: "p-3", children: code })] })) : hasCode ? (_jsx("div", { className: "p-3", children: code })) : (preview)] }));
}
