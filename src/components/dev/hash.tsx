import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { truncateMiddle } from "../../lib/format";
import { CopyButton } from "./copy-button";

export interface HashProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** The full digest — "sha256:4a3ed8…". */
  value: string;
  /** Middle-truncate the display, keeping both ends verifiable. */
  truncate?: boolean;
  /** Characters kept at the start / end when truncating. */
  head?: number;
  tail?: number;
  /** Copies the FULL value — never the ellipsis version (§20 hard rule). */
  copy?: boolean;
  copyLabel?: string;
  copiedLabel?: string;
}

/**
 * Hash — a digest or id display (§20, §21 digest cell): mono, secondary,
 * middle-truncated so both ends stay verifiable, with a copy button that
 * ALWAYS copies the complete value. Everything truncated keeps its full copy.
 */
export function Hash({
  value,
  truncate = true,
  head = 6,
  tail = 4,
  copy = true,
  copyLabel = "Copy",
  copiedLabel = "Copied",
  className,
  ...props
}: HashProps) {
  const display = truncate ? truncateMiddle(value, head, tail) : value;
  return (
    <span
      className={cn("inline-flex items-center gap-1 font-mono text-code text-text-secondary", className)}
      {...props}
    >
      <span title={display === value ? undefined : value}>{display}</span>
      {copy && <CopyButton value={value} label={copyLabel} copiedLabel={copiedLabel} size={12} />}
    </span>
  );
}
