import type { DataTableColumn, DataTableColumnVisibilityConfig, DataTablePaginationConfig, DataTableSelectionConfig, DataTableSortDirection, DataTableSortingConfig } from "./types";
/**
 * INTERNAL — the only place `@tanstack/react-table` is touched. It wraps the
 * table machine and returns a plain, TanStack-free model the orchestrator
 * renders. None of these TanStack imports (or their types) escape this module,
 * satisfying the encapsulation contract (CONVENTIONS: types never leak).
 */
export interface UseDataTableParams<TData> {
    columns: DataTableColumn<TData>[];
    data: TData[];
    rowId: (row: TData) => string;
    sorting?: DataTableSortingConfig;
    /** Controlled search string — the app owns the input. */
    globalFilter?: string;
    pagination?: DataTablePaginationConfig;
    selection?: DataTableSelectionConfig;
    enableSelection?: boolean;
    columnVisibility?: DataTableColumnVisibilityConfig;
    columnOrder?: string[];
}
export interface DataTableRowModel<TData> {
    id: string;
    original: TData;
    selected: boolean;
    toggleSelected: (value?: boolean) => void;
}
export interface UseDataTableResult<TData> {
    /** Columns after visibility + order, in render order. */
    visibleColumns: DataTableColumn<TData>[];
    rows: DataTableRowModel<TData>[];
    getSort: (id: string) => DataTableSortDirection | false;
    toggleSort: (id: string) => void;
    selectionEnabled: boolean;
    allSelected: boolean;
    someSelected: boolean;
    selectedCount: number;
    selectedRows: TData[];
    toggleAll: (value: boolean) => void;
    clearSelection: () => void;
    paginationEnabled: boolean;
    page: number;
    pageCount: number;
    pageSize: number;
    total: number;
    shownCount: number;
    rangeStart: number;
    rangeEnd: number;
    setPage: (page: number) => void;
}
export declare function useDataTable<TData>(params: UseDataTableParams<TData>): UseDataTableResult<TData>;
