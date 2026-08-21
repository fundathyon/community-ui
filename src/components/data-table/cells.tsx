"use client";

import { Check, Copy } from "lucide-react";
import type { ReactNode } from "react";
import { useCopyToClipboard } from "../../hooks/use-copy-to-clipboard";
import { cn } from "../../lib/cn";
import {
  formatBytes,
  formatDate,
  formatDuration,
  formatNumber,
  formatRelativeDate,
  truncateMiddle,
} from "../../lib/format";
import { STATUS, type StatusKey } from "../../lib/status";
import type { ToneOrNeutral } from "../../lib/types";
import { Badge } from "../feedback/badge";
import { StatusBadge } from "../feedback/status-badge";
import { Tooltip } from "../overlays/tooltip";
import { Icon } from "../typography/icon";
import type {
  DataTableAlign,
  DataTableCellType,
  DataTableColumn,
  DataTableLabels,
  DataTableUserValue,
  SensitivityLevel,
} from "./types";

/** Every empty value renders this, never a blank cell (§21). */
export const EMPTY = "—";

/** Right-aligned cell types (§21: numbers and everything comparable go right). */
const RIGHT_TYPES = new Set<DataTableCellType>([
  "number",
  "percentage",
  "bytes",
  "duration",
  "date",
  "version",
]);

/** Default alignment for a column, from its `type` (§21) unless overridden. */
export function columnAlign<TData>(column: DataTableColumn<TData>): DataTableAlign {
  if (column.align) return column.align;
  return column.type && RIGHT_TYPES.has(column.type) ? "right" : "left";
}

function isEmpty(value: unknown): boolean {
  return (
    value === null ||
    value === undefined ||
    value === "" ||
    (Array.isArray(value) && value.length === 0)
  );
}

function asNumber(value: unknown): number {
  return typeof value === "number" ? value : Number(value);
}

const SENSITIVITY_DEFAULT_LABELS: Record<SensitivityLevel, string> = {
  public: "Public",
  private: "Private",
  sensitive: "Sensitive",
  secret: "Secret",
};

const SENSITIVITY_TONE: Record<SensitivityLevel, ToneOrNeutral> = {
  public: "neutral",
  private: "info",
  sensitive: "warning",
  secret: "danger",
};

/** First one or two initials for the self-contained user avatar. */
function initialsOf(source: string): string {
  const cleaned = source.trim();
  if (!cleaned) return "?";
  const words = cleaned.split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    const a = words[0]?.[0] ?? "";
    const b = words[1]?.[0] ?? "";
    return (a + b).toUpperCase();
  }
  const base = cleaned.includes("@") ? (cleaned.split("@")[0] ?? cleaned) : cleaned;
  return (base[0] ?? "?").toUpperCase();
}

/**
 * `user` cell (§21 Accounts spec): technical identifier (id, else email) in
 * mono ON TOP; human identity (name, else email) in bold BELOW — the inverse
 * of the usual order, because support searches by id. The avatar is a
 * self-contained initials circle for now (Avatar lands with `data-display`).
 */
function UserCell({ value }: { value: DataTableUserValue }) {
  const { id, name, email } = value;
  const top = id ?? email;
  const bottom = name ?? (id ? email : undefined);
  const initials = initialsOf(name ?? email ?? id ?? "");
  if (!top && !bottom) return <>{EMPTY}</>;
  return (
    <div className="flex items-center gap-2 text-left">
      {/* Integration: swap for <Avatar> from data-display once available. */}
      <span
        aria-hidden
        className="grid size-7 shrink-0 place-items-center rounded-full bg-surface-hover text-caption font-medium text-text-secondary"
      >
        {initials}
      </span>
      <span className="flex min-w-0 flex-col leading-tight">
        {top && <span className="truncate font-mono text-caption text-text-muted">{top}</span>}
        {bottom && <span className="truncate text-label font-semibold text-text">{bottom}</span>}
      </span>
    </div>
  );
}

/** `digest` cell: mono, middle-truncated; a click copies the FULL value (§20). */
function DigestCell({ value, copyLabel }: { value: string; copyLabel: string }) {
  const { copied, copy } = useCopyToClipboard();
  return (
    <button
      type="button"
      title={value}
      aria-label={`${copyLabel}: ${value}`}
      onClick={(event) => {
        event.stopPropagation();
        void copy(value);
      }}
      className={cn(
        "group/digest inline-flex items-center gap-1.5 rounded-md font-mono text-caption text-text-secondary",
        "outline-none hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
      )}
    >
      <span>{truncateMiddle(value)}</span>
      <Icon
        icon={copied ? Check : Copy}
        size={12}
        className={cn(
          "text-text-muted transition-opacity duration-[var(--fdn-dur-fast)]",
          copied ? "opacity-100" : "opacity-0 group-hover/digest:opacity-100 group-focus-visible/digest:opacity-100",
        )}
      />
    </button>
  );
}

/** `percentage` cell: right-aligned value with an optional tiny neutral bar. */
function PercentageCell({ value }: { value: number }) {
  const clamped = Math.max(0, Math.min(100, value));
  const inRange = value >= 0 && value <= 100;
  return (
    <span className="inline-flex items-center justify-end gap-2 tabular-nums">
      {inRange && (
        <span className="h-1 w-10 overflow-hidden rounded-full bg-surface-hover" aria-hidden>
          <span className="block h-full rounded-full bg-accent-solid" style={{ width: `${clamped}%` }} />
        </span>
      )}
      <span>{formatNumber(value)}%</span>
    </span>
  );
}

export interface CellRendererProps<TData> {
  column: DataTableColumn<TData>;
  row: TData;
  labels: DataTableLabels;
}

/**
 * The catalog dispatcher (§21). A custom `cell` renderer always wins; otherwise
 * the column `type` selects a formatter. All formatting comes from `lib/format`.
 */
export function CellRenderer<TData>({ column, row, labels }: CellRendererProps<TData>): ReactNode {
  if (column.cell) return column.cell(row);

  const value = column.accessor?.(row);
  const type: DataTableCellType = column.type ?? "text";

  // `boolean` is the one type where an empty/false value is not a dash-fallback.
  if (type === "boolean") {
    return value ? (
      <Icon icon={Check} size={14} label="Yes" className="text-success" />
    ) : (
      <span className="text-text-muted">{EMPTY}</span>
    );
  }

  if (isEmpty(value)) return <span className="text-text-muted">{EMPTY}</span>;

  switch (type) {
    case "number":
      return <span className="tabular-nums">{formatNumber(asNumber(value))}</span>;
    case "percentage":
      return <PercentageCell value={asNumber(value)} />;
    case "bytes":
      return <span className="tabular-nums">{formatBytes(asNumber(value))}</span>;
    case "duration":
      return <span className="tabular-nums">{formatDuration(asNumber(value))}</span>;
    case "date":
      return <span className="tabular-nums">{formatDate(value as string | number | Date)}</span>;
    case "relative-date": {
      const { display, absolute } = formatRelativeDate(value as string | number | Date);
      return (
        <Tooltip content={absolute}>
          <span className="cursor-default">{display}</span>
        </Tooltip>
      );
    }
    case "status": {
      const key = value as StatusKey;
      if (!(key in STATUS)) return <span className="text-text-muted">{EMPTY}</span>;
      return <StatusBadge status={key} />;
    }
    case "user":
      return <UserCell value={value as DataTableUserValue} />;
    case "digest":
      return <DigestCell value={String(value)} copyLabel="Copy" />;
    case "version":
      return <span className="font-mono text-caption tabular-nums">{String(value)}</span>;
    case "tags": {
      const tags = value as string[];
      const shown = tags.slice(0, 3);
      const extra = tags.length - shown.length;
      return (
        <div className="flex flex-wrap items-center gap-1">
          {shown.map((tag) => (
            <Badge key={tag} variant="tonal" tone="neutral">
              {tag}
            </Badge>
          ))}
          {extra > 0 && <Badge variant="counter">{`+${extra}`}</Badge>}
        </div>
      );
    }
    case "cron": {
      const expr = String(value);
      const description = column.describe?.(expr);
      const content = <span className="font-mono text-caption">{expr}</span>;
      return description ? (
        <Tooltip content={description}>
          <span className="cursor-default">{content}</span>
        </Tooltip>
      ) : (
        content
      );
    }
    case "sensitivity": {
      const level = value as SensitivityLevel;
      if (!(level in SENSITIVITY_TONE)) return <span className="text-text-muted">{EMPTY}</span>;
      const label = labels.sensitivity?.[level] ?? SENSITIVITY_DEFAULT_LABELS[level];
      return (
        <Badge variant="tonal" tone={SENSITIVITY_TONE[level]}>
          {label}
        </Badge>
      );
    }
    case "text":
    default:
      return (
        <span className="block truncate" title={String(value)}>
          {String(value)}
        </span>
      );
  }
}
