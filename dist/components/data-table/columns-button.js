"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../actions/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger, } from "../actions/dropdown-menu";
import { Icon } from "../typography/icon";
/**
 * DataTableColumnsButton — the "Columns" toggle for a DataTable's toolbar (§14,
 * §21). Wire the same visibility state to both this button and the table's
 * `columnVisibility` prop; the app owns where the trigger sits. Menu items are
 * checkbox items that stay open on toggle (§12).
 *
 * Not for reordering — that is the table's `columnOrder`. Use this only to show
 * and hide columns.
 */
export function DataTableColumnsButton({ columns, value, onChange, label = "Columns", lockedIds, icon, size, }) {
    const locked = new Set(lockedIds ?? []);
    return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { render: _jsx(Button, { variant: "secondary", size: size, leading: icon ? _jsx(Icon, { icon: icon, size: 14 }) : undefined, children: label }) }), _jsx(DropdownMenuContent, { align: "end", children: columns.map((col) => {
                    const isLocked = locked.has(col.id);
                    return (_jsx(DropdownMenuCheckboxItem, { checked: value[col.id] !== false, disabled: isLocked, closeOnClick: false, onCheckedChange: (checked) => onChange({ ...value, [col.id]: checked === true }), children: typeof col.header === "string" ? col.header : col.id }, col.id));
                }) })] }));
}
