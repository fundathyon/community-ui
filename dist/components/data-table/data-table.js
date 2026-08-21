"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowDown, ArrowUp, ChevronDown, ChevronRight, ChevronsUpDown, Ellipsis } from "lucide-react";
import { Fragment, useState } from "react";
import { cn } from "../../lib/cn";
import { Button } from "../actions/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "../actions/dropdown-menu";
import { EmptyState } from "../feedback/empty-state";
import { ErrorState } from "../feedback/error-state";
import { Skeleton, SkeletonGroup } from "../feedback/skeleton";
import { Checkbox } from "../forms/checkbox";
import { Pagination } from "../navigation/pagination";
import { Icon } from "../typography/icon";
import { CellRenderer, columnAlign } from "./cells";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";
import { useDataTable } from "./use-data-table";
function resolveLabels(labels) {
    return {
        of: labels?.of ?? ((shown, total) => `${shown} of ${total}`),
        selectAll: labels?.selectAll ?? "Select all rows",
        selectRow: labels?.selectRow ?? "Select row",
        selectedCount: labels?.selectedCount ?? ((count) => `${count} selected`),
        clearSelection: labels?.clearSelection ?? "Clear selection",
        actions: labels?.actions ?? "Actions",
        expandRow: labels?.expandRow ?? "Expand row",
        collapseRow: labels?.collapseRow ?? "Collapse row",
        loading: labels?.loading ?? "Loading data",
        emptyTitle: labels?.emptyTitle ?? "No data yet",
        noResultsTitle: labels?.noResultsTitle ?? "No matches",
        errorTitle: labels?.errorTitle ?? "Something went wrong",
        sensitivity: labels?.sensitivity,
    };
}
const HIDE_BELOW_CLASS = {
    sm: "hidden sm:table-cell",
    md: "hidden md:table-cell",
    lg: "hidden lg:table-cell",
};
const ROW_HEIGHT = {
    compact: "h-9",
    comfortable: "h-11",
};
const PRIMARY_STICKY = "sticky left-0 z-10 bg-surface border-r border-border";
function RowActionsMenu({ actions, label }) {
    if (actions.length === 0)
        return null;
    return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { render: _jsx(Button, { variant: "ghost", size: "sm", "aria-label": label, className: "w-8 px-0", children: _jsx(Icon, { icon: Ellipsis, size: 16 }) }) }), _jsx(DropdownMenuContent, { align: "end", children: actions.map((action, index) => (_jsx(DropdownMenuItem, { icon: action.icon, destructive: action.destructive, disabled: action.disabled, onClick: () => action.onSelect(), children: action.label }, `${action.label}-${index}`))) })] }));
}
export function DataTable(props) {
    const { columns, data, rowId, loading, error, emptyState, noResultsState, sorting, globalFilter, pagination, selection, enableSelection, bulkActions, rowActions, onRowClick, expandable, columnVisibility, columnOrder, density = "compact", stickyHeader, getRowProps, labels, className, loadingRowCount, } = props;
    const t = resolveLabels(labels);
    const [expanded, setExpanded] = useState({});
    const model = useDataTable({
        columns,
        data,
        rowId,
        sorting,
        globalFilter,
        pagination,
        selection,
        enableSelection,
        columnVisibility,
        columnOrder,
    });
    const { visibleColumns, selectionEnabled } = model;
    const hasRowActions = Boolean(rowActions);
    const leadingCols = (selectionEnabled ? 1 : 0) + (expandable ? 1 : 0);
    const totalCols = leadingCols + visibleColumns.length + (hasRowActions ? 1 : 0);
    const rowActionsFor = (row) => (rowActions ? rowActions(row) : []);
    // --- states (§M-04) --------------------------------------------------------
    if (loading) {
        const rowCount = loadingRowCount ?? pagination?.pageSize ?? 5;
        return (_jsx("div", { className: cn("w-full", className), children: _jsx(SkeletonGroup, { label: t.loading, children: _jsxs(Table, { stickyHeader: stickyHeader, children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [selectionEnabled && _jsx(TableHead, { className: "w-9" }), expandable && _jsx(TableHead, { className: "w-9" }), visibleColumns.map((col) => (_jsx(TableHead, { align: columnAlign(col), className: col.hideBelow ? HIDE_BELOW_CLASS[col.hideBelow] : undefined, style: col.width ? { width: col.width } : undefined, children: col.header }, col.id))), hasRowActions && (_jsx(TableHead, { className: "w-9", children: _jsx("span", { className: "sr-only", children: t.actions }) }))] }) }), _jsx(TableBody, { children: Array.from({ length: rowCount }, (_, rowIndex) => (_jsxs(TableRow, { className: ROW_HEIGHT[density], "data-testid": "skeleton-row", children: [selectionEnabled && (_jsx(TableCell, { className: "w-9", children: _jsx(Skeleton, { className: "size-4 rounded-sm" }) })), expandable && (_jsx(TableCell, { className: "w-9", children: _jsx(Skeleton, { className: "size-4 rounded-sm" }) })), visibleColumns.map((col) => (_jsx(TableCell, { align: columnAlign(col), className: col.hideBelow ? HIDE_BELOW_CLASS[col.hideBelow] : undefined, children: _jsx(Skeleton, { className: cn("h-3 w-full max-w-32", columnAlign(col) === "right" && "ml-auto") }) }, col.id))), hasRowActions && (_jsx(TableCell, { className: "w-9", children: _jsx(Skeleton, { className: "size-4 rounded-sm" }) }))] }, rowIndex))) })] }) }) }));
    }
    if (error) {
        return (_jsx("div", { className: cn("w-full", className), children: _jsx("div", { className: "rounded-xl border border-border bg-surface", children: _jsx(ErrorState, { title: error.title ?? t.errorTitle, description: error.description, retry: error.retry }) }) }));
    }
    const noRows = model.rows.length === 0;
    const isFiltered = typeof globalFilter === "string" && globalFilter.trim().length > 0;
    if (noRows) {
        return (_jsx("div", { className: cn("w-full", className), children: _jsx("div", { className: "rounded-xl border border-border bg-surface", children: isFiltered ? (_jsx(EmptyState, { kind: "no-results", icon: noResultsState?.icon, title: noResultsState?.title ?? t.noResultsTitle, description: noResultsState?.description, action: noResultsState?.action })) : (_jsx(EmptyState, { kind: "empty", icon: emptyState?.icon, title: emptyState?.title ?? t.emptyTitle, description: emptyState?.description, action: emptyState?.action })) }) }));
    }
    // --- data (§21) ------------------------------------------------------------
    const primaryColumn = visibleColumns.find((col) => col.primary) ?? visibleColumns[0];
    const statusColumn = visibleColumns.find((col) => col.type === "status");
    const metaColumns = visibleColumns
        .filter((col) => col !== primaryColumn && col.type !== "status")
        .slice(0, 2);
    const showBulkToolbar = selectionEnabled && model.selectedCount > 0;
    const sortIndicator = (id) => {
        const sorted = model.getSort(id);
        if (sorted === "asc")
            return { icon: ArrowUp, aria: "ascending" };
        if (sorted === "desc")
            return { icon: ArrowDown, aria: "descending" };
        return { icon: ChevronsUpDown, aria: "none" };
    };
    const renderRowActionsCell = (row) => (_jsx(TableCell, { className: "w-9 text-right", onClick: (event) => event.stopPropagation(), children: _jsx(RowActionsMenu, { actions: rowActionsFor(row), label: t.actions }) }));
    const renderExpandCell = (rowModel) => {
        const isOpen = Boolean(expanded[rowModel.id]);
        return (_jsx(TableCell, { className: "w-9", onClick: (event) => event.stopPropagation(), children: _jsx(Button, { variant: "ghost", size: "sm", "aria-label": isOpen ? t.collapseRow : t.expandRow, "aria-expanded": isOpen, className: "w-8 px-0", onClick: () => setExpanded((prev) => ({ ...prev, [rowModel.id]: !isOpen })), children: _jsx(Icon, { icon: isOpen ? ChevronDown : ChevronRight, size: 16 }) }) }));
    };
    return (_jsxs("div", { className: cn("w-full", className), children: [showBulkToolbar && (_jsxs("div", { className: "mb-3 flex flex-wrap items-center gap-3 rounded-lg border border-border bg-surface px-3 py-2", children: [_jsx("span", { "aria-live": "polite", className: "text-body-sm font-medium text-text", children: t.selectedCount(model.selectedCount) }), bulkActions && (_jsx("div", { className: "flex flex-wrap items-center gap-2", children: bulkActions(model.selectedRows) })), _jsx("button", { type: "button", onClick: model.clearSelection, className: "ml-auto rounded-md px-2 py-1 text-body-sm text-text-secondary hover:bg-surface-hover hover:text-text", children: t.clearSelection })] })), _jsx("div", { className: "hidden md:block", children: _jsxs(Table, { stickyHeader: stickyHeader, children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [selectionEnabled && (_jsx(TableHead, { className: "w-9", children: _jsx(Checkbox, { label: _jsx("span", { className: "sr-only", children: t.selectAll }), checked: model.allSelected, indeterminate: model.someSelected && !model.allSelected, onCheckedChange: (checked) => model.toggleAll(checked === true) }) })), expandable && (_jsx(TableHead, { className: "w-9", children: _jsx("span", { className: "sr-only", children: t.expandRow }) })), visibleColumns.map((col) => {
                                        const align = columnAlign(col);
                                        const indicator = sortIndicator(col.id);
                                        return (_jsx(TableHead, { align: align, "aria-sort": col.sortable ? indicator.aria : undefined, className: cn(col.hideBelow && HIDE_BELOW_CLASS[col.hideBelow], col.primary && PRIMARY_STICKY), style: col.width ? { width: col.width } : undefined, children: col.sortable ? (_jsxs("button", { type: "button", onClick: () => model.toggleSort(col.id), className: cn("-mx-1 inline-flex items-center gap-1 rounded px-1 text-label font-medium text-text-muted", "hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus", align === "right" && "flex-row-reverse"), children: [_jsx("span", { children: col.header }), _jsx(Icon, { icon: indicator.icon, size: 14, className: indicator.aria === "none" ? "text-text-muted" : "text-text" })] })) : (col.header) }, col.id));
                                    }), hasRowActions && (_jsx(TableHead, { className: "w-9", children: _jsx("span", { className: "sr-only", children: t.actions }) }))] }) }), _jsx(TableBody, { children: model.rows.map((rowModel) => {
                                const rowProps = getRowProps?.(rowModel.original);
                                const isOpen = Boolean(expanded[rowModel.id]);
                                return (_jsxs(Fragment, { children: [_jsxs(TableRow, { interactive: Boolean(onRowClick), selected: rowModel.selected, terminal: rowProps?.terminal, className: ROW_HEIGHT[density], onClick: onRowClick ? () => onRowClick(rowModel.original) : undefined, children: [selectionEnabled && (_jsx(TableCell, { className: "w-9", onClick: (event) => event.stopPropagation(), children: _jsx(Checkbox, { label: _jsx("span", { className: "sr-only", children: t.selectRow }), checked: rowModel.selected, onCheckedChange: (checked) => rowModel.toggleSelected(checked === true) }) })), expandable && renderExpandCell(rowModel), visibleColumns.map((col) => (_jsx(TableCell, { align: columnAlign(col), className: cn(col.hideBelow && HIDE_BELOW_CLASS[col.hideBelow], col.primary && PRIMARY_STICKY, rowModel.selected && col.primary && "bg-accent-bg"), style: col.width ? { width: col.width } : undefined, children: _jsx(CellRenderer, { column: col, row: rowModel.original, labels: t }) }, col.id))), hasRowActions && renderRowActionsCell(rowModel.original)] }), expandable && isOpen && (_jsx("tr", { className: "border-b border-border last:border-0", children: _jsx("td", { colSpan: totalCols, className: "bg-bg-subtle px-3 py-3", children: expandable.render(rowModel.original) }) }))] }, rowModel.id));
                            }) })] }) }), _jsx("div", { className: "flex flex-col gap-3 md:hidden", children: model.rows.map((rowModel) => {
                    const rowProps = getRowProps?.(rowModel.original);
                    return (_jsxs("div", { onClick: onRowClick ? () => onRowClick(rowModel.original) : undefined, className: cn("rounded-xl border border-border bg-surface p-4", onRowClick && "cursor-pointer hover:bg-surface-hover", rowModel.selected && "border-accent-border bg-accent-bg", rowProps?.terminal && "opacity-60"), children: [_jsxs("div", { className: "flex items-start justify-between gap-2", children: [_jsxs("div", { className: "flex min-w-0 items-start gap-2", children: [selectionEnabled && (_jsx("span", { onClick: (event) => event.stopPropagation(), children: _jsx(Checkbox, { label: _jsx("span", { className: "sr-only", children: t.selectRow }), checked: rowModel.selected, onCheckedChange: (checked) => rowModel.toggleSelected(checked === true) }) })), primaryColumn && (_jsx("div", { className: "min-w-0 text-label font-semibold text-text", children: _jsx(CellRenderer, { column: primaryColumn, row: rowModel.original, labels: t }) }))] }), _jsxs("div", { className: "flex shrink-0 items-center gap-2", onClick: (event) => event.stopPropagation(), children: [statusColumn && (_jsx(CellRenderer, { column: statusColumn, row: rowModel.original, labels: t })), hasRowActions && (_jsx(RowActionsMenu, { actions: rowActionsFor(rowModel.original), label: t.actions }))] })] }), metaColumns.length > 0 && (_jsx("dl", { className: "mt-3 flex flex-col gap-1.5", children: metaColumns.map((col) => (_jsxs("div", { className: "flex items-baseline justify-between gap-3", children: [_jsx("dt", { className: "shrink-0 text-caption text-text-muted", children: col.header }), _jsx("dd", { className: "min-w-0 text-body-sm text-text", children: _jsx(CellRenderer, { column: col, row: rowModel.original, labels: t }) })] }, col.id))) }))] }, rowModel.id));
                }) }), _jsxs("div", { className: "mt-3 flex flex-wrap items-center justify-between gap-3", children: [_jsx("span", { className: "text-caption tabular-nums text-text-muted", children: t.of(model.shownCount, model.total) }), model.paginationEnabled && (_jsx(Pagination, { page: model.page, pageCount: model.pageCount, onPageChange: model.setPage }))] })] }));
}
