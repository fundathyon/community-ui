import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Public Data Table types (§14, §21). This is the API we OWN: no
 * `@tanstack/react-table` type ever appears here. The table machine (sorting,
 * filtering, pagination, selection) runs on TanStack internally, but consumers
 * only ever see these shapes.
 */

/**
 * The cell-type catalog (§21). Each type drives BOTH formatting (via
 * `lib/format`) and the default alignment (numbers/comparables right, text and
 * states left). Every empty value renders `—`, never a blank cell.
 *
 * Value hints — what `accessor` should return per type:
 * - `text`           → `string` (left, one line, truncated with a title)
 * - `number`         → `number` (right, `tabular-nums`, grouped)
 * - `percentage`     → `number` 0–100 (right, with an optional tiny bar)
 * - `bytes`          → `number` of bytes (right, `formatBytes`)
 * - `duration`       → `number` of ms (right, `formatDuration`)
 * - `date`           → `Date | string | number` (right, `formatDate`, tabular)
 * - `relative-date`  → `Date | string | number` (left; relative text, absolute in a tooltip)
 * - `status`         → `StatusKey` (left, `StatusBadge`)
 * - `user`           → {@link DataTableUserValue} (left; technical id/email on top, name below)
 * - `digest`         → `string` (mono, middle-truncated, click copies the FULL value)
 * - `version`        → `string` (mono, right)
 * - `tags`           → `string[]` (max 3 badges + a `+n` counter)
 * - `boolean`        → `boolean` (a check or `—`, never blank)
 * - `cron`           → `string` (mono; natural-language translation in the tooltip via `describe`)
 * - `sensitivity`    → {@link SensitivityLevel} (a §20 tone badge)
 */
export type DataTableCellType =
  | "text"
  | "number"
  | "percentage"
  | "bytes"
  | "duration"
  | "date"
  | "relative-date"
  | "status"
  | "user"
  | "digest"
  | "version"
  | "tags"
  | "boolean"
  | "cron"
  | "sensitivity";

/** The four sensitivity levels of §20 — a system token, not a per-screen choice. */
export type SensitivityLevel = "public" | "private" | "sensitive" | "secret";

/** Value shape for the `user` cell (§21 Accounts spec). */
export interface DataTableUserValue {
  /** Technical id — rendered mono ON TOP (support searches by id, §21). */
  id?: string;
  /** Human name — rendered bold BELOW the identifier. */
  name?: string;
  email?: string;
  /**
   * Avatar image URL. Currently unused — the cell renders self-contained
   * initials while `data-display` (Avatar) is built in parallel. Kept in the
   * type so integration can swap to Avatar without an API change.
   */
  avatarUrl?: string;
}

/** Column alignment. Defaults from the cell `type` per the §21 rule. */
export type DataTableAlign = "left" | "right";

/** Responsive priority (§08): the breakpoint below which the column hides. */
export type DataTableHideBelow = "sm" | "md" | "lg";

/**
 * A single column definition. Provide `accessor` to feed a `type` renderer, or
 * `cell` to render fully custom markup (a custom `cell` always wins). `type`
 * picks a catalog renderer AND the default alignment.
 */
export interface DataTableColumn<TData> {
  /** Stable identity — used for sorting, visibility and ordering. */
  id: string;
  /** Column header content. A string header also labels the visibility toggle. */
  header: ReactNode;
  /** Pick the value a `type` renderer (and sorting/filtering) reads. */
  accessor?: (row: TData) => unknown;
  /** Fully custom cell renderer. Wins over `type`. */
  cell?: (row: TData) => ReactNode;
  /** Catalog cell type — drives formatting and default alignment (§21). */
  type?: DataTableCellType;
  /** Allow sorting on this column (needs an `accessor`). */
  sortable?: boolean;
  /** Override the alignment the `type` would choose. */
  align?: DataTableAlign;
  /** CSS width for the column (e.g. `"12rem"`, `"96px"`). */
  width?: string;
  /** Hide the column below this breakpoint — the priority-column rule (§08). */
  hideBelow?: DataTableHideBelow;
  /** The fixed/first priority column: sticky-left on scroll, card title on mobile. */
  primary?: boolean;
  /**
   * `cron` cell only: translate the expression to natural language for the
   * tooltip. No cron parser is bundled — the app supplies the description.
   */
  describe?: (value: string) => string;
}

/** A row action rendered in the trailing actions menu (§12, §21). */
export interface DataTableRowAction {
  label: string;
  icon?: LucideIcon;
  onSelect: () => void;
  /** Danger styling; placed last. Should open a confirmation, never delete inline. */
  destructive?: boolean;
  disabled?: boolean;
}

/** Single-column sort descriptor — the public, TanStack-free sort shape. */
export type DataTableSortDirection = "asc" | "desc";
export interface DataTableSort {
  id: string;
  direction: DataTableSortDirection;
}

/** Controlled/uncontrolled sorting. Omit `state` for uncontrolled. */
export interface DataTableSortingConfig {
  state?: DataTableSort | null;
  defaultState?: DataTableSort | null;
  onChange?: (sort: DataTableSort | null) => void;
}

/**
 * Pagination config. Client-side by default (the table slices `data`); set
 * `manual` with `total` for server-side paging (the app supplies one page of
 * `data` and gets `onPageChange`).
 */
export interface DataTablePaginationConfig {
  /** Rows per page. */
  pageSize: number;
  /** Controlled current page, 1-based. */
  page?: number;
  onPageChange?: (page: number) => void;
  /** Total rows across all pages — required for `manual` (server) mode. */
  total?: number;
  /** Server-side mode: don't slice `data`; drive pages via `onPageChange`. */
  manual?: boolean;
}

/** Controlled selection: `selected` is the array of selected row ids. */
export interface DataTableSelectionConfig {
  selected: string[];
  onChange: (selected: string[]) => void;
}

/** Controlled/uncontrolled column visibility (`true` = visible). */
export interface DataTableColumnVisibilityConfig {
  state?: Record<string, boolean>;
  defaultState?: Record<string, boolean>;
  onChange?: (state: Record<string, boolean>) => void;
}

/** The `error` state payload — retry mirrors `ErrorState` (§11). */
export interface DataTableErrorConfig {
  title?: ReactNode;
  description?: ReactNode;
  retry?: { label: string; onClick: () => void };
}

/** First-run empty state (never filtered, §11). */
export interface DataTableEmptyStateConfig {
  title?: ReactNode;
  description?: ReactNode;
  /** The one exit — pass a Button (§11). */
  action?: ReactNode;
  icon?: LucideIcon;
}

/** Filtered-to-nothing state — distinct from empty (§11). */
export interface DataTableNoResultsConfig {
  title?: ReactNode;
  description?: ReactNode;
  /** The "clear filters" exit slot. */
  action?: ReactNode;
  icon?: LucideIcon;
}

/** Per-row presentation flags (e.g. terminal-status rows at 0.6 opacity, §19). */
export interface DataTableRowProps {
  terminal?: boolean;
}

/** Expandable rows (§21): a chevron column plus an expanded detail row. */
export interface DataTableExpandable<TData> {
  render: (row: TData) => ReactNode;
}

/** All overridable copy. Defaults are English; products pass Spanish (§ Language). */
export interface DataTableLabels {
  /** Footer summary — "3 of 128". @default `${shown} of ${total}` */
  of?: (shown: number, total: number) => string;
  /** Header select-all checkbox name. @default "Select all rows" */
  selectAll?: string;
  /** Row select checkbox name. @default "Select row" */
  selectRow?: string;
  /** Bulk toolbar count. @default `${count} selected` */
  selectedCount?: (count: number) => string;
  /** Clear-selection button. @default "Clear selection" */
  clearSelection?: string;
  /** Row-actions column header (sr-only). @default "Actions" */
  actions?: string;
  /** Expand-row control name. @default "Expand row" */
  expandRow?: string;
  /** Collapse-row control name. @default "Collapse row" */
  collapseRow?: string;
  /** Loading region announcement. @default "Loading data" */
  loading?: string;
  /** Fallback empty title. @default "No data yet" */
  emptyTitle?: string;
  /** Fallback no-results title. @default "No matches" */
  noResultsTitle?: string;
  /** Fallback error title. @default "Something went wrong" */
  errorTitle?: string;
  /** Sensitivity badge labels. @default English capitalised level. */
  sensitivity?: Record<SensitivityLevel, string>;
}

/** An option of a faceted filter (§16): value, label and an optional facet count. */
export interface DataTableFilterOption {
  value: string;
  label: ReactNode;
  icon?: LucideIcon;
  /** Rows matching this option — rendered right-aligned and tabular. */
  count?: number;
}

/**
 * Group rows under a key (§14): a group row precedes every run of rows that
 * share it. Groups keep the order in which their first row appears after
 * sorting, so a sorted column still reads top-to-bottom inside each group.
 */
export interface DataTableGroupBy<TData> {
  key: (row: TData) => string;
  /** Group row content. @default the key followed by a counter badge */
  render?: (key: string, rows: TData[]) => ReactNode;
}
