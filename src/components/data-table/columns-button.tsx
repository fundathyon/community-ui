"use client";

import { Columns3 } from "lucide-react";
import { Button } from "../actions/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../actions/dropdown-menu";
import { Icon } from "../typography/icon";
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
}

/**
 * DataTableColumnsButton — the "Columns" toggle for a DataTable's toolbar (§21).
 * Wire the same visibility state to both this button and the table's
 * `columnVisibility` prop; the app owns where the trigger sits. Menu items are
 * checkbox items that stay open on toggle (§12).
 *
 * Not for reordering — that is the table's `columnOrder`. Use this only to show
 * and hide columns.
 */
export function DataTableColumnsButton<TData>({
  columns,
  value,
  onChange,
  label = "Columns",
  lockedIds,
}: DataTableColumnsButtonProps<TData>) {
  const locked = new Set(lockedIds ?? []);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="secondary" leading={<Icon icon={Columns3} size={16} />}>
            {label}
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        {columns.map((col) => {
          const isLocked = locked.has(col.id);
          return (
            <DropdownMenuCheckboxItem
              key={col.id}
              checked={value[col.id] !== false}
              disabled={isLocked}
              closeOnClick={false}
              onCheckedChange={(checked) => onChange({ ...value, [col.id]: checked === true })}
            >
              {typeof col.header === "string" ? col.header : col.id}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
