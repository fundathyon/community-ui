// Data table domain (§14, §21). Public surface only — the `@tanstack/react-table`
// machine is encapsulated inside `use-data-table.ts` and never re-exported here.
// Presentation primitives (§M-03 split, server-safe).
export { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "./table";
// The full data table machine.
export { DataTable } from "./data-table";
// Column-visibility toolbar helper.
export { DataTableColumnsButton, } from "./columns-button";
