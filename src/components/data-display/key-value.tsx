import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface KeyValueProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** The term — rendered as a muted caption. */
  label: ReactNode;
  /** The value. */
  children: ReactNode;
  /**
   * Render the value in mono — for verifiable data (digests, IDs, paths) the
   * user compares character by character (§03). Never decorative.
   */
  mono?: boolean;
}

/**
 * KeyValue — a single term/value pair: a muted caption label above the value.
 * Use `mono` for literal, copy-and-compare data. For a set of pairs laid out on
 * a grid, use DescriptionList.
 *
 * Server-component safe.
 */
export function KeyValue({ label, mono = false, className, children, ...props }: KeyValueProps) {
  return (
    <div className={cn("flex flex-col gap-0.5", className)} {...props}>
      <span className="text-caption text-text-muted">{label}</span>
      <span className={cn("text-body text-text", mono && "font-mono text-code tabular-nums")}>{children}</span>
    </div>
  );
}
