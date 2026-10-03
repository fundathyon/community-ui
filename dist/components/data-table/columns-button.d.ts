import type { LucideIcon } from "lucide-react";
import type { Size } from "../../lib/types";
import type { DataTableColumn } from "./types";
export interface DataTableColumnsButtonProps<TData> {
    /** The same column list passed to the DataTable. */
    columns: DataTableColumn<TData>[];
    /** Controlled visibility record (`true`/absent = visible, `false` = hidden). */
    value: Record<string, boolean>;
    onChange: (next: Record<string, boolean>) => void;
    /** Trigger label. @default "Columns" */
    label?: string;
    /** Columns that may not be toggled off (e.g. the primary column). */
    lockedIds?: string[];
    /** Optional leading icon — the §14 toolbar renders the plain word. */
    icon?: LucideIcon;
    size?: Size;
}
/**
 * DataTableColumnsButton — the "Columns" toggle for a DataTable's toolbar (§14,
 * §21). Wire the same visibility state to both this button and the table's
 * `columnVisibility` prop; the app owns where the trigger sits. Menu items are
 * checkbox items that stay open on toggle (§12).
 *
 * Not for reordering — that is the table's `columnOrder`. Use this only to show
 * and hide columns.
 */
export declare function DataTableColumnsButton<TData>({ columns, value, onChange, label, lockedIds, icon, size, }: DataTableColumnsButtonProps<TData>): import("react").JSX.Element;
