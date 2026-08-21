"use client";

import { ArrowDown, ArrowUp, ChevronDown, ChevronRight, ChevronsUpDown, Ellipsis } from "lucide-react";
import { Fragment, useState, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import type { Density } from "../../lib/types";
import { Button } from "../actions/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../actions/dropdown-menu";
import { EmptyState } from "../feedback/empty-state";
import { ErrorState } from "../feedback/error-state";
import { Skeleton, SkeletonGroup } from "../feedback/skeleton";
import { Checkbox } from "../forms/checkbox";
import { Pagination } from "../navigation/pagination";
import { Icon } from "../typography/icon";
import { CellRenderer, columnAlign } from "./cells";
import type {
  DataTableColumn,
  DataTableColumnVisibilityConfig,
  DataTableEmptyStateConfig,
  DataTableErrorConfig,
  DataTableExpandable,
  DataTableHideBelow,
  DataTableLabels,
  DataTableNoResultsConfig,
  DataTablePaginationConfig,
  DataTableRowAction,
  DataTableRowProps,
  DataTableSelectionConfig,
  DataTableSortingConfig,
} from "./types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";
import { useDataTable, type DataTableRowModel } from "./use-data-table";

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

interface ResolvedLabels {
  of: (shown: number, total: number) => string;
  selectAll: string;
  selectRow: string;
  selectedCount: (count: number) => string;
  clearSelection: string;
  actions: string;
  expandRow: string;
  collapseRow: string;
  loading: string;
  emptyTitle: string;
  noResultsTitle: string;
  errorTitle: string;
  sensitivity: DataTableLabels["sensitivity"];
}

function resolveLabels(labels?: DataTableLabels): ResolvedLabels {
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

const HIDE_BELOW_CLASS: Record<DataTableHideBelow, string> = {
  sm: "hidden sm:table-cell",
  md: "hidden md:table-cell",
  lg: "hidden lg:table-cell",
};

const ROW_HEIGHT: Record<Density, string> = {
  compact: "h-9",
  comfortable: "h-11",
};

const PRIMARY_STICKY = "sticky left-0 z-10 bg-surface border-r border-border";

function RowActionsMenu({ actions, label }: { actions: DataTableRowAction[]; label: string }) {
  if (actions.length === 0) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="sm" aria-label={label} className="w-8 px-0">
            <Icon icon={Ellipsis} size={16} />
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        {actions.map((action, index) => (
          <DropdownMenuItem
            key={`${action.label}-${index}`}
            icon={action.icon}
            destructive={action.destructive}
            disabled={action.disabled}
            onClick={() => action.onSelect()}
          >
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DataTable<TData>(props: DataTableProps<TData>) {
  const {
    columns,
    data,
    rowId,
    loading,
    error,
    emptyState,
    noResultsState,
    sorting,
    globalFilter,
    pagination,
    selection,
    enableSelection,
    bulkActions,
    rowActions,
    onRowClick,
    expandable,
    columnVisibility,
    columnOrder,
    density = "compact",
    stickyHeader,
    getRowProps,
    labels,
    className,
    loadingRowCount,
  } = props;

  const t = resolveLabels(labels);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const model = useDataTable<TData>({
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

  const rowActionsFor = (row: TData): DataTableRowAction[] => (rowActions ? rowActions(row) : []);

  // --- states (§M-04) --------------------------------------------------------
  if (loading) {
    const rowCount = loadingRowCount ?? pagination?.pageSize ?? 5;
    return (
      <div className={cn("w-full", className)}>
        <SkeletonGroup label={t.loading}>
          <Table stickyHeader={stickyHeader}>
            <TableHeader>
              <TableRow>
                {selectionEnabled && <TableHead className="w-9" />}
                {expandable && <TableHead className="w-9" />}
                {visibleColumns.map((col) => (
                  <TableHead
                    key={col.id}
                    align={columnAlign(col)}
                    className={col.hideBelow ? HIDE_BELOW_CLASS[col.hideBelow] : undefined}
                    style={col.width ? { width: col.width } : undefined}
                  >
                    {col.header}
                  </TableHead>
                ))}
                {hasRowActions && (
                  <TableHead className="w-9">
                    <span className="sr-only">{t.actions}</span>
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: rowCount }, (_, rowIndex) => (
                <TableRow key={rowIndex} className={ROW_HEIGHT[density]} data-testid="skeleton-row">
                  {selectionEnabled && (
                    <TableCell className="w-9">
                      <Skeleton className="size-4 rounded-sm" />
                    </TableCell>
                  )}
                  {expandable && (
                    <TableCell className="w-9">
                      <Skeleton className="size-4 rounded-sm" />
                    </TableCell>
                  )}
                  {visibleColumns.map((col) => (
                    <TableCell
                      key={col.id}
                      align={columnAlign(col)}
                      className={col.hideBelow ? HIDE_BELOW_CLASS[col.hideBelow] : undefined}
                    >
                      <Skeleton
                        className={cn("h-3 w-full max-w-32", columnAlign(col) === "right" && "ml-auto")}
                      />
                    </TableCell>
                  ))}
                  {hasRowActions && (
                    <TableCell className="w-9">
                      <Skeleton className="size-4 rounded-sm" />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SkeletonGroup>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("w-full", className)}>
        <div className="rounded-xl border border-border bg-surface">
          <ErrorState
            title={error.title ?? t.errorTitle}
            description={error.description}
            retry={error.retry}
          />
        </div>
      </div>
    );
  }

  const noRows = model.rows.length === 0;
  const isFiltered = typeof globalFilter === "string" && globalFilter.trim().length > 0;

  if (noRows) {
    return (
      <div className={cn("w-full", className)}>
        <div className="rounded-xl border border-border bg-surface">
          {isFiltered ? (
            <EmptyState
              kind="no-results"
              icon={noResultsState?.icon}
              title={noResultsState?.title ?? t.noResultsTitle}
              description={noResultsState?.description}
              action={noResultsState?.action}
            />
          ) : (
            <EmptyState
              kind="empty"
              icon={emptyState?.icon}
              title={emptyState?.title ?? t.emptyTitle}
              description={emptyState?.description}
              action={emptyState?.action}
            />
          )}
        </div>
      </div>
    );
  }

  // --- data (§21) ------------------------------------------------------------
  const primaryColumn = visibleColumns.find((col) => col.primary) ?? visibleColumns[0];
  const statusColumn = visibleColumns.find((col) => col.type === "status");
  const metaColumns = visibleColumns
    .filter((col) => col !== primaryColumn && col.type !== "status")
    .slice(0, 2);

  const showBulkToolbar = selectionEnabled && model.selectedCount > 0;

  const sortIndicator = (id: string) => {
    const sorted = model.getSort(id);
    if (sorted === "asc") return { icon: ArrowUp, aria: "ascending" as const };
    if (sorted === "desc") return { icon: ArrowDown, aria: "descending" as const };
    return { icon: ChevronsUpDown, aria: "none" as const };
  };

  const renderRowActionsCell = (row: TData) => (
    <TableCell className="w-9 text-right" onClick={(event) => event.stopPropagation()}>
      <RowActionsMenu actions={rowActionsFor(row)} label={t.actions} />
    </TableCell>
  );

  const renderExpandCell = (rowModel: DataTableRowModel<TData>) => {
    const isOpen = Boolean(expanded[rowModel.id]);
    return (
      <TableCell className="w-9" onClick={(event) => event.stopPropagation()}>
        <Button
          variant="ghost"
          size="sm"
          aria-label={isOpen ? t.collapseRow : t.expandRow}
          aria-expanded={isOpen}
          className="w-8 px-0"
          onClick={() => setExpanded((prev) => ({ ...prev, [rowModel.id]: !isOpen }))}
        >
          <Icon icon={isOpen ? ChevronDown : ChevronRight} size={16} />
        </Button>
      </TableCell>
    );
  };

  return (
    <div className={cn("w-full", className)}>
      {showBulkToolbar && (
        <div className="mb-3 flex flex-wrap items-center gap-3 rounded-lg border border-border bg-surface px-3 py-2">
          <span aria-live="polite" className="text-body-sm font-medium text-text">
            {t.selectedCount(model.selectedCount)}
          </span>
          {bulkActions && (
            <div className="flex flex-wrap items-center gap-2">{bulkActions(model.selectedRows)}</div>
          )}
          <button
            type="button"
            onClick={model.clearSelection}
            className="ml-auto rounded-md px-2 py-1 text-body-sm text-text-secondary hover:bg-surface-hover hover:text-text"
          >
            {t.clearSelection}
          </button>
        </div>
      )}

      {/* Desktop / tablet: the real table (§08 shows it from md up). */}
      <div className="hidden md:block">
        <Table stickyHeader={stickyHeader}>
          <TableHeader>
            <TableRow>
              {selectionEnabled && (
                <TableHead className="w-9">
                  <Checkbox
                    label={<span className="sr-only">{t.selectAll}</span>}
                    checked={model.allSelected}
                    indeterminate={model.someSelected && !model.allSelected}
                    onCheckedChange={(checked) => model.toggleAll(checked === true)}
                  />
                </TableHead>
              )}
              {expandable && (
                <TableHead className="w-9">
                  <span className="sr-only">{t.expandRow}</span>
                </TableHead>
              )}
              {visibleColumns.map((col) => {
                const align = columnAlign(col);
                const indicator = sortIndicator(col.id);
                return (
                  <TableHead
                    key={col.id}
                    align={align}
                    aria-sort={col.sortable ? indicator.aria : undefined}
                    className={cn(
                      col.hideBelow && HIDE_BELOW_CLASS[col.hideBelow],
                      col.primary && PRIMARY_STICKY,
                    )}
                    style={col.width ? { width: col.width } : undefined}
                  >
                    {col.sortable ? (
                      <button
                        type="button"
                        onClick={() => model.toggleSort(col.id)}
                        className={cn(
                          "-mx-1 inline-flex items-center gap-1 rounded px-1 text-label font-medium text-text-muted",
                          "hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
                          align === "right" && "flex-row-reverse",
                        )}
                      >
                        <span>{col.header}</span>
                        <Icon
                          icon={indicator.icon}
                          size={14}
                          className={indicator.aria === "none" ? "text-text-muted" : "text-text"}
                        />
                      </button>
                    ) : (
                      col.header
                    )}
                  </TableHead>
                );
              })}
              {hasRowActions && (
                <TableHead className="w-9">
                  <span className="sr-only">{t.actions}</span>
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {model.rows.map((rowModel) => {
              const rowProps = getRowProps?.(rowModel.original);
              const isOpen = Boolean(expanded[rowModel.id]);
              return (
                <Fragment key={rowModel.id}>
                  <TableRow
                    interactive={Boolean(onRowClick)}
                    selected={rowModel.selected}
                    terminal={rowProps?.terminal}
                    className={ROW_HEIGHT[density]}
                    onClick={onRowClick ? () => onRowClick(rowModel.original) : undefined}
                  >
                    {selectionEnabled && (
                      <TableCell className="w-9" onClick={(event) => event.stopPropagation()}>
                        <Checkbox
                          label={<span className="sr-only">{t.selectRow}</span>}
                          checked={rowModel.selected}
                          onCheckedChange={(checked) => rowModel.toggleSelected(checked === true)}
                        />
                      </TableCell>
                    )}
                    {expandable && renderExpandCell(rowModel)}
                    {visibleColumns.map((col) => (
                      <TableCell
                        key={col.id}
                        align={columnAlign(col)}
                        className={cn(
                          col.hideBelow && HIDE_BELOW_CLASS[col.hideBelow],
                          col.primary && PRIMARY_STICKY,
                          rowModel.selected && col.primary && "bg-accent-bg",
                        )}
                        style={col.width ? { width: col.width } : undefined}
                      >
                        <CellRenderer column={col} row={rowModel.original} labels={t} />
                      </TableCell>
                    ))}
                    {hasRowActions && renderRowActionsCell(rowModel.original)}
                  </TableRow>
                  {expandable && isOpen && (
                    <tr className="border-b border-border last:border-0">
                      <td colSpan={totalCols} className="bg-bg-subtle px-3 py-3">
                        {expandable.render(rowModel.original)}
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Mobile: the same row model as a card list (§08). */}
      <div className="flex flex-col gap-3 md:hidden">
        {model.rows.map((rowModel) => {
          const rowProps = getRowProps?.(rowModel.original);
          return (
            <div
              key={rowModel.id}
              onClick={onRowClick ? () => onRowClick(rowModel.original) : undefined}
              className={cn(
                "rounded-xl border border-border bg-surface p-4",
                onRowClick && "cursor-pointer hover:bg-surface-hover",
                rowModel.selected && "border-accent-border bg-accent-bg",
                rowProps?.terminal && "opacity-60",
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 items-start gap-2">
                  {selectionEnabled && (
                    <span onClick={(event) => event.stopPropagation()}>
                      <Checkbox
                        label={<span className="sr-only">{t.selectRow}</span>}
                        checked={rowModel.selected}
                        onCheckedChange={(checked) => rowModel.toggleSelected(checked === true)}
                      />
                    </span>
                  )}
                  {primaryColumn && (
                    <div className="min-w-0 text-label font-semibold text-text">
                      <CellRenderer column={primaryColumn} row={rowModel.original} labels={t} />
                    </div>
                  )}
                </div>
                <div
                  className="flex shrink-0 items-center gap-2"
                  onClick={(event) => event.stopPropagation()}
                >
                  {statusColumn && (
                    <CellRenderer column={statusColumn} row={rowModel.original} labels={t} />
                  )}
                  {hasRowActions && (
                    <RowActionsMenu actions={rowActionsFor(rowModel.original)} label={t.actions} />
                  )}
                </div>
              </div>
              {metaColumns.length > 0 && (
                <dl className="mt-3 flex flex-col gap-1.5">
                  {metaColumns.map((col) => (
                    <div key={col.id} className="flex items-baseline justify-between gap-3">
                      <dt className="shrink-0 text-caption text-text-muted">{col.header}</dt>
                      <dd className="min-w-0 text-body-sm text-text">
                        <CellRenderer column={col} row={rowModel.original} labels={t} />
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer: summary + pagination (§12). */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <span className="text-caption tabular-nums text-text-muted">
          {t.of(model.shownCount, model.total)}
        </span>
        {model.paginationEnabled && (
          <Pagination
            page={model.page}
            pageCount={model.pageCount}
            onPageChange={model.setPage}
          />
        )}
      </div>
    </div>
  );
}
