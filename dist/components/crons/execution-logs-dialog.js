"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
import { formatDateTime, formatDuration } from "../../lib/format";
import { Spinner } from "../feedback/spinner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../overlays/dialog";
import { ExecutionStatusBadge } from "./execution-status-badge";
import { logLineTone } from "./log-lines";
import { formatExecutionDuration, } from "./types";
const DEFAULT_LABELS = {
    triggers: { scheduled: "Scheduled run", manual: "Manual run", task: "Task run" },
    statuses: {},
    loading: "Loading output…",
    empty: "This execution left no output.",
};
const TONE_CLASS = { default: "", warning: "text-warning", danger: "text-danger" };
/**
 * ExecutionLogsDialog — one execution's header (job, status, trigger, start,
 * duration), its error message and its output. The consumer loads the logs
 * and passes them; lines are tinted by their text, not their stream (stderr
 * is normal progress for most CLIs).
 */
export function ExecutionLogsDialog({ execution, onOpenChange, logs, error = null, formatDate = (iso) => formatDateTime(iso), labels, }) {
    const t = { ...DEFAULT_LABELS, ...labels };
    return (_jsx(Dialog, { open: execution !== null, onOpenChange: onOpenChange, children: _jsx(DialogContent, { size: "lg", children: execution && (_jsxs(_Fragment, { children: [_jsxs(DialogHeader, { children: [_jsxs(DialogTitle, { className: "flex items-center gap-2", children: [execution.jobName, _jsx(ExecutionStatusBadge, { status: execution.status, labels: t.statuses })] }), _jsxs(DialogDescription, { children: [t.triggers[execution.trigger] ?? execution.trigger, " \u00B7 ", formatDate(execution.startedAt ?? execution.createdAt), " \u00B7", " ", formatExecutionDuration(execution.durationMs, formatDuration)] })] }), execution.errorMessage && (_jsx("p", { role: "alert", className: "rounded-md border border-danger-border bg-danger-bg p-3 text-body text-danger", children: execution.errorMessage })), _jsx("div", { "aria-busy": logs === null && !error, className: "max-h-[50vh] overflow-auto rounded-lg border border-border bg-bg-subtle p-3 font-mono text-code", children: error ? (_jsx("p", { role: "alert", className: "text-danger", children: error })) : logs === null ? (_jsxs("div", { role: "status", className: "flex items-center gap-2 text-text-muted", children: [_jsx(Spinner, { size: 14, label: null }), " ", t.loading] })) : logs.length === 0 ? (_jsx("p", { className: "text-text-muted", children: t.empty })) : (logs.map((l) => (_jsx("pre", { className: cn("whitespace-pre-wrap break-words", l.stream === "system" ? "text-text-muted" : TONE_CLASS[logLineTone(l.message)]), children: l.message }, l.id)))) })] })) }) }));
}
