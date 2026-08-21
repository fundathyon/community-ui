"use client";

import { Check, CircleX, Copy } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";
import { useCopyToClipboard } from "../../hooks/use-copy-to-clipboard";
import { cn } from "../../lib/cn";
import { Button } from "../actions/button";
import { Icon } from "../typography/icon";

/** The four mandatory technical facts of every API error (§25). */
export interface ErrorStateDetails {
  /** HTTP status ("409 Conflict" or 409). */
  status?: number | string;
  requestId?: string;
  traceId?: string;
  /** UTC timestamp, already formatted. */
  timestamp?: string;
}

export interface ErrorStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Human language — NEVER a raw code in the headline (§17, §25). */
  title: ReactNode;
  /** What happened, whose fault it is, what to do now (§11). */
  description?: ReactNode;
  /** The exit — retry, edit or contact (§17). Rendered as a secondary Button. */
  retry?: { label: string; onClick: () => void };
  /** Technical detail shown in mono on a second line and copied verbatim. */
  details?: ErrorStateDetails;
  /** Copy-button label. Overridable product copy. @default "Copy details" */
  copyLabel?: string;
  /** Label while the copy confirmation lasts. @default "Copied" */
  copiedLabel?: string;
}

function detailString({ status, requestId, traceId, timestamp }: ErrorStateDetails): string {
  return [
    status !== undefined ? String(status) : null,
    requestId ? `req ${requestId}` : null,
    traceId ? `trace ${traceId}` : null,
    timestamp ?? null,
  ]
    .filter(Boolean)
    .join(" · ");
}

/**
 * ErrorState (§11) — what happened, whose fault it is and what to do now.
 * The headline is human language; the technical detail (status, request id,
 * trace id, timestamp) goes in mono behind "Copy details", never in the title
 * (§25). Announces with `role="alert"` and always offers an exit.
 */
export function ErrorState({
  title,
  description,
  retry,
  details,
  copyLabel = "Copy details",
  copiedLabel = "Copied",
  className,
  ...props
}: ErrorStateProps) {
  const { copied, copy } = useCopyToClipboard();
  const detail = details ? detailString(details) : "";

  return (
    <div
      role="alert"
      className={cn("flex flex-col items-center justify-center px-6 py-12 text-center", className)}
      {...props}
    >
      <span className="mb-3 grid size-10 place-items-center rounded-full bg-danger-bg text-danger">
        <Icon icon={CircleX} size={20} />
      </span>
      <h3 className="text-h4 text-text">{title}</h3>
      {description && (
        <p className="mt-1 max-w-96 text-body text-text-secondary">{description}</p>
      )}
      {detail && (
        <p className="mt-2 font-mono text-caption text-text-muted tabular-nums">{detail}</p>
      )}
      {(retry || detail) && (
        <div className="mt-4 flex items-center gap-2">
          {retry && (
            <Button variant="secondary" onClick={retry.onClick}>
              {retry.label}
            </Button>
          )}
          {detail && (
            <Button
              variant="ghost"
              onClick={() => void copy(detail)}
              leading={<Icon icon={copied ? Check : Copy} size={14} />}
            >
              {copied ? copiedLabel : copyLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
