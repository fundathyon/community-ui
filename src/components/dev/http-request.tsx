"use client";

import { ChevronDown } from "lucide-react";
import { useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import type { Tone } from "../../lib/types";
import { Icon } from "../typography/icon";
import { HTTP_CHIP_CLASS, HTTP_CHIP_TONE, formatHttpDuration, statusTone } from "./http-response";

export type HttpMethod = "GET" | "HEAD" | "POST" | "PUT" | "PATCH" | "DELETE";

/** Verb → tone by EFFECT (§20): reading is info, creating/writing success, destroying danger. */
const METHOD_TONE: Record<HttpMethod, Tone> = {
  GET: "info",
  HEAD: "info",
  POST: "success",
  PUT: "success",
  PATCH: "success",
  DELETE: "danger",
};

export interface HttpRequestProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  method: HttpMethod;
  /** Request path — "/v1/users". */
  path: string;
  /** Response status; the chip follows the 2xx/3xx/4xx/5xx tones (§20). */
  status?: number;
  statusText?: string;
  /** Milliseconds — "42 ms", readable units from 1 s up. */
  duration?: number;
  /** Expandable body slot (headers, a JsonViewer…). Adds a disclosure toggle. */
  children?: ReactNode;
  /** Accessible name of the disclosure toggle. */
  toggleLabel?: string;
}

/**
 * HttpRequest — the "GET /v1/users · 200 OK · 42 ms" row (§20). HTTP verbs
 * reuse the semantic tones by their effect — read is info, create/write is
 * success, destroy is danger — never a palette of their own. Optional
 * children expand below the row for the request detail.
 */
export function HttpRequest({
  method,
  path,
  status,
  statusText,
  duration,
  children,
  toggleLabel = "Show details",
  className,
  ...props
}: HttpRequestProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("overflow-hidden rounded-lg border border-border bg-bg-subtle", className)} {...props}>
      <div className="flex items-center gap-2 px-3 py-2">
        <span className={cn(HTTP_CHIP_CLASS, HTTP_CHIP_TONE[METHOD_TONE[method]], "uppercase")}>{method}</span>
        <span className="min-w-0 flex-1 truncate font-mono text-code text-text">{path}</span>
        {status !== undefined && (
          <span className={cn(HTTP_CHIP_CLASS, HTTP_CHIP_TONE[statusTone(status)], "tabular-nums")}>
            {status}
            {statusText ? ` ${statusText}` : ""}
          </span>
        )}
        {duration !== undefined && (
          <span className="font-mono text-caption text-text-muted tabular-nums">{formatHttpDuration(duration)}</span>
        )}
        {children && (
          <button
            type="button"
            aria-expanded={open}
            aria-label={toggleLabel}
            onClick={() => setOpen(!open)}
            className={cn(
              "inline-flex size-6 shrink-0 select-none items-center justify-center rounded-md text-text-secondary",
              "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]",
              "hover:bg-surface-hover hover:text-text active:bg-surface-hover",
              "fdn-touch-target",
            )}
          >
            <Icon
              icon={ChevronDown}
              size={14}
              className={cn(
                "transition-transform duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]",
                open && "rotate-180",
              )}
            />
          </button>
        )}
      </div>
      {children && open && <div className="border-t border-border p-2">{children}</div>}
    </div>
  );
}
