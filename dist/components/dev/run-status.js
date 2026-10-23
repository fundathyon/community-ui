import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
import { STATUS } from "../../lib/status";
import { Spinner } from "../feedback/spinner";
import { StatusBadge } from "../feedback/status-badge";
import { Icon } from "../typography/icon";
// Pipeline states mapped onto the suite taxonomy (§19): tone, icon and
// treatment come from STATUS, so a failed job looks like any other failure.
const RUN_STATUS_KEY = {
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
export const RUN_STATUS_LABELS = {
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
export function runStatusKey(status) {
    return RUN_STATUS_KEY[status] ?? "unknown";
}
/**
 * RunStatusBadge — the status of a CI run or job as a badge. It is StatusBadge
 * (§19) with the pipeline vocabulary mapped onto the suite states, so only the
 * copy differs. For the bare marker inside a job card, RunGraph draws it.
 *
 * Server-component safe.
 */
export function RunStatusBadge({ status, labels, className }) {
    return (_jsx(StatusBadge, { status: runStatusKey(status), className: className, "data-run-status": status, children: labels?.[status] ?? RUN_STATUS_LABELS[status] }));
}
const TONE_TEXT = {
    neutral: "text-text-secondary",
    info: "text-info",
    success: "text-success",
    warning: "text-warning",
    danger: "text-danger",
};
const TONE_DOT = {
    neutral: "bg-text-muted",
    info: "bg-info",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
};
/** The state's marker alone (icon, spinner or dot), labelled. Not exported. */
export function RunStatusGlyph({ status, label }) {
    const spec = STATUS[runStatusKey(status)];
    const tone = spec.treatment === "tonal" ? spec.tone : "neutral";
    return (_jsx("span", { role: "img", "aria-label": label, "data-run-status": status, className: cn("inline-flex size-4 shrink-0 items-center justify-center", TONE_TEXT[tone]), children: spec.spinner ? (_jsx(Spinner, { size: 14, label: null })) : spec.icon ? (_jsx(Icon, { icon: spec.icon, size: 14 })) : (_jsx("span", { "aria-hidden": true, className: cn("size-2 rounded-full", TONE_DOT[tone]) })) }));
}
