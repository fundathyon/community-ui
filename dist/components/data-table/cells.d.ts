import type { ReactNode } from "react";
import type { DataTableAlign, DataTableColumn, DataTableLabels } from "./types";
/** Every empty value renders this, never a blank cell (§21). */
export declare const EMPTY = "\u2014";
/** Default alignment for a column, from its `type` (§21) unless overridden. */
export declare function columnAlign<TData>(column: DataTableColumn<TData>): DataTableAlign;
export interface CellRendererProps<TData> {
    column: DataTableColumn<TData>;
    row: TData;
    labels: DataTableLabels;
}
/**
 * The catalog dispatcher (§21). A custom `cell` renderer always wins; otherwise
 * the column `type` selects a formatter. All formatting comes from `lib/format`.
 */
export declare function CellRenderer<TData>({ column, row, labels }: CellRendererProps<TData>): ReactNode;
