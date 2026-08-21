"use client";

import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { STATUS, type StatusKey } from "../../lib/status";
import type { ToneOrNeutral } from "../../lib/types";
import { Spinner } from "../feedback/spinner";
import { Icon } from "../typography/icon";
import { Tooltip } from "../overlays/tooltip";

const TONE_TEXT: Record<ToneOrNeutral, string> = {
  neutral: "text-text-secondary",
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};

const TONE_DOT: Record<ToneOrNeutral, string> = {
  neutral: "bg-text-muted",
  info: "bg-info",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
};

/** dot + text (dense lists) · icon only + Tooltip (narrow columns). */
export type StatusIndicatorTreatment = "dot" | "icon";

export interface StatusIndicatorProps {
  /** One of the sixteen canonical states (§19). */
  status: StatusKey;
  /** dot + text, or icon-only with a required tooltip (§19). */
  treatment: StatusIndicatorTreatment;
  /** Product copy for the state. Defaults to the canonical English label. */
  label?: ReactNode;
  className?: string;
}

/**
 * StatusIndicator — the two non-badge treatments of the state taxonomy (§19):
 * `dot` (a tonal dot plus text, for dense lists) and `icon` (the state's icon
 * alone, wrapped in a Tooltip, for narrow columns). Tone and icon are the SAME
 * as the badge in every treatment — a state never changes color between them.
 * For a full labelled badge in tables and headers use StatusBadge.
 */
export function StatusIndicator({ status, treatment, label, className }: StatusIndicatorProps) {
  const spec = STATUS[status];
  const tone = spec.treatment === "tonal" ? spec.tone : "neutral";
  const copy = label ?? spec.label;

  if (treatment === "icon") {
    // Icon-only MUST carry an accessible name (§C-03) — the tooltip mirrors it visibly.
    const accessible = typeof copy === "string" ? copy : spec.label;
    return (
      <Tooltip content={copy}>
        <span
          tabIndex={0}
          role="img"
          aria-label={accessible}
          data-status={status}
          className={cn(
            "inline-flex items-center justify-center rounded-sm outline-none",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
            TONE_TEXT[tone],
            className,
          )}
        >
          {spec.spinner ? (
            <Spinner size={14} label={null} />
          ) : spec.icon ? (
            <Icon icon={spec.icon} size={14} />
          ) : (
            <span aria-hidden className={cn("size-2 rounded-full", TONE_DOT[tone])} />
          )}
        </span>
      </Tooltip>
    );
  }

  return (
    <span
      data-status={status}
      className={cn("inline-flex items-center gap-1.5 text-body-sm", TONE_TEXT[tone], className)}
    >
      {spec.spinner ? (
        <Spinner size={12} label={null} />
      ) : (
        <span aria-hidden className={cn("size-2 shrink-0 rounded-full", TONE_DOT[tone])} />
      )}
      <span>{copy}</span>
    </span>
  );
}
