"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ChevronDown, ChevronRight, ChevronsUpDown, ChevronUp, EllipsisVertical, X, } from "lucide-react";
import { Fragment, useState } from "react";
import { cn } from "../../lib/cn";
import { Button } from "../actions/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "../actions/dropdown-menu";
import { IconButton } from "../actions/icon-button";
import { Badge } from "../feedback/badge";
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
/** Row heights (§08): compact 36px for the panel default; comfortable 48px. */
const ROW_HEIGHT = {
    compact: "h-9",
    comfortable: "h-12",
};
/** The frame owns the border and surface — the inner Table renders bare. */
const FRAMELESS_TABLE = "rounded-none border-0 bg-transparent";
const PRIMARY_STICKY = "sticky left-0 z-10 bg-surface";
/** Buckets the (already sorted, already paged) rows by group key, keeping first-appearance order. */
function groupRows(rows, groupBy) {
    if (!groupBy)
        return [{ key: null, rows }];
    const order = [];
    const buckets = new Map();
    for (const row of rows) {
        const key = groupBy.key(row.original);
        let bucket = buckets.get(key);
        if (!bucket) {
            bucket = [];
            buckets.set(key, bucket);
            order.push(key);
        }
        bucket.push(row);
    }
    return order.map((key) => ({ key, rows: buckets.get(key) ?? [] }));
}
function RowActionsMenu({ actions, label }) {
    if (actions.length === 0)
        return null;
    return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { render: _jsx(Button, { variant: "ghost", size: "sm", "aria-label": label, className: "w-8 px-0 text-text-muted", children: _jsx(Icon, { icon: EllipsisVertical, size: 16 }) }) }), _jsx(DropdownMenuContent, { align: "end", children: actions.map((action, index) => (_jsx(DropdownMenuItem, { icon: action.icon, destructive: action.destructive, disabled: action.disabled, onClick: () => action.onSelect(), children: action.label }, `${action.label}-${index}`))) })] }));
}
export function DataTable(props) {
    const { columns, data, rowId, loading, error, emptyState, noResultsState, sorting, globalFilter, pagination, selection, enableSelection, bulkActions, rowActions, onRowClick, expandable, groupBy, columnVisibility, columnOrder, toolbar, toolbarEnd, footer, density = "compact", stickyHeader, getRowProps, labels, className, loadingRowCount, } = props;
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
    // --- frame: toolbar + body (+ footer in the data state) --------------------
    const showBulkToolbar = selectionEnabled && model.selectedCount > 0;
    const hasToolbar = Boolean(toolbar) || Boolean(toolbarEnd) || showBulkToolbar;
    const toolbarNode = hasToolbar ? (_jsxs("div", { "data-slot": "toolbar", className: "flex flex-wrap items-center gap-2 border-b border-border px-3 py-2", children: [toolbar && _jsx("div", { className: "flex min-w-0 flex-wrap items-center gap-2", children: toolbar }), _jsx("div", { className: "ml-auto flex flex-wrap items-center gap-2", children: showBulkToolbar ? (_jsxs(_Fragment, { children: [_jsx("span", { "aria-live": "polite", className: "text-body-sm text-text-secondary", children: t.selectedCount(model.selectedCount) }), bulkActions?.(model.selectedRows), _jsx(IconButton, { icon: X, label: t.clearSelection, size: "sm", onClick: model.clearSelection })] })) : (toolbarEnd) })] })) : null;
    const frame = (body) => (_jsxs("div", { "data-slot": "data-table", className: cn("w-full overflow-hidden rounded-xl border border-border bg-surface", className), children: [toolbarNode, body] }));
    // --- states (§M-04) --------------------------------------------------------
    if (loading) {
        const rowCount = loadingRowCount ?? pagination?.pageSize ?? 5;
        return frame(_jsx(SkeletonGroup, { label: t.loading, children: _jsxs(Table, { stickyHeader: stickyHeader, className: FRAMELESS_TABLE, children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [selectionEnabled && _jsx(TableHead, { className: "w-9" }), expandable && _jsx(TableHead, { className: "w-9" }), visibleColumns.map((col) => (_jsx(TableHead, { align: columnAlign(col), className: col.hideBelow ? HIDE_BELOW_CLASS[col.hideBelow] : undefined, style: col.width ? { width: col.width } : undefined, children: col.header }, col.id))), hasRowActions && (_jsx(TableHead, { className: "w-9", children: _jsx("span", { className: "sr-only", children: t.actions }) }))] }) }), _jsx(TableBody, { children: Array.from({ length: rowCount }, (_, rowIndex) => (_jsxs(TableRow, { className: ROW_HEIGHT[density], "data-testid": "skeleton-row", children: [selectionEnabled && (_jsx(TableCell, { className: "w-9", children: _jsx(Skeleton, { className: "size-4 rounded-sm" }) })), expandable && (_jsx(TableCell, { className: "w-9", children: _jsx(Skeleton, { className: "size-4 rounded-sm" }) })), visibleColumns.map((col) => (_jsx(TableCell, { align: columnAlign(col), className: col.hideBelow ? HIDE_BELOW_CLASS[col.hideBelow] : undefined, children: _jsx(Skeleton, { className: cn("h-3 w-full max-w-32", columnAlign(col) === "right" && "ml-auto") }) }, col.id))), hasRowActions && (_jsx(TableCell, { className: "w-9", children: _jsx(Skeleton, { className: "size-4 rounded-sm" }) }))] }, rowIndex))) })] }) }));
    }
    if (error) {
        return frame(_jsx(ErrorState, { title: error.title ?? t.errorTitle, description: error.description, retry: error.retry }));
    }
    const noRows = model.rows.length === 0;
    const isFiltered = typeof globalFilter === "string" && globalFilter.trim().length > 0;
    if (noRows) {
        return frame(isFiltered ? (_jsx(EmptyState, { kind: "no-results", icon: noResultsState?.icon, title: noResultsState?.title ?? t.noResultsTitle, description: noResultsState?.description, action: noResultsState?.action })) : (_jsx(EmptyState, { kind: "empty", icon: emptyState?.icon, title: emptyState?.title ?? t.emptyTitle, description: emptyState?.description, action: emptyState?.action })));
    }
    // --- data (§21) ------------------------------------------------------------
    const primaryColumn = visibleColumns.find((col) => col.primary) ?? visibleColumns[0];
    const statusColumn = visibleColumns.find((col) => col.type === "status");
    const metaColumns = visibleColumns
        .filter((col) => col !== primaryColumn && col.type !== "status")
        .slice(0, 2);
    const groups = groupRows(model.rows, groupBy);
    const sortIndicator = (id) => {
        const sorted = model.getSort(id);
        if (sorted === "asc")
            return { icon: ChevronUp, aria: "ascending" };
        if (sorted === "desc")
            return { icon: ChevronDown, aria: "descending" };
        return { icon: ChevronsUpDown, aria: "none" };
    };
    const groupLabel = (group) => group.key === null ? null : groupBy?.render ? (groupBy.render(group.key, group.rows.map((row) => row.original))) : (_jsxs("span", { className: "inline-flex items-center gap-2", children: [group.key, _jsx(Badge, { variant: "counter", children: group.rows.length })] }));
    const renderRowActionsCell = (row) => (_jsx(TableCell, { className: "w-9 text-right", onClick: (event) => event.stopPropagation(), children: _jsx(RowActionsMenu, { actions: rowActionsFor(row), label: t.actions }) }));
    const renderExpandCell = (rowModel) => {
        const isOpen = Boolean(expanded[rowModel.id]);
        return (_jsx(TableCell, { className: "w-9", onClick: (event) => event.stopPropagation(), children: _jsx(Button, { variant: "ghost", size: "sm", "aria-label": isOpen ? t.collapseRow : t.expandRow, "aria-expanded": isOpen, className: "w-8 px-0", onClick: () => setExpanded((prev) => ({ ...prev, [rowModel.id]: !isOpen })), children: _jsx(Icon, { icon: isOpen ? ChevronDown : ChevronRight, size: 16 }) }) }));
    };
    const renderDesktopRow = (rowModel) => {
        const rowProps = getRowProps?.(rowModel.original);
        const isOpen = Boolean(expanded[rowModel.id]);
        return (_jsxs(Fragment, { children: [_jsxs(TableRow, { interactive: Boolean(onRowClick), selected: rowModel.selected, terminal: rowProps?.terminal, className: ROW_HEIGHT[density], onClick: onRowClick ? () => onRowClick(rowModel.original) : undefined, children: [selectionEnabled && (_jsx(TableCell, { className: "w-9", onClick: (event) => event.stopPropagation(), children: _jsx(Checkbox, { label: _jsx("span", { className: "sr-only", children: t.selectRow }), checked: rowModel.selected, onCheckedChange: (checked) => rowModel.toggleSelected(checked === true) }) })), expandable && renderExpandCell(rowModel), visibleColumns.map((col) => (_jsx(TableCell, { align: columnAlign(col), className: cn(col.hideBelow && HIDE_BELOW_CLASS[col.hideBelow], col.primary && PRIMARY_STICKY, col.primary && onRowClick && "group-hover/row:bg-surface-hover", rowModel.selected && col.primary && "bg-accent-bg"), style: col.width ? { width: col.width } : undefined, children: _jsx(CellRenderer, { column: col, row: rowModel.original, labels: t }) }, col.id))), hasRowActions && renderRowActionsCell(rowModel.original)] }), expandable && isOpen && (_jsx("tr", { className: "border-b border-border last:border-0", children: _jsx("td", { colSpan: totalCols, className: "bg-bg-subtle px-3 py-3", children: expandable.render(rowModel.original) }) }))] }, rowModel.id));
    };
    const renderCard = (rowModel) => {
        const rowProps = getRowProps?.(rowModel.original);
        return (_jsxs("div", { onClick: onRowClick ? () => onRowClick(rowModel.original) : undefined, className: cn("rounded-lg border border-border bg-surface p-3", onRowClick && "cursor-pointer hover:bg-surface-hover", rowModel.selected && "border-accent-border bg-accent-bg", rowProps?.terminal && "opacity-60"), children: [_jsxs("div", { className: "flex items-start justify-between gap-2", children: [_jsxs("div", { className: "flex min-w-0 items-start gap-2", children: [selectionEnabled && (_jsx("span", { onClick: (event) => event.stopPropagation(), children: _jsx(Checkbox, { label: _jsx("span", { className: "sr-only", children: t.selectRow }), checked: rowModel.selected, onCheckedChange: (checked) => rowModel.toggleSelected(checked === true) }) })), primaryColumn && (_jsx("div", { className: "min-w-0 text-label font-semibold text-text", children: _jsx(CellRenderer, { column: primaryColumn, row: rowModel.original, labels: t }) }))] }), _jsxs("div", { className: "flex shrink-0 items-center gap-2", onClick: (event) => event.stopPropagation(), children: [statusColumn && (_jsx(CellRenderer, { column: statusColumn, row: rowModel.original, labels: t })), hasRowActions && (_jsx(RowActionsMenu, { actions: rowActionsFor(rowModel.original), label: t.actions }))] })] }), metaColumns.length > 0 && (_jsx("dl", { className: "mt-3 flex flex-col gap-1.5", children: metaColumns.map((col) => (_jsxs("div", { className: "flex items-baseline justify-between gap-3", children: [_jsx("dt", { className: "shrink-0 text-caption text-text-muted", children: col.header }), _jsx("dd", { className: "min-w-0 text-body-sm text-text", children: _jsx(CellRenderer, { column: col, row: rowModel.original, labels: t }) })] }, col.id))) }))] }, rowModel.id));
    };
    return frame(_jsxs(_Fragment, { children: [_jsx("div", { className: "hidden md:block", children: _jsxs(Table, { stickyHeader: stickyHeader, className: FRAMELESS_TABLE, children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [selectionEnabled && (_jsx(TableHead, { className: "w-9", children: _jsx(Checkbox, { label: _jsx("span", { className: "sr-only", children: t.selectAll }), checked: model.allSelected, indeterminate: model.someSelected && !model.allSelected, onCheckedChange: (checked) => model.toggleAll(checked === true) }) })), expandable && (_jsx(TableHead, { className: "w-9", children: _jsx("span", { className: "sr-only", children: t.expandRow }) })), visibleColumns.map((col) => {
                                        const align = columnAlign(col);
                                        const indicator = sortIndicator(col.id);
                                        return (_jsx(TableHead, { align: align, "aria-sort": col.sortable ? indicator.aria : undefined, className: cn(col.hideBelow && HIDE_BELOW_CLASS[col.hideBelow], col.primary && PRIMARY_STICKY), style: col.width ? { width: col.width } : undefined, children: col.sortable ? (_jsxs("button", { type: "button", onClick: () => model.toggleSort(col.id), className: cn("group/sort -mx-1 inline-flex items-center gap-1 rounded px-1 uppercase", "hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus", indicator.aria !== "none" && "text-text", align === "right" && "flex-row-reverse"), children: [_jsx("span", { children: col.header }), _jsx(Icon, { icon: indicator.icon, size: 12, className: cn("transition-opacity duration-[var(--fdn-dur-fast)]", indicator.aria === "none" &&
                                                            "opacity-0 group-hover/sort:opacity-100 group-focus-visible/sort:opacity-100") })] })) : (col.header) }, col.id));
                                    }), hasRowActions && (_jsx(TableHead, { className: "w-9", children: _jsx("span", { className: "sr-only", children: t.actions }) }))] }) }), _jsx(TableBody, { children: groups.map((group) => (_jsxs(Fragment, { children: [group.key !== null && (_jsx("tr", { "data-group": group.key, className: "border-b border-border", children: _jsx("td", { colSpan: totalCols, className: "bg-bg-subtle px-3 py-1.5 text-overline uppercase text-text-muted", children: groupLabel(group) }) })), group.rows.map(renderDesktopRow)] }, group.key ?? "__all"))) })] }) }), _jsx("div", { className: "flex flex-col gap-3 p-3 md:hidden", children: groups.map((group) => (_jsxs(Fragment, { children: [group.key !== null && (_jsx("div", { className: "px-1 text-overline uppercase text-text-muted", children: groupLabel(group) })), group.rows.map(renderCard)] }, group.key ?? "__all"))) }), _jsxs("div", { "data-slot": "footer", className: "flex flex-wrap items-center justify-between gap-3 border-t border-border px-3 py-2", children: [_jsx("span", { className: "text-caption tabular-nums text-text-muted", children: t.of(model.shownCount, model.total) }), (footer || model.paginationEnabled) && (_jsxs("div", { className: "ml-auto flex flex-wrap items-center justify-end gap-4", children: [footer && _jsx("span", { className: "text-caption text-text-muted", children: footer }), model.paginationEnabled && (_jsx(Pagination, { page: model.page, pageCount: model.pageCount, onPageChange: model.setPage }))] }))] })] }));
}
