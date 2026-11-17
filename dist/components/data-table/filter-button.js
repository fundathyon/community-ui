"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Filter } from "lucide-react";
import { Button } from "../actions/button";
import { Badge } from "../feedback/badge";
import { Checkbox } from "../forms/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "../overlays/popover";
import { Icon } from "../typography/icon";
/**
 * DataTableFilterButton — a faceted filter for a DataTable's toolbar (§14, §16):
 * a secondary button with the facet name and, once something is applied, a
 * counter badge — so an applied filter is never hidden behind a closed panel.
 * The popover lists the options as checkboxes (a Popover, not a menu: it admits
 * controls and focus, §13) with a clear control at the bottom.
 *
 * The app owns the value — persist it in the URL (§16 "la URL es el estado")
 * and pre-filter the rows it hands to the table.
 */
export function DataTableFilterButton({ label, options, value, onChange, multiple = true, icon = Filter, clearLabel = "Clear", emptyLabel = "No options", size, disabled, align = "start", className, }) {
    const selected = new Set(value);
    const toggle = (optionValue, checked) => {
        if (!multiple) {
            onChange(checked ? [optionValue] : []);
            return;
        }
        const next = new Set(selected);
        if (checked)
            next.add(optionValue);
        else
            next.delete(optionValue);
        // Emit in option order so the value is stable (and URL-friendly).
        onChange(options.map((option) => option.value).filter((candidate) => next.has(candidate)));
    };
    return (_jsxs(Popover, { children: [_jsx(PopoverTrigger, { render: _jsx(Button, { variant: "secondary", size: size, disabled: disabled, "data-active": value.length > 0 || undefined, leading: _jsx(Icon, { icon: icon, size: 14 }), trailing: value.length > 0 ? _jsx(Badge, { variant: "counter", children: value.length }) : undefined, className: className, children: label }) }), _jsxs(PopoverContent, { align: align, className: "w-56 p-1", children: [_jsxs("div", { role: "group", "aria-label": label, className: "flex max-h-72 flex-col overflow-y-auto", children: [options.length === 0 && (_jsx("span", { className: "px-2 py-1.5 text-body-sm text-text-muted", children: emptyLabel })), options.map((option) => (_jsx(Checkbox, { checked: selected.has(option.value), onCheckedChange: (checked) => toggle(option.value, checked === true), className: "w-full items-center rounded-md px-2 py-1.5 hover:bg-surface-hover", label: _jsxs("span", { className: "flex items-center gap-2", children: [option.icon && _jsx(Icon, { icon: option.icon, size: 14, className: "text-text-muted" }), _jsx("span", { className: "min-w-0 flex-1 truncate", children: option.label }), option.count !== undefined && (_jsx("span", { className: "tabular-nums text-caption text-text-muted", children: option.count }))] }) }, option.value)))] }), value.length > 0 && (_jsxs(_Fragment, { children: [_jsx("div", { role: "separator", className: "my-1 h-px bg-border" }), _jsx(Button, { variant: "ghost", size: "sm", className: "w-full", onClick: () => onChange([]), children: clearLabel })] }))] })] }));
}
