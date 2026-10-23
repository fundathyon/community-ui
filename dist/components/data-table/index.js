// Data table domain (§14, §21). Public surface only — the `@tanstack/react-table`
// machine is encapsulated inside `use-data-table.ts` and never re-exported here.
// Presentation primitives (§M-03 split, server-safe).
export { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "./table";
// The full data table machine.
export { DataTable } from "./data-table";
// Toolbar helpers: column visibility and faceted filters.
export { DataTableColumnsButton, } from "./columns-button";
export { DataTableFilterButton, } from "./filter-button";
