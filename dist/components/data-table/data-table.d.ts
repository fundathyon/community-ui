import { type ReactNode } from "react";
import type { Density } from "../../lib/types";
import type { DataTableColumn, DataTableColumnVisibilityConfig, DataTableEmptyStateConfig, DataTableErrorConfig, DataTableExpandable, DataTableLabels, DataTableNoResultsConfig, DataTablePaginationConfig, DataTableRowAction, DataTableRowProps, DataTableSelectionConfig, DataTableSortingConfig } from "./types";
/**
 * DataTable — the §21 machine: one validated table across the suite where only
 * the cell types change (§21). It owns selection, single-column sorting, global
 * filtering, client/server pagination, row + bulk actions, expandable rows,
 * column visibility/order, density, a sticky header, and the four canonical load
 * states (§M-04). It is built on `@tanstack/react-table`, but that dependency is
 * fully encapsulated — no TanStack type appears in this API.
 *
 * When to use: any admin list where the user selects, sorts, filters or paginates.
 * For a purely static, presentation-only table use the {@link Table} primitives.
 * Never wire infinite scroll here — admin tables page numerically (§12).
 */
export interface DataTableProps<TData> {
    columns: DataTableColumn<TData>[];
    data: TData[];
    /** Stable row identity — powers selection, expansion and keys. */
    rowId: (row: TData) => string;
    /** Loading: renders skeleton rows mirroring the columns (§M-04). */
    loading?: boolean;
    /** Error: renders ErrorState with an optional retry (§11). */
    error?: DataTableErrorConfig;
    /** First-run empty copy (shown only when `data` is truly empty). */
    emptyState?: DataTableEmptyStateConfig;
    /** Filtered-to-nothing copy (shown when a filter is active and nothing matches). */
    noResultsState?: DataTableNoResultsConfig;
    /** Sorting — omit `state` for uncontrolled. */
    sorting?: DataTableSortingConfig;
    /** Controlled search string — the app owns the search input. */
    globalFilter?: string;
    /** Pagination — client-side by default, server-side with `manual` + `total`. */
    pagination?: DataTablePaginationConfig;
    /** Controlled selection (`selected` ids). */
    selection?: DataTableSelectionConfig;
    /** Uncontrolled selection — adds the checkbox column without owning state. */
    enableSelection?: boolean;
    /** Toolbar slot shown while rows are selected — app passes the action nodes. */
    bulkActions?: (selectedRows: TData[]) => ReactNode;
    /** Per-row actions rendered in the trailing menu column. */
    rowActions?: (row: TData) => DataTableRowAction[];
    onRowClick?: (row: TData) => void;
    /** Expandable rows — adds a chevron column and an expanded detail row. */
    expandable?: DataTableExpandable<TData>;
    /** Controlled/uncontrolled column visibility (pair with DataTableColumnsButton). */
    columnVisibility?: DataTableColumnVisibilityConfig;
    /** Apply a column order (no drag-and-drop) — array of column ids. */
    columnOrder?: string[];
    /** Row density (§32/§08). @default "compact" */
    density?: Density;
    /** Pin the header while the body scrolls (§11). */
    stickyHeader?: boolean;
    /** Per-row presentation — return `{ terminal: true }` for 0.6-opacity rows (§19). */
    getRowProps?: (row: TData) => DataTableRowProps | undefined;
    /** Overridable copy (defaults English). */
    labels?: DataTableLabels;
    className?: string;
    /** Skeleton row count while loading (defaults to page size, else 5). */
    loadingRowCount?: number;
}
export declare function DataTable<TData>(props: DataTableProps<TData>): import("react").JSX.Element;
