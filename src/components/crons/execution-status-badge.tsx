import type { ReactNode } from "react";
import type { StatusKey } from "../../lib/status";
import { StatusBadge } from "../feedback/status-badge";
import type { CronExecutionStatus } from "./types";

// Execution states mapped onto the suite taxonomy (§19). An interrupted run
// (worker restart) is a warning, not a failure of the job itself.
const EXECUTION_STATUS_KEY: Record<CronExecutionStatus, StatusKey> = {
  pending: "pending",
  running: "processing",
  success: "healthy",
  failed: "failed",
  timeout: "failed",
  interrupted: "degraded",
};

/** Default English copy per execution status; products pass their own. */
export const EXECUTION_STATUS_LABELS: Record<CronExecutionStatus, string> = {
  pending: "Pending",
  running: "Running",
  success: "Succeeded",
  failed: "Failed",
  timeout: "Timed out",
  interrupted: "Interrupted",
};

/** The §19 state an execution status renders as. */
export function executionStatusKey(status: CronExecutionStatus): StatusKey {
  return EXECUTION_STATUS_KEY[status] ?? "unknown";
}

export interface ExecutionStatusBadgeProps {
  status: CronExecutionStatus;
  /** Copy overrides per status (i18n). */
  labels?: Partial<Record<CronExecutionStatus, ReactNode>>;
  className?: string;
}

/**
 * ExecutionStatusBadge — the status of a cron execution. StatusBadge (§19)
 * with Cronify's vocabulary mapped onto the suite states; only the copy is
 * Cronify's. For CI runs use RunStatusBadge.
 *
 * Server-component safe.
 */
export function ExecutionStatusBadge({ status, labels, className }: ExecutionStatusBadgeProps) {
  return (
    <StatusBadge status={executionStatusKey(status)} className={className} data-execution-status={status}>
      {labels?.[status] ?? EXECUTION_STATUS_LABELS[status] ?? status}
    </StatusBadge>
  );
}
