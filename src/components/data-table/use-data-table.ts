"use client";

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type FilterFn,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { useCallback, useMemo } from "react";
import { useControllableState } from "../../hooks/use-controllable-state";
import type {
  DataTableColumn,
  DataTableColumnVisibilityConfig,
  DataTablePaginationConfig,
  DataTableSelectionConfig,
  DataTableSort,
  DataTableSortDirection,
  DataTableSortingConfig,
} from "./types";

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
  // sorting
  getSort: (id: string) => DataTableSortDirection | false;
  toggleSort: (id: string) => void;
  // selection
  selectionEnabled: boolean;
  allSelected: boolean;
  someSelected: boolean;
  selectedCount: number;
  selectedRows: TData[];
  toggleAll: (value: boolean) => void;
  clearSelection: () => void;
  // pagination
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

/**
 * Text the global filter matches against for one accessor value. Structured
 * cell values (the `user` object, `tags` arrays) search by their parts, so a
 * column never has to flatten its value just to stay searchable.
 */
function searchableText(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) return value.map(searchableText).join(" ");
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "object") {
    return Object.values(value as Record<string, unknown>).map(searchableText).join(" ");
  }
  return String(value);
}

function idsToRecord(ids: string[]): RowSelectionState {
  const record: RowSelectionState = {};
  for (const id of ids) record[id] = true;
  return record;
}

function recordToIds(record: RowSelectionState): string[] {
  return Object.keys(record).filter((key) => record[key]);
}

export function useDataTable<TData>(params: UseDataTableParams<TData>): UseDataTableResult<TData> {
  const {
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
  } = params;

  const [sort, setSort] = useControllableState<DataTableSort | null>({
    value: sorting?.state,
    defaultValue: sorting?.defaultState ?? null,
    onChange: sorting?.onChange,
  });

  const selectionEnabled = Boolean(selection) || Boolean(enableSelection);
  const [rowSelection, setRowSelection] = useControllableState<RowSelectionState>({
    value: selection ? idsToRecord(selection.selected) : undefined,
    defaultValue: {},
    onChange: selection ? (record) => selection.onChange(recordToIds(record)) : undefined,
  });

  const paginationEnabled = Boolean(pagination);
  const manual = Boolean(pagination?.manual);
  const pageSize = pagination?.pageSize ?? (data.length || 1);
  const [page, setPage] = useControllableState<number>({
    value: pagination?.page,
    defaultValue: 1,
    onChange: pagination?.onPageChange,
  });

  const [visibility, setVisibility] = useControllableState<VisibilityState>({
    value: columnVisibility?.state,
    defaultValue: columnVisibility?.defaultState ?? {},
    onChange: columnVisibility?.onChange,
  });

  const tsColumns = useMemo<ColumnDef<TData>[]>(
    () =>
      columns.map((col) => ({
        id: col.id,
        accessorFn: (row: TData) => (col.accessor ? col.accessor(row) : undefined),
        enableSorting: Boolean(col.sortable),
        enableGlobalFilter: true,
        // Consistent asc → desc → none cycle for every column (§21 "orden por
        // columna"); without this TanStack starts number columns descending.
        sortDescFirst: false,
      })),
    [columns],
  );

  const globalFilterFn = useCallback<FilterFn<TData>>(
    (tsRow, _columnId, filterValue) => {
      const query = String(filterValue ?? "").trim().toLowerCase();
      if (!query) return true;
      return columns.some((col) =>
        searchableText(col.accessor?.(tsRow.original)).toLowerCase().includes(query),
      );
    },
    [columns],
  );

  const sortingState: SortingState = sort ? [{ id: sort.id, desc: sort.direction === "desc" }] : [];
  const pageIndex = paginationEnabled ? Math.max(0, page - 1) : 0;
  const paginationState: PaginationState = { pageIndex, pageSize };
  const manualTotal = pagination?.total ?? 0;
  const manualPageCount = Math.max(1, Math.ceil(manualTotal / pageSize));

  const table = useReactTable<TData>({
    data,
    columns: tsColumns,
    getRowId: (row) => rowId(row),
    state: {
      sorting: sortingState,
      globalFilter: globalFilter ?? "",
      rowSelection,
      columnVisibility: visibility,
      columnOrder: columnOrder ?? [],
      pagination: paginationState,
    },
    enableRowSelection: selectionEnabled,
    enableMultiSort: false,
    enableSortingRemoval: true,
    globalFilterFn,
    getColumnCanGlobalFilter: () => true,
    manualPagination: manual,
    // We own the page index (controlled externally); TanStack must not reset it
    // back to 0 on every render — that fights our navigation into a loop.
    autoResetPageIndex: false,
    ...(manual ? { pageCount: manualPageCount, rowCount: manualTotal } : {}),
    onSortingChange: (updater) => {
      const next = typeof updater === "function" ? updater(sortingState) : updater;
      const first = next[0];
      setSort(first ? { id: first.id, direction: first.desc ? "desc" : "asc" } : null);
    },
    onRowSelectionChange: (updater) => {
      const next = typeof updater === "function" ? updater(rowSelection) : updater;
      setRowSelection(next);
    },
    onColumnVisibilityChange: (updater) => {
      const next = typeof updater === "function" ? updater(visibility) : updater;
      setVisibility(next);
    },
    onPaginationChange: (updater) => {
      const next = typeof updater === "function" ? updater(paginationState) : updater;
      setPage(next.pageIndex + 1);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    ...(manual ? {} : { getPaginationRowModel: getPaginationRowModel() }),
  });

  const pageRows = table.getRowModel().rows;
  const filteredRows = table.getFilteredRowModel().rows;
  const total = manual ? manualTotal : filteredRows.length;
  const pageCount = manual ? manualPageCount : Math.max(1, Math.ceil(total / pageSize));
  const shownCount = pageRows.length;
  const rangeStart = shownCount === 0 ? 0 : pageIndex * pageSize + 1;
  const rangeEnd = shownCount === 0 ? 0 : rangeStart + shownCount - 1;

  const visibleColumns = useMemo(() => {
    const shown = columns.filter((col) => visibility[col.id] !== false);
    if (columnOrder && columnOrder.length > 0) {
      const rank = new Map(columnOrder.map((id, index) => [id, index]));
      return [...shown].sort(
        (a, b) => (rank.get(a.id) ?? Number.MAX_SAFE_INTEGER) - (rank.get(b.id) ?? Number.MAX_SAFE_INTEGER),
      );
    }
    return shown;
  }, [columns, visibility, columnOrder]);

  const rows: DataTableRowModel<TData>[] = pageRows.map((row) => ({
    id: row.id,
    original: row.original,
    selected: row.getIsSelected(),
    toggleSelected: (value?: boolean) => row.toggleSelected(value),
  }));

  const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);
  const clearSelection = useCallback(() => setRowSelection({}), [setRowSelection]);

  return {
    visibleColumns,
    rows,
    getSort: (id) => table.getColumn(id)?.getIsSorted() ?? false,
    toggleSort: (id) => table.getColumn(id)?.toggleSorting(),
    selectionEnabled,
    allSelected: table.getIsAllRowsSelected(),
    someSelected: table.getIsSomeRowsSelected(),
    selectedCount: recordToIds(rowSelection).length,
    selectedRows,
    toggleAll: (value) => table.toggleAllRowsSelected(value),
    clearSelection,
    paginationEnabled,
    page,
    pageCount,
    pageSize,
    total,
    shownCount,
    rangeStart,
    rangeEnd,
    setPage,
  };
}
