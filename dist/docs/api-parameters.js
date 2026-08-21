import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment } from "react";
import { cn } from "../lib/cn";
import { ApiName, ApiType, RequiredBadge, apiCell, apiHeadCell, apiRowDivider, apiTable, apiTableWrapper } from "./api-shared";
const IN_ORDER = ["path", "query", "header", "body"];
const DEFAULT_GROUP_LABELS = {
    path: "Path parameters",
    query: "Query parameters",
    header: "Headers",
    body: "Body",
};
function ParamRows({ params, requiredLabel, defaultLabel, }) {
    return (_jsx("tbody", { className: apiRowDivider, children: params.map((param) => (_jsxs("tr", { children: [_jsx("td", { className: cn(apiCell, "whitespace-nowrap"), children: _jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx(ApiName, { deprecated: param.deprecated, children: param.name }), param.required && _jsx(RequiredBadge, { label: requiredLabel })] }) }), _jsxs("td", { className: cn(apiCell, "whitespace-nowrap"), children: [_jsx(ApiType, { children: param.type }), param.default !== undefined && (_jsxs("div", { className: "mt-0.5 text-caption text-text-muted", children: [defaultLabel, " ", _jsx("span", { className: "font-mono", children: param.default })] }))] }), _jsx("td", { className: cn(apiCell, "text-text-secondary"), children: param.description })] }, param.name))) }));
}
/**
 * ApiParameters — the parameter table of an endpoint (§26). Name (monospace,
 * with a "required" Badge), type (muted monospace, with any default), and a
 * prose description. When parameters carry an `in` (path/query/header/body) the
 * table splits into labelled groups, in that order.
 *
 * Built from a plain `<table>` with the app's table styling — the Table/DataTable
 * primitives belong to the parallel data-table domain and are never imported
 * here. Server-component safe.
 */
export function ApiParameters({ params, requiredLabel = "required", headers, groupLabels, defaultLabel = "Default", className, ...props }) {
    const head = { name: "Parameter", type: "Type", description: "Description", ...headers };
    const grouped = params.some((param) => param.in !== undefined);
    const groups = grouped
        ? IN_ORDER.map((key) => ({ key, label: groupLabels?.[key] ?? DEFAULT_GROUP_LABELS[key], rows: params.filter((p) => p.in === key) })).filter((group) => group.rows.length > 0)
        : [{ key: "all", label: undefined, rows: params }];
    return (_jsx("div", { className: className, ...props, children: groups.map((group) => (_jsxs(Fragment, { children: [group.label && _jsx("div", { className: "mb-1 mt-4 text-label font-medium text-text first:mt-0", children: group.label }), _jsx("div", { className: apiTableWrapper, children: _jsxs("table", { className: apiTable, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: apiHeadCell, children: head.name }), _jsx("th", { className: apiHeadCell, children: head.type }), _jsx("th", { className: apiHeadCell, children: head.description })] }) }), _jsx(ParamRows, { params: group.rows, requiredLabel: requiredLabel, defaultLabel: defaultLabel })] }) })] }, group.key))) }));
}
