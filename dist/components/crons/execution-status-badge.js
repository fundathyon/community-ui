import { jsx as _jsx } from "react/jsx-runtime";
import { StatusBadge } from "../feedback/status-badge";
// Execution states mapped onto the suite taxonomy (§19). An interrupted run
// (worker restart) is a warning, not a failure of the job itself.
const EXECUTION_STATUS_KEY = {
    pending: "pending",
    running: "processing",
    success: "healthy",
    failed: "failed",
    timeout: "failed",
    interrupted: "degraded",
};
/** Default English copy per execution status; products pass their own. */
export const EXECUTION_STATUS_LABELS = {
    pending: "Pending",
    running: "Running",
    success: "Succeeded",
    failed: "Failed",
    timeout: "Timed out",
    interrupted: "Interrupted",
};
/** The §19 state an execution status renders as. */
export function executionStatusKey(status) {
    return EXECUTION_STATUS_KEY[status] ?? "unknown";
}
/**
 * ExecutionStatusBadge — the status of a cron execution. StatusBadge (§19)
 * with Cronify's vocabulary mapped onto the suite states; only the copy is
 * Cronify's. For CI runs use RunStatusBadge.
 *
 * Server-component safe.
 */
export function ExecutionStatusBadge({ status, labels, className }) {
    return (_jsx(StatusBadge, { status: executionStatusKey(status), className: className, "data-execution-status": status, children: labels?.[status] ?? EXECUTION_STATUS_LABELS[status] ?? status }));
}
