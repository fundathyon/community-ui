"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/cn";
import { Badge } from "../components/feedback/badge";
import { Icon } from "../components/typography/icon";
import { ApiName, ApiType, RequiredBadge, apiCell, apiHeadCell, apiRowDivider, apiTable, apiTableWrapper, } from "./api-shared";
/** The expandable children of a node: object properties, or an array's item fields. */
function childrenOf(node) {
    if (node.properties && node.properties.length > 0)
        return node.properties;
    if (node.items) {
        const item = node.items;
        if (item.properties && item.properties.length > 0)
            return item.properties;
        return [{ ...item, name: item.name ?? "items" }];
    }
    return undefined;
}
function buildRows(nodes, expanded, depth, prefix) {
    const rows = [];
    nodes.forEach((node, i) => {
        const path = prefix ? `${prefix}.${i}` : `${i}`;
        const kids = childrenOf(node);
        const hasKids = kids !== undefined && kids.length > 0;
        rows.push({ node, depth, path, hasKids });
        if (hasKids && expanded.has(path))
            rows.push(...buildRows(kids, expanded, depth + 1, path));
    });
    return rows;
}
function topNodesOf(schema) {
    return childrenOf(schema) ?? [schema];
}
/**
 * ApiSchema — an object schema as an expandable tree (§26). Each node shows a
 * monospace name, a muted type, a "required" marker and any `enum` values as
 * small Badges; nested objects and arrays collapse behind a chevron (top level
 * open by default). The unified schema view — see `PropertyTable` for a flat
 * property list and `EnumTable` for a value list, both sharing these internals.
 */
export function ApiSchema({ schema, requiredLabel = "required", expandLabel = "Expand", collapseLabel = "Collapse", className, ...props }) {
    const top = topNodesOf(schema);
    const [expanded, setExpanded] = useState(() => {
        // Start with every top-level expandable node open.
        const initial = new Set();
        top.forEach((node, i) => {
            if (childrenOf(node))
                initial.add(`${i}`);
        });
        return initial;
    });
    const rows = buildRows(top, expanded, 0, "");
    const toggle = (path) => setExpanded((prev) => {
        const next = new Set(prev);
        if (next.has(path))
            next.delete(path);
        else
            next.add(path);
        return next;
    });
    return (_jsx("div", { className: cn(apiTableWrapper, "divide-y divide-border", className), ...props, children: rows.map(({ node, depth, path, hasKids }) => {
            const open = expanded.has(path);
            return (_jsxs("div", { className: "flex items-start gap-1.5 px-3 py-2", style: { paddingLeft: 12 + depth * 16 }, children: [hasKids ? (_jsx("button", { type: "button", "aria-expanded": open, "aria-label": open ? collapseLabel : expandLabel, onClick: () => toggle(path), className: "-ml-1 mt-0.5 grid size-5 shrink-0 place-items-center rounded-sm text-text-muted hover:bg-surface-hover hover:text-text fdn-touch-target", children: _jsx(Icon, { icon: ChevronRight, size: 14, className: cn("transition-transform duration-[var(--fdn-dur-fast)]", open && "rotate-90") }) })) : (_jsx("span", { "aria-hidden": true, className: "mt-0.5 size-5 shrink-0" })), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-1.5", children: [node.name !== undefined && _jsx(ApiName, { children: node.name }), _jsx(ApiType, { children: node.type }), node.required && _jsx(RequiredBadge, { label: requiredLabel }), node.enum?.map((value) => (_jsx(Badge, { variant: "tonal", tone: "neutral", className: "font-mono", children: value }, value)))] }), node.description !== undefined && (_jsx("div", { className: "mt-0.5 text-body-sm leading-[1.6] text-text-secondary", children: node.description }))] })] }, path));
        }) }));
}
/**
 * PropertyTable — a flat property list (§26): the tabular preset of ApiSchema for
 * a single object with no nesting. Name (monospace + "required" Badge), type
 * and description. Server-safe rendering; shares the API table internals.
 */
export function PropertyTable({ rows, requiredLabel = "required", headers, className, ...props }) {
    const head = { name: "Property", type: "Type", description: "Description", ...headers };
    return (_jsx("div", { className: cn(apiTableWrapper, className), ...props, children: _jsxs("table", { className: apiTable, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: apiHeadCell, children: head.name }), _jsx("th", { className: apiHeadCell, children: head.type }), _jsx("th", { className: apiHeadCell, children: head.description })] }) }), _jsx("tbody", { className: apiRowDivider, children: rows.map((row) => (_jsxs("tr", { children: [_jsx("td", { className: cn(apiCell, "whitespace-nowrap"), children: _jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx(ApiName, { children: row.name }), row.required && _jsx(RequiredBadge, { label: requiredLabel })] }) }), _jsx("td", { className: cn(apiCell, "whitespace-nowrap"), children: _jsx(ApiType, { children: row.type }) }), _jsx("td", { className: cn(apiCell, "text-text-secondary"), children: row.description })] }, row.name))) })] }) }));
}
/**
 * EnumTable — an enumeration's values and their meaning (§26): the value-list
 * preset sharing the API table internals. Values render monospace. Server-safe.
 */
export function EnumTable({ values, headers, className, ...props }) {
    const head = { value: "Value", description: "Description", ...headers };
    return (_jsx("div", { className: cn(apiTableWrapper, className), ...props, children: _jsxs("table", { className: apiTable, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: apiHeadCell, children: head.value }), _jsx("th", { className: apiHeadCell, children: head.description })] }) }), _jsx("tbody", { className: apiRowDivider, children: values.map((row) => (_jsxs("tr", { children: [_jsx("td", { className: cn(apiCell, "whitespace-nowrap"), children: _jsx(ApiName, { children: row.value }) }), _jsx("td", { className: cn(apiCell, "text-text-secondary"), children: row.description })] }, row.value))) })] }) }));
}
