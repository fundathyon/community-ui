import type { ReactNode } from "react";
import type { StatusKey } from "../../lib/status";
import type { CronExecutionStatus } from "./types";
/** Default English copy per execution status; products pass their own. */
export declare const EXECUTION_STATUS_LABELS: Record<CronExecutionStatus, string>;
/** The §19 state an execution status renders as. */
export declare function executionStatusKey(status: CronExecutionStatus): StatusKey;
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
export declare function ExecutionStatusBadge({ status, labels, className }: ExecutionStatusBadgeProps): import("react").JSX.Element;
