import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
import { Heading } from "../typography/heading";
import { Text } from "../typography/text";
/**
 * PageHeader — the fixed page-top structure of every screen (§15):
 * breadcrumb → title + primary action → subtitle → toolbar. Exported apart
 * from PageLayout so shells with their own scroll containers can compose it.
 *
 * Server-component safe.
 */
export function PageHeader({ breadcrumb, title, subtitle, actions, toolbar, className, ...props }) {
    return (_jsxs("header", { className: cn("flex flex-col gap-4", className), ...props, children: [breadcrumb, _jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [_jsxs("div", { className: "flex min-w-0 flex-col gap-1", children: [_jsx(Heading, { level: 1, children: title }), subtitle && (_jsx(Text, { variant: "body", tone: "secondary", children: subtitle }))] }), actions && _jsx("div", { className: "flex shrink-0 items-center gap-2", children: actions })] }), toolbar && _jsx("div", { className: "flex flex-wrap items-center gap-2", children: toolbar })] }));
}
/**
 * PageLayout — the fixed order of every screen of the suite (§15):
 * breadcrumb, title, subtitle, primary action, toolbar, content. Consistency
 * here is what makes five products feel like one suite.
 *
 * Server-component safe.
 */
export function PageLayout({ breadcrumb, title, subtitle, actions, toolbar, className, children, ...props }) {
    return (_jsxs("div", { className: cn("flex flex-col gap-6", className), ...props, children: [_jsx(PageHeader, { breadcrumb: breadcrumb, title: title, subtitle: subtitle, actions: actions, toolbar: toolbar }), _jsx("div", { className: "flex min-w-0 flex-col gap-8", children: children })] }));
}
