import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { STATUS, type StatusKey } from "../../lib/status";
import type { ToneOrNeutral } from "../../lib/types";
import { Spinner } from "../feedback/spinner";
import { StatusBadge } from "../feedback/status-badge";
import { Icon } from "../typography/icon";

/** Status of a CI run (Foundathyon Pipelines). */
export type RunStatus =
  | "pending"
  | "scheduled"
  | "provisioning"
  | "running"
  | "succeeded"
  | "failed"
  | "cancelled"
  | "timed_out"
  | "rejected";

/** Status of a job or step inside a run. */
export type JobStatus = "pending" | "running" | "succeeded" | "failed" | "cancelled" | "skipped";

/** Any run or job status. */
export type PipelineStatus = RunStatus | JobStatus;

/** One step of a job. Dates are ISO strings. */
export interface RunStep {
  index: number;
  name: string;
  status: JobStatus;
  exitCode?: number;
  startedAt?: string;
  finishedAt?: string;
}

/** One job of a run: its stage is its column; `needs` draws the edges. */
export interface RunJob {
  name: string;
  stage: number;
  needs?: string[];
  image?: string;
  status: JobStatus;
  exitCode?: number;
  startedAt?: string;
  finishedAt?: string;
  steps?: RunStep[];
}

// Pipeline states mapped onto the suite taxonomy (§19): tone, icon and
// treatment come from STATUS, so a failed job looks like any other failure.
const RUN_STATUS_KEY: Record<PipelineStatus, StatusKey> = {
  pending: "pending",
  scheduled: "pending",
  provisioning: "processing",
  running: "processing",
  succeeded: "healthy",
  failed: "failed",
  timed_out: "failed",
  rejected: "failed",
  cancelled: "disabled",
  skipped: "disabled",
};

/** Default English copy per status; products pass their own via `labels`. */
export const RUN_STATUS_LABELS: Record<PipelineStatus, string> = {
  pending: "Queued",
  scheduled: "Scheduled",
  provisioning: "Provisioning",
  running: "Running",
  succeeded: "Succeeded",
  failed: "Failed",
  timed_out: "Timed out",
  rejected: "Rejected",
  cancelled: "Cancelled",
  skipped: "Skipped",
};

/** The §19 state a pipeline status renders as. */
export function runStatusKey(status: PipelineStatus): StatusKey {
  return RUN_STATUS_KEY[status] ?? "unknown";
}

export interface RunStatusBadgeProps {
  status: PipelineStatus;
  /** Copy overrides per status (i18n). */
  labels?: Partial<Record<PipelineStatus, ReactNode>>;
  className?: string;
}

/**
 * RunStatusBadge — the status of a CI run or job as a badge. It is StatusBadge
 * (§19) with the pipeline vocabulary mapped onto the suite states, so only the
 * copy differs. For the bare marker inside a job card, RunGraph draws it.
 *
 * Server-component safe.
 */
export function RunStatusBadge({ status, labels, className }: RunStatusBadgeProps) {
  return (
    <StatusBadge status={runStatusKey(status)} className={className} data-run-status={status}>
      {labels?.[status] ?? RUN_STATUS_LABELS[status]}
    </StatusBadge>
  );
}

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

/** The state's marker alone (icon, spinner or dot), labelled. Not exported. */
export function RunStatusGlyph({ status, label }: { status: PipelineStatus; label: string }) {
  const spec = STATUS[runStatusKey(status)];
  const tone = spec.treatment === "tonal" ? spec.tone : "neutral";
  return (
    <span
      role="img"
      aria-label={label}
      data-run-status={status}
      className={cn("inline-flex size-4 shrink-0 items-center justify-center", TONE_TEXT[tone])}
    >
      {spec.spinner ? (
        <Spinner size={14} label={null} />
      ) : spec.icon ? (
        <Icon icon={spec.icon} size={14} />
      ) : (
        <span aria-hidden className={cn("size-2 rounded-full", TONE_DOT[tone])} />
      )}
    </span>
  );
}
