"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
import { formatDateTime, formatDuration } from "../../lib/format";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../data-table/table";
import { EmptyState } from "../feedback/empty-state";
import { ErrorState } from "../feedback/error-state";
import { Skeleton } from "../feedback/skeleton";
import { ExecutionStatusBadge } from "./execution-status-badge";
import { formatExecutionDuration, } from "./types";
const DEFAULT_LABELS = {
    job: "Job",
    status: "Status",
    trigger: "Trigger",
    started: "Started",
    duration: "Duration",
    triggers: { scheduled: "Scheduled", manual: "Manual", task: "Task" },
    statuses: {},
    emptyTitle: "No executions yet",
    emptyDescription: "Runs appear here as soon as a job fires.",
    noResultsTitle: "No executions match these filters",
    errorTitle: "Executions could not be loaded",
    errorDescription: "Cronify did not answer. Try again in a moment.",
};
/**
 * CronExecutionsTable — the run history of a Cronify app: job, status,
 * trigger, start and duration, newest first as given. Presentational: the
 * consumer loads, filters and paginates. Pair it with ExecutionLogsDialog
 * through `onSelect`.
 */
export function CronExecutionsTable({ executions, state = "ready", onSelect, filtered = false, emptyAction, formatDate = (iso) => formatDateTime(iso), labels, className, ...props }) {
    const t = { ...DEFAULT_LABELS, ...labels };
    if (state === "error") {
        return _jsx(ErrorState, { title: t.errorTitle, description: t.errorDescription, className: className, ...props });
    }
    if (state === "loading") {
        return (_jsx("div", { "aria-busy": "true", className: cn("flex flex-col gap-2", className), ...props, children: Array.from({ length: 4 }, (_, i) => (_jsx(Skeleton, { className: "h-10 w-full rounded-md" }, i))) }));
    }
    if (executions.length === 0) {
        return (_jsx(EmptyState, { kind: filtered ? "no-results" : "empty", title: filtered ? t.noResultsTitle : t.emptyTitle, description: filtered ? undefined : t.emptyDescription, action: emptyAction, className: className, ...props }));
    }
    return (_jsx("div", { className: className, ...props, children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: t.job }), _jsx(TableHead, { children: t.status }), _jsx(TableHead, { children: t.trigger }), _jsx(TableHead, { children: t.started }), _jsx(TableHead, { align: "right", children: t.duration })] }) }), _jsx(TableBody, { children: executions.map((ex) => (_jsxs(TableRow, { "data-execution-id": ex.id, interactive: Boolean(onSelect), onClick: onSelect ? () => onSelect(ex) : undefined, children: [_jsx(TableCell, { className: "font-medium text-text", children: onSelect ? (
                                // The row is the mouse target; this button is the keyboard one.
                                _jsx("button", { type: "button", className: "text-left", onClick: (e) => {
                                        e.stopPropagation();
                                        onSelect(ex);
                                    }, children: ex.jobName })) : (ex.jobName) }), _jsx(TableCell, { children: _jsx(ExecutionStatusBadge, { status: ex.status, labels: t.statuses }) }), _jsx(TableCell, { className: "text-text-muted", children: t.triggers[ex.trigger] ?? ex.trigger }), _jsx(TableCell, { className: "tabular-nums", children: formatDate(ex.startedAt ?? ex.createdAt) }), _jsx(TableCell, { align: "right", className: "tabular-nums", children: formatExecutionDuration(ex.durationMs, formatDuration) })] }, ex.id))) })] }) }));
}
