// Data table domain (§14, §21). Public surface only — the `@tanstack/react-table`
// machine is encapsulated inside `use-data-table.ts` and never re-exported here.

// Presentation primitives (§M-03 split, server-safe).
export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  type TableCellProps,
  type TableHeadProps,
  type TableProps,
  type TableRowProps,
} from "./table";

// The full data table machine.
export { DataTable, type DataTableProps } from "./data-table";

// Toolbar helpers: column visibility and faceted filters.
export {
  DataTableColumnsButton,
  type DataTableColumnsButtonProps,
} from "./columns-button";
export {
  DataTableFilterButton,
  type DataTableFilterButtonProps,
} from "./filter-button";

// Public type surface (no TanStack types).
export type {
  DataTableAlign,
  DataTableCellType,
  DataTableColumn,
  DataTableColumnVisibilityConfig,
  DataTableEmptyStateConfig,
  DataTableErrorConfig,
  DataTableExpandable,
  DataTableFilterOption,
  DataTableGroupBy,
  DataTableHideBelow,
  DataTableLabels,
  DataTableNoResultsConfig,
  DataTablePaginationConfig,
  DataTableRowAction,
  DataTableRowProps,
  DataTableSelectionConfig,
  DataTableSort,
  DataTableSortDirection,
  DataTableSortingConfig,
  DataTableUserValue,
  SensitivityLevel,
} from "./types";
